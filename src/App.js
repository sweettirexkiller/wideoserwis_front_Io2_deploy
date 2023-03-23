import React, {useState} from 'react';
import { MsalProvider } from "@azure/msal-react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Header from './components/Header';
import Home from './components/Home';
import MyAccount from './components/MyAccount';

const Pages = () => {

  const [requestID, setRequestID] = useState(NaN);

  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path='/' element={<Home setRequestID={setRequestID}/>}/>
        <Route path='/myaccount' element={<MyAccount/>}/></Routes>

    </div>
  );
}


const App = ({ instance }) => {


  return (
    <ChakraProvider>
      <MsalProvider instance={instance}>
        <BrowserRouter>
          <Pages/>
        </BrowserRouter>
      </MsalProvider>
    </ChakraProvider>
  );
}

export default App;
