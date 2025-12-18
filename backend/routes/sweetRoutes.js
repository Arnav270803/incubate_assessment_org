import express from 'express';
import {addSweet,purchaseSweet,getAllSweets,searchSweets,restockSweet} from '../controllers/sweetController.js';
import userAuth from '../middleware/auth.js';
import adminAuth from '../middleware/adminAuth.js';

const sweetRouter = express.Router();
// public
sweetRouter.get('/', getAllSweets);
sweetRouter.get('/search', searchSweets);
// protected
sweetRouter.post('/', userAuth, adminAuth, addSweet);
// sweetRouter.post('/:id/buy', userAuth, purchaseSweet);
sweetRouter.post('/:id/purchase', userAuth, purchaseSweet);
sweetRouter.post('/:id/restock', userAuth, adminAuth, restockSweet);

export default sweetRouter;
