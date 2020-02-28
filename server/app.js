const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '140431Mg',
    database : 'dojo'
});

connection.connect();

app.get('/data', function(req,res){
    const sql = 'SELECT * FROM ninja';
    connection.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.post('/data', function(req, res){
	console.log(req.body); 
    const data = {
        name:req.body.name,
        age:req.body.age
    };

    const sql = 'INSERT INTO ninja SET ?';
    
    connection.query(sql, data, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send({
            status: 'Data sent sucessfuly!',
            no: null,
            name: req.body.name,
            age: req.body.age
        });
    });
});

app.listen(3210, ()=>{
    console.log('Server running in port 3210')
});