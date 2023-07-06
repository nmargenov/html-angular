const User = require("../models/User");

const bcrypt = require('bcrypt');
const { sign } = require("../utils/jwt");
const { SECRET } = require("../config/config");

exports.register = async (username, firstName, lastName, password, rePassword, email, age) => {
    if (password != rePassword) {
        throw new Error("Passwords don't match!");
    }

    if (password.length < 6) {
        throw new Error("Password must be at least 6 characters long!");
    }

    const existingUsername = await User.findOne({ username });

    if (existingUsername) {
        throw new Error("Username is already in use!");
    }

    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
        throw new Error("Email is already in use!");
    }

    const bcryptPass = await bcrypt.hash(password, 10);

    const user = {
        username,
        firstName,
        lastName,
        password: bcryptPass,
        email,
        age,
        profilePicture: {
            data: `src/profilePictures/1688404812757user.png`,
            contentType: 'image/png'
        }
    };

    const newUser = await User.create(user);

    const payload = {
        _id: newUser._id,
        username: newUser.username,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        age: newUser.age,
        profilePicture: newUser.profilePicture
    };

    const token = await sign(payload, SECRET, { expiresIn: '1h' });

    return token;
}

exports.login = async (username, password) => {
    const user = await User.findOne({ username });

    if (!user) {
        throw new Error('Username or password don\'t match!');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Username or password don\'t match!');
    }

    const payload = {
        _id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        age: user.age
    };

    if (user.profilePicture.data) {
        payload['profilePicture'] = user.profilePicture;
    }

    const token = await sign(payload, SECRET, { expiresIn: '1h' });

    return token;
};

exports.updateUser = async (userId, field, value) => {

    if (field == "username") {
        const existingUsername = await User.findOne({ username: value });
        if (existingUsername) {
            throw new Error('Username is already in use!');
        }
    }

    if (field == "email") {
        const existingEmail = await User.findOne({ email: value });
        if (existingEmail) {
            throw new Error('Email is already in use!');
        }
    }

    let updatedUser;
    if (field == "password") {
        const oldPassword = value.oldPassword;
        const user = await User.findById(userId);
        const isValid = await bcrypt.compare(oldPassword,user.password);
        if(!isValid){
            throw new Error("Current password is not correct!");
        }
        const newPassword = value.newPassword;
        const password = await bcrypt.hash(newPassword,10);
        updatedUser = await User.findByIdAndUpdate(userId, { password }, { runValidators: true, new: true }).select('-password');
    }
    else {
        updatedUser = await User.findByIdAndUpdate(userId, { [field]: value.trim() }, { runValidators: true, new: true }).select('-password');

    }
    const payload = {
        _id: updatedUser._id,
        username: updatedUser.username,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        age: updatedUser.age,
        profilePicture: updatedUser.profilePicture
    };
    const token = await sign(payload, SECRET, { expiresIn: '1h' });
    return token;
}

exports.followUser = async (userToFollowId,userId) =>{
    const userToFollow = await User.findById(userToFollowId);


    if(checkIfUserIsFollowing(userToFollow,userId)){
        throw new Error("You are already following the user!");
    }

    const result = await Promise.all([
        User.findByIdAndUpdate(userToFollowId,{$push:{followers:userId}},{new:true}).select('-password'),
        User.findByIdAndUpdate(userId,{$push:{following:userToFollowId}},{new:true}).select('-password')
    ]);
    return result[0];
}


exports.unfollowUser = async (userToUnfollowId,userId) =>{
    const UserToUnfollow = await User.findById(userToUnfollowId);


    if(!checkIfUserIsFollowing(UserToUnfollow,userId)){
        throw new Error("You are not following the user!");
    }

    const result = await Promise.all([
        User.findByIdAndUpdate(userToUnfollowId,{$pull:{followers:userId}},{new:true}).select('-password'),
        User.findByIdAndUpdate(userId,{$pull:{following:userToUnfollowId}},{new:true}).select('-password')
    ]);
    return result[0];
}

exports.getUser = (userId) => {
    return User.findById(userId)
    .select('-password');
}

function checkIfUserIsFollowing(user,userId){
    return user.followers?.map(u=>u.toString()).includes(userId);
}