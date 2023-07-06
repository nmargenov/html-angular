const { getAllPosts } = require('../managers/postManager');

const router = require('express').Router();

const paths = {
    post:'/',
}

router.get(paths.post,async(req,res)=>{
    try{
        const posts = await getAllPosts();
        res.status(200).json(posts);
    }catch(err){
        res.status(404).send({message:err.message});
    }
});

module.exports = router;