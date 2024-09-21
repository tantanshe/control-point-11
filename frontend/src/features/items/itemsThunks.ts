import { createAsyncThunk } from '@reduxjs/toolkit';
import { Item, ItemMutation } from '../../types';
import axiosApi from '../../axiosApi';

export const fetchItems = createAsyncThunk<Item[]>(
  'items/fetchItems',
  async () => {
    const response = await axiosApi.get('/items');
    return response.data;
  }
);

export const fetchItemById = createAsyncThunk<Item, string>(
  'items/fetchItemById',
  async (itemId) => {
    const response = await axiosApi.get(`/items/${itemId}`);
    return response.data;
  }
);

export const addItem = createAsyncThunk<Item, ItemMutation>(
  'items/createItem',
  async (itemData, { getState }) => {
    const state: any = getState();
    const token = state.users.user.token;

    const formData = new FormData();
    formData.append('title', itemData.title);
    formData.append('description', itemData.description);
    if (itemData.image) formData.append('image', itemData.image);
    formData.append('price', itemData.price.toString());
    formData.append('category', itemData.category);

    const response = await axiosApi.post('/items', formData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  }
);

export const deleteItem = createAsyncThunk<string, string>(
  'items/deleteItem',
  async (itemId, { getState }) => {
    const state: any = getState();
    const token = state.users.user.token;

    await axiosApi.delete(`/items/${itemId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return itemId;
  }
);