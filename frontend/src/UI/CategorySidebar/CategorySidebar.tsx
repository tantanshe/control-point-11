import React from 'react';
import {Box, List, ListItem, ListItemText, styled} from '@mui/material';
import {Link} from 'react-router-dom';

const categories = ['Albums', 'Clothing', 'Furniture', 'Beauty'];

const StyledLink = styled(Link)({
  color: 'inherit',
  textDecoration: 'none',
  padding: '10px',
  borderRadius: '20px',
  '&:hover': {
    color: 'indigo',
    backgroundColor: '#ffffff'
  }
});

const CategorySidebar: React.FC = () => {
  return (
    <Box width="250px" bgcolor="#f5f5f5" p={2}>
      <List>
        <ListItem component={StyledLink} to="/">
          <ListItemText primary="All Items"/>
        </ListItem>
        {categories.map((category) => (
          <ListItem key={category} component={StyledLink} to={`/category/${category.toLowerCase()}`}>
            <ListItemText primary={category}/>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CategorySidebar;
