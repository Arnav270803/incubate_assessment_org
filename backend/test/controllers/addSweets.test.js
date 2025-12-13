import sweetModel from '../../models/sweetModel.js';

test('addSweet should succeed with valid input', async () => {
  // mock save
  sweetModel.prototype.save = async function () {
    this._id = 'sweet123';
    return this;
  };

  const req = {
    body: {
      name: 'Ladoo',
      category: 'Indian',
      price: 10,
      quantity: 50
    }
  };

  let response;
  const res = {
    json: (data) => {
      response = data;
    }
  };

  await addSweet(req, res);

  assert.strictEqual(response.success, true);
  assert.strictEqual(response.sweet.name, 'Ladoo');
});
