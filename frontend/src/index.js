import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import ChatProvider from './Context/ChatProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    {/* <RouterProvider> */}

      <ChatProvider>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </ ChatProvider>
    {/* </RouterProvider> */}
  </BrowserRouter>
);


