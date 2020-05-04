

const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// the schema for exercises, has r
const exerciseSchema = new Schema({

    name:{
        type: String,
        required: "Exercise name required",
        trim: true,
    },

    type: {
       type: String,
       trim: true,
       required: " Exercise type required"
    },

    duration: {
        type: Number,
    },
    distance: {
        type: Number,
    },
    weight: {
        type: Number,
    },
    sets: {
        type: Number,
    },
    reps: {
        type: Number,
    },


})


const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;