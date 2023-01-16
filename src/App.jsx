import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Register from "./Components/Register/Register";
import Home from './Components/Home/Home.jsx'
import All from './Components/All/All.jsx'
import MasterLayout from './Components/MasterLayout/MasterLayout.jsx'
import Login from "./Components/Login/Login";
import { useState } from "react";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import MediaContextProvider from "./Components/Context/MediaContext";
import GameDetails from "./Components/GameDetails/GameDetails";
import NotFound from "./Components/NotFound/NotFound";
import Platforms from "./Components/Platforms/Platforms";
import ShareDataContextProvider from "./Components/Context/FilterContext";
import SortBy from "./Components/SortBy/SortBy";
import Categories from "./Components/Categories/Categories";


function App() {
  const [userData, setuserData] = useState(null);

  function saveUserData() {
    let encoded = localStorage.getItem('userToken');
    let decoded = jwtDecode(encoded);
    setuserData(decoded)

  };

  useEffect(() => {
    if (localStorage.getItem('userToken') !== null) {
      saveUserData();

    }
  }, []);

  function logOut() {

    localStorage.removeItem('userToken');
    setuserData(null);
    return <Navigate to='/login' />

  };

  function ProtectedRoute({children}) {

    if (localStorage.getItem('userToken') == null) {

      return <Navigate to='/login' />

    } else {
      return children
    }

  }
  

  const Routers = createBrowserRouter([
    {
      path: '/', element: <MasterLayout userData={userData} logOut={logOut} />, children: [
        { path: 'home', element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: 'gamedetails/:id', element: <ProtectedRoute><GameDetails /></ProtectedRoute> },
        { path: 'login', element: <Login saveUserData={saveUserData} /> },
        { path: 'register', element: <Register /> },
        { path: 'all', element: <ProtectedRoute><All /></ProtectedRoute> },
        { path: 'platforms/:platform', element: <ProtectedRoute><Platforms /></ProtectedRoute> },
        { path: 'sortby/:sortby', element: <ProtectedRoute><SortBy /></ProtectedRoute> },
        { path: 'categories/:category', element: <ProtectedRoute><Categories /></ProtectedRoute> },
        { path: '*', element: <ProtectedRoute><NotFound /></ProtectedRoute> },
      ]
    }
  ])

  return <>

<ShareDataContextProvider>
<MediaContextProvider> 
     <RouterProvider router={Routers} />
</MediaContextProvider>
</ShareDataContextProvider>


  </>
}

export default App;
