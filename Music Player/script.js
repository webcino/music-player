const musicContainer = document.querySelector('.music-container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')


//Song titles
const songs = ['Nicki Minaj - Superbass', 'Rihanna - Stay', 'What Other People Say', 'Sia - Chandelier', 'Lorde - Supercut', 'Becky Hill - Backoff' ]

//Keep track of songs
let songIndex = 4

//Initially load song info Dom
loadsong(songs[songIndex])

//update song details
function loadsong(song){
    title.innerHTML = song
    audio.src = `./music/music/${song}.mp3`
    cover.src = `./music/${song}.jpg`
}

function playSong(){
musicContainer.classList.add('play')
playBtn.querySelector('i.fa').classList.remove('fa-play')
playBtn.querySelector('i.fa').classList.add('fa-pause')

audio.play()
}
function pauseSong(){
musicContainer.classList.remove('play')
playBtn.querySelector('i.fa').classList.add('fa-play')
playBtn.querySelector('i.fa').classList.remove('fa-pause')

audio.pause()
}

function prevSong(){
songIndex--

if(songIndex < 0){
    songIndex = songs.length - 1
}
loadsong(songs[songIndex])

playSong()
}

function nextSong(){
    songIndex++

    if(songIndex > songs.length - 1){
        songIndex = 0
    }
    loadsong(songs[songIndex])

    playSong()
}

function updateProgress(e){
   const {duration, currentTime} = e.srcElement
   const progressPrecent = (currentTime / duration) *100
   progress.style.width = `${progressPrecent}%`
}

function setProgress(e){
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
}

//EventListeners
playBtn.addEventListener('click',() => {
    const isPlaying = musicContainer.classList.contains('play')

    if(isPlaying){
        pauseSong()
    }else{
        playSong()
    }
})

//change songs
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

audio.addEventListener('timeupdate', updateProgress)

progressContainer.addEventListener('click', setProgress)