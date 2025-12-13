import sweetModel from '../models/sweetModel.js';

const addSweet = async (req, res) => {
  try {
    const { name, category, price, quantity } = req.body;

    if (!name || !category || price === undefined || quantity === undefined) {
      return res.json({
        success: false,
        message: 'Missing sweet details'
      });
    }

    const sweet = new sweetModel({
      name,
      category,
      price,
      quantity
    });

    const savedSweet = await sweet.save();

    return res.json({
      success: true,
      sweet: savedSweet
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message
    });
  }
};

const purchaseSweet = async (req, res) => {
  return res.json({
    success: false,
    message: 'Sweet not found'
  });
};

export { addSweet, purchaseSweet };
