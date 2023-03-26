import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import dotenv from "dotenv";

dotenv.config();
const storage = new GridFsStorage({
    url : process.env.MONGO_URL,
    options : {
        useNewUrlParser : true,
    },
    file : (request,file) => {
        const match = ["image/png","image/jpg"];
        if(match.indexOf(file.mimeType) === -1){
            return `${Date.now()}-blog-${file.originalname}`;
        }
        return {
            bucketname : "photos",
            filename : `${Date.now()}-blog-${file.originalname}`
        }
    }
})

export default multer({storage});