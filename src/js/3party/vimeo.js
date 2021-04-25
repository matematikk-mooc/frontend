this.mmooc=this.mmooc||{};

//https://webapps.stackexchange.com/questions/85517/how-can-i-download-subtitles-for-a-vimeo-video
this.mmooc.vimeo = function() {
	var hrefPrefix = "$KPASAPIURL/vimeo/";
	var transcriptIdPrefix = "vimeoTranscript";
	var transcriptArr = [];
	var initialized = false;
    var noOfVimeoVideos = $(".mmoocVimeoVideoTranscript").length;
    var noOfInits = 0;
	function transcript(transcriptId, language, name)
	{
		var transcriptId = transcriptId;
		var videoId = transcriptId.split(transcriptIdPrefix)[1];
        var iframeId = "vimeo" + videoId;
		var transcriptButtonId = "vimeoTranscriptButtonId" + videoId;
		var transcriptContentId = "vimeoTranscriptContentId" + videoId;

		var href = hrefPrefix + videoId;
        //Array of captions in video
		var captionsLoaded = false;

		//Timeout for next caption
		var captionTimeout = null;
		
		var captions = null;

		//Keep track of which captions we are showing
		var currentCaptionIndex = 0;
		var nextCaptionIndex = 0;

        var transcript = this;
        var iframe = document.getElementById(iframeId);
        var player = new Vimeo.Player(iframe);
        player.on('play', function() {
            console.log('Played the video');
			transcript.playerPlaying();
        });
		player.on('pause', function() {
			console.log("Paused the video.");
			transcript.playerNotPlaying();
		});
        player.ready().then(function () {
            console.log('player is ready!');
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
			var target = document.getElementById(timestampId);
			var targetParent = document.getElementById(transcriptContentId);
			targetParent.scrollTop = target.offsetTop - (targetParent.offsetTop + targetParent.offsetHeight / 2);
			
		}
		var calculateTimeout = function(currentTime) {
			var startTime = Number(getStartTimeFromCaption(currentCaptionIndex));
			var duration = Number(getDurationFromCaption(currentCaptionIndex));
			var timeoutValue = 0;
			if(startTime >= currentTime) {
				timeoutValue = startTime - currentTime + duration;
			} else {
				timeoutValue = duration - (currentTime  - startTime);
			}
			return timeoutValue;
		  };
	  
		  this.setCaptionTimeout = function(timeoutValue) {
			if (timeoutValue < 0) {
			  return;
			}
	  
			clearTimeout(captionTimeout);
	  
			var transcript = this;
	  
			captionTimeout = setTimeout(function() {
			  transcript.highlightCaptionAndPrepareForNext();
			}, timeoutValue * 1000);
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
				if (nextCaptionIndex <= captions.length) {
					transcript.setCaptionTimeout(timeoutValue);
				}
			}).catch(function(error) {
                console.log("highlightCaptionAndPrepareForNext:Could not get current time from vimeo in player playing.");
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
		this.transcriptLoaded = function(transcript) {
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

			$("#vimeoTranscript" + videoId).append(srt_output);

			$('#' + transcriptButtonId).click(function(event) {
				mmooc.vimeo.toggleReveal(transcriptContentId);
				return false;
			});

			captionsLoaded = true;

			var transcript = this;
			player.getPaused().then(function(paused) {
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
		this.getIframeId = function()
		{
			return iframeId;
		}
		this.getVideoId = function()
		{
			return videoId;
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
			if(!captionsLoaded)
			{
				return;
			}	
			
            var player = this.getPlayer();
            var transcript = this;
            player.getCurrentTime().then(function(currentTime) {
    		    transcript.highlightCaptionFromTimestamp(currentTime);
            }).catch(function(error) {
                console.log("Could not get current time from vimeo in player playing.");
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
	    getTranscriptFromIframeId(iframeId)
	    {
			for (index = 0; index < transcriptArr.length; ++index) {
				if(transcriptArr[index].getIframeId() == iframeId)
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
				$(".mmoocVimeoVideoTranscript" ).each(function( i ) {
					var language = $(this).data('language');
					var name = $(this).data('name');
					var oTranscript = new transcript(this.id, language, name);
					transcriptArr.push(oTranscript);
                    oTranscript.getTranscript();
				});
				initialized = true;
			}
		}		
	}
}();

