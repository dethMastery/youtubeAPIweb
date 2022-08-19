import './style.css'
import axios from 'axios'

document.querySelector('#app').innerHTML = `
  <div class="container">
    <h1>dethz YT API on "HEROKU"</h1>
    <form action="/data.html" method="GET">
      <input type="text" name="id" placeholder="enter ur link"><br/>

      <button type="submit">
        Download
      </button>
    </form>
  </div>
`
