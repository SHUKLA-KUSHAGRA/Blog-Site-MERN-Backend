import express from "express";
import { signUpUser,loginUser } from "../controller/userController.js";
import { uploadImage,getImage } from "../controller/imageController.js";
import upload from "../middleware/upload.js";
import { createPost ,getAllPosts ,getPostByID ,updatePost ,deletePost } from "../controller/postController.js";
import { authenticateToken } from "../middleware/authenticate.js";
import { newComment ,getComments ,removeComment} from "../controller/commentController.js";

const router = express.Router();
router.post('/signup',signUpUser);
router.post('/login',loginUser);
router.post('/file/upload',upload.single('file'),uploadImage);

router.get('/file/:filename',getImage);
router.post('/create',authenticateToken,createPost);

router.get('/posts',authenticateToken,getAllPosts);
router.get('/posts/:_id',authenticateToken,getPostByID);
router.get('/update/:_id',authenticateToken,getPostByID);

router.put('/update/:_id',authenticateToken,updatePost);
router.delete('/delete/:_id',authenticateToken,deletePost);

router.post('/comment/new',authenticateToken,newComment);
router.get('/comments/:_id',authenticateToken,getComments);
router.delete('/comment/delete/:_id',authenticateToken,removeComment);

export default router;