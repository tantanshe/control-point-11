import './App.css';
import AppToolbar from './UI/AppToolbar/AppToolbar';
import {Container, Typography} from '@mui/material';
import {Route, Routes} from 'react-router-dom';
import Register from './features/users/Register';
import Login from './features/users/Login';
import HomePage from './features/items/HomePage';
import AddItem from './features/items/AddItem';
import ItemDetails from './features/items/ItemDetails';

function App() {

  return (
    <>
      <header>
        <AppToolbar/>
      </header>
      <Container maxWidth="lg" component="main">
        <Routes>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/addItem" element={<AddItem/>}/>
          <Route path="/items/:id" element={<ItemDetails/>} />
          <Route path="/category/:category" element={<HomePage />} />
          <Route path="*" element={<Typography variant="h1">Not found</Typography>}/>
        </Routes>
      </Container>
    </>
  );
}

export default App;
