import { Route, Routes, useNavigate } from 'react-router-dom';
import { Login } from './Pages/Login';
import { NotFound } from './Pages/NotFound';
import { Register } from './Pages/Register';
import { Home } from './Pages/Home';
import { Lists } from './Pages/Lists';
import { List } from './Pages/List';
import React, { useEffect, useState } from 'react';
import { UserStore } from './Stores/UserStore';
import { authenticate, UserContext } from './Services/AuthService';

export function App() {

  const [loading, setLoading] = useState(true);
  const navigate              = useNavigate();

  useEffect(() => {
    authenticate().then(() => {
      setLoading(false);
    }).catch(() => {
      console.log('token error');
      localStorage.removeItem('token');
      setLoading(false);
      navigate('/login');
    });
  }, []);

  document.title = 'NotYet.uk - Welcome';

  return (
    <>
      {loading ? 'loading...' :
        <UserContext.Provider value={UserStore}>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>

            <Route path="/list" element={<Lists/>}/>
            <Route path="/list/:id" element={<List/>}/>
            <Route path="/list/s/:id" element={<List isShared="true"/>}/>

            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </UserContext.Provider>
      }
    </>
  );
}
