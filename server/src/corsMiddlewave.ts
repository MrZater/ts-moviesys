module.exports = function (req, res, next) {
  // 处理简单请求
  res.header("access-control-allow-origin", '*');
  // 处理预检请求
  // options 预检请求
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      req.headers["access-control-request-method"]
    );
    res.header(
      "Access-Control-Allow-Headers",
      req.headers["access-control-request-headers"]
    );
  }
  res.header("Access-Control-Allow-Credentials", true);
  next();
};
