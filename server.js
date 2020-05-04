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

// if deployed use the deployed database otherwise use the local mongoheadlines database
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
// app.get("/", function(){
//     db.Workout.find({}).then(function(workoutData){
        
        
//     })
// })




// app.post("/submit", ({ body }, res) => {

// creating the workout
//     db.Workout.create(body)
//         .then(dbWorkout => {
//             res.json(dbWorkout);
//         })
//         .catch(err => {
//             res.json(err);
//         });

   // sending back the body of the request
//    res.json(body);
// });




// updating the workout with a specific id
// app.post("/workout/:id",(req,res)=> {
//     const exerciseId= req.params.id;
//     db.Exercise.create(req.body)
//     .then(({ _id }) => db.Workout.findOneAndUpdate(exerciseId, { $push: { exercises: _id } }))
//     .then(dbWorkout => {
//         res.json(dbWorkout);
//     })
//     .catch(err => {
//         res.json(err);
//     });
//     console.log(exerciseId);
// })


// app.get("/workouts",(req,res)=>{
// getting all the workouts and sending them back
// db.Workout.find()
// .then( function(data){
//   res.json(data)
// })


// })




// route to create a new workout
app.post("/api/workout", (req, res) => {
    db.Workout.create(req.body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

// route to get all workouts
app.get("/api/workout", (req, res) => {
    db.Workout.find()
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});


// route to get all previous workouts
app.get("/previous", (req, res) => {
    
    // sorting all workouts by their id, but not returning the recent
    db.Workout.find().sort({ _id: -1 }).skip(1)
        .populate("exercises")
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
})


// to get the recent workout
app.get("/recent", (req, res) => {
  
    db.Workout.findOne().sort({ _id: -1 })
        .populate("exercises")
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        })
})

// add a new exercise to a workout
app.post("/api/addexercise", ({ body }, res) => {
    db.Exercise
        .create({
            name: body.name,
            type: body.type,
            duration: body.duration,
            weight: body.weight,
            sets: body.sets,
            reps: body.reps,
            distance: body.distance
        })
        // find the workout and add the new exercises to its array of exercises
        // and return the newly updated document
        .then(({ _id }) => db.Workout.findOneAndUpdate({ _id: body.id }, { $push: { exercises: _id } }, { new: true }))
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});






app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});

