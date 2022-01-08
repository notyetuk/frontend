import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Login} from './Pages/Login';
import {NotFound} from './Pages/NotFound';
import {Register} from './Pages/Register';
import {Home} from './Pages/Home';
import {Lists} from "./Pages/Lists";
import {authenticate} from "./Services/AuthService";
import {UserStore} from "./Store/UserStore";

export function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>

        <Route path="/lists" element={<Lists/>}/>

        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </Router>
  );
}
