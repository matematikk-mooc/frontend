this.mmooc=this.mmooc||{};

//https://webapps.stackexchange.com/questions/85517/how-can-i-download-subtitles-for-a-vimeo-video
this.mmooc.vimeo = function() {
	var hrefPrefix = "$KPASAPIURL/vimeo/";
	var transcriptIdPrefix = "vimeoTranscript";
	var transcriptArr = [];
	var initialized = false;
    var noOfVimeoVideos = 0;

    var noOfInits = 0;
	function transcript(vimeoVideoId, iframe)
	{
		var playbackRate = 1.0;
		var transcriptId = "transcript" + vimeoVideoId;
		var videoId = vimeoVideoId;
		var transcriptButtonId = "vimeoTranscriptButtonId" + videoId;
		var transcriptContentId = "vimeoTranscriptContentId" + videoId;
		var player = null;

		var href = hrefPrefix + videoId;
        //Array of captions in video
		var captionsLoaded = false;

		//Timeout for next caption
		var captionTimeout = null;
		
		var captions = null;

		//Keep track of which captions we are showing
		var currentCaptionIndex = 0;
		var nextCaptionIndex = 0;

		this.initializePlayer = function() {
			var transcript = this;
			var iframe = transcript.getIframeElement();
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
			var strTimestamp = "" + i;
			return "t" + videoId + strTimestamp;
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
		this.transcriptLoaded = function(transcript, iframe) {
			console.log("Transcript loaded.");
			var start = 0;
			captions = transcript.getElementsByTagName('text');

			var srt_output = '<p>';
			srt_output += '<a id="' + transcriptButtonId + '" href="#' + transcriptContentId + '" class="uob-reveal-button ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-secondary" role="button" aria-disabled="false">';
			srt_output += '<span class="ui-button-text">Transcript</span>';
			srt_output += '<span class="ui-button-icon-secondary ui-icon ui-icon-triangle-1-s"></span></a></p>';

			srt_output += '<div class="transcript" id="' + transcriptContentId + '" style="display: none;">';

			srt_output += "<p>";
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
			srt_output += "</div>";

			var e = document.createElement('div');
			e.innerHTML = srt_output;
			
			iframe.parentNode.insertBefore(e, iframe.nextSibling);

			$('#' + transcriptButtonId).click(function(event) {
				mmooc.vimeo.toggleReveal(transcriptContentId);
				return false;
			});

			captionsLoaded = true;

			var transcript = this;

			transcript.initializePlayer();

			console.log("Get player state.");
			console.log(player);
			player.getPaused().then(function(paused) {
				console.log("Player state paused:" + paused);
				if(!paused) {
					transcript.playerPlaying();
				}
			});
		}
		
		this.getTranscriptId = function()
		{
			return transcriptId;
		}
		this.getTranscriptContentId = function()
		{
			return transcriptContentId;
		}
		this.getVideoId = function()
		{
			return videoId;
		}
		this.getIframeElement = function() {
			return iframe;
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
					oTranscript.transcriptLoaded(response, oTranscript.getIframeElement());
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
//            var iframe = document.getElementById("vimeo" + transcript.videoId);
//            var player = new Vimeo.Player(iframe);
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
		toggleReveal(id) {
			var body = "#"+id;
			if ($(body).css('display') != 'none') {
				$(body).slideUp(400);
			} else {
				$(body).slideDown(400);				
			}	
		},
		getTranscriptFromTranscriptId(transcriptId)
		{
			for (index = 0; index < transcriptArr.length; ++index) {
				var transcriptCandidateId = transcriptArr[index].getTranscriptContentId();
				if(transcriptCandidateId == transcriptId)
				{
					return transcriptArr[index];
				}
			}
			return null;
		},
	    getNoOfVimeoVideos() {
            return noOfVimeoVideos;
        },
	    getTranscriptFromVideoId(videoId)
	    {
			for (index = 0; index < transcriptArr.length; ++index) {
				if(transcriptArr[index].getVideoId() == videoId)
				{
					return transcriptArr[index];
				}
			}
			return null;
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
						noOfVimeoVideos++;
						var oTranscript = new transcript(vimeoId, iframe);
						transcriptArr.push(oTranscript);
						oTranscript.getTranscript();
					}
				}
			} else {
				console.log("Vimeo already initialized. Reinitialize player.");
				for(var i = 0; i < transcriptArr.length; i++) {
					var oTranscript = transcriptArr[i];
					oTranscript.initializePlayer();
				}
			}
		}		
	}
}();

