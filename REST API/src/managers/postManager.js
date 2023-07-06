const Post = require("../models/Post");

exports.getAllPosts = () =>{
    return Post.find();
}