const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')

const app = express()

app.use(bodyParser.urlencoded({extended: false}))

app.get('/login', (req, res, next) => {
    res.send(
        `<h3>Enter your username</h3></br>
        <form onsubmit='localStorage.setItem("username", document.getElementById("username").value)' action='/' method='GET'>
            <input id='username' type='text' name='username'></br>
            <button type='submit'>Login</button>
        </form>`
    )
})

app.get('/', (req, res, next) => {
    fs.readFile('messages.txt', (err, data) => {
        if(err) {
            console.log(err)
            data = '<h3>No Chat Exists</h3>'
        }
        res.send(`${data}<form action='/' method='POST' onsubmit='document.getElementById("username").value=localStorage.getItem("username")'>
            <input type='text' name='message'></br>
            <input type='hidden' name='username' id='username'>
            <button type='submit'>Send</button>
        </form>`)
    })
})

app.post('/', (req, res, next) => {
    console.log("data is: ", req.body)
    fs.writeFile('messages.txt', `${req.body.username} : ${req.body.message}`, {flag : 'a'}, (err) => {
        if(err) {
            console.log(err)
        }
        else {
            res.redirect('/')
        }
    })
})

app.use((req, res, next) => {
    res.status(404).send("<h1>Page Not Found!</h1>")
})

app.listen(3000)