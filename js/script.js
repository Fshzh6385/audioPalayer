let audioFiles = [
    { src: 'sounds/track1.mp3', img: 'img/img1.jpg', title: 'To Bargashti' },
    { src: 'sounds/track2.mp3', img: 'img/img2.jpg', title: 'Salam Farmandeh' },
    { src: 'sounds/track3.mp3', img: 'img/img3.jpg', title: 'Be Taha' },
    { src: 'sounds/track4.mp3', img: 'img/img4.jpg', title: 'Nadidam Shahi dar...' },
];

let audioIndex = 0;

let audioEl = document.getElementById('audio');
let audioLength = document.getElementById('audio-length');

let pauseBtn = document.querySelector('.fa-pause');
let playBtn = document.querySelector('.fa-play');

let faVolumeHigh = document.querySelector('.fa-volume-high');
let faVolumeXmark = document.querySelector('.fa-volume-xmark');

let prevBtn = document.querySelector('.fa-backward');
let nextBtn = document.querySelector('.fa-forward');
let shuffleBtn = document.querySelector('.fa-shuffle');

let faHeartRegular = document.querySelector('.fa-heart-regular');
let faHeartSolid = document.querySelector('.fa-heart-solid');

let musicCover = document.querySelector('.card-img');

function setMusicCover(index) {
    musicCover.src = audioFiles[index].img;
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
}

function setMusicTitle(index) {
    document.getElementById('music-title').innerText = audioFiles[index].title;
}

document.addEventListener('DOMContentLoaded', () => {
    audioEl.addEventListener('loadedmetadata', () => {
        audioLength.max = 100;
        audioLength.value = 0;
        setMusicTitle(audioIndex);
    });

    audioEl.addEventListener('timeupdate', () => {
        const currentTime = formatTime(audioEl.currentTime);
        const duration = formatTime(audioEl.duration);
        document.getElementById('time-start').innerText = currentTime;
        document.getElementById('time-end').innerText = duration;

        const percentage = (audioEl.currentTime / audioEl.duration) * 100;
        audioLength.value = percentage;
    });

    audioLength.addEventListener('input', function () {
        const percentage = audioLength.value;
        const seekTime = (percentage / 100) * audioEl.duration;
        audioEl.currentTime = seekTime;
    });

    playBtn.addEventListener('click', () => {
        playBtn.style.display = 'none';
        pauseBtn.style.display = 'block';

        if (audioEl.paused) {
            if (!audioEl.src || audioEl.src === '') {
                audioEl.src = audioFiles[audioIndex].src;
                setMusicCover(audioIndex);
                setMusicTitle(audioIndex);
            }
            audioEl.play();
        }
    });

    pauseBtn.addEventListener('click', () => {
        playBtn.style.display = 'block';
        pauseBtn.style.display = 'none';
        audioEl.pause();
    });

    prevBtn.addEventListener('click', () => {
        audioIndex = (audioIndex - 1 + audioFiles.length) % audioFiles.length;
        audioEl.src = audioFiles[audioIndex].src;
        setMusicCover(audioIndex);
        setMusicTitle(audioIndex);
        audioEl.play();
    });

    nextBtn.addEventListener('click', () => {
        audioIndex = (audioIndex + 1) % audioFiles.length;
        audioEl.src = audioFiles[audioIndex].src;
        setMusicCover(audioIndex);
        setMusicTitle(audioIndex);
        audioEl.play();
    });

    shuffleBtn.addEventListener('click', () => {
        shuffle(audioFiles);
        audioIndex = 0;
        audioEl.src = audioFiles[audioIndex].src;
        setMusicCover(audioIndex);
        setMusicTitle(audioIndex);
        audioEl.play();
    });

    faHeartRegular.addEventListener('click', () => {
        faHeartRegular.style.display = 'none';
        faHeartSolid.style.display = 'block';
    });

    faHeartSolid.addEventListener('click', () => {
        faHeartRegular.style.display = 'block';
        faHeartSolid.style.display = 'none';
    });

    faVolumeHigh.addEventListener('click', () => {
        faVolumeHigh.style.display = 'none';
        faVolumeXmark.style.display = 'block';
        audioEl.muted = true;
    });

    faVolumeXmark.addEventListener('click', () => {
        faVolumeHigh.style.display = 'block';
        faVolumeXmark.style.display = 'none';
        audioEl.muted = false;
    });
});

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
