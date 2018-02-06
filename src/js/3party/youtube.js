this.mmooc=this.mmooc||{};

//https://medium.com/@pointbmusic/youtube-api-checklist-c195e9abaff1
this.mmooc.youtube = function() {
	//Array of captions in video
	var captions
	var captionsLoaded = false;

	//Timeout for next caption
	var captionTimeout;

	//Keep track of which captions we are showing
	var currentCaptionIndex = 0;
	var nextCaptionIndex = 0;

	var hrefPrefix="https://video.google.com/timedtext?lang=no&v=";

	var playersArr = [];

	function findCaptionIndexFromTimestamp(timeStamp)
	{
		console.log("timeStamp:" + timeStamp);
		var start = 0;
		var duration = 0;
		for (var i = 0, il = captions.length; i < il; i++) {
			start = Number(getStartTimeFromCaption(i));
			duration = Number(getDurationFromCaption(i));
	
			//Return the first caption if the timeStamp is smaller than the first caption start time.
			if(timeStamp < start)
			{
				break;
			}
	
			//Check if the timestamp is in the interval of this caption.
			if((timeStamp >= start) && (timeStamp < (start + duration)))
			{
				break;
			}        
		}
		console.log("Found index:" + i + " Start:" + start + " Duration:" + duration);
		return i;
	}

	function getTimeIdFromTimestampIndex(i)
	{
		var strTimestamp = "" + i;
		return "t" + strTimestamp;
	}

	function clearCurrentHighlighting()
	{
		var timeStampId = getTimeIdFromTimestampIndex(currentCaptionIndex);
		console.log("clearCurrentHighlighting " + timeStampId);
		$("#"+timeStampId).css('background-color', '');
	}

	function highlightNextCaption()
	{
		console.log("highlightNextCaption");
		var timestampId = getTimeIdFromTimestampIndex(nextCaptionIndex);
		$("#"+timestampId).css('background-color', 'yellow');
	}

	function calculateTimeout(currentTime)
	{
		var startTime = Number(getStartTimeFromCaption(currentCaptionIndex));
		var duration = Number(getDurationFromCaption(currentCaptionIndex));
		var timeoutValue = startTime - currentTime + duration;
		return timeoutValue;
	}

	function setCaptionTimeout(timeoutValue)
	{
		clearTimeout(captionTimeout);
		
		captionTimeout = setTimeout(function() {
			highlightCaptionAndPrepareForNext();
		}, timeoutValue*1000)
	}

	//This function highlights the next caption in the list and
	//sets a timeout for the next one after that.
	function highlightCaptionAndPrepareForNext()
	{
		console.log("highlightCaptionAndPrepareForNext");
		clearCurrentHighlighting();
		highlightNextCaption();
		currentCaptionIndex = nextCaptionIndex;
		nextCaptionIndex++;

		currentTime = player.getCurrentTime();
		var timeoutValue = calculateTimeout(currentTime);
		
		setCaptionTimeout(timeoutValue);
	}

	//Called if the user has dragged the slider to somewhere in the video.
	function highlightCaptionFromTimestamp(timeStamp)
	{
		console.log("highlightCaptionFromTimestamp timeStamp:" + timeStamp);
		clearCurrentHighlighting();
		nextCaptionIndex = findCaptionIndexFromTimestamp(timeStamp);
		highlightNextCaption();
		currentCaptionIndex = nextCaptionIndex;

		var timeoutValue = calculateTimeout(timeStamp);

		setCaptionTimeout(timeoutValue);
	}   

	function getStartTimeFromCaption(i)
	{
		return captions[i].getAttribute('start');
	}
	function getDurationFromCaption(i)
	{
		return captions[i].getAttribute('dur');
	}

	function transcriptLoaded (transcript, videoId) {
		var start = 0;
		var temp;
		captions = transcript.getElementsByTagName('text');
		var srt_output = "<div id='btnSeek' data-seek='0'>0:00</div>";

		for (var i = 0, il = captions.length; i < il; i++) {
			start = +getStartTimeFromCaption(i);

			captionText = captions[i].textContent.replace(/</g, '&lt;').replace(/>/g, '&gt;');
			var timestampId = getTimeIdFromTimestampIndex(i);
			srt_output += "<span class='btnSeek' data-seek='" + start + "' id='" + timestampId + "'>" + captionText + "</span> ";
		};

		$("#videoTranscript" + videoId).append(srt_output);
		captionsLoaded = true;

	}

	function getTranscript(videoId, callback)
	{
		var href = hrefPrefix + videoId;
		$.ajax({
			url: href,
			type: 'GET',
			data: {},
			success: function(response) {
				callback(response);
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				console.log("Error during GET");
			}
		});           
	}
	function createPlayer(videoId) { 
	   return player = new YT.Player(videoId, {
		  videoId: videoId,
		  events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		  }
	   });	
	};
	
	$(function() {
		$(document).on('click', '.btnSeek', function() {
			console.log("=============");
			var seekToTime = $(this).data('seek');
			console.log("Seekto: " + seekToTime);
			player.seekTo(seekToTime, true);
		});
	});

	return {
		addTranscriptToYoutubeVideos : function()
		{
			$(".mmooc-yt-player" ).each(function( i ) {
				var videoId = this.id;
				var newPlayer = createPlayer(videoId);    
				playersArr.push(newPlayer);
				getTranscript(videoId, function(transcript) {
					transcriptLoaded (transcript, videoId);
				});
			});
		},
		playerPlaying : function()
		{
			if(!captionsLoaded)
			{
				return;
			}	
			
		    currentTime = player.getCurrentTime();
		    highlightCaptionFromTimestamp(currentTime);
		},
		playerNotPlaying : function ()
		{
			if(!captionsLoaded)
			{
				return;
			}	
			clearTimeout(captionTimeout);
		},
		APIReady : function ()
		{
			this.addTranscriptToYoutubeVideos();
		},
		init : function ()
		{
			onYouTubePlayerAPIReady();		
		}		
	}
}();


  
function onYouTubePlayerAPIReady() {
	console.log("onYouTubePlayerAPIReady.");
	this.mmooc.youtube.APIReady();
}

// The API will call this function when the video player is ready.
function onPlayerReady(event) {
	event.target.playVideo();
}

// The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
function onPlayerStateChange(event) {
	console.log("onPlayerStateChange " + event.data);
	if (event.data == YT.PlayerState.PLAYING) {
		this.mmooc.youtube.playerPlaying();
	}
	else
	{
		this.mmooc.youtube.playerNotPlaying();
	}
}
