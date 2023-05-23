const User = require('../models/userModule');
const catchAsync = require('../utils/catchAsync');


exports.getAllUsers = catchAsync( async (req, res, next) => {
    
    const users = await User.find();
    
    // SEND RESPONSE
    res.status(200);
    res.json({
        status: 'success',
        results: users.length,
        data: {
            users
        }
    });
});

exports.CreateUser = (req, res) => {
    res.status(500);
    res.json({
        status: 'error',
        message: 'This route is not yet defined'
    })
}

exports.getUser = (req, res) => {
    res.status(500);
    res.json({
        status: 'error',
        message: 'This route is not yet defined'
    })
}

exports.updateUser = (req, res) => {
    res.status(500);
    res.json({
        status: 'error',
        message: 'This route is not yet defined'
    })
}

exports.deleteUser = (req, res) => {
    res.status(500);
    res.json({
        status: 'error',
        message: 'This route is not yet defined'
    })
}