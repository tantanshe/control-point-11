import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {fetchItems} from './itemsThunks';
import {selectItems, selectIsItemsLoading, selectItemsError} from './itemsSlice';
import {Box, Grid, Typography, CircularProgress, Card, CardMedia, CardContent} from '@mui/material';
import {Link, useParams} from 'react-router-dom';
import CategorySidebar from '../../UI/CategorySidebar/CategorySidebar';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectItems);
  const isLoading = useAppSelector(selectIsItemsLoading);
  const error = useAppSelector(selectItemsError);
  const {category} = useParams<{ category?: string }>();

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const filteredItems = category ? items.filter(item => item.category.toLowerCase() === category) : items;

  if (isLoading) return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <CircularProgress/>
    </Box>
  );

  if (error) return <Typography>Error loading items.</Typography>;

  return (
    <Box display="flex">
      <CategorySidebar/>
      <Box flexGrow={1} p={2}>
        <Typography variant="h4" mb={2}>
          {category ? `${category.charAt(0).toUpperCase() + category.slice(1)}` : 'All Items'}
        </Typography>
        {filteredItems.length === 0 ? (
          <Typography>No items yet.</Typography>
        ) : (
          <Grid container spacing={2}>
            {filteredItems.map(item => (
              <Grid item xs={12} sm={6} md={4} key={item._id}>
                <Link to={`/items/${item._id}`}
                      style={{textDecoration: 'none', color: 'inherit'}}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="140"
                      image={`http://localhost:8000/${item.image}`}
                      alt={item.title}
                    />
                    <CardContent>
                      <Typography variant="h6">{item.title}</Typography>
                      <Typography variant="body1">{item.price} som</Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
