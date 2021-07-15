const app = {
    isCheck: null,
    isCurrentTime: 0,
    songs: [
        {
            id: 1,
            name: "JayKii",
            song: "Chiều Hôm Ấy",
            path: "./css/mp4/ChieuHomAy-JayKii-5076088.mp3",
            image: "./css/img/chieu-hom-ay.jpg"
        },
        {
            id: 2,
            name: "Quang Đăng Trần",
            song: "Trò Đùa",
            path: "./css/mp4/TroDua-ChauKhaiPhongQuangDangTran-6261205.mp3",
            image: "./css/img/tro-dua.jpg"
        },
        {
            id: 3,
            name: "Duong, W/n, Nâu",
            song: "3107",
            path: "./css/mp4/3107.mp3",
            image: "./css/img/3107.jpg"
        },
        {
            id: 4,
            name: "Hoàng Dũng",
            song: "Nàng Thơ",
            path: "./css/mp4/NangTho-HoangDung-6413381.mp3",
            image: "./css/img/nang-tho.jpg"
        },
        {
            id: 5,
            name: "Bozitt",
            song: "Những Gì Anh Nói",
            path: "./css/mp4/NhungGiAnhNoiLofiVersion-BozittBozitt-6986121.mp3",
            image: "./css/img/nhung-gi-anh-noi.jpg"
        },
        {
            id: 6,
            name: "Bozitt",
            song: "Nợ Ai Đó Lời Xin Lỗi",
            path: "./css/mp4/NoAiDoLoiXinLoi-Bozitt-6424600.mp3",
            image: "./css/img/no-ai-do-loi-xin-loi.jpg"
        }
    ],
    getElement: function (id) {
        return document.getElementById(id);
    },
    render: function () {
        let list = '';
        this.songs.forEach(song => {
            list += `
                <div class="playlist__item" id="${song.id}">
                    <figure>
                        <img src="${song.image}" alt="">
                    </figure>
                    <div class="playlist__item--title">
                        <h4 class="author">${song.name}</h4>
                        <h5 class="song-name">${song.song}</h5>
                    </div>
                    <div class="playlist__item--icon">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `;
        });
        this.getElement('playlist').innerHTML = list;
    },
    chooseSong: function (id = 1) {
        let index = this.songs.findIndex(item => item.id == id);
        let song = this.songs[index];
        this.getElement('header__song').innerHTML = song.song;
        this.getElement('header__image').src = song.image;
        this.getElement('audio').innerHTML = `<source src="${song.path}" type="audio/mpeg">`;
        this.getElement('icon-play').setAttribute('active', id);
        this.getElement('icon-pause').setAttribute('active', id);
        this.isCheck = id;
        let listChild = this.getElement('playlist').children;
        for (let i = 0; i < listChild.length; i++) {
            listChild[i].classList.remove('active');
        }
        this.getElement(id).classList.add('active');
    },
    clickSongs: function () {
        let list = this.getElement('playlist');
        list.addEventListener('click', function (e) {
            let play = document.getElementById('icon-play');
            let pause = document.getElementById('icon-pause');
            let audio = document.getElementById('audio');
            let listChild = this.children;
            let id;
            for (let i = 0; i < listChild.length; i++) {
                if (listChild[i].contains(e.target)) {
                    id = listChild[i].id;
                    listChild[i].classList.add('active');
                } else {
                    listChild[i].classList.remove('active');
                }
            }
            app.chooseSong(id);
            play.style.display = "block";
            play.removeAttribute('ischecked');
            pause.style.display = "none";
            pause.removeAttribute('ischecked');
            audio.autoplay = false;
            audio.load();
            app.playSong();
        });
    },
    playSong: function () {
        let isBool = this.isCheck;
        let audio = document.getElementById('audio');
        let input = document.getElementById('progress');
        document.getElementById('icon-play').addEventListener('click', function (e) {
            let pause = document.getElementById('icon-pause');
            let value = input.getAttribute('isChange');
            audio.autoplay = true;
            if (this.getAttribute('active') == isBool) {
                if (this.getAttribute('isChecked') === null) {
                    this.setAttribute('isChecked', true);
                    pause.setAttribute('isChecked', true);
                    this.style.display = "none";
                    pause.style.display = "block";
                    if (parseFloat(value) > 0) {
                        audio.currentTime = parseFloat(value);
                        audio.play();
                        input.removeAttribute('isChange');
                    } else {
                        audio.load();
                    }
                } else if (this.getAttribute('isChecked') === "true" && pause.getAttribute('isChecked') === "false") {
                    this.setAttribute('isChecked', false);
                    pause.setAttribute('isChecked', true);
                    this.style.display = "none";
                    pause.style.display = "block";
                    if (parseFloat(value) > 0) {
                        audio.currentTime = parseFloat(value);
                        audio.play();
                        input.removeAttribute('isChange');
                    } else {
                        audio.load();
                    }
                } else {
                    this.setAttribute('isChecked', true);
                    pause.setAttribute('isChecked', false);
                    this.style.display = "none";
                    pause.style.display = "block";
                }
            }
        });
        document.getElementById('icon-pause').addEventListener('click', function (e) {
            let play = document.getElementById('icon-play');
            if (this.getAttribute('active') == isBool) {
                if (this.getAttribute('isChecked') === 'true' && play.getAttribute('isChecked') === 'true') {
                    this.setAttribute('isChecked', false);
                    play.setAttribute('isChecked', true);
                    this.style.display = "none";
                    play.style.display = "block";
                    audio.pause();
                } else if (play.getAttribute('isChecked') === 'true' && this.getAttribute('isChecked') === 'false') {
                    this.setAttribute('isChecked', true);
                    play.setAttribute('isChecked', false);
                    this.style.display = "none";
                    play.style.display = "block";
                    audio.pause();
                } else {
                    this.setAttribute('isChecked', false);
                    play.setAttribute('isChecked', true);
                    this.style.display = "none";
                    play.style.display = "block";
                    audio.pause();
                }
            }
        });
        this.inputChange();
    },
    inputChange: function () {
        document.getElementById('audio').addEventListener("timeupdate", function (e) {
            let input = document.getElementById('progress');
            let repeat = document.getElementById('repeat-song');
            let random = document.getElementById('random-song');
            input.value = this.currentTime;
            if (this.currentTime === this.duration) {
                if (repeat.getAttribute('isRepeat') === "true") {
                    this.autoplay = true;
                    this.load();
                } else if (random.getAttribute('isRandom') === "true") {
                    let random = Math.floor(Math.random() * app.songs.length) + 1;
                    console.log(random);
                    app.chooseSong(random);
                    audio.autoplay = true;
                    audio.load();
                    app.playSong();
                } else {
                    document.getElementById('icon-play').style.display = "block";
                    document.getElementById('icon-pause').style.display = "none";
                    input.value = 0;
                }
            }
        });
    },
    nextSong: function () {
        let play = document.getElementById('icon-play');
        let pause = document.getElementById('icon-pause');
        let audio = document.getElementById('audio');
        if (this.getElement('next-song').getAttribute('next-song') === null) {
            this.getElement('next-song').setAttribute('next', this.isCheck);
        }
        this.getElement('next-song').addEventListener('click', function (e) {
            let dem = document.getElementById('next-song').getAttribute('next');
            dem++;
            if (dem > app.songs.length) { dem = 1; }
            this.setAttribute('next', dem);
            app.chooseSong(dem);
            play.style.display = "block";
            play.removeAttribute('ischecked');
            pause.style.display = "none";
            pause.removeAttribute('ischecked');
            audio.autoplay = false;
            audio.load();
            app.playSong();
        });
    },
    preSong: function () {
        let play = document.getElementById('icon-play');
        let pause = document.getElementById('icon-pause');
        let audio = document.getElementById('audio');
        this.getElement('pre-song').addEventListener('click', function (e) {
            let id = document.getElementById('next-song').getAttribute('next');
            id--;
            if (id < 1) { id = app.songs.length; }
            document.getElementById('next-song').setAttribute('next', id);
            app.chooseSong(id);
            play.style.display = "block";
            play.removeAttribute('ischecked');
            pause.style.display = "none";
            pause.removeAttribute('ischecked');
            audio.autoplay = false;
            audio.load();
            app.playSong();
        });
    },
    random: function () {
        this.getElement('random-song').addEventListener('click', function (e) {
            if (this.getAttribute('isRandom') === null) {
                this.setAttribute('isRandom', true);
                this.style.color = "#EC1F55";
            } else {
                this.removeAttribute('isRandom');
                this.style.color = "#d3d3d3";
            }
        });
    },
    repeatSong: function () {
        this.getElement('repeat-song').addEventListener('click', function (e) {
            if (this.getAttribute('isRepeat') === null) {
                this.setAttribute('isRepeat', true);
                this.style.color = "#EC1F55";
            } else {
                this.removeAttribute('isRepeat');
                this.style.color = "#d3d3d3";
            }
        });
    },
    changeValue: function () {
        let input = this.getElement('progress');
        let audio = this.getElement('audio');
        input.addEventListener('change', function (e) {
            if (this.getAttribute('isChange') === null) {
                this.max = audio.duration;
                this.setAttribute('isChange', this.value);
            }
        });
    },
    run: function () {
        this.render();
        this.chooseSong();
        this.clickSongs();
        this.nextSong();
        this.preSong();
        this.repeatSong();
        this.changeValue();
        this.random();
        this.playSong();
    }
}

app.run();