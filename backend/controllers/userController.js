// import userModel from "../models/userModel.js";
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';


// const loginUser = (User = userModel) => async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.json({ success: false, message: 'User does not exist' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (isMatch) {
//       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//       res.json({ success: true, token, user: { name: user.email } });
//     } else {
//       return res.json({ success: false, message: 'Invalid credentials' });
//     }
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };


// const registerUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.json({ success: false, message: "Missing Details" });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const userData = { email, password: hashedPassword };
//     const newUser = new userModel(userData);
//     const user = await newUser.save();

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

//     res.json({ success: true, token, user: { name: user.email } });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };




// export { loginUser , registerUser};






import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/**
 * LOGIN (factory preserved)
 */
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

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: 'Invalid credentials'
      });
    }

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
        name: user.email,
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




const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        success: false,
        message: "Missing Details"
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      email,
      password: hashedPassword,
      role: 'USER'          
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
        name: user.email,
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

