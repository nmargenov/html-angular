const express = require('express');
const cors = require('cors');
const path = require('path');
const { auth } = require('../middlewares/authMiddlewares');

exports.expressConfig = (app) =>{
    app.use(express.urlencoded({extended:false}));
    app.use(express.json());
    app.use('/api/src/profilePictures', express.static(path.join(__dirname, '../profilePictures')));
    app.use(cors());
    app.use(auth);
}