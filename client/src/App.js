import AuthenticatedApplication from './AuthenticatedApplication'
import UnauthenticatedApplication from './UnauthenticatedApplication'
import useToken from './components/hooks/useToken'
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './App.css'

function App() {
  const {token, setToken} = useToken();
  return (
    <>
      {
      (token && token !== '')
      ? <AuthenticatedApplication setToken={setToken}></AuthenticatedApplication>
      : <UnauthenticatedApplication setToken={setToken}></UnauthenticatedApplication>
      }
    </>
    
  );
}

export default App;
