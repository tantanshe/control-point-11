import {createSlice} from '@reduxjs/toolkit';
import {Item} from '../../types';
import {fetchItems, fetchItemById, addItem, deleteItem} from './itemsThunks';

interface ItemsState {
  items: Item[];
  currentItem: Item | null;
  isLoading: boolean;
  error: boolean;
}

const initialState: ItemsState = {
  items: [],
  currentItem: null,
  isLoading: false,
  error: false,
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });

    builder
      .addCase(fetchItemById.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchItemById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentItem = action.payload;
      })
      .addCase(fetchItemById.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });

    builder
      .addCase(addItem.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
      })
      .addCase(addItem.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });

    builder
      .addCase(deleteItem.pending, (state) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item._id !== action.payload);
      })
      .addCase(deleteItem.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export const selectItems = (state: { items: ItemsState }) => state.items.items;
export const selectCurrentItem = (state: { items: ItemsState }) => state.items.currentItem;
export const selectIsItemsLoading = (state: { items: ItemsState }) => state.items.isLoading;
export const selectItemsError = (state: { items: ItemsState }) => state.items.error;

export const itemsReducer = itemsSlice.reducer;