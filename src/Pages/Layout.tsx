import { useState } from 'react';
import { Nav } from '../Components/Nav';
import { authenticate } from '../Services/AuthService';
import { UserStore } from '../Stores/UserStore';
import { LeftDrawer } from '../Components/LeftDrawer';
import { Footer } from '../Components/Footer';

export function Layout({ children }: any) {
  const [user, setUser] = useState(UserStore.username);

  authenticate().then(() => {
    setUser(UserStore.username);
  });

  return (
    <div>
      <Nav user={user} />
      <div className="flex h-auto">
        <div className="p-5 w-full md:w-2/3 lg:w-2/4 xl:w-2/4 mx-auto mb-2 text-center">
          {children}
        </div>
      </div>
    </div>
  );
}
