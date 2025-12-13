test('restockSweet should increase sweet quantity', async () => {
  sweetModel.findById = async () => ({
    _id: 'sweet123',
    quantity: 5,
    save: async function () {
      return this;
    }
  });

  const req = {
    params: { id: 'sweet123' },
    body: { quantity: 10 }
  };

  let response;
  const res = {
    json: (data) => { response = data; }
  };

  await restockSweet(req, res);

  assert.strictEqual(response.success, true);
  assert.strictEqual(response.sweet.quantity, 15);
});
