import { useState } from 'react';
import { Layout } from './Layout';
import { Input } from '../Components/Input';
import { Button } from '../Components/Button';
import axios from 'axios';
import { ConfigStore as $global } from '../Stores/ConfigStore';
import { Toast } from '../Components/Toast';

export function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [toastShow, setToastShow] = useState(false);

  const handleCloseToast = () => {
    setToastShow(false);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const signUpData = {
      username: username,
      email: email,
      password: password,
    };
    axios
      .post(`${$global.API}/auth/register`, signUpData)
      .then((r) => {
        setToastMessage(r.data.message);
        setToastShow(true);
        setToastType('success');
      })
      .catch((e) => {
        setToastMessage(e.response.data.message);
        setToastShow(true);
        setToastType('error');
        return;
      });

    setUsername('');
    setPassword('');
    setEmail('');
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
        <div className="text-2xl mb-10">Register a new account.</div>
        <form className="w-2/3 md:w-3/4 mx-auto" onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-2">
            <Input
              handleChange={(v) => setUsername(v)}
              placeholder="Username."
              value={username}
              required={true}
            />
            <Input
              handleChange={(v) => setEmail(v)}
              placeholder="Email."
              value={email}
              required={true}
            />
            <Input
              type="password"
              handleChange={(v) => setPassword(v)}
              placeholder="Password."
              value={password}
              required={true}
            />
            <Button label="Register" class="button button-primary" />
          </div>
        </form>
      </Layout>
    </>
  );
}
