var SQL = require('./db');
const path = require('path');
const csv =require('csvtojson');

const CreateUsers = (req,res,next)=> {
    var Q1 = "CREATE TABLE users (id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, name varchar(255) NOT NULL, email varchar(255) NOT NULL, pass varchar(255) NOT NULL, Cpass varchar(255) NOT NULL)"
    
    console.log("users table creation");
    SQL.query(Q1,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table"});
            return;
        }
        console.log('created users table');
        next();
    })      
};

const CreateTutors = (req,res,next)=> {
    var Q2 = "CREATE TABLE tutors (id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, name varchar(255) NOT NULL, subject varchar(255) NOT NULL, grade varchar(255) NOT NULL, city varchar(255) NOT NULL, price varchar(255) NOT NULL, tel varchar(255) NOT NULL)"
    
    console.log("tutors table creation");
    SQL.query(Q2,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table"});
            return;
        }
        console.log('created tutors table');
        next();
    })      
};


const InsertDataToUsers = (req,res,next)=>{
    var Q3 = "INSERT INTO users SET ?";
    const csvFilePath= path.join(__dirname, "users.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    jsonObj.forEach(element => {
        var NewEntry = {
            "id": element.id,
            "name": element.name,
            "email": element.email,
            "pass": element.pass,
            "Cpass": element.Cpass
        }
        SQL.query(Q3, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data", err);
            }
        });
    });
    })
    next();
};

const InsertDataToTutors = (req,res,next)=>{
    var Q4 = "INSERT INTO tutors SET ?";
    const csvFilePath= path.join(__dirname, "tutors.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    jsonObj.forEach(element => {
        var NewEntry = {
            "id": element.id,
            "name" : element.name,
            "subject" : element.subject,
            "grade" : element.grade,
            "city" : element.city,
            "price" : element.price,
            "tel" : element.tel
            
        }
        SQL.query(Q4, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data", err);
            }
        });
    });
    })
    next();
};



const ShowUsersTable = (req,res,next)=>{
    var Q6 = "SELECT * FROM users";
    SQL.query(Q6, (err, mySQLres)=>{
        if (err) {
            console.log("error in showing table users", err);
            res.send("error in showing table users");
            return;
        }
        console.log("showing users table");
        next();
    })};

    const ShowTutorsTable = (req,res,next)=>{
        var Q5 = "SELECT * FROM tutors";
        SQL.query(Q5, (err, mySQLres)=>{
            if (err) {
                console.log("error in showing table tutors", err);
                res.send("error in showing table tutors");
                return;
            }
            console.log("showing tutors table");
            next();
        })};
    

const DropUsersTable = (req, res, next)=>{
    var Q7 = "DROP TABLE users";
    SQL.query(Q7, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping table users", err);
            res.status(400).send({message: "error om dropping table users" + err});
            return;
        }
        console.log("users table drpped");
        next();
    })
};

const DropTutorsTable = (req, res, next)=>{
    var Q8 = "DROP TABLE tutors";
    SQL.query(Q8, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping table tutors ", err);
            res.status(400).send({message: "error om dropping table tutors" + err});
            return;
        }
        console.log("tutors table drpped");
        next();
    })
}

module.exports = {
    CreateUsers,
    CreateTutors,
    InsertDataToUsers,
    InsertDataToTutors,
    ShowUsersTable,
    ShowTutorsTable,
    DropUsersTable,
    DropTutorsTable
 };