//Initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterplay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItem = Array.from(document.getElementsByClassName('songItem'));

let songs = [
  {
    songName: "salame-e-ishq",
    filePath: "songs/1.mp3",
    coverPath: "covers/1.jpg"
  },
  {
    songName: "salame-e",
    filePath :"songs/2.mp3",
    coverPath:"covers/2.jpg"
  },

  {
    songName: "e-ishq",
    filePath :"songs/3.mp3",
    coverPath:"covers/3.jpg"
  },

  {
    songName: "salameishq",
    filePath :"songs/4.mp3",
    coverPath:"covers/4.jpg"
  },

  {
    songName: "salamehq",
    filePath :"songs/5.mp3",
    coverPath:"covers/5.jpg"
  },

  {
    songName: "salq",
    filePath :"songs/6.mp3",
    coverPath:"covers/6.jpg"
  },

  {
    songName: "saq",
    filePath :"songs/7.mp3",
    coverPath:"covers/7.jpg"
  },

  {
    songName: "e-e-ishq",
    filePath :"songs/8.mp3",
    coverPath:"covers/8.jpg"
  },

  {
    songName: "me-e-ishq",
    filePath :"songs/9.mp3",
    coverPath:"covers/9.jpg"
  },

  {
    songName: "saishq",
    filePath :"songs/10.mp3",
    coverPath:"covers/10.jpg"
  }
  // ... (other song objects)
];

// Update songItem with songName and coverPath
songItem.forEach((element, i) => {
  if (songs[i] && songs[i].coverPath) {
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
  }
  if (songs[i] && songs[i].songName) {
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
  }
});

// Handle play pause click
masterPlay.addEventListener('click', () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    gif.style.opacity = 0;
  }
});

// Listen to events
audioElement.addEventListener('timeupdate', () => {
  // Update seekbar
  let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener('input', () => {
  audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.classList.add('fa-play-circle');
    element.classList.remove('fa-pause-circle');
  });
};

// Play individual songs
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, index) => {
  element.addEventListener('click', (e) => {
    const isPlaying = !audioElement.paused && !audioElement.ended && audioElement.currentTime > 0;
    if (index < songs.length) {
      if (isPlaying && index === songIndex) {
        audioElement.pause();
        e.target.classList.remove('fa-pause-circle');
        e.target.classList.add('fa-play-circle');
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
      } else {
        makeAllPlays();
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = songs[index].filePath;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        songIndex = index;
      }
    } else {
      console.error('Song not found at index:', index);
    }
  });
});
document.getElementById('previous').addEventListener('click', () => {
    // Assuming songIndex is declared and initialized elsewhere in the code
    if (songIndex >= 9) {
      songIndex = 0;
    } else {
      songIndex += 1;
    }
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-solid', 'fa-play-circle');
    masterPlay.classList.add('fa-solid', 'fa-pause-circle');
  });
  
  
  
  
  document.getElementById('next').addEventListener('click', () => {
    // Assuming songIndex is declared and initialized elsewhere in the code
    if (songIndex <= 0) {
      songIndex = 9; // Assuming the last index is 9
    } else {
      songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-solid', 'fa-play-circle');
    masterPlay.classList.add('fa-solid', 'fa-pause-circle');
  });
  