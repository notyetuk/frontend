import { useState } from 'react';
import { Layout } from './Layout';
import { Input } from '../Components/Input';
import { Button } from '../Components/Button';

export function Register() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    
    setUsername('');
    setPassword('');
  }

  return (
    <>
      <Layout>
        <form className="w-2/3 md:w-3/4 mx-auto" onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-2">
            <Input
              handleChange={(e) => setUsername(e.target.value)}
              placeholder='Username.'
              value={username}
            />
            <Input
              type="password"
              handleChange={(e) => setPassword(e.target.value)}
              placeholder='Password.'
              value={password}
            />
            <Button label="Register" class="button-primary" />
          </div>
        </form>
      </Layout>
    </>
  );
}
