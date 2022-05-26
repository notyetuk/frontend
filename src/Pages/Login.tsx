import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../Components/Button';
import { Input } from '../Components/Input/Input';
import { Layout } from './Layout';
import { Toast } from '../Components/Toast';
import { UserStore } from '../Stores/UserStore';
import axios from 'axios';

export function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType]       = useState('success');
  const [toastShow, setToastShow]       = useState(false);
  const handleToast                     = (message: string, type: string, show: boolean) => {
    setToastMessage(message);
    setToastType(type);
    setToastShow(show);
  };

  const handleCloseToast = () => {
    setToastShow(false);
  };

  const API = import.meta.env.VITE_API;

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const body = {
      username,
      password,
    };

    const response = await axios.post(`${API}/auth/login`, body).catch((e) => {
      return handleToast(e.response.data.message, 'error', true);
    });

    if ( response ) {
      handleToast(response.data.message, 'success', true);

      UserStore.userId = response.data._id;
      UserStore.username = response.data.username;
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);


      return navigate('/list');
    }
  };

  return (
    <>
      <Layout>
        <Toast
          text={toastMessage}
          type={toastType}
          show={toastShow}
          closeToast={handleCloseToast}
        />
        <div className="text-2xl mb-10 dark:text-white">Login to manage your lists.</div>
        <form className="w-2/3 md:w-3/4 mx-auto" onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-2">
            <Input
              handleChange={(v) => setUsername(v)}
              placeholder={'Username.'}
              value={username}
            />
            <Input
              type="password"
              handleChange={(v) => setPassword(v)}
              placeholder={'Password.'}
              value={password}
            />
            <Button label="Login" class="button button-primary"/>
          </div>
        </form>
      </Layout>
    </>
  );
}
