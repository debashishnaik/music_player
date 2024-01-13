const music = document.querySelector('audio');
const img = document.querySelector('img');
const play = document.getElementById('play');
const artist = document.getElementById('artist');
const title = document.getElementById('title');
const prev = document.getElementById('prev');
const next = document.getElementById('next');

let progress = document.getElementById('progress');

let total_duration = document.getElementById('duration');
let current_time = document.getElementById('current_time');

const progress_div = document.getElementById('progress_div');


const songs = [
    {
        name: 'song1',
        title: 'NITI KHAIR MAGNDA',
        artist: 'Atif Aslam',
    },
    {
        name: 'song2',
        title: 'PAL',
        artist: 'Arijit Singh',
    },
    {
        name: 'song3',
        title: 'PANIYO SA',
        artist: 'Jabin Natuarnal',
    },
];

play.addEventListener('click', () => {
    music.play();
    play.classList.replace('fa-play', 'fa-pause')
    img.classList.add('anime')
});
let isPlaying = false;
// for play function
const playMusic = () => {
    isPlaying = true;
    music.play();
    play.classList.replace('fa-play', 'fa-pause')
    img.classList.add('anime')
};
// for pause music
const pauseMusic = () => {
    isPlaying = false;
    music.pause();
    play.classList.replace('fa-pause', 'fa-play');
    img.classList.remove('anime')
};

play.addEventListener('click', () => {
    // if (isPlaying) {
    //     pauseMusic();
    // }
    // else {
    //     playMusic();
    // }
    isPlaying ? pauseMusic() : playMusic();
});

// chnaging the music adta
const loadSong = (songs) => {
    title.textContent = songs.title;
    artist.textContent = songs.artist;
    music.src = `${songs.name}.mp3`;
    img.src = `${songs.name}.png`;
};
songIndex = 0;
// loadSong(songs[2]);

const nextSong = () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();
};
const prevSong = () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();
};

// work with progresss bar

music.addEventListener('timeupdate', (event) => {
    // console.log(event);
    const { currentTime, duration } = event.srcElement;
    // console.log(currentTime);
    // console.log(duration);

    let progress_time = (currentTime / duration) * 100;
    // console.log(progress_time);
    progress.style.width = `${progress_time}%`;

    // work with music duration upadate

    // this is used to convert minutes
    let min_duration = Math.floor(duration / 60);
    // Math.floor is used for hide the decimal value

    // this is used to convert in second
    let sec_duration = Math.floor(duration % 60);

    console.log(min_duration);
    console.log(sec_duration);

    if (sec_duration < 10) {
        sec_duration = `0${sec_duration}`;
    }

    let tot_duration = `${min_duration} : ${sec_duration}`;
    if (duration) {

        total_duration.textContent = `${tot_duration}`;
    }

    // work with current duration update

    // this used to convert in minutes
    let min_currentTime = Math.floor(currentTime / 60);

    // this is used to convert in second
    let sec_currentTime = Math.floor(currentTime % 60);

    // if condition is used for  showing 00:02 
    if (sec_currentTime < 10) {
        sec_currentTime = `0${sec_currentTime}`;
    }
    let tot_currentTime = `${min_currentTime} : ${sec_currentTime}`;

    current_time.textContent = `${tot_currentTime}`;

});

// progress onlick functionality
progress_div.addEventListener('click', (event) => {
    console.log(event);
    const { duration } = music;

    let move_progress = (event.offsetX / event.srcElement.clientWidth) * duration;
    console.log(duration)
    console.log(move_progress);

    music.currentTime = move_progress;
});

// this is used for playing the next song after a song ends
music.addEventListener('ended', nextSong);

next.addEventListener('click', nextSong);
prev.addEventListener('click', prevSong);
