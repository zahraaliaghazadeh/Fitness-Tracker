const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({

    name: {
        type: String,
        trim: true,
        required: "You would need to enter the name of workout"
    },
    created:{
        type: Date,
        default: Date.now,
    },
   

    exercises: [
        {
            type: Schema.Types.ObjectId,
            ref: "Exercise"
        }
    ]


   


});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
