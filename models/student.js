const mongoose = require("mongoose")
const studentSchema = new mongoose.Schema({
    username:{
        type:String,unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    result:[{
        key: String,
        value: Number
    }],
    mobile:{
        type: String
    },
    course: {
        type: String, required:true
    }
})

module.exports = mongoose.model("Student",studentSchema)
