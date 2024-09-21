import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Item from './models/Item';

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('items');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  const [userOne, userTwo] = await User.create(
    {
      username: 'user1',
      password: 'password1',
      displayName: 'Leon Kennedy',
      phoneNumber: '+996 123 12 34 56',
    },
    {
      username: 'user2',
      password: 'password2',
      displayName: 'Noctic Lucis Caelum',
      phoneNumber: '+777 123 12 34 56',
    }
  );

  await Item.create(
    {
      title: 'Fact Check Album',
      description: 'Fact Check Album by NCT 127.',
      image: 'fixtures/item1.jpeg',
      category: 'Albums',
      price: '2500',
      seller: userOne._id,
    },
    {
      title: 'Kai Album',
      description: 'Kai Album by Kai.',
      image: 'fixtures/item2.jpeg',
      category: 'Albums',
      price: '2700',
      seller: userTwo._id,
    },
    {
      title: 'Chrome hearts T-Shirt',
      description: 'Chrome hearts black T-Shirt. New.',
      image: 'fixtures/item3.jpeg',
      category: 'Clothing',
      price: '1500',
      seller: userTwo._id,
    },
    {
      title: 'Hair conditioner',
      description: 'L\'Oreal Paris Extraordinary Oil Nourishing Conditioner For Dry & Dull Hair, 180ml.',
      image: 'fixtures/item4.jpeg',
      category: 'Beauty',
      price: '1000',
      seller: userOne._id,
    },
    {
      title: 'Locker',
      description: 'Metal locker.',
      image: 'fixtures/item5.jpg',
      category: 'Furniture',
      price: '800',
      seller: userOne._id,
    },
  );

  await db.close();
};

run().catch(console.error);
