const multer = require('multer');
const User = require('../models/User');
const { promisify } = require('util');
const { formatErrorMessage } = require('../utils/errorHandler');
const { sign } = require('../utils/jwt');
const { SECRET } = require('../config/config');

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false); 
    }
  };

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/profilePictures');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({ storage: storage, fileFilter:fileFilter}).single('profilePicture');

exports.editProfilePicture = async (req, res, userId) => {
    try {
        const uploadPromise = promisify(upload);
        await uploadPromise(req, res);

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                profilePicture: {
                    data: req.file.path,
                    contentType: 'image/png',
                },
            },
            {new:true,select:'-password'}
        );
        const payload = {
            _id:updatedUser._id,
            username:updatedUser.username,
            firstName:updatedUser.firstName,
            lastName:updatedUser.lastName,
            email:updatedUser.email,
            age:updatedUser.age,
            profilePicture:updatedUser.profilePicture
        }; 
        const token = await sign(payload,SECRET,{expiresIn:'1h'});
        res.status(200).json(token);
    } catch (err) {
        console.log(err);
        const error = formatErrorMessage(err)
        res.status(404).send({message:error});
    }
};