import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './Pages/Login';
import { NotFound } from './Pages/NotFound';
import { Register } from './Pages/Register';
import { Home } from './Pages/Home';
import { Lists } from './Pages/Lists';
import { Items } from './Pages/Items';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/list" element={<Lists />} />
        <Route path="/list/:id" element={<Items />} />
        <Route path="/list/s/:id" element={<Items isShared="true" />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
