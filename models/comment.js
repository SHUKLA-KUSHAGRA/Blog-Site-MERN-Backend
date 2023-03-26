import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    postId : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        required : true
    }
});

const comment = mongoose.model('comment',commentSchema);
export default comment;