const loginUser = async (req, res) => {
  const user = null;
  if (!user) {
    return res.json({ success: false, message: 'User does not exist' });
  }
};

export { loginUser };
