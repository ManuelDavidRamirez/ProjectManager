module.exports = (res, error, method) => {
    console.log(error);
    return res.status(error.status || 500).json({
        ok : false,
        msg : error.message || `Upss, hubo un error en ${method}`
    })
}