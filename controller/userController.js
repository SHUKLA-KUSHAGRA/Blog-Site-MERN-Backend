import User from "../models/user.js";
import Token from "../models/token.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUpUser = async (request,response) => {
    try{
        const { name ,
                username,
                email,
                password
        }=request.body;
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password,salt);
        const newUser = new User({
            name,
            username,
            email,
            password : passwordHash
        });
        const savedUser = await newUser.save();
        return response.status(200).json({msg : 'SignUp Successful'});
    }
    catch(err){
        response.status(500).json({msg : 'Error While Signing User'})
    }
};
export const loginUser = async (request,response) => {
    try{
        const {username,password} = request.body;
        let user = await User.findOne({username : username});
        if(!user)
            return response.status(400).json({msg : 'User does not exist'})
    
        const isMatch = await bcrypt.compare(password , user.password);
        if(isMatch)
        {
            const accessToken = jwt.sign(user.toJSON(),process.env.JWT_ACCESS_SECRET,{ expiresIn : '30m' });
            const refreshToken = jwt.sign(user.toJSON(),process.env.JWT_REFRESH_SECRET);
            const newToken = new Token({token : refreshToken});
            await newToken.save();
            return response.status(200).json({accessToken : accessToken , refreshToken : refreshToken ,
            name : user.name , username : user.username});
        }
        else
            return res.status(400).json({msg : "Invalid credentials"});
    }
    catch(err){
        response.status(500).json({msg : 'Error Logging In'})
    }
};