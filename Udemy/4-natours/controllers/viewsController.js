const Tour = require('../models/tourModel');
const User = require('../models/userModule');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync( async (req, res, next) => {
    // 1) Get tour data from collection
    const tours = await Tour.find();

    // 2) Build template

    // 3) Render that template using tour data from !0

    res.status(200);
    res.render('overview', {
        title: 'All Tours',
        tours
    });
}); 

exports.getTour = catchAsync( async (req, res, next) => {
    // 1) Get the data, for the requested tour (including reviews and guides)
    const tour = await Tour.findOne({slug: req.params.slug}).populate({ 
        path: 'reviews',
        fields: 'review rating user'
    });

    // 2) Build template

    // 3) Render template using data from 1)
    res.status(200);
    res.set(
        'Content-Security-Policy',
        'connect-src https://*.tiles.mapbox.com https://api.mapbox.com https://events.mapbox.com'
    )
    res.render('tour', {
        title: `${tour.name}`,
        tour
    });
});

exports.getLoginForm = catchAsync( async (req, res, next) => {
    // const user = await User.findOne({email: req.params.email}).select('+password');

    res.status(200);
    res.set(
        'Content-Security-Policy',
        "script-src 'self' https://cdnjs.cloudflare.com/ajax/libs/axios/1.4.0/axios.min.js 'unsafe-inline' 'unsafe-eval';"
      )
    res.render('login', {
        title: 'Log into your account'
    })
})