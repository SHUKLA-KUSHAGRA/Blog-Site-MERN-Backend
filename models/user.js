import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : true,
            max : 20
        },
        username : {
            type : String,
            required : true,
            unique : true,
            max : 10
        },
        email : {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        password : {
            type: String,
            required: true,
            min: 5,
            max: 15,
        }
    },{timestamps : true}
);

const user = mongoose.model('user',userSchema);
export default user;