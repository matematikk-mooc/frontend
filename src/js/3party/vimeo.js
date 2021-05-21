this.mmooc=this.mmooc||{};

//https://webapps.stackexchange.com/questions/85517/how-can-i-download-subtitles-for-a-vimeo-video
this.mmooc.vimeo = function() {
	var hrefPrefix = "$KPASAPIURL/vimeo/";
	var transcriptContainer = {};
	var initialized = false;
    var noOfVimeoVideos = 0;

    var noOfInits = 0;
	function transcript(vimeoIframeId, vimeoVideoId)
	{
		var playbackRate = 1.0;
		var transcriptId = "transcript" + vimeoIframeId;
		var transcriptLoadingId = transcriptId + "loading";
		var videoId = vimeoVideoId;
		var iframeId = vimeoIframeId;
		var transcriptButtonId = "vimeoTranscriptButtonId" + vimeoIframeId;
		var transcriptContentId = "vimeoTranscriptContentId" + vimeoIframeId;
		var player = null;
		var transcriptParentDiv = null;

		var href = hrefPrefix + videoId;
        //Array of captions in video
		var captionsLoaded = false;

		//Timeout for next caption
		var captionTimeout = null;
		
		var captionsArr = [];
		var captions = null;

		//Keep track of which captions we are showing
		var currentCaptionIndex = 0;
		var nextCaptionIndex = 0;

		this.initializePlayer = function() {
			var transcript = this;
			var iframe = document.getElementById(iframeId);
			player = new Vimeo.Player(iframe);
			player.on('play', function() {
				console.log('Played the video');
				transcript.playerPlaying();
			});
			player.on('pause', function() {
				console.log("Paused the video.");
				transcript.playerNotPlaying();
			});
			player.getVideoTitle().then(function(title) {
				console.log('title:', title);
			});
			player.on('cuechange', function(d) {
				//console.log(d);
				//transcript.playerPlaying();
			});
			player.on('cuepoint', function(d) {
				console.log(d);
			})
			player.on('texttrackchange', function(d) {
				console.log(d);
			})
			player.on('playbackratechange', function(d) {
				transcript.setPlaybackRate(d.playbackRate);
				console.log(d);
			})
		}
		var findCaptionIndexFromTimestamp = function(timeStamp) {
			var start = 0;
			var duration = 0;
			for (var i = 0, il = captions.length; i < il; i++) {
			  start = Number(getStartTimeFromCaption(i));
			  duration = Number(getDurationFromCaption(i));
	  
			  //Return the first caption if the timeStamp is smaller than the first caption start time.
			  if (timeStamp < start) {
				break;
			  }
	  
			  //Check if the timestamp is in the interval of this caption.
			  if (timeStamp >= start && timeStamp < start + duration) {
				break;
			  }
			}
			return i;
		  };

		var clearCurrentHighlighting = function()
		{
			console.log("Clear caption index ") + currentCaptionIndex;
			var timeStampId = getTimeIdFromTimestampIndex(currentCaptionIndex);
			$("#"+timeStampId).css('background-color', '');
		}

		var highlightNextCaption = function ()
		{
			var timestampId = getTimeIdFromTimestampIndex(nextCaptionIndex);
			$("#"+timestampId).css('background-color', 'yellow');
			console.log("Timestamp id:" + timestampId);
			var target = document.getElementById(timestampId);
			var targetParent = document.getElementById(transcriptContentId);
			console.log("target offsetTop:" + target.offsetTop);
			console.log("targetParent offsetTop:" + targetParent.offsetTop);

			targetParent.scrollTop = target.offsetTop - (targetParent.offsetTop + targetParent.offsetHeight / 2);
			
		}
		//Calculate timeout for when next subtitle should be displayed
		var calculateTimeout = function(currentTime) {
			var startTimeCurrentCaption = Number(getStartTimeFromCaption(currentCaptionIndex));
			var startTimeNextCaption = Number(getStartTimeFromCaption(nextCaptionIndex));
			var durationCurrentCaption = Number(getDurationFromCaption(currentCaptionIndex));
			var timeoutValue = 0;

			console.log("calculateTimeout. CurrentTime:" + currentTime + " startTimeNextCaption:" + startTimeNextCaption);
			//The normal case
			if(startTimeNextCaption >= currentTime) {
				timeoutValue = startTimeNextCaption - currentTime;
			}
			return timeoutValue;
		  };
	  
		  this.setCaptionTimeout = function(timeoutValue) {
			console.log("setCaptionTimeout:" + timeoutValue);
			if (timeoutValue < 0) {
			  return;
			}
	  
			clearTimeout(captionTimeout);
	  
			var transcript = this;
			var adjustedTimeoutValue = timeoutValue / transcript.getPlaybackRate(); 
			console.log("adjusted timeout:" + adjustedTimeoutValue);
	  
			captionTimeout = setTimeout(function() {
			  transcript.highlightCaptionAndPrepareForNext();
			}, adjustedTimeoutValue * 1000);
		  };
	  
		var getStartTimeFromCaption = function(i)
		{
			if(i >= captions.length)
			{
				return -1;
			}
			return captions[i].getAttribute('start');
		}
		var getDurationFromCaption = function(i) 
		{
			if(i >= captions.length)
			{
				return -1;
			}
			return captions[i].getAttribute('dur');
		}
		var getTimeIdFromTimestampIndex = function(i)
		{
			var strTimestamp = "_" + i;
			return "t" + transcriptContentId + strTimestamp;
		}


		//////////////////
		//Public functions
		/////////////////
		//This function highlights the next caption in the list and
		//sets a timeout for the next one after that.
		//It must be public as it is called from a timer.
		this.highlightCaptionAndPrepareForNext = function() {
			clearCurrentHighlighting();
			highlightNextCaption();
			console.log("Previous caption index: " + currentCaptionIndex);
			currentCaptionIndex = nextCaptionIndex;
			console.log("New caption index:" + currentCaptionIndex);
			nextCaptionIndex++;

			var transcript = this;

			player.getCurrentTime().then(function(currentTime) {
				var timeoutValue = calculateTimeout(currentTime);
				if (nextCaptionIndex < captions.length) {
					transcript.setCaptionTimeout(timeoutValue);
				} else {
					console.log("No more captions.");
				}
			}).catch(function(error) {
                console.log("highlightCaptionAndPrepareForNext:Could not get current time from vimeo in player playing:" + error);
            });;
		};
		this.setCurrentTime = function (seekToTime)
		{
            player.setCurrentTime(seekToTime).then(function(seconds) {
                console.log("Jumped to " + seconds);
            }).catch(function(error) {
                switch (error.name) {
                case 'RangeError':
                    console.log("The time is less than 0 or greater than the video's duration.");
                    break;
            
                default:
                    console.log("Some other error occurred.");
                    break;
                }
            });
        }

        this.play = function() {
			var transcript = this;
			player.getPaused().then(function(paused) {
				if(!paused) {
					transcript.playerPlaying();
				} else {
					player.play().then(function() {
						console.log("The video is playing");
					}).catch(function(error) {
						switch (error.name) {
							case 'PasswordError':
								console.log("The video is password protected.")
								break;
						
							case 'PrivacyError':
								// The video is private
								console.log("The video is private.")
								break;
						
							default:
								console.log("Some error occured.")
			
								break;
						}
					});
				}
			});
        }

		this.highlightCaptionFromTimestamp = function(timeStamp) {
			clearCurrentHighlighting();
			nextCaptionIndex = findCaptionIndexFromTimestamp(timeStamp);
			currentCaptionIndex = nextCaptionIndex;
	  
			var startTime = Number(getStartTimeFromCaption(currentCaptionIndex));
	  
			var timeoutValue = -1;
			if (timeStamp < startTime) {
			  timeoutValue = startTime - timeStamp;
			} else {
			  highlightNextCaption();
			  timeoutValue = calculateTimeout(timeStamp);
			}
			this.setCaptionTimeout(timeoutValue);
		};
		this.updateTranscriptText = function(languageCode) {
			captions = captionsArr[languageCode];
			var srt_output = '<p>';
			var noOfSentencesInParagraph = 0;
			var captionText = "";
			for (var i = 0, il = captions.length; i < il; i++) {
				start =+ getStartTimeFromCaption(i);

				captionText = captions[i].textContent.replace(/</g, '&lt;').replace(/>/g, '&gt;');
				var timestampId = getTimeIdFromTimestampIndex(i);
				srt_output += "<span class='btnVimeoSeek' data-seek='" + start + "' id='" + timestampId + "'>" + captionText + "</span> ";
				noOfSentencesInParagraph++;
				if((noOfSentencesInParagraph > 10) && captionText.includes(".")) {
					srt_output += "</p><p>";
					noOfSentencesInParagraph = 0;
				}
			};
			srt_output += "</p>";

			var e = document.getElementById(transcriptContentId);
			e.innerHTML = srt_output;
		}
		this.displayErrorMessage = function(msg) {
			var e = document.getElementById(transcriptContentId);
			if(e) {
				e.innerHTML = "<p>" + msg + "</p>";
			} else {
				console.log("No transcript area.");
			}
		}
		this.createTranscriptArea = function() {
			var revealButtonHtml = '<a class="uob-reveal-button" id="' + transcriptButtonId + '" href="#' + transcriptContentId + '">Videotranskripsjon</a>';

			var p = document.createElement('p');
			transcriptParentDiv.appendChild(p);
			p.innerHTML = revealButtonHtml;

			var e = document.createElement('div');
			transcriptParentDiv.appendChild(e);
			e.setAttribute("id", transcriptContentId);
			e.setAttribute("class", "transcript");
			e.setAttribute("style", "display: none;");

			var transcript = this;
			$('#' + transcriptButtonId)
			.button({ icons: { secondary: 'ui-icon-triangle-1-e' } })
			.click(function(event) {
				var $button = $(this);

				$("#" + transcript.getTranscriptSelectId()).toggle();
				var body = "#"+transcriptContentId;
				if ($(body).css('display') != 'none') {
					$(body).slideUp(400);
					$(body).removeClass("uob-box");
					options = { icons: { secondary: 'ui-icon-triangle-1-e' } };
				} else {
					$(body).slideDown(400);				
					$(body).addClass("uob-box");
					options = { icons: { secondary: 'ui-icon-triangle-1-s' } };
				}	
				$button.button('option', options);
	
				return false;
			});
			return p;	
		}		  
		this.createLanguageMenu = function(p, selectedLanguage) {
			var e = document.createElement('span');
			p.appendChild(e);
			var transcript = this;
			player.getTextTracks().then(function(tracks) {
				console.log(tracks);
				var transcriptSelectId = transcript.getTranscriptSelectId();
				var html = mmooc.util.renderTemplateWithData('transcriptMenu', {
					transcriptSelectId: transcriptSelectId,
					languageTracks: tracks,
					selectedLanguage: selectedLanguage
				});
				e.innerHTML = html;
				var s = document.getElementById(transcriptSelectId);
				function show(){
				  transcript.updateTranscriptText(s.value);
				  console.log(s.value);
				}
				s.onchange=show;
			});
		};
		this.insertTranscriptParent = function() {
			transcriptParentDiv = document.createElement('div');
			var e = document.createElement('div');
			transcriptParentDiv.appendChild(e);
			e.setAttribute("id", transcriptLoadingId);
			e.setAttribute("class", "loading-gif");
	  
			var iframe = document.getElementById(iframeId);

			var nextElementSibling = iframe.nextElementSibling;
			var insertAfterSibling = iframe;
			//If there is an element after the iframe, we insert the transcript before that one.
			if(nextElementSibling) {
				//Some vimeo videos has a link to the video. In that case we put the transcript
				//below the link.
				var firstElementChild = nextElementSibling.firstElementChild;
				if(firstElementChild) {
					var href = firstElementChild.getAttribute("href");
					if(href) {
						var siblingVideoId = mmooc.vimeo.getVimeoVideoIdFromUrl(href);
						if(siblingVideoId == videoId) {
							insertAfterSibling = nextElementSibling;
						}
					}
				}
				iframe.parentNode.insertBefore(transcriptParentDiv, insertAfterSibling.nextSibling);
			} //If the iframe is the last element on the page, we add the transcript at the bottom.
			else {
				iframe.parentElement.appendChild(transcriptParentDiv);
			}
		}
		this.transcriptLoaded = function(transcriptXml) {
			var transcript = this;
			var e = document.getElementById(transcriptLoadingId);
			e.setAttribute("style", "display: none;");

			var p = transcript.createTranscriptArea();

			var error = transcriptXml.getElementsByTagName('error');
			if(error.length) {
				var errorMessage = error[0];
				transcript.displayErrorMessage(errorMessage.textContent);
			} else {
				transcript.initializePlayer();

				var preferredLanguage = MultilangUtils.getPreferredLanguage();
				languages = transcriptXml.getElementsByTagName('language'); 
				var selectedLanguageCode = "";
				var nbLanguageAvailable = false;
				for (var languageNo = 0, languageTotal = languages.length; languageNo < languageTotal; languageNo++) {
					var language = languages[languageNo];
					var languageCode = language.getAttribute("lang");
					if(languageCode == "nb") {
						nbLanguageAvailable = true;
					}
					if(languageCode == preferredLanguage) {
						selectedLanguageCode = languageCode;
					}
					captionsArr[languageCode] = language.getElementsByTagName('text');
				}
				if(selectedLanguageCode == "" && nbLanguageAvailable) {
					selectedLanguageCode = "nb";
				}
				captionsLoaded = true;
				transcript.createLanguageMenu(p, selectedLanguageCode);
				transcript.updateTranscriptText(selectedLanguageCode);
				player.getPaused().then(function(paused) {
					if(!paused) {
						transcript.playerPlaying();
					}
				});
			}
		}
		
		this.getTranscriptId = function()
		{
			return transcriptId;
		}
		this.getTranscriptParentId = function()
		{
			return transcriptParentDiv;
		}
		this.getTranscriptContentId = function()
		{
			return transcriptContentId;
		}
		this.getTranscriptSelectId = function() 
		{
			return transcriptContentId + "-select";
		}
		this.getIFrameId = function() 
		{
			return iframeId;
		}
		this.getVideoId = function()
		{
			return videoId;
		}
		this.getPlaybackRate = function() {
			return playbackRate;
		}
		this.setPlaybackRate = function(newPlaybackRate) {
			playbackRate = newPlaybackRate;
		}
		this.getPlayer = function()
		{
			return player;
		}
		
        this.getTranscript = function()
		{
			var oTranscript = this;
			$.ajax({
				url: href,
				type: 'GET',
                data: {},
				success: function(response) {
					oTranscript.transcriptLoaded(response);
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					console.log("Error during GET");
				}
			});           
		}
		
		this.playerPlaying = function()
		{
			console.log("Player playing.");
			if(!captionsLoaded)
			{
				console.log("Captions not loaded.");
				return;
			}	
			
            var player = this.getPlayer();
            var transcript = this;
            player.getCurrentTime().then(function(currentTime) {
    		    transcript.highlightCaptionFromTimestamp(currentTime);
            }).catch(function(error) {
                console.log("Could not get current time from vimeo in player playing:" + error);
            });
		}
		this.playerNotPlaying = function (transcript)
		{
			if(!captionsLoaded)
			{
				return;
			}	
			clearTimeout(captionTimeout);
		}
	}

	//Called when user clicks somewhere in the transcript.
	$(function() {
		$(document).on('click', '.btnVimeoSeek', function() {
			var seekToTime = $(this).data('seek');
			var transcript = mmooc.vimeo.getTranscriptFromTranscriptId($(this).parent().parent().attr("id"));
            try {
                transcript.setCurrentTime(seekToTime);
                transcript.play();
            }
            catch(e) {
                console.log("Vimeo exception:" + e);
            }
		});
	});

	return {
		getTranscriptFromTranscriptId(transcriptId)
		{
			for (const transcript in transcriptContainer) {
				var transcriptCandidateId = transcriptContainer[transcript].getTranscriptContentId();
				if(transcriptCandidateId == transcriptId) {
					return transcriptContainer[transcript];
				}
			}
			return null;
		},
	    getNoOfVimeoVideos() {
            return noOfVimeoVideos;
        },
		getUniqueIframeId(vimeoId) {
			var vimeoVideoId = "vimeo" + vimeoId;
			var i = 0;
			while(transcriptContainer[vimeoVideoId]) {
				i++;
				vimeoVideoId += i;
			}
			return vimeoVideoId;
		},

	    getVimeoVideoIdFromUrl(url) {
			var id = "";
			var result = url.match(/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_\-]+)?/i);
						
			if (result){
				id = result[1];
			}
			return id;
		},
		init : function ()
		{
            noOfInits++;
            if(noOfInits < noOfVimeoVideos)
            {
                console.log("" + noOfInits + " of " + noOfVimeoVideos + " initialized.");
                return;
            }
            console.log("Vimeo initializing");

			if(!initialized)
			{
				initialized = true;
				var iframes = document.getElementsByTagName('iframe');
				for (var i = 0; i < iframes.length; i++) {
					var iframe = iframes[i];
					var vimeoId = mmooc.vimeo.getVimeoVideoIdFromUrl(iframe.src);
					if(vimeoId != "") {
						var vimeoIframeId = mmooc.vimeo.getUniqueIframeId(vimeoId);
						iframe.setAttribute("id", vimeoIframeId);

						noOfVimeoVideos++;
						var oTranscript = new transcript(vimeoIframeId, vimeoId);
						oTranscript.insertTranscriptParent();
						transcriptContainer[vimeoIframeId]= oTranscript;
						oTranscript.getTranscript();
					}
				}
			} else {
				console.log("Vimeo already initialized. Reinitialize player.");
				for (const transcript in transcriptContainer) {
					var oTranscript = transcriptContainer[transcript];
					oTranscript.initializePlayer();
				}
			}
		}		
	}
}();

