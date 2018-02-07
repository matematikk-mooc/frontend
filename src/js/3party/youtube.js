this.mmooc=this.mmooc||{};

//https://medium.com/@pointbmusic/youtube-api-checklist-c195e9abaff1
this.mmooc.youtube = function() {
	var hrefPrefix="https://video.google.com/timedtext?name=bokm%C3%A5l&lang=no&v=";

	var playersArr = [];

	function findCaptionIndexFromTimestamp(player, timeStamp)
	{
		console.log("timeStamp:" + timeStamp);
		var start = 0;
		var duration = 0;
		for (var i = 0, il = player.captions.length; i < il; i++) {
			start = Number(getStartTimeFromCaption(player,i));
			duration = Number(getDurationFromCaption(player,i));
	
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

	function clearCurrentHighlighting(player)
	{
		var timeStampId = getTimeIdFromTimestampIndex(player.currentCaptionIndex);
		console.log("clearCurrentHighlighting " + timeStampId);
		$("#"+timeStampId).css('background-color', '');
	}

	function highlightNextCaption(player)
	{
		console.log("highlightNextCaption");
		var timestampId = getTimeIdFromTimestampIndex(player.nextCaptionIndex);
		$("#"+timestampId).css('background-color', 'yellow');
	}

	function calculateTimeout(player, currentTime)
	{
		var startTime = Number(getStartTimeFromCaption(player,player.currentCaptionIndex));
		var duration = Number(getDurationFromCaption(player,player.currentCaptionIndex));
		var timeoutValue = startTime - currentTime + duration;
		return timeoutValue;
	}

	function setCaptionTimeout(player, timeoutValue)
	{
		clearTimeout(player.captionTimeout);
		
		player.captionTimeout = setTimeout(function() {
			highlightCaptionAndPrepareForNext(player);
		}, timeoutValue*1000)
	}

	//This function highlights the next caption in the list and
	//sets a timeout for the next one after that.
	function highlightCaptionAndPrepareForNext(player)
	{
		console.log("highlightCaptionAndPrepareForNext");
		clearCurrentHighlighting(player);
		highlightNextCaption(player);
		player.currentCaptionIndex = player.nextCaptionIndex;
		player.nextCaptionIndex++;

		currentTime = player.getCurrentTime();
		var timeoutValue = calculateTimeout(player, currentTime);
		
		setCaptionTimeout(player, timeoutValue);
	}

	//Called if the user has dragged the slider to somewhere in the video.
	function highlightCaptionFromTimestamp(player, timeStamp)
	{
		console.log("highlightCaptionFromTimestamp timeStamp:" + timeStamp);
		clearCurrentHighlighting(player);
		nextCaptionIndex = findCaptionIndexFromTimestamp(player, timeStamp);
		highlightNextCaption(player);
		player.currentCaptionIndex = player.nextCaptionIndex;

		var timeoutValue = calculateTimeout(player, timeStamp);

		setCaptionTimeout(player, timeoutValue);
	}   

	function getStartTimeFromCaption(player, i)
	{
		return player.captions[i].getAttribute('start');
	}
	function getDurationFromCaption(player, i)
	{
		return player.captions[i].getAttribute('dur');
	}

	function transcriptLoaded (player, transcript, videoId) {
		var start = 0;
		var temp;
		player.captions = transcript.getElementsByTagName('text');
		var srt_output = "<div id='btnSeek' data-seek='0'>0:00</div>";

		for (var i = 0, il = player.captions.length; i < il; i++) {
			start = +getStartTimeFromCaption(player, i);

			captionText = player.captions[i].textContent.replace(/</g, '&lt;').replace(/>/g, '&gt;');
			var timestampId = getTimeIdFromTimestampIndex(i);
			srt_output += "<span class='btnSeek' data-seek='" + start + "' id='" + timestampId + "'>" + captionText + "</span> ";
		};

		$("#videoTranscript" + videoId).append(srt_output);
		player.captionsLoaded = true;

	}

	function getTranscript(player, videoId, callback)
	{
		var href = hrefPrefix + videoId;
		$.ajax({
			url: href,
			type: 'GET',
			data: {},
			success: function(response) {
				callback(player, response);
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				console.log("Error during GET");
			}
		});           
	}
	function createPlayer(videoId) { 
	   var player = new YT.Player(videoId, {
		  videoId: videoId,
		  events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		  }
	   });	
			//Array of captions in video
		player.captionsLoaded = false;

		//Timeout for next caption
		player.captionTimeout = null;

		//Keep track of which captions we are showing
		player.currentCaptionIndex = 0;
		player.nextCaptionIndex = 0;

		return player;
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
				getTranscript(newPlayer, videoId, function(player, transcript) {
					transcriptLoaded (player, transcript, videoId);
				});
			});
		},
		playerPlaying : function(player)
		{
			if(!player.captionsLoaded)
			{
				return;
			}	
			
		    currentTime = player.getCurrentTime();
		    highlightCaptionFromTimestamp(player, currentTime);
		},
		playerNotPlaying : function (player)
		{
			if(!player.captionsLoaded)
			{
				return;
			}	
			clearTimeout(player.captionTimeout);
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
		this.mmooc.youtube.playerPlaying(event.target);
	}
	else
	{
		this.mmooc.youtube.playerNotPlaying(event.target);
	}
}
