const notFound = (req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`)
    res.status(404);
    next(error);
}

const errorHandler = (err, req, res, next) => {
    console.log('Error handler middleware - res:',res);
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message:err.message,
    });
    
}

export {notFound, errorHandler};