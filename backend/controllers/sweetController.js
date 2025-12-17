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
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const sweet = await sweetModel.findById(id);

    if (!sweet) {
      return res.json({ success: false, message: 'Sweet not found'
      });
    }

    if (sweet.quantity < quantity) {
      return res.json({ success: false, message: 'Insufficient stock'
      });
    }

    sweet.quantity -= quantity;
    await sweet.save();

    return res.json({
      success: true,
      sweet
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message
    });
  }
};


const getAllSweets = async (req, res) => {
  const sweets = await sweetModel.find();
  return res.json({
    success: true,
    sweets
  });
};

const searchSweets = async (req, res) => {
  const { q } = req.query;

  const sweets = await sweetModel.find({
    $or: [
      { name: { $regex: q, $options: 'i' } },
      { category: { $regex: q, $options: 'i' } }
    ]
  });

  return res.json({
    success: true,
    sweets
  });
};



const restockSweet = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const sweet = await sweetModel.findById(id);

    if (!sweet) {
      return res.json({
        success: false,
        message: 'Sweet not found'
      });
    }

    sweet.quantity += quantity;
    await sweet.save();

    return res.json({
      success: true,
      sweet
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message
    });
  }
};




export { addSweet, purchaseSweet, getAllSweets, searchSweets, restockSweet };


















