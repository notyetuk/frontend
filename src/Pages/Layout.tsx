import { Nav } from '../Components/Nav';

export function Layout({ children }: any) {

  return (
    <>
      <Nav />
      <div className="p-5 w-full mx-auto mb-2 text-center">
        {children}
      </div>
    </>
  );
}
