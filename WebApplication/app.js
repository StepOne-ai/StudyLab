const express = require('express')
const app = express()
var fs = require('fs');
const port = 3000

app.set('view engine', 'ejs')
app.use(express.static("public"));
const urlencodedParser = express.urlencoded({extended: false});

var users = fs.readFileSync('users.txt').toString().split("\n");
var usernames = fs.readFileSync('usernames.txt').toString().split("\n");
var comments = fs.readFileSync('comments.txt').toString().split("%%%");


app.get('/', (req, res) => {
    return res.render('index', {result: {users, usernames, comments}})
})

app.post('/', urlencodedParser, (req, res) => {
    if(req.body.name == "" || req.body.username == "" || req.body.comment == ""){
        return res.render("error")
    } else {
        users.push(req.body.name)
        usernames.push(req.body.username)
        comments.push(req.body.comment)

        fs.appendFile('users.txt', "\n" + req.body.name, err => {
            if (err) {
                console.error(err);
              } else {
                // file written successfully
              }
        })
        fs.appendFile('usernames.txt', "\n" + req.body.username, err => {
            if (err) {
                console.error(err);
              } else {
                // file written successfully
              }
        })
        fs.appendFile('comments.txt', req.body.comment+" %%%", err => {
            if (err) {
                console.error(err);
              } else {
                // file written successfully
              }
        })

        return res.render('index', {result: {users, usernames, comments} })
    }
})

app.listen(port, () => {
  console.log(`App listening at port ${port}`)
})

module.exports = app;