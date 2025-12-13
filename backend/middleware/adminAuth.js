const adminAuth = (req, res, next) => {
  if (req.user?.role !== 'ADMIN') {
    return res.json({
      success: false,
      message: 'Admin access required'
    });
  }
  next();
};

export default adminAuth;
