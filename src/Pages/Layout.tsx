import { Nav } from "../Components/Nav";

export function Layout({ children }: any) {
  return (
  <>
    <Nav />
    {children}
  </>
  );
}
