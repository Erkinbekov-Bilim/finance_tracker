import type { FC, PropsWithChildren } from 'react';
import './MainLayout.css';
import Container from '../Container/Container';
import Header from '../../components/Header/Header';

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="fixed-position-center main-layout">
      <Container>
        <Header />
        <main className="main">{children}</main>
      </Container>
    </div>
  );
};

export default MainLayout;
