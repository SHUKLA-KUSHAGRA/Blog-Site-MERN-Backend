import Comment from '../models/comment.js';

export const newComment = async (request,response) => {
    try{
        const commentData = new Comment(request.body);
        await commentData.save();
        return response.status(200).json({msg : 'commented successfully'});
    }
    catch(err){
        return response.status(500).json({error : err.message});
    }
}

export const getComments = async(request,response) => {
    try{
        const comments = await Comment.find({postId : request.params._id});
        response.status(200).json(comments);
    }
    catch(err){
        response.status(500).json({msg : 'unable to get comments'});
    }
}

export const removeComment = async (request,response) => {
    try{
        const comment = await Comment.findById(request.params._id);
        await comment.deleteOne();
        response.status(200).json({msg : 'comment deleted successfully'});
    }
    catch(err){
        response.status(500).json({error : err.message});
    }
}