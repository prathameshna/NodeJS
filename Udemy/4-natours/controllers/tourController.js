// const fs = require('fs');
const Tour = require('../models/tourModel');
const AppErrorHandling = require('../utils/appErrorHandling');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

// const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.aliasTopTours = async (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,price,summary,difficulty';
    next();
}

exports.getAllTours = factory.getAll(Tour);
exports.getTour = factory.getOne(Tour, { path: 'reviews' });
exports.createTour = factory.createOne(Tour);
exports.updateTour = factory.updateOne(Tour);
exports.deleteTour = factory.deleteOne(Tour);

exports.getTourStats = catchAsync(async (req, res, next) => {
    const stats = await Tour.aggregate([
        {
            $match: { ratingsAverage: { $gte: 4.5 } }
        },
        {
            $group: {
                _id: { $toUpper: '$difficulty' },
                numTours: { $sum: 1 },
                numRatings: { $sum: '$ratingsQuantity' },
                avgrating: { $avg: '$ratingsAverage'},
                avgPrice: { $avg: '$price' },
                minPrice: { $min: '$price' },
                maxPrice: { $max: '$price' }
            }
        },
        {
            $sort: { avgPrice: 1 }
        },
        // {
        //     $match: { _id: { $ne: 'EASY' } }
        // }
    ]);

    res.status(200);
    res.json({
        status: 'success',
        data: {
            stats
        }
    });
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
    const year = req.params.year * 1;   // 2021

    const plan = await Tour.aggregate([
        {
            $unwind: '$startDates'
        },
        {
            $match: {
                startDates: {
                    $gte: new Date(`${year}-01-01`),
                    $lte: new Date(`${year}-12-31`),
                }
            }
        },
        {
            $group: {
                _id: { $month: '$startDates'},
                numToursStarts: { $sum: 1 },
                tours: { $push: '$name' },
            }
        },
        {
            $addFields: { month: '$_id' }
        },
        {
            $project: {
                _id: 0
            }
        },
        {
            $sort: { numToursStarts: -1 }
        },
        {
            $limit: 12
        }
    ]);

    res.status(200);
    res.json({
        status: 'success',
        data: {
            plan
        }
    });
});

// /tour-within/500/center/28.612342463769657,77.1947956584982/unit/km
exports.getTourWithin = catchAsync( async (req, res, next) => {
    const { distance, latlng, unit } = req.params;
    const [lat, lng] = latlng.split(',');
    const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;

    if(!lat || !lng) {
        next(
            new AppErrorHandling('Please provide latitude and longitude in the format lat, lng.', 400)
        );
    }

    const tours = await Tour.find({ startLocation: { $geoWithin: { $centerSphere: [ [lng, lat], radius] } } });

    res.status(200);
    res.json({
        status: 'success',
        results: tours.length,
        data: {
            data: tours
        }
    });
});

exports.getDistances = catchAsync( async (req, res, next) => {
    const { latlng, unit } = req.params;
    const [lat, lng] = latlng.split(',');

    const muliplier = unit === 'mi' ? 0.000621371 : 0.001;

    if (!lat || !lng) {
        next(
            new AppErrorHandling('Please provide latitude and longitude in the format lat, lng.', 400)
        );
    }

    const distances = await Tour.aggregate([
        {
            $geoNear:  {
                near: {
                    type: 'Point',
                    coordinates: [lng * 1, lat * 1]
                },
                distanceField: 'distance',
                distanceMultiplier: muliplier
            }
        },
        {
            $project: {
                distance: 1,
                name: 1
            }
        }
    ]);

    res.status(200);
    res.json({
        status: 'success',
        data: {
            data: distances
        }
    });
});