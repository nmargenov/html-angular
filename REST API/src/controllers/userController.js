const { editProfilePicture } = require('../managers/profilePictureManager');
const { login, register, getUser, updateUser, follow, followUser, unfollowUser } = require('../managers/userManager');
const { mustBeGuest, mustBeAuth } = require('../middlewares/authMiddlewares');
const { formatErrorMessage } = require('../utils/errorHandler');

const router = require('express').Router();

const paths = {
    login: '/login',
    register: '/register',
    getUser: '/:userId',
    changeProfilePicture: "/profilePicture/:userId",
    updateUser:'/:userId',
    follow:'/follow/:userId',
    unfollow:'/unfollow/:userId',
}

router.get(paths.getUser, async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await getUser(userId);
        if(!user){
            throw new Error("Invalid User");
        }
        res.status(200).json(user);
    } catch (err) {
        const error = formatErrorMessage(err)
        res.status(404).send({ message: error });
    }
});

router.post(paths.login, mustBeGuest, async (req, res) => {
    try {
        const username = req.body.username?.trim();
        const password = req.body.password?.trim();

        const token = await login(username, password);
        res.status(200).json(token);
    } catch (err) {
        const error = formatErrorMessage(err)
        res.status(404).send({ message: error });
    }
});

router.post(paths.register, mustBeGuest, async (req, res) => {
    try {
        const username = req.body.username?.trim();
        const lastName = req.body.lastName?.trim();
        const firstName = req.body.firstName?.trim();
        const password = req.body.password?.trim();
        const rePassword = req.body.rePassword?.trim();
        const email = req.body.email?.trim();
        const age = req.body.age;
        const token = await register(username, firstName, lastName, rePassword, password, email, age);
        res.status(201).json(token);
    } catch (err) {
        const error = formatErrorMessage(err)
        res.status(404).send({ message: error });
    }
});

router.patch(paths.updateUser,mustBeAuth,async(req,res)=>{
    try{
        const userId = req.params.userId;
        const loggedUser = req.user?._id;
        if(!loggedUser || userId!=loggedUser){
            throw new Error('Unauthorized');
        }
        const field = req.body.field?.trim();
        const value = req.body.value;
        const token = await updateUser(userId,field,value);
        res.status(200).json(token);
    }catch(err){
        console.log(err);
        res.status(404).send({message:err.message});
    }
});

router.post(paths.changeProfilePicture, mustBeAuth, async (req, res) => {
    try{
        const userId = req.params.userId;
        const loggedUser = req.user?._id;
        if(!loggedUser || userId!=loggedUser){
            throw new Error('Unauthorized');
        }
        editProfilePicture(req, res, userId);
    }catch(err){
        res.status(404).send({message:err});
    }
});

router.post(paths.follow,mustBeAuth,async(req,res)=>{
    try{
        const userId = req.user?._id;
        const userToFollowId = req.params.userId;
        const user = await followUser(userToFollowId,userId);
        res.status(200).json(user);
    }catch(err){
        console.log(err);
        res.status(404).send({message:err.mesasge});
    }
});

router.post(paths.unfollow,mustBeAuth,async(req,res)=>{
    try{
        const userId = req.user?._id;
        const userToUnfollow = req.params.userId;
        const user = await unfollowUser(userToUnfollow,userId);
        res.status(200).json(user);
    }catch(err){
        console.log(err);
        res.status(404).send({message:err.mesasge});
    }
});

module.exports = router;