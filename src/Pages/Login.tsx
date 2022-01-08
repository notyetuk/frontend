import { useState } from 'react';
import { Button } from '../Components/Button';
import { Input } from '../Components/Input';
import { Layout } from './Layout';
import axios from 'axios';
import { Toast } from '../Components/Toast';
import { UserStore } from '../Stores/UserStore';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [toastShow, setToastShow] = useState(false);
  const handleToast = (message: string, type: string, show: boolean) => {
    setToastMessage(message);
    setToastType(type);
    setToastShow(show);
  }

  const handleCloseToast = () => {
    setToastShow(false);
  }

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

    if(response) {
      handleToast(response.data.message, 'success', true);

      UserStore.username = response.data.username;
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);

      location.href = '/';
    }
  }

  return (
    <>
      <Layout>
        <Toast text={toastMessage} type={toastType} show={toastShow} closeToast={handleCloseToast}/>
        <form className="w-2/3 md:w-3/4 mx-auto" onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-2">
            <Input
              handleChange={(e) => setUsername(e.target.value)}
              placeholder={'Username.'}
              value={username}
            />
            <Input
              type="password"
              handleChange={(e) => setPassword(e.target.value)}
              placeholder={'Password.'}
              value={password}
            />
            <Button label="Login" class="button-primary" />
          </div>
        </form>
      </Layout>
    </>
  );
}
