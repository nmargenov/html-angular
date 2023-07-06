const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minLength: [5, 'Description must be at least 5 characters long!'],
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Owner is required!'],
    },
    comments: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        comment: String
    }],
    likedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    image: {
        data: {
            type: Buffer,
            required: [true, 'Image data is required!'],
        },
        contentType: {
            type: String,
            required: [true, 'Image content type is required!'],
        },
    }
});

const Post = mongoose.model('Post',postSchema);

module.exports = Post;