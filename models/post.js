import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true 
    },
    picturePath : {
        type : String,
        required : true
    },
    userName : {
        type : String,
        required : true
    },
    createdDate : {
        type : Date,
        required : true
    }
})

const post = mongoose.model('post',postSchema);
export default post;