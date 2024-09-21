import React, {useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {fetchItemById, deleteItem} from './itemsThunks';
import {selectCurrentItem, selectIsItemsLoading, selectItemsError} from './itemsSlice';
import {Box, Typography, Button, CardMedia, CircularProgress} from '@mui/material';
import {selectUser} from '../users/usersSlice';
import {AppDispatch} from '../../app/store';

const ItemDetails: React.FC = () => {
  const {id} = useParams<{ id: string }>();
  const dispatch: AppDispatch = useAppDispatch();
  const navigate = useNavigate();

  const item = useAppSelector(selectCurrentItem);
  const isLoading = useAppSelector(selectIsItemsLoading);
  const error = useAppSelector(selectItemsError);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (id) {
      dispatch(fetchItemById(id));
    }
  }, [id, dispatch]);

  const handleDelete = () => {
    if (item) {
      dispatch(deleteItem(item._id))
        .then(() => navigate('/'));
    }
  };

  if (isLoading) return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <CircularProgress/>
    </Box>
  );

  if (error || !item) return <Typography>Error loading item details.</Typography>;

  return (
    <Box>
      <Typography variant="h4">{item.title}</Typography>
      <CardMedia
        component="img"
        height="400"
        image={`http://localhost:8000/${item.image}`}
        alt={item.title}
        sx={{objectFit: 'contain'}}
      />
      <Typography variant="body1" mt={5}>{item.description}</Typography>
      <Typography variant="h6"><b>Price:</b> {item.price.toFixed(2)} som</Typography>
      <Typography variant="body1"><b>Category:</b> {item.category}</Typography>
      <Typography variant="body1"><b>Seller:</b> {item.seller.displayName}</Typography>
      <Typography variant="body1"><b>Phone:</b> {item.seller.phoneNumber}</Typography>

      {user && user._id === item.seller._id && (
        <Button variant="contained" color="error" onClick={handleDelete} sx={{mt: 2}}>
          Mark as sold
        </Button>
      )}
    </Box>
  );
};

export default ItemDetails;
