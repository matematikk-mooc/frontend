import "../../vue/design/reveal.scss";
import "../../vue/design/vimeo-transcript.scss";

import Player from '@vimeo/player'
import multilanguage from '../../vue/utils/previous-lang-utils.js'

//https://webapps.stackexchange.com/questions/85517/how-can-i-download-subtitles-for-a-vimeo-video
export default (function() {
	var hrefPrefix = KPASAPIURL + "/vimeo/";
	var transcriptContainer = {};
	var initialized = false;
    var noOfVimeoVideos = 0;

    var noOfInits = 0;
	class Transcript {

		constructor(vimeoIframeId, vimeoVideoId) {

			var playbackRate = 1.0;
			var transcriptId = "transcript" + vimeoIframeId;
			var transcriptLoadingId = transcriptId + "loading";
			var transcriptParentId = transcriptId + "parent";
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

			this.initializePlayer = function () {
				var transcript = this;
				var iframe = document.getElementById(iframeId);
				player = new Player(iframe)

				//Auto enables caption for Vimeo player to bokmal by default, unless user has customized option set already.
				//If bokmal is not avaiable then select the first track that is avaiable.
				player.getTextTracks()
					.then(function(tracks) {
						var tracksHasLength = tracks.length > 0;
						if (tracksHasLength) {
							var userHasAlreadySelected = false;
							var hasBokmal = false;

							for (var trackIndex in tracks) {
								var trackItem = tracks[trackIndex];

								var isSelected = trackItem.mode == "showing";
								if (isSelected) {
									userHasAlreadySelected = true;
									break;
								}

								var isBokmal = trackItem.language == "nb";
								if (isBokmal) {
									hasBokmal = true;
								}
							}

							if (!userHasAlreadySelected) {	
								var trackToUse = hasBokmal ? "nb" : tracks[0].language;
								player.enableTextTrack(trackToUse)
									.then(function (track) {})
									.catch(function (err) {
										console.error(err);
									});
							}
						}
					});

					player.on('play', function () {
						transcript.playerPlaying();
					});
					player.on('pause', function () {
						transcript.playerNotPlaying();
					});
					player.getVideoTitle().then(function (title) {
					});
					player.on('cuechange', function (d) {
					});
					player.on('cuepoint', function (d) {
					});
					player.on('texttrackchange', function (d) {
					});
					player.on('playbackratechange', function (d) {
						transcript.setPlaybackRate(d.playbackRate);
					});

				};
			var findCaptionIndexFromTimestamp = function (timeStamp) {
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

			var clearCurrentHighlighting = function () {
				var timeStampId = getTimeIdFromTimestampIndex(currentCaptionIndex);
				$("#" + timeStampId).removeClass("vimeoCaptionActive");
			};

			var highlightNextCaption = function () {
				var timestampId = getTimeIdFromTimestampIndex(nextCaptionIndex);
				$("#" + timestampId).addClass("vimeoCaptionActive");
				var target = document.getElementById(timestampId);
				var targetParent = document.getElementById(transcriptContentId);

				targetParent.scrollTop = target.offsetTop - (targetParent.offsetTop + targetParent.offsetHeight / 2);

			};
			//Calculate timeout for when next subtitle should be displayed
			var calculateTimeout = function (currentTime) {
				var startTimeCurrentCaption = Number(getStartTimeFromCaption(currentCaptionIndex));
				var startTimeNextCaption = Number(getStartTimeFromCaption(nextCaptionIndex));
				var durationCurrentCaption = Number(getDurationFromCaption(currentCaptionIndex));
				var timeoutValue = 0;

				//The normal case
				if (startTimeNextCaption >= currentTime) {
					timeoutValue = startTimeNextCaption - currentTime;
				}
				return timeoutValue;
			};

			this.setCaptionTimeout = function (timeoutValue) {
				if (timeoutValue < 0) {
					return;
				}

				clearTimeout(captionTimeout);

				var transcript = this;
				var adjustedTimeoutValue = timeoutValue / transcript.getPlaybackRate();

				captionTimeout = setTimeout(function () {
					transcript.highlightCaptionAndPrepareForNext();
				}, adjustedTimeoutValue * 1000);
			};

			var getStartTimeFromCaption = function (i) {
				if (i >= captions.length) {
					return -1;
				}
				return captions[i].getAttribute('start');
			};
			var getDurationFromCaption = function (i) {
				if (i >= captions.length) {
					return -1;
				}
				return captions[i].getAttribute('dur');
			};
			var getTimeIdFromTimestampIndex = function (i) {
				var strTimestamp = "_" + i;
				return "t" + transcriptContentId + strTimestamp;
			};


			//////////////////
			//Public functions
			/////////////////
			//This function highlights the next caption in the list and
			//sets a timeout for the next one after that.
			//It must be public as it is called from a timer.
			this.highlightCaptionAndPrepareForNext = function () {
				clearCurrentHighlighting();
				highlightNextCaption();
				currentCaptionIndex = nextCaptionIndex;
				nextCaptionIndex++;

				var transcript = this;

				player.getCurrentTime().then(function (currentTime) {
					var timeoutValue = calculateTimeout(currentTime);
					if (nextCaptionIndex < captions.length) {
						transcript.setCaptionTimeout(timeoutValue);
					}
				}).catch(function (error) {
					console.log("highlightCaptionAndPrepareForNext:Could not get current time from vimeo in player playing:" + error);
				});;
			};
			this.setCurrentTime = function (seekToTime) {
				player.setCurrentTime(seekToTime).then(function (seconds) {
				}).catch(function (error) {
					switch (error.name) {
						case 'RangeError':
							console.log("The time is less than 0 or greater than the video's duration.");
							break;

						default:
							console.log("Some other error occurred.");
							break;
					}
				});
			};

			this.play = function () {
				var transcript = this;
				player.getPaused().then(function (paused) {
					if (!paused) {
						transcript.playerPlaying();
					} else {
						player.play().then(function () {
						}).catch(function (error) {
							switch (error.name) {
								case 'PasswordError':
									console.log("The video is password protected.");
									break;

								case 'PrivacyError':
									// The video is private
									console.log("The video is private.");
									break;

								default:
									console.log("Some error occured.");

									break;
							}
						});
					}
				});
			};

			this.highlightCaptionFromTimestamp = function (timeStamp) {
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
			this.removeLeadingAndTrailingDash = function (s) {
				if (s[0] == "-") {
					s = s.slice(1, s.length);
				}
				s = s.replace(/ +$/, '');
				if (s[s.length - 1] == "-") {
					s = s.slice(0, -1);
				}
				s += " ";
				return s;
			};
			this.updateTranscriptText = function (p, languageCode) {
				captions = captionsArr[languageCode];
				var srt_output = '<p>';
				var noOfSentencesInParagraph = 0;
				var captionText = "";
				for (var i = 0, il = captions.length; i < il; i++) {
					var start = Number(getStartTimeFromCaption(i));

					captionText = captions[i].textContent.replace(/</g, '&lt;').replace(/>/g, '&gt;');
					captionText = this.removeLeadingAndTrailingDash(captionText);
					var timestampId = getTimeIdFromTimestampIndex(i);
					srt_output += "<span role='button' tabindex=0 aria-hidden=false class='btnVimeoSeek' data-seek='" + start + "' id='" + timestampId + "'>" + captionText + "</span> ";
					noOfSentencesInParagraph++;
					if ((noOfSentencesInParagraph > 10) && captionText.includes(".")) {
						srt_output += "</p><p>";
						noOfSentencesInParagraph = 0;
					}
				};
				srt_output += "</p>";

				p.innerHTML = srt_output;
			};
			this.displayErrorMessage = function (oTranscriptArea, msg) {
				oTranscriptArea.transcriptContentArea.innerHTML = "<p>" + msg + "</p>";
				oTranscriptArea.transcriptContentArea.id = oTranscriptArea.transcriptContentArea.id + "-select";

			};
			this.createTranscriptArea = function () {
				const expandMore = SERVER + 'vector_images/expand_more.svg';
				const expandLess = SERVER + 'vector_images/expand_less.svg';

				var b = document.createElement('a');
				b.setAttribute("class", "custom-reveal-button");
				b.setAttribute("id", transcriptButtonId);
				b.setAttribute("href", "#" + transcriptContentId);
				b.innerHTML = "Videotranskripsjon";
				let buttonArrow = document.createElement('img');
				buttonArrow.setAttribute("class", "custom-reveal-button-img");
				buttonArrow.setAttribute("src", expandMore);
				b.appendChild(buttonArrow);

				var p = document.createElement('p');
				transcriptParentDiv.appendChild(p);
				p.appendChild(b);

				var e = document.createElement('div');
				e.setAttribute("id", transcriptContentId);
				e.setAttribute("class", "transcript");
				e.setAttribute("class", "custom-reveal-content")
				e.setAttribute("tabindex", 0);
				e.setAttribute("style", "display: none;");
				transcriptParentDiv.appendChild(e);


				var transcript = this;
				document.getElementById(transcriptButtonId).addEventListener('click', function(event) {
					var button = this;
					var buttonImg = button.getElementsByTagName('img')[0];
					buttonImg.src = buttonImg.src.includes('expand_more') ? expandLess : expandMore;
					var transcriptSelect = document.getElementById(transcript.getTranscriptSelectId());
					$(transcriptSelect).fadeToggle(250);
					transcriptSelect.style.marginTop = '1rem';
					var body = document.getElementById(transcriptContentId);
					var iframe = document.getElementById(iframeId);
					var bodyDisplayStyle = getComputedStyle(body).display;

					if (bodyDisplayStyle !== 'none') {
						slideUpAndAdjustIframe(400, body, iframe);
					} else {
						slideDownAndAdjustIframe(400, body, iframe);
					}
					event.preventDefault();
				});

				function slideUpAndAdjustIframe(duration, element, iframe) {
					$(element).slideToggle(250);
				}

				function slideDownAndAdjustIframe(duration, element, iframe) {
					$(element).slideToggle(250);
				}

				return { transcriptArea: p, transcriptContentArea: e };
			};
			this.createLanguageMenu = function (oTranscriptArea, selectedLanguage) {
				var e = document.createElement('span');
				oTranscriptArea.transcriptArea.appendChild(e);
				var transcript = this;
				player.getTextTracks().then(function (tracks) {
					var transcriptSelectId = transcript.getTranscriptSelectId();
					var s = document.createElement('select');
					e.appendChild(s);
					s.setAttribute("id", transcriptSelectId);
					s.setAttribute("class", "custom-reveal-button");
					s.setAttribute("style", "display: none;");
					s.setAttribute("aria-label", "Velg språk");

					tracks.forEach(track => {
  						const option = `
    						<option value="${track.language}"
      							${track.language === selectedLanguage ? 'selected' : ''}
    						>${track.label}</option>`;
							document.getElementById(transcriptSelectId).insertAdjacentHTML('beforeend', option);
					});
					function show() {
						transcript.updateTranscriptText(oTranscriptArea.transcriptContentArea, s.value);
					}
					s.onchange = show;
				});
			};
			this.autoPositionTranscriptParent = function () {
				var iframe = document.getElementById(iframeId);

				var nextElementSibling = iframe.nextElementSibling;
				var insertAfterSibling = iframe;

				var iframeParent = iframe.parentElement;
				var iframeParentStyle = iframeParent.getAttribute("style");
				//Responsive vimeo videos has a parent element with a style that contains this:
				if (iframeParentStyle && (iframeParentStyle.indexOf("56.25%") > 0)) {
					insertAfterSibling = iframeParent;
					nextElementSibling = iframeParent.nextElementSibling;
				}

				//If there is an element after the iframe, we insert the transcript before that one.
				if (nextElementSibling) {
					//Some vimeo videos has a link to the video. In that case we put the transcript
					//below the link.
					var firstElementChild = nextElementSibling.firstElementChild;
					if (firstElementChild) {
						var href = firstElementChild.getAttribute("href");
						if (href) {
							var siblingVideoId = self.getVimeoVideoIdFromUrl(href);
							if (siblingVideoId == videoId) {
								insertAfterSibling = nextElementSibling;
							}
						}
					}
					insertAfterSibling.parentNode.insertBefore(transcriptParentDiv, insertAfterSibling.nextSibling);
				} //If the iframe is the last element on the page, we add the transcript at the bottom.
				else {
					insertAfterSibling.parentElement.appendChild(transcriptParentDiv);
				}
			};
			this.insertTranscriptParent = function () {
				transcriptParentDiv = document.createElement('div');
				transcriptParentDiv.setAttribute("class", "custom-reveal-wrapper");
				transcriptParentDiv.setAttribute("id", transcriptParentId);
				transcriptParentDiv.style.height = "fit-content";

				this.autoPositionTranscriptParent();
			};
			this.transcriptLoaded = function (transcriptXml) {
				var transcript = this;

				var oTranscriptArea = transcript.createTranscriptArea();

				var error = transcriptXml.getElementsByTagName('error');
				if (error.length) {
					var errorMessage = error[0];
					transcript.displayErrorMessage(oTranscriptArea, errorMessage.textContent);
				} else {
					transcript.initializePlayer();

					var preferredLanguage = multilanguage.getPreferredLanguage();

					var languages = transcriptXml.getElementsByTagName('language');
					var selectedLanguageCode = "";
					var nbLanguageAvailable = false;
					for (var languageNo = 0, languageTotal = languages.length; languageNo < languageTotal; languageNo++) {
						var language = languages[languageNo];
						var languageCode = language.getAttribute("lang");
						if (languageCode == "nb") {
							nbLanguageAvailable = true;
						}
						if (languageCode == preferredLanguage) {
							selectedLanguageCode = languageCode;
						}
						if (selectedLanguageCode == "") {
							selectedLanguageCode = languageCode; //Default to first language available.
						}
						captionsArr[languageCode] = language.getElementsByTagName('text');
					}
					if (selectedLanguageCode == "" && nbLanguageAvailable) {
						selectedLanguageCode = "nb";
					}
					captionsLoaded = true;
					transcript.createLanguageMenu(oTranscriptArea, selectedLanguageCode);
					transcript.updateTranscriptText(oTranscriptArea.transcriptContentArea, selectedLanguageCode);
					player.getPaused().then(function (paused) {
						if (!paused) {
							transcript.playerPlaying();
						}
					});
				}
			};

			this.getTranscriptId = function () {
				return transcriptId;
			};
			this.getTranscriptParentId = function () {
				return transcriptParentDiv;
			};
			this.getTranscriptContentId = function () {
				return transcriptContentId;
			};
			this.getTranscriptSelectId = function () {
				return transcriptContentId + "-select";
			};
			this.getIFrameId = function () {
				return iframeId;
			};
			this.getVideoId = function () {
				return videoId;
			};
			this.getPlaybackRate = function () {
				return playbackRate;
			};
			this.setPlaybackRate = function (newPlaybackRate) {
				playbackRate = newPlaybackRate;
			};
			this.getPlayer = function () {
				return player;
			};
			this.setPlayer = function (player){
				this.player = player
			}

			this.getTranscript = function () {
				var oTranscript = this;
				$.ajax({
					url: href,
					type: 'GET',
					data: {},
					success: function (response) {
						oTranscript.transcriptLoaded(response);
					},
					error: function (XMLHttpRequest, textStatus, errorThrown) {
						console.log("Error during GET");
					}
				});
			};

			this.playerPlaying = function () {
				if (!captionsLoaded) {
					console.log("Captions not loaded.");
					return;
				}

				var player = this.getPlayer();
				var transcript = this;
				player.getCurrentTime().then(function (currentTime) {
					transcript.highlightCaptionFromTimestamp(currentTime);
				}).catch(function (error) {
					console.log("Could not get current time from vimeo in player playing:" + error);
				});
			};
			this.playerNotPlaying = function (transcript) {
				if (!captionsLoaded) {
					return;
				}
				clearTimeout(captionTimeout);
			};
		}
	}

	function getTranscriptFromTranscriptId(transcriptId)
	{
		for (const transcript in transcriptContainer) {
			var transcriptCandidateId = transcriptContainer[transcript].getTranscriptContentId();
			if(transcriptCandidateId == transcriptId) {
				return transcriptContainer[transcript];
			}
		}
		return null;
	}
	//Called when user clicks somewhere in the transcript.
	$(function() {
		$(document).on('click keypress', '.btnVimeoSeek', function() {

			var seekToTime = $(this).data('seek');
			var transcript = getTranscriptFromTranscriptId($(this).parent().parent().attr("id"));

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
                return;
            }

			if(!initialized)
			{
				initialized = true;
				var iframes = document.getElementsByTagName('iframe');
				for (var i = 0; i < iframes.length; i++) {
					var iframe = iframes[i];
					var vimeoId = this.getVimeoVideoIdFromUrl(iframe.src);
					if(vimeoId != "") {
						var vimeoIframeId = this.getUniqueIframeId(vimeoId);
						iframe.setAttribute("id", vimeoIframeId);
						iframe.setAttribute("title", "Videoplayer");

						noOfVimeoVideos++;
						var oTranscript = new Transcript(vimeoIframeId, vimeoId);
						oTranscript.insertTranscriptParent();
						transcriptContainer[vimeoIframeId]= oTranscript;
						oTranscript.getTranscript();
					}
				}
			} else {
				for (const transcript in transcriptContainer) {
					var oTranscript = transcriptContainer[transcript];
					oTranscript.initializePlayer();
				}
			}
		}
	}
})();
