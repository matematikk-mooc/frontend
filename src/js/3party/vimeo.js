this.mmooc=this.mmooc||{};

//https://webapps.stackexchange.com/questions/85517/how-can-i-download-subtitles-for-a-vimeo-video
this.mmooc.vimeo = function() {
	var hrefPrefix = "https://ac9f1949768f.ngrok.io/api/vimeo/";
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
        });
        player.ready().then(function () {
            console.log('player is ready!');
        });           
        player.getVideoTitle().then(function(title) {
            console.log('title:', title);
        });
        player.on('cuechange', function(d) {
            //console.log(d);
            transcript.playerPlaying();
        });
        player.on('cuepoint', function(d) {
            console.log(d);
        })
        player.on('texttrackchange', function(d) {
            console.log(d);
        })

		var findCaptionIndexFromTimestamp = function(timeStamp)
		{
			var start = 0;
			var duration = 0;
            var captionIndex = -1;
            var startIndex = 0;
            if(currentCaptionIndex > -1) {
                startIndex = currentCaptionIndex;
            }
			for (var i = startIndex, il = captions.length; i < il; i++) {
				start = Number(getStartTimeFromCaption(i));
				duration = Number(getDurationFromCaption(i));
		
				//Check if the timestamp is in the interval of this caption.
				if((timeStamp >= start) && (timeStamp < (start + duration)))
				{
					captionIndex = i;
                    break;
				}        
			}
			return captionIndex;
		}


		var clearCurrentHighlighting = function()
		{
			var timeStampId = getTimeIdFromTimestampIndex(currentCaptionIndex);
			$("#"+timeStampId).css('background-color', '');
		}

		var highlightNextCaption = function ()
		{
			var timestampId = getTimeIdFromTimestampIndex(nextCaptionIndex);
			$("#"+timestampId).css('background-color', 'yellow');
		}

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
		this.setCurrentTime = function (seekToTime)
		{
            currentCaptionIndex = 0;
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

		//Called if the user has dragged the slider to somewhere in the video.
		this.highlightCaptionFromTimestamp = function(timeStamp)
		{
			clearCurrentHighlighting();
			nextCaptionIndex = findCaptionIndexFromTimestamp(timeStamp);
			currentCaptionIndex = nextCaptionIndex;
            highlightNextCaption();
		}   

		this.transcriptLoaded = function(transcript) {
			var start = 0;
			captions = transcript.getElementsByTagName('text');
			var srt_output = "<div class='btnVimeoSeek' id='btnVimeoSeek' data-seek='0'>0:00</div>";

			for (var i = 0, il = captions.length; i < il; i++) {
				start =+ getStartTimeFromCaption(i);

				captionText = captions[i].textContent.replace(/</g, '&lt;').replace(/>/g, '&gt;');
				var timestampId = getTimeIdFromTimestampIndex(i);
				srt_output += "<span class='btnVimeoSeek' data-seek='" + start + "' id='" + timestampId + "'>" + captionText + "</span> ";
			};

			$("#vimeoTranscript" + videoId).append(srt_output);
			captionsLoaded = true;
		}
		
		this.getTranscriptId = function()
		{
			return transcriptId;
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
			var transcript = mmooc.vimeo.getTranscriptFromTranscriptId($(this).parent().attr("id"));
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
		getTranscriptFromTranscriptId(transcriptId)
		{
			for (index = 0; index < transcriptArr.length; ++index) {
				if(transcriptArr[index].getTranscriptId() == transcriptId)
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
            var iframe = document.getElementById("vimeo417239677");
            if(!iframe) {
                console.log("Iframe is not ready");
            }

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

