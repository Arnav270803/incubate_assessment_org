const addSweet = async (req, res) => {
  const { name, category, price, quantity } = req.body;

  if (!name || !category || price === undefined || quantity === undefined) {
    return res.json({
      success: false,
      message: 'Missing sweet details'
    });
  }
};

export { addSweet };
