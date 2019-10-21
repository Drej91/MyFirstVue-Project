const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

let con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'vrhdrej991',
    database: 'projekat_pivo'
})

con.connect(function(err){
    if(err) throw err;
    console.log('You are connected');
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(function(req, res, next){
res.append('Access-Control-Allow-Origin', ['*']);
res.append('Access-Control-Allow-Methods', "GET, POST, PUT, PATCH, DELETE");
res.append('Access-Control-Allow-Headers', "Content-Type");
next();

});

app.post('/login', function(req, res){
    let username = req.body.username;
    let password = req.body.password;

    con.query("SELECT * FROM users WHERE us_username=? AND us_password=?",
    [username, password],
    function(err,result, field){
        if(err) throw err;
        if(result.length == 0){
            var odg = {
                result: "ERR",
                message: "Invalid credentials"
            }
            

            res.json(odg);
            return;
        }
        var user = result[0];

        var odg = {
            result: "OK",
            us_id: user.us_id,
            us_username: user.us_username,
            us_level: user.us_level
        }
        res.json(odg);
    })
});

app.post('/register', function(req, res){
   let username = req.body.username;
   let password = req.body.password;
   
   con.query("INSERT INTO users (us_username, us_password) VALUES (?,?)",
    [username, password],
    function(err, result, fields){
       if(err) throw err;
       res.json({
           result: "OK"
       })
    })
});

app.get('/brewery', function(req, res){
    con.query("SELECT * FROM brewery", function(err, result){
        if(err){
            console.log(err);
            res.json({"error": true});
        }
        else {
            var obj = {
                data: result
            }
            res.json(obj);
            
        }
    })
});

app.get('/articles', function(req, res){
    con.query("SELECT * FROM articles", function(err, result){
        if(err){
            console.log(err);
            res.json({"error": true});
        } else {
            var obj = {
                data: result
            }
            res.json(obj);
        }
    })
});

app.get('/producers', function(req, res){
    con.query("SELECT * FROM producers", function(err, result){
        if(err){
            console.log(err);
            res.json({"error": true});
        } else {
            var obj = {
                data: result
            }
            res.json(obj);
        }
    })
})

app.post('/addBeer', function(req, res){
    let name = req.body.name;
    let proName = req.body.proName;
    let sort = req.body.sort;
    let percent = req.body.percent;
    let price = req.body.price;
    let about = req.body.about;
    con.query("INSERT INTO articles (art_name, pro_name, art_sort, art_percent, art_price, art_about) VALUES (?, ?, ?, ?, ?, ?)", [name, proName, sort, percent, price, about],
    function(err, result, fields){
        if(err) throw err;
        if(err) {
            var odg = {
                result: "ERR",
                message: "Invalid credentials"
            }
            res.json(odg);
            return;
        }
        res.json({
            result: "OK"
        })

    })
})

app.get('/news', function(req, res){
    con.query("SELECT * FROM news WHERE con_type = 'story'", function(err, result){
        if(err){
            console.log(err);
            res.json({"error": true});
        } else {
            var obj = {
                data: result
            }
            res.json(obj);
        }
    })
});

app.get('/events', function(req, res){
    con.query("SELECT * FROM news WHERE con_type = 'event'", function(err, result){
         if(err){
            console.log(err);
            res.json({"error": true});
        } else {
            var obj = {
                data: result
            }
            res.json(obj);
        }
    })
});

app.post('/addNews', function(req, res){
    let header = req.body.header;
    let content = req.body.content;
    let type = req.body.type;
    con.query("INSERT INTO news (new_header, new_content, con_type) VALUES (?, ?, ?)", [header, content, type],
    function(err, result, fields){
        if(err) throw err;
        if(err) {
            var odg = {
                result: "ERR",
                message: "Invalid credentials"
            }
            res.json(odg);
            return;
        }
        res.json({
            result: "OK"
        })

    })
})

app.get('/comments', function(req, res){
     con.query("SELECT * FROM comments", function(err, result){
        if(err){
            console.log(err);
            res.json({"error": true});
        } else {
            var obj = {
                data: result
            }
            res.json(obj);
        }
    })
})

app.post('/newComment', function(req, res){
    let header = req.body.header
    let body = req.body.body
    con.query("INSERT INTO comments (com_header, com_body) VALUES (?,?)", [header, body],
    function(err, result, fields){
        if(err) throw err;
        if(err) {
            var odg = {
                result: "ERR",
                message: "Invalid credentials"
            }
            res.json(odg);
            return;
        }
        res.json({
            result: "OK"
        })

    })
})


app.listen(port, function(){
    console.log('Aplikacija radi na portu: '+port);
})