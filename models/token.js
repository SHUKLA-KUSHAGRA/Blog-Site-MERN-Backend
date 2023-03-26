import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema(
    {
        token : {
            type : String,
            required : true
        }
    },{timestamps : true}
)

const token = mongoose.model('token',tokenSchema);
export default token;