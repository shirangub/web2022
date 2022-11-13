//------import
const express = require('express');//import modules
const app = express();// init the app
const path = require ('path');
const bodyParser = require("body-parser");
const sql = require("./db");
const port =3000;
const CRUD= require('./CRUD.js');
const DBCreation = require('./dataCreationDB');
const fs = require('fs');
const stringify = require('csv-stringify').stringify;
const { parse } = require("csv-parse");
const CSVToJSON = require('csvtojson');
const start =function(req,res){
    res.render('index');
}




//-----setup
app.use(bodyParser.json());// parse requests of contenttype: application/json
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static('static'));//set up for static dir
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug'); 

app.get('/signin', [DBCreation.DropUsersTable, DBCreation.DropTutorsTable, DBCreation.CreateUsers, DBCreation.CreateTutors, DBCreation.InsertDataToUsers, DBCreation.InsertDataToTutors, start]);

//-----------route
app.get('/signin', (req,res)=>{
//res.send('Hello PUG');
res.render('index');
});

app.get('/register', (req, res)=>{
    res.render('register');
});
app.post('/CreateNewUser',CRUD.CreateNewUser);




app.get('/Search', (req, res)=>{
    res.render('Search');
});
app.get('/MyTutors', (req, res)=>{
    res.render('MyTutors');
});
// get tutors by Conditions
app.get("/ShowRutorsByCon", CRUD.ShowRutorsByCon);
app.get("/NearestTutor", CRUD.NearestTutor);
app.post("/Search", CRUD.Finduser);


// ----------set server to listen at port
app.listen(port, ()=>{
console.log('Server is renning at port 3000...')
});