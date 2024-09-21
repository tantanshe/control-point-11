import {createRoot} from 'react-dom/client';
import App from './App';
import {PersistGate} from 'redux-persist/integration/react';
import {ThemeProvider} from '@mui/material';
import {Provider} from 'react-redux';
import {persistor, store} from './app/store';
import {BrowserRouter} from 'react-router-dom';
import theme from './theme';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </ThemeProvider>
    </PersistGate>
  </Provider>
);