const express = require('express')
const app = express()
const port = 8000
var mysql = require('mysql2')
const bcrypt = require('bcrypt')
const cors = require('cors')


app.use(cors())

var con = mysql.createPool({
    host: "yourhosthere",
    user: "youruserhere",
    password: "yourpasswordhere",
    connectionLimit:10
})
app.use(express.json())
//app.use(express.urlencoded({extended:false}))

app.post('/users/create',async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try{
        const result = await create(username,password); 
        res.json({ out: result });
    } catch (err) {
        console.error('Error during create:', err);
        res.status(500).json({ error: 'An error occurred during the account creation process.' });
    }
})

app.post('/users/login',async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try{
        const result = await login(username, password);
        const data = {out: result};
        //console.log(data);
        res.json(data);
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ error: 'An error occurred during the login process.' });
    }
})

app.post('/api/games', async (req, res) => {
    const name = req.body.name;
    try {
        const result = await findGames(name);
        res.json({ result });
    } catch (error) {
        console.error('Error fetching games:', error);
        res.status(500).json({ error: 'An error occurred while fetching games.' });
    }
});

app.post('/api/save', async (req, res) => {
    const game = req.body.game;
    try {
        await saveGame(game);
    } catch (error) {
        console.error('Error saving game:', error);
        res.status(500).json({ error: 'An error occurred while saving game.' });
    }
})

app.listen(port,()=>console.log(`example app listening on ${port}`))

function create(user,pass) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM ttcbase.users WHERE username = ?';
        con.query(query,[user],async (err, results) => {
            if(err) {
                reject(err);
            }
            if(results.length > 0){
                resolve(false);
            }else{
                const inserq = 'INSERT INTO ttcbase.users (username, password) VALUES (?, ?)';
                con.query(inserq, [user, await bcrypt.hash(pass,8)], (err, results) => {
                    if(err) {
                        resolve(false);
                    }
                    resolve(true);
                })
            }
        })
    })
}

function login(user,pass) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM ttcbase.users WHERE username = ?'
        //console.log(user);
        con.query(query,[user], async (err, results) => {
            //console.log(results);
            if(err) {
                reject(err);
            }
            if(results.length > 0){
                const valid = await bcrypt.compare(pass,results[0].password);
                //console.log(valid)
                resolve(valid);
            } else {
                resolve(false);
            }
        })
    })
}

function findGames(user) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM ttcbase.games WHERE user = ?';
        con.query(query, [user], (err, results) => {
            if (err) {
                reject(err);
            } else if (results.length < 1) {
                resolve([]);
            } else {
                resolve(results);
            }
        });
    });
}

function saveGame(game) {
    const query = 'INSERT INTO ttcbase.games (user,num,c0,c1,c2,c3,c4,c5,c6,c7,c8,gameName,gamescol) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)'
    con.query(query,[game[0],game[1],game[2],game[3],game[4],game[5],game[6],game[7],game[8],game[9],game[10],game[11],game[12]],async (err,results) => {
        console.log(game)
        console.log(results)
        console.log(err)
        if(err){
            return err;
        }
    })
}
