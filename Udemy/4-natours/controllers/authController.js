const User = require('./../models/userModule');
const catchAsync = require('../utils/catchAsync');


exports.signup = catchAsync( async (req, res, next) => {
    const newUser = await User.create(req.body);

    res.status(201);
    res.json({
        status: 'success',
        data: {
            user: newUser
        }
    });
});