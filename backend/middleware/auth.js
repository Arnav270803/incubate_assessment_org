const userAuth = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({ success: false, message: 'Not Authorized. Login Again' });
  }

  next();
};

export default userAuth;
