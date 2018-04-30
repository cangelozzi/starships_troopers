$(document).foundation();

(() => {
  console.log("Welcome to Starship Troopers 20th Anniversary Edition");


  // TIMELINE DOM 
  function VerticalTimeline(element) {
    this.element = element;
    this.blocks = this.element.getElementsByClassName("js-cd-block");
    this.images = this.element.getElementsByClassName("js-cd-img");
    this.contents = this.element.getElementsByClassName("js-cd-content");
  };

  VerticalTimeline.prototype.showBlocks = function () {
    var self = this;
    for (var i = 0; i < this.blocks.length; i++) {
      (function (i) {
        if (self.contents[i].classList.contains("cd-is-hidden") && self.blocks[i].getBoundingClientRect().top <= window.innerHeight * self.offset) {
          // add bounce-in animation
          self.images[i].classList.add("cd-timeline__img--bounce-in");
          self.contents[i].classList.add("cd-timeline__content--bounce-in");
          self.images[i].classList.remove("cd-is-hidden");
          self.contents[i].classList.remove("cd-is-hidden");
        }
      })(i);
    }
  };
  // END TIMELINE DOM 

  // VARIABLES STACK

  const poster = document.querySelector('#poster');
  const videoControls = document.querySelector('#videoControls');
  const vidPlayer = document.querySelector('video');
  const videoTitle = document.querySelector('#videoTitle');
  const playPause = document.querySelector('.play-pause');
  const stepFWD = document.querySelector('.fwd');
  const rWnd = document.querySelector('.rewindToStart');
  const ffWd = document.querySelector('.forward');
  const clipBar = document.querySelector('#clipBar');
  const clipTiming = document.querySelector('#clipTiming');
  const muteBtn = document.querySelector('#muteBtn');
  const volumeBar = document.querySelector('#volumeBar');
  const scenesGallery = document.querySelector('#scenesGallery');
  const castGallery = document.querySelector('#castGallery');
  const scenesBtn = document.querySelector('#scenesBtn');
  const castBtn = document.querySelector('#castBtn');

  clipBar.value = 0;

  // FUNCTION STACK

  // load movie
  function loadMovie() {

    // set clip bar and volume
    clipBar.value = 0;
    volumeBar.value = 0.6;
    vidPlayer.volume = 0.6;

    poster.classList.add('hide');
    videoControls.classList.remove('invisible');
    vidPlayer.classList.remove('hide');


    vidPlayer.load();
    vidPlayer.play();

    showTime();

  }

  // show clip currentTime, Duration in m:s, move time range bar.
  function showTime() {
    // update range time location based on time
    var clipBarValue = vidPlayer.currentTime * (100 / vidPlayer.duration);
    clipBar.value = clipBarValue;
    // convert currentTime and Duration in min:sec
    var curmins = Math.floor(vidPlayer.currentTime / 60);
    var cursecs = Math.floor(vidPlayer.currentTime - curmins * 60);
    var durmins = Math.floor(vidPlayer.duration / 60);
    var dursecs = Math.floor(vidPlayer.duration - durmins * 60);
    if (cursecs < 10) {
      cursecs = "0" + cursecs;
    }
    if (dursecs < 10) {
      dursecs = "0" + dursecs;
    }
    if (curmins < 10) {
      curmins = "0" + curmins;
    }
    if (durmins < 10) {
      durmins = "0" + durmins;
    }
    // display to player
    let clipTime = curmins + ":" + cursecs;
    let clipDur = durmins + ":" + dursecs;
    clipTiming.textContent = `${clipTime} / ${clipDur}`;
  }

  // Play Puse Toggle Function
  function togglePlay() {
    var theSVG = this.firstElementChild;
    poster.classList.add('hide');
    videoControls.classList.remove('invisible');
    vidPlayer.classList.remove('hide');

    if (vidPlayer.paused) {
      theSVG.dataset.icon = "pause-circle";
      vidPlayer.play();
    } else {
      theSVG.dataset.icon = "play-circle";
      vidPlayer.pause();
    }
  }

  // Rewind to Start Function
  function rWindVid() {
    vidPlayer.currentTime = 0;
    clipBar.value = 0;
  }

  // Step Forward 10sec
  function stepforward() {
    vidPlayer.currentTime += 10;
  }

  // player time function
  function updateTime() {
    let time = vidPlayer.duration * (clipBar.value / 100);
    vidPlayer.currentTime = time;

    // update bar value matching clip time
    vidPlayer.addEventListener('timeuppdate', () => {
      // slider value
      let sliderValue = (100 / vidPlayer.duration) * vidPlayer.currentTime;
      clipBar.value = sliderValue;
    })

    // pause video when moving slider
    clipBar.addEventListener('mousedown', () => {
      vidPlayer.pause();
    })
    // play back video when mouseup after slider move
    clipBar.addEventListener('mouseup', () => {
      vidPlayer.play();
    })
  }

  // mute button with color change on it.
  function muteMe() {
    var theVolumeSVG = this.firstElementChild;
    if (vidPlayer.muted) {
      vidPlayer.muted = false;
      theVolumeSVG.dataset.icon = "volume-up";
      volumeBar.value = 0.6;
      vidPlayer.volume = 0.6;
    } else {
      vidPlayer.muted = true;
      theVolumeSVG.dataset.icon = "volume-off";
      volumeBar.value = 0;
      vidPlayer.volume = 0;
    }
  }

  // update volume with volume bar
  function changeVolume() {
    vidPlayer.volume = volumeBar.value;
  }

  // toggle Photos Gallery between Cast images and Movie Scenes Images
  function toggleGalleryScenes() {
    castGallery.classList.add('hide');
    castBtn.classList.remove('gallerySelected');
    scenesGallery.classList.remove('hide');
    castBtn.style.fontWeight = '';
    castBtn.style.color = '';
    scenesBtn.style.fontWeight = 'bold';
    scenesBtn.style.color = '#b78b4e';
  }

  // toggle Photos Gallery between Cast images and Movie Scenes Images
  function toggleGalleryCast() {
    castGallery.classList.remove('hide');
    scenesGallery.classList.add('hide');
    scenesBtn.style.fontWeight = '';
    scenesBtn.style.color = '';
    castBtn.style.fontWeight = 'bold';
    castBtn.style.color = '#b78b4e';
  }

  // EVENT LISTENER STACK
  poster.addEventListener('click', loadMovie);
  playPause.addEventListener('click', togglePlay);
  rWnd.addEventListener('click', rWindVid);
  stepFWD.addEventListener('click', stepforward);
  clipBar.addEventListener('change', updateTime);
  vidPlayer.addEventListener('timeupdate', showTime);
  muteBtn.addEventListener('click', muteMe);
  volumeBar.addEventListener('change', changeVolume);
  scenesBtn.addEventListener('click', toggleGalleryScenes);
  castBtn.addEventListener('click', toggleGalleryCast);

})();
