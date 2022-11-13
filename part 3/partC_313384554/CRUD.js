const sql = require("./db.js");


const CreateNewUser = function (req, res) {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const NewUser = {
        "name": req.body.name,
        "email": req.body.email,
        "pass": req.body.pass,
        "Cpass": req.body.Cpass
    };
    sql.query("INSERT INTO users SET ?", NewUser, (err, mysqlres) => {
        if (err) {
            console.log("error: ", err);
            res.status(400).send({ message: "error in creating user: " + err });
            return;
        }
        console.log("created user: ", { id: mysqlres.insertId, ...NewUser });
        res.render('success', {
            var1:  'http://localhost:3000/signin',
            var2: '/photos/checked.png',
            var3:"New user created successfully!",
            var4:'Login with your user!'
       });
       return;

    });
};

const ShowRutorsByCon = (req, res) => {
    // check if body is empty
    if (!req.body) {
        res.status(400).send({ message: "content can not be empty" });
        return;
    }
    //if body not empty - create new tutor
    var tutorSub = req.query.subjects;
    var tutorGr = req.query.Grade;
    console.log(tutorSub, tutorGr);
    //insert query

    const sqlQuery = "SELECT * FROM tutors where grade like '" + tutorGr + "%' and subject like '" + tutorSub + "%'";
    console.log(sqlQuery);
    sql.query(sqlQuery, (err, mysqlres) => {
        if (err) {
            console.log("error is: " + err);
            res.status(400).send({ message: "error in finding tutor " + err });
            return;
        }
        // if not query error
        console.log("success... ");
        res.render('results', {
            var1: "All tutors for you:",
            pple: mysqlres
        });
        return;
    });
};


const NearestTutor = (req, res) => {
    // check if body is empty
    if (!req.body) {
        res.status(400).send({ message: "content can not be empty" });
        return;
    }
    //if body not empty - create new tutor
    var city = req.query.cityy;
    var tutorSub=req.query.subjectss;

    console.log(city);
    //insert query

    const sqlQuery1 = "SELECT * FROM tutors where city like '" + city + "%' and subject like '" + tutorSub + "%'";
    console.log(sqlQuery1);
    sql.query(sqlQuery1, (err, mysqlres1) => {
        if (err) {
            console.log("error is: " + err);
            res.status(400).send({ message: "error in finding tutor " + err });
            return;
        }
        // if not query error
        console.log("success... ");
        res.render('results', {
            var1: "The toturs closest to you:",
            pple: mysqlres1
        });
        return;
    });
};





const Finduser = (req, res)=>{
    if (!req.body) {
        res.status(400).send({message: "serch cannot be empty"});
        return;        
    }
    // const User = req.query.SearchName;
    var User = req.body.uname;
    var password=req.body.psw;

   
    sql.query("SELECT * FROM users where (email =? AND pass =?)" , [User,password] , (err, results, fields)=>{
        if (err) {
            console.log("ERROR IS: " + err);
            res.status(400).send("Somthing is wrong with query" + err);
            return;
        }
        if(results.length ==0){
            res.status(400).render('success', {
                var1: 'http://localhost:3000/signin',
                var2: '/photos/cancel.png',
                var3:"Oops! The user does not exist. Check the email or password.",
                var4:'Go Back To login Page!'
           });
           return;
        }
        console.log("User found");
        // res.send(results);
        res.render("Search");
        return;
    } )
}







module.exports = { CreateNewUser, ShowRutorsByCon, NearestTutor,Finduser}