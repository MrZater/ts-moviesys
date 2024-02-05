module.exports = function (req, res, next) {
    res.header("access-control-allow-origin", '*');
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", req.headers["access-control-request-method"]);
        res.header("Access-Control-Allow-Headers", req.headers["access-control-request-headers"]);
    }
    res.header("Access-Control-Allow-Credentials", true);
    next();
};
