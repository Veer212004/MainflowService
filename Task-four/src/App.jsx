import React from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Signup />
      </div>
    ),
  },
  {
    path: "/login",
    element: 
      <div>
        <Login/>
      </div>,
  }
]);
function App() {
  return (
     <div>
      <RouterProvider router={router} />
    </div>
  
  );
}

export default App;
