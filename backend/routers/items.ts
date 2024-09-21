import express, {NextFunction} from 'express';
import mongoose from 'mongoose';
import Item from '../models/Item';
import auth, {RequestWithUser} from '../middleware/auth';
import {imagesUpload} from '../multer';

const itemsRouter = express.Router();

itemsRouter.get('/', async (req: RequestWithUser, res, next: NextFunction) => {
  try {
    const {category} = req.query;
    const filter = category ? {category} : {};
    const items = await Item.find(filter).populate('seller', 'displayName phoneNumber').sort({createdAt: -1});
    res.json(items);
  } catch (error) {
    next(error);
  }
});

itemsRouter.get('/:id', async (req: RequestWithUser, res, next: NextFunction) => {
  try {
    const item = await Item.findById(req.params.id).populate('seller', 'displayName phoneNumber');
    if (!item) {
      return res.status(404).send('Item not found');
    }
    res.json(item);
  } catch (error) {
    next(error);
  }
});

itemsRouter.post('/', auth, imagesUpload.single('image'), async (req: RequestWithUser, res, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).send({error: 'User not found.'});
    }

    const itemData = {
      title: req.body.title,
      description: req.body.description,
      image: req.file?.filename,
      price: req.body.price,
      category: req.body.category,
      seller: req.user._id,
    };

    const item = new Item(itemData);
    await item.save();

    return res.status(201).send(item);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    next(error);
  }
});


itemsRouter.delete('/:id', auth, async (req: RequestWithUser, res, next: NextFunction) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).send('Item not found');
    }

    if (item.seller.toString() !== req.user?._id.toString()) {
      return res.status(403).send({error: 'You do not have permission to delete this item'});
    }

    await Item.deleteOne({_id: req.params.id});
    res.send({message: 'Item deleted'});
  } catch (error) {
    next(error);
  }
});

export default itemsRouter;
