



import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/**
 * LOGIN (factory preserved)
 */
// 




const loginUser = (User = userModel) => async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: 'User does not exist'
      });
    }
    console.log('Before bcrypt.compare');  // Add this
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('After bcrypt.compare', isMatch);  // Add this
    if (!isMatch) {
      return res.json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    // ... rest of code
  } catch (error) {
    console.log('Login error:', error);  // Add this for catch block
    return res.json({
      success: false,
      message: error.message
    });
  }
};

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        success: false,
        message: "Missing Details"
      });
    }
    // Check if this is the first user
    const existingUsers = await userModel.countDocuments();
    const role = existingUsers === 0 ? 'ADMIN' : 'USER'; // New: First user is ADMIN

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({
      email,
      password: hashedPassword,
      role
    });
    const user = await newUser.save();
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET
    );
    return res.json({
      success: true,
      token,
      user: {
        email: user.email, // Changed to email
        role: user.role
      }
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message
    });
  }
};

export { loginUser, registerUser };


















