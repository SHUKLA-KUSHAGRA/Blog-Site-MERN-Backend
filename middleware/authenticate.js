import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authenticateToken = (request,response,next) => {
    const authheader = request.headers['authorization'];
    const authToken = authheader && authheader.split(' ')[1];
    if(authToken===null){
        return response.status(401).json({msg : 'token is missing'});
    }
    jwt.verify(authToken,process.env.JWT_ACCESS_SECRET,(error,user) => {
        if(error)
        {
            return response.status(403).json({msg : 'invalid token'});
        }
        request.user = user;
        next();
    })
}