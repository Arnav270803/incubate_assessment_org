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

    const sweet = new sweetModel({name,category,price,quantity}); // new is creating new document object , the sweet has access to the mongoose methods 

    const savedSweet = await sweet.save(); // new does't save the instance automatically , to do that we do .save()

    return res.json({ success: true, sweet: savedSweet});

  } catch (error){
    return res.json({ success: false, message: error.message });
  }

};
// it is allowing buying sweets by reducing it's quantity
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
  const savedSweet = await sweet.save();  // save returns the updated document
return res.json({success: true, sweet: savedSweet  });// return the fresh one


  } catch (error) {
    return res.json({ success: false, message: error.message });
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
  try {
    const { q, minPrice, maxPrice } = req.query;

    // Build filter object dynamically
    const filter = {};

    // Text search (name or category) - only if q is provided
    if (q && q.trim() !== '') {
      filter.$or = [
        { name: { $regex: q.trim(), $options: 'i' } },
        { category: { $regex: q.trim(), $options: 'i' } }
      ];
    }

    // Price range filter - only if minPrice or maxPrice is provided
    if (minPrice || maxPrice) {
      filter.price = {};

      if (minPrice) {
        filter.price.$gte = Number(minPrice);  // Greater than or equal
      }
      if (maxPrice) {
        filter.price.$lte = Number(maxPrice);  // Less than or equal
      }
    }

    // If no filters at all (e.g., empty search), return all sweets
    const sweets = await sweetModel.find(filter);

    return res.json({
      success: true,
      sweets
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message || 'Search failed'
    });
  }
};





const restockSweet = async (req,res) => {
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

  }catch(error) {
    return res.json({
      success: false,
      message: error.message
    });
  }
};




export { addSweet, purchaseSweet, getAllSweets, searchSweets, restockSweet };


















