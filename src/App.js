import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRoutes from './AppRoutes';
import { AuthContextProvider } from './context/Auth-context';


function App() {

  return (
    <AuthContextProvider>
      <AppRoutes />
    </AuthContextProvider>
  )
}

export default App