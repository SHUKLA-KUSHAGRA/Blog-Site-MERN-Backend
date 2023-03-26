import Post from "../models/post.js";

export const createPost = async (request,response) => {
    try{
        const newPost = new Post(request.body);
        await newPost.save();
        return response.status(200).json('post saved successfully');
    }
    catch(err){
        return response.status(501).json(err);
    }
}

export const getAllPosts = async (request,response) => {
    const category = request.query.category;
    let posts; 
    try{
        if(category){
            posts = await Post.find({category : category});
        }
        else{
            posts = await Post.find({});
        }
        return response.status(200).json(posts);
    }
    catch(err)
    {
        return response.status(500).json({msg : err.message});
    }
}

export const getPostByID = async (request,response) => {
    try{
        const post = await Post.findById(request.params._id);
        return response.status(200).json(post);
    }
    catch(err)
    {
        return response.status(500).json({msg : err.message});
    }
}

export const updatePost = async(request,response) => {
    try{
        const post = await Post.findById(request.params._id);
        if(!post){
            return response.status(404).json({msg : 'post not found'});
        }
        await Post.findByIdAndUpdate(request.params._id,{$set : request.body})
        return response.status(200).json({msg : 'post updated successfully'});
    }
    catch(err){
        return response.status(500).json({error :err.message});
    }
}

export const deletePost = async(request,response) => {
    try{
        const post = await Post.findById(request.params._id);
        if(!post){
            return response.status(404).json({msg : 'post not found'});
        }
        await post.deleteOne();
        return response.status(200).json({msg : 'post deleted successfully'});
    }
    catch(err){
        return response.status(500).json({error : err.message});
    }
}