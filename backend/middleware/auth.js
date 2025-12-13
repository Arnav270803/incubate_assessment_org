import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.json({
      success: false,
      message: 'Not Authorized. Login Again'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.body.userId = decoded.id;

    req.user = {
      id: decoded.id,
      role: decoded.role
    };

    next();
  } catch (error) {
    return res.json({
      success: false,
      message: 'Invalid token'   
    });
  }
};

export default userAuth;
