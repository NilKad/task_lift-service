import { Outlet } from 'react-router-dom';
import * as SC from './SharedLayout.styled';

export const SharedLayout = () => {
  return (
    <SC.Main>
      <Outlet />
    </SC.Main>
  );
};
