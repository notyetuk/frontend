import { useState } from 'react';
import { Nav } from '../Components/Nav';
import { authenticate } from '../Services/AuthService';
import { UserStore } from '../Stores/UserStore';

export function Layout({ children }: any) {
  const [user, setUser] = useState(UserStore.username);

  authenticate().then(() => {
    setUser(UserStore.username);
  });

  return (
    <>
      <Nav user={user} />
      <div className="p-5 w-full md:w-2/3 lg:w-2/3 xl:w-2/4 mx-auto mb-2 text-center">
        {children}
      </div>
    </>
  );
}
