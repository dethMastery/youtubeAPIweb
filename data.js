import './style.css'
import axios from 'axios'
import isNode from 'detect-node'

let url = window.location.href
let spt = url.split('?')[1]
let data = spt.split('=')[1]

let api = `https://yt-heroku-detzz.herokuapp.com/api/info?url=${data}`

document.querySelector('#app').innerHTML = `
  <div class="container">
    <h1>dethz YT API on "HEROKU"</h1>
    <form action="/data.html" method="GET">
      <input type="text" name="id" placeholder="enter ur link"><br/>

      <button type="submit">
        Download
      </button>
    </form>

    <br />
    <br />

    <div class="videoControl">
      <h3></h3>
      <br/>

      <video autoplay id="player"></video>
      <br />
      
      <div class="control">
        <progress id="time" value="0" max="100"></progress> <br />

        <span id="currentTime">
          xx:xx
        </span>
        &nbsp;/&nbsp;
        <span id="duration">
          xx:xx
        </span>
        <br />
        <br />

        <div class="button">
          <button id="downTime">-5</button>
          <button id="pBT">Pause</button>
          <button id="upTime">+5</button>

          <br />
          <br />
          
          <button id="loop"></button>

          <br />
          <br />
          
          <button id="volDWN">-</button>
          <span id="vol"></span>
          <button id="volUP">+</button>
        </div>
        <br />
      </div>

      <a href="#" id="download" download target="_blank">
        <button>
          Download Link
        </button>
      </a>
    </div>
  </div>
`

function axiosCall() {
  let axi = axios.get(api)
  let summon = axi.then((rsp) => rsp.data)

  return summon
}

axiosCall().then(data => {
  document.title = data.info.title + " | dethz YT API"
  document.querySelector('h3').innerHTML = data.info.title
  document.querySelector('video').src = data.info.url
  document.querySelector('#download').href = data.info.url
  document.querySelector('#download').download = data.info.display_id + '.mp4'

  // mediaSession
  if (!isNode) {
    let title = data.info.title
    let artist = data.info.channel
    let cover = data.info.thumbnail

    if ('mediaSession' in navigator) {
			navigator.mediaSession.metadata = new MediaMetadata({
				title: `${title}`,
				artist: `${artist}`,
				album: `${title}`,
				artwork: [
					{ src: `${cover}`, sizes: '96x96', type: 'image/png' },
					{ src: `${cover}`, sizes: '128x128', type: 'image/png' },
					{ src: `${cover}`, sizes: '192x192', type: 'image/png' },
					{ src: `${cover}`, sizes: '256x256', type: 'image/png' },
					{ src: `${cover}`, sizes: '384x384', type: 'image/png' },
					{ src: `${cover}`, sizes: '512x512', type: 'image/png' },
				]
			})
		}

		navigator.mediaSession.setActionHandler('play', function() {
			pl.play()
		})
		navigator.mediaSession.setActionHandler('pause', function() {
			pl.pause()
		})
		navigator.mediaSession.setActionHandler('seekbackward', function() {
			pl.currentTime = pl.currentTime - 5;
		});
		navigator.mediaSession.setActionHandler('seekforward', function() {
			pl.currentTime = pl.currentTime + 5;
		});
  }
})

let pl = document.querySelector('#player')
let dur = document.querySelector('#time')

let cDur = document.querySelector('#currentTime')
let fDur = document.querySelector('#duration')

let pbt = document.querySelector('#pBT')
let uTime = document.querySelector('#upTime')
let dTime = document.querySelector('#downTime')

let volUP = document.querySelector('#volUP')
let vol = document.querySelector('#vol')
let volDWN = document.querySelector('#volDWN')

if(!isNode) {
  pl.ontimeupdate = function () {
    var percentage = (pl.currentTime / pl.duration) * 100
    dur.value = percentage

    var i = setInterval(function () {
      if (pl.readyState > 0) {
        var fmin = parseInt(pl.duration / 60, 10)
        var fsec = parseInt(pl.duration % 60, 10)

        if (fmin < 10) {
          fmin = "0" + fmin
        }

        if (fsec < 10) {
          fsec = "0" + fsec
        }

        fDur.innerHTML = fmin + ":" + fsec

        clearInterval(i)
      }
    }, 200)

    var n = setInterval(function () {
      if (pl.readyState > 0) {
        var cmin = parseInt(pl.currentTime / 60, 10)
        var csec = parseInt(pl.currentTime % 60, 10)

        if (cmin < 10) {
          cmin = "0" + cmin
        }

        if (csec < 10) {
          csec = "0" + csec
        }

        cDur.innerHTML = cmin + ":" + csec
        clearInterval(n)
      }
    }, 200)
  }

  pbt.addEventListener("click", ppBT)
  pl.addEventListener("playing", pCheck)
  pl.addEventListener("pause", pCheck)

  function ppBT() {
    if (pl.paused == true) {
      pl.play()
    } else if (pl.paused == false) {
      pl.pause()
    }
  }

  function pCheck() {
    if (pl.paused == true) {
      pbt.innerHTML = 'Play'
    } else if (pl.paused == false) {
      pbt.innerHTML = 'Pause'
    }
  }

  uTime.addEventListener("click", plusTime)
  dTime.addEventListener("click", delTime)

  function plusTime() {
    pl.currentTime = pl.currentTime + 5
  }

  function delTime() {
    pl.currentTime = pl.currentTime - 5
  }

  volUP.addEventListener("click", vUP)
  volDWN.addEventListener("click", vDWN)

  function vUP() {
    pl.volume = pl.volume + 0.1
    let tvol = Math.floor(pl.volume * 10)
    let cvol = parseInt(tvol)
    vol.innerHTML = "Vol : " + cvol
  }

  function vDWN() {
    pl.volume = pl.volume - 0.1
    let tvol = Math.floor(pl.volume * 10)
    let cvol = parseInt(tvol)
    vol.innerHTML = "Vol : " + cvol
  }
  
  let tvol = Math.floor(pl.volume * 10)
  let cvol = parseInt(tvol)
  vol.innerHTML = "Vol : " + cvol
}