this.mmooc=this.mmooc||{};

this.mmooc.youtube = function() {
	var tag = document.createElement('script');
	//Array of captions in video
	var captions
	var captionsLoaded = false;

	//Timeout for next caption
	var captionTimeout;

	//Keep track of which captions we are showing
	var currentCaptionIndex = 0;
	var previousCaptionIndex = 0;

	var href="https://video.google.com/timedtext?lang=no&v=YnGbp_ml9sI";

	var player;
	

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
			if((timeStamp > start) && (timeStamp < (start + duration)))
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

	function clearHighlighting(timestampId)
	{
		$("#"+timestampId).css('background-color', '');
	}

	function highlight(timestampId)
	{
		$("#"+timestampId).css('background-color', 'yellow');
	}

	function highlightCurrentCaptionIndex()
	{
		var previousTimestampId = getTimeIdFromTimestampIndex(previousCaptionIndex);
		clearHighlighting(previousTimestampId);

		var timestampId = getTimeIdFromTimestampIndex(currentCaptionIndex);
		highlight(timestampId);
	}

	//This function highlights the next caption in the list and
	//sets a timeout for the next one after that.
	function highlightCaptionAndPrepareForNext()
	{
		highlightCurrentCaptionIndex();
		console.log("highlightCaptionAndPrepareForNext currentCaptionIndex:"+currentCaptionIndex);

		var startTime = Number(getStartTimeFromCaption(currentCaptionIndex));
		var duration = Number(getDurationFromCaption(currentCaptionIndex));

		previousCaptionIndex = currentCaptionIndex;
		currentCaptionIndex++;

		var currentTime = player.getCurrentTime();
		var timeoutValue = startTime - currentTime + duration;

		console.log("startTime:" + startTime + " Current time:" + currentTime + " Duration:" + duration + " Timeoutvalue:" + timeoutValue);
		captionTimeout = setTimeout(function() {
			highlightCaptionAndPrepareForNext();
		}, timeoutValue*1000)
	}

	//This function highlights the current caption if any 
	//and sets a timeout for the next one after that.
	function highlightCaptionFromTimestamp(timeStamp)
	{
		console.log("highlightCaptionFromTimestamp timeStamp:" + timeStamp);
		currentCaptionIndex = findCaptionIndexFromTimestamp(timeStamp);
		var startTime = Number(getStartTimeFromCaption(currentCaptionIndex));
		var duration = Number(getDurationFromCaption(currentCaptionIndex));
		console.log("Starttime: " + startTime + " Duration: " + duration);

		var timeoutValue = startTime - timeStamp;

		//Should the caption be displayed now?
		if(timeStamp >= startTime)
		{
			highlightCurrentCaptionIndex();
	
			timeoutValue += duration;
		}
		console.log("timeoutValue:" + timeoutValue);

		captionTimeout = setTimeout(function() {
			highlightCaptionAndPrepareForNext();
		}, timeoutValue*1000)
	}   

	function getStartTimeFromCaption(i)
	{
		return captions[i].getAttribute('start');
	}
	function getDurationFromCaption(i)
	{
		return captions[i].getAttribute('dur');
	}

	function transcriptLoaded (transcript, transcriptId) {
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

		$("#"+ transcriptId).html(srt_output);
		captionsLoaded = true;

	}

	function getTranscript(href, callback)
	{
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
	$(function() {
		$(document).on('click', '.btnSeek', function() {
			console.log("=============");
			clearTimeout(captionTimeout);
			var seekToTime = $(this).data('seek');
			console.log("Seekto: " + seekToTime);
			player.seekTo(seekToTime, true);
		});
	});

	return {
		addTranscriptToYoutubeVideos : function()
		{
			getTranscript(href, function(transcript) {
				transcriptLoaded (transcript, "videoTranscript");
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
			player = new YT.Player('player', {
			  height: '390',
			  width: '640',
			  videoId: 'YnGbp_ml9sI',
			  events: {
				'onReady': onPlayerReady,
				'onStateChange': onPlayerStateChange
			  }
			});
		},
		init : function ()
		{
			this.addTranscriptToYoutubeVideos();
			mmooc.util.mmoocLoadScript("https://www.youtube.com/iframe_api");		
		}		
	}
}();
//    This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
function onYouTubeIframeAPIReady() {
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
