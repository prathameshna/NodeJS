module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode);
    res.json({
        status: err.status,
        message: err.message
    });
}