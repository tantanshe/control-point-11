import React, { useState } from 'react';
import { TextField, Button, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../app/store';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addItem } from './itemsThunks';
import FileInput from '../../UI/FileInput/FileInput';
import { ItemMutation } from '../../types';
import { Navigate } from 'react-router-dom';
import { selectUser } from '../users/usersSlice';

const categories = ['Albums', 'Clothing', 'Furniture', 'Beauty'];

const AddItem = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  const [state, setState] = useState<ItemMutation>({
    title: '',
    description: '',
    image: null,
    category: '',
    price: '',
  });

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.title || !state.price || !state.category) return;

    dispatch(addItem(state))
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error('Failed to add item:', error);
      });
  };

  return (
    <>
      {user ? (
        <div>
          <Typography variant="h4">Add New Item</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Title"
              value={state.title}
              onChange={(e) => setState({ ...state, title: e.target.value })}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Description"
              value={state.description}
              onChange={(e) => setState({ ...state, description: e.target.value })}
              multiline
              rows={4}
              fullWidth
              margin="normal"
              required
            />
            <FileInput
              onChange={fileInputChangeHandler}
              name="image"
              label="Upload Image"
            />
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Category</InputLabel>
              <Select
                value={state.category}
                onChange={(e) => setState({ ...state, category: e.target.value })}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Price"
              type="number"
              value={state.price}
              onChange={(e) => setState({ ...state, price: e.target.value })}
              fullWidth
              margin="normal"
              required
            />
            <Button sx={{ mt: 2 }} variant="contained" type="submit">
              Submit
            </Button>
          </form>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default AddItem;
