import React, { useContext } from 'react';
import Home from './pages/home/Home';
import Storiescomponent from './components/story/storiescomponent';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Profile from './pages/profile/Profile';
import Login from './pages/login/Login';
import Register from './pages/Register/Register';
import FriendProfile from './pages/FriendProfile/FriendProfile';
import { AuthContext } from './context/AuthContext';

function App() {
  const { user } = useContext(AuthContext);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/stories/:clientid" element={<Storiescomponent />} />
          <Route path="/" exact element={user ? <Home /> : <Register />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/followers/:followername" element={<FriendProfile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
