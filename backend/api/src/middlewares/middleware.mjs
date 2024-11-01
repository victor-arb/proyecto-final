const setContentType = (req, res, next) => {
    res.set('content-type', 'application/json');
    next();
}

export {setContentType};