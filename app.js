import { songs } from './musics.js';

let currentMusic = 0;

const music         = document.querySelector('#audio');
const seekBar       = document.querySelector('.seek-bar');
const songName      = document.querySelector('.music-name');
const artistName    = document.querySelector('.artist-name');
const albumName     = document.querySelector('.album-name');
const disk          = document.querySelector('.disk');
const currentTime   = document.querySelector('.current-time');
const musicDuration = document.querySelector('.song-duration');
const playBtn       = document.querySelector('.play-btn');
const forwardBtn    = document.querySelector('.forward-btn');
const backwardBtn   = document.querySelector('.backward-btn');

// music setup
const setMusic = (i) => {
  seekBar.value = 0;
  let song      = songs[i];
  currentMusic  = i;
  music.src     = song.path;

  songName.innerHTML          = song.name;
  artistName.innerHTML        = song.artist;
  albumName.innerHTML         = song.album;
  disk.style.backgroundImage  = `url('${song.cover}')`;

  currentTime.innerHTML = '00:00';
  setTimeout( () => {
    seekBar.max = music.duration;
    musicDuration.innerHTML = formatTime(music.duration);
  }, 500);
}

setMusic(0);

// formatting time in minutes and seconds format
const formatTime = (time) => {
  let min = Math.floor(time / 60);
  if( min < 10 ) {
    min = `0${min}`;
  }

  let sec = Math.floor(time % 60);
  if( sec < 10 ) {
    sec = `0${sec}`;
  }

  let ret = `${min}:${sec}`;

  return ret === 'NaN:NaN' ? '00:00' : ret;
}

// play pause event
playBtn.addEventListener('click', () => {
  if( music.paused ) {
    music.play();
  } else {
    music.pause();
  }
  
  playBtn.classList.toggle('pause');
  disk.classList.toggle('play');
});

// seek bar
music.addEventListener('timeupdate', (e) => {
  seekBar.value = music.currentTime;
  currentTime.innerHTML = formatTime(music.currentTime);
  
  setTimeout( () => {
    if( Math.floor(music.currentTime) === Math.floor(seekBar.max) ) {
      forwardBtn.click();
    }
  }, 600);

  let checkDur = musicDuration.innerHTML;
  if( checkDur === '00:00') {
    musicDuration.innerHTML = formatTime(music.duration);
  }
});

seekBar.addEventListener('change', () => {
  music.currentTime = seekBar.value;
});

// forward and backward playing
forwardBtn.addEventListener('click', () => {
  if( currentMusic >= songs.length - 1 ) {
    currentMusic = 0;
  } else {
    currentMusic++;
  }
  
  setMusic(currentMusic);
  playMusic();
});

backwardBtn.addEventListener('click', () => {
  if( currentMusic <= 0 ) {
    currentMusic = songs.length - 1;
  } else {
    currentMusic--
  }
  
  setMusic(currentMusic);
  playMusic();
});

// play music
const playMusic = () => {
  music.play();
  playBtn.classList.remove('pause');
  disk.classList.add('play');
}