import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


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


const loginUser = async (req, res) => {
  // Removed the confusing and unnecessary "(User = userModel)" syntax
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        success: false,
        message: "Missing email or password"
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: 'User does not exist'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    //  Forgot to add this token checking logic . :(
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
    );

    return res.json({
      success: true,
      token,
      user: { email: user.email, role: user.role }
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

export { loginUser, registerUser };


















