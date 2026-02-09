import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout/MainLayout';
import Transactions from './containers/Transactions/Transactions';
import Categories from './containers/Categories/Categories';
import AddNewTransaction from './containers/Transactions/AddNewTransaction/AddNewTransaction';

const App = () => {
  return (
    <>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Transactions />} />
          <Route path="/transactions/add" element={<AddNewTransaction />} />

          <Route path="/categories" element={<Categories />} />
        </Routes>
      </MainLayout>
    </>
  );
};

export default App;
