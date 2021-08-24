const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const cd = $('.cd')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progess = $('#progress')
const currentProgressBar = $('#current-progress')
const btnNext = $('.btn-next')
const btnPrev = $('.btn-prev')
const btnRandom= $('.btn-random')
const repeatBtn = $(".btn-repeat")
const playlist = $(".playlist")

const app = {
    currentIndex : 0,
    isPlay : false,
    isRandom : false,
    isRepeat : false,
    songs : [
        {
            name: 'Rồi Tới Luôn Remix',
            singer: 'Nal',
            srcAudio : "https://data25.chiasenhac.com/download2/2186/2/2185729-2656a916/128/Roi%20Toi%20Luon%20Chachacha%20Wedding_%20-%20Nal.mp3",
            imageUrl: 'https://data.chiasenhac.com/data/cover/145/144327.jpg'
        },
        {
            name: 'Họ Yêu Ai Mất Rồi',
            singer: 'Doãn Hiếu',
            srcAudio : 'https://data25.chiasenhac.com/download2/2186/2/2185704-e0d7dc24/128/Ho%20Yeu%20Ai%20Mat%20Roi%20Remix%20-%20Doan%20Hieu.mp3',
            imageUrl: 'https://data.chiasenhac.com/data/cover/135/134514.jpg'
        },
        {
            name: 'Tiếng Tơ Lòng (HeineKen x HHD Remix)',
            singer: 'H-Kray; Truzg',
            srcAudio : "https://data25.chiasenhac.com/download2/2185/2/2184492-42ecf230/128/Tieng%20To%20Long%20HeineKen%20x%20HHD%20Remix_%20-%20H-.mp3",
            imageUrl: 'https://data.chiasenhac.com/data/cover/145/144029.jpg'
        },
        {
            name: 'Thê Lương',
            singer: 'Phúc Chinh',
            srcAudio : "https://data.chiasenhac.com/down2/2159/2/2158703-0506e9cf/128/The%20Luong%20Shin%20Remix_%20-%20Phuc%20Chinh.mp3",
            imageUrl: 'https://data.chiasenhac.com/data/cover/138/137205.jpg'
        },
        {
            name: 'Phận Duyên Lỡ Làng (HHD Remix)',
            singer: 'Phát Huy T4',
            srcAudio : "https://data.chiasenhac.com/down2/2166/2/2165690-3f3ca9f4/128/Phan%20Duyen%20Lo%20Lang%20HHD%20Remix_%20-%20Phat%20Huy.mp3",
            imageUrl: 'https://data.chiasenhac.com/data/cover/139/138986.jpg'
        },
        {
            name: 'Duyên Ta Chỉ Đây Thôi',
            singer: 'Phát Huy T4',
            srcAudio : "https://data25.chiasenhac.com/download2/2181/2/2180479-fae96552/128/Duyen%20Ta%20Chi%20Day%20Thoi%20-%20Phat%20Huy%20T4_%20Tru.mp3",
            imageUrl: 'https://data.chiasenhac.com/data/cover/143/142925.jpg'
        },
        {
            name: 'Kẹo Bông Gòn',
            singer: 'H2k',
            srcAudio : "https://data3.chiasenhac.com/downloads/2123/2/2122109-b9498ea8/128/Keo%20Bong%20Gon%20-%20H2k_%20TRUNKY.mp3",
            imageUrl: 'https://data.chiasenhac.com/data/cover/129/128830.jpg'
        }
    ],

    defineProperties: function(){
        //Search google
        Object.defineProperty(this, 'currentSong', {
            get: function(){
                return this.songs[this.currentIndex]
            }
        })
    },

    render: function() {
        const htmls = this.songs.map(song => {
            return `
            <div class="song">
                <div class="thumb" style="background-image: url('${song.imageUrl}')">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>`
        });
        $('.playlist').innerHTML = htmls.join('')
    },

    handleEvent: function(){
        const _this = this
        const cdWidth = cd.offsetWidth
        //Handle CD rotate
        const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
            duration: 10000, // 10 seconds
            iterations: Infinity
        });
        cdThumbAnimate.pause();

        //Handle CD Image
        document.onscroll = function(){
            const scrollTop = document.documentElement.scrollTop || window.scrollY
            console.log(scrollTop)
            let newCdWidth = cdWidth - scrollTop
            newCdWidth = newCdWidth < 0 ? 0 : newCdWidth 
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            // $('.playlist').style.marginTop = 408 - (200 - newCdWidth) + 'px'
        }

        //Handle play track event 
        playBtn.onclick = function(){
            //lo-gic handle play pause
            if(_this.isPlay){
                audio.pause()
            }else{
                audio.play()
            }
            
            //Playing
            audio.onplay = function(){
                _this.isPlay = true
                player.classList.add('playing')
                cdThumbAnimate.play()
            }
            
            //Pause
            audio.onpause = function(){
                _this.isPlay = false
                player.classList.remove('playing')
                cdThumbAnimate.pause()
            }

            //Handle seek song
            progess.onclick = function(e){
                let percentSeek = (e.offsetX / e.target.offsetWidth).toFixed(3);
                audio.currentTime = percentSeek * audio.duration
            }

            //Progess play
            audio.ontimeupdate = function(){
                if (audio.duration){
                    let progessPercent = (audio.currentTime / audio.duration * 100).toFixed(2)
                    currentProgressBar.style.width = `${progessPercent}%`
                }
            }

        }

        //Handle next
        btnNext.onclick = function(){
            if(_this.isRandom){
                _this.playRandom()
            }else{
                _this.nextSong()
            }
            audio.play()
        }

        //Handle next
        btnPrev.onclick = function(){
            if(_this.isRandom){
                _this.playRandom()
            }else{
                _this.prevSong()
            }
            audio.play()
        }

        //Handler random
        btnRandom.onclick = function(){
            _this.isRandom = !_this.isRandom
            btnRandom.classList.toggle('active', _this.isRandom)
        }
        
        //Handler auto next
        audio.onended = function(){
            _this.isRepeat ? audio.play() : btnNext.onclick()
        }

        //Handler random
        repeatBtn.onclick = function(){
            _this.isRepeat = !_this.isRepeat
            repeatBtn.classList.toggle('active', _this.isRepeat)
        }
    },

    loadCurrentSong: function(){
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.imageUrl}')`
        audio.src = this.currentSong.srcAudio;
        audio.currentTime = 0
    },

    nextSong: function(){
        this.currentIndex++
        if(this.currentIndex >= this.songs.length){
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },

    prevSong: function(){
        this.currentIndex--
        if(this.currentIndex < 0){
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },

    playRandom: function(){
        let newIndex
        do{
            newIndex = Math.floor(Math.random() * this.songs.length)
        }while(newIndex === this.currentIndex)
        this.currentIndex = newIndex
        this.loadCurrentSong()
    },

    start: function() {
        //Define properties for object
        this.defineProperties()
        //Listening and handle event (DOM Events)
        this.handleEvent()
        //Render playlist
        this.render()
        //Load infor track into UI when first start
        this.loadCurrentSong()
    }
}

app.start()
