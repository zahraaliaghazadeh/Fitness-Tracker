const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");


const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/activities", { useNewUrlParser: true });



// db.Workout.create({ workoutName: "running", workoutType: "cardio", duration: 20 })
//     .then(dbWorkout => {
//         console.log(dbWorkout);
//     }).catch(({ message }) => {
//         console.log(message);
//     });
//     app.get("/", function(){
//         db.Workout.find({}).then(function(workoutData){

            
//         })
//     })






// route for creating a workout
app.get("/", function(){
    db.Workout.find({}).then(function(workoutData){
        
        
    })
})






app.post("/submit", ({ body }, res) => {

// creating the workout
    db.Workout.create(body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });

   // sending back the body of the request
//    res.json(body);
});






// updating the workout with a specific id
app.post("/workout/:id",(req,res)=> {
    const exerciseId= req.params.id;
    db.Exercise.create(req.body)
    .then(({ _id }) => db.Workout.findOneAndUpdate(exerciseId, { $push: { exercises: _id } }))
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.json(err);
    });
    console.log(exerciseId);
})


app.get("/workouts",(req,res)=>{
// getting all the workouts and sending them back
db.Workout.find()
.then( function(data){
  res.json(data)
})


})








app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});

