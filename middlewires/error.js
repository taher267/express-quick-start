export default (err, _rq, res, _n) => {
    console.log('err Name', err.message);
    const message = err.message || `ServeR ErroR OccereD`;
    let status = err.status || 500;
    if (err.name === "MongoServerError") status = 500;

    return res.status(status).json({
        message
    });
}