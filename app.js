const client = require('./connection.js')
const express = require('express');
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.listen(3300, () => {
    console.log("Sever is now listening at port 3300");
})

app.get('/users', (req, res) => {
    client.query(`Select * from local`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
    });
    client.end;
})

app.get('/users/:id', (req, res) => {
    client.query(`Select * from local where id=${req.params.id}`, (err, result) => {

        if (result.rows.length === 0) {
            res.json({ message: 'User Not Found' });
        } else {
            if (!err) {
                res.send(result.rows);
            }
        }
    });
    client.end;
})

app.post('/users', (req, res) => {
    const user = req.body;
    let insertQuery = `insert into local(id, firstname, lastname, location) 
                       values(${user.id}, '${user.firstname}', '${user.lastname}', '${user.location}')`

    client.query(insertQuery, (err, result) => {
        if (!err) {
            res.send('User created was successful')
        }
        else {
            res.json({ message: err.message })
        }
    })
    client.end;
})

app.put('/users/:id', (req, res) => {
    let user = req.body;
    let updateQuery = `update local
                       set firstname = '${user.firstname}',
                       lastname = '${user.lastname}',
                       location = '${user.location}'
                       where id = ${user.id}`

    client.query(updateQuery, (err, result) => {
        if (!err) {
            res.send('User Update was successful')
        }
        else { console.log(err.message) }
    })
    client.end;
})

app.delete('/users/:id', (req, res) => {
    let insertQuery = `delete from local where id=${req.params.id}`

    client.query(insertQuery, (err, result) => {
        if (result.rows.length === 0) {
            res.json({ message: "User Not Found" })
        }
        else {
            if (!err) {
                res.send('User Deletion was successful')
            }
            else { console.log(err.message) }
        }

    })
    client.end;
})

client.connect();


