import type { NextPage } from 'next';
import DrawerMui from '../components/DrawerMui';
import Header from '../components/Header';
import Modal from '../components/Modal';
import TableMui from '../components/TableMui';

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <DrawerMui />
      <Modal />
      <TableMui />
    </>
  );
};

export default Home;
