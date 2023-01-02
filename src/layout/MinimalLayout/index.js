import { Outlet } from 'react-router-dom';
import Notification from 'components/Notification';

// ==============================|| MINIMAL LAYOUT ||============================== //

const MinimalLayout = () => (
    <>
        <Outlet />
        <Notification />
    </>
);

export default MinimalLayout;
