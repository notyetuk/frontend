import { Layout } from './Layout';

export function Home() {
  return (
    <>
      <Layout>
        <div className="dark:text-white text-4xl font-extrabold tracking-wider">Welcome to NotYet!</div>
        <div className="dark:text-white mt-5 text-xl tracking-tight">Here you can create and share your WishLists!</div>
      </Layout>
    </>
  );
}
