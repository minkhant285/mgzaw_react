import React, { useContext } from 'react';
import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";
import Home from '../pages/home';
import Loading from '../components/loading';
import { ThemeContext } from './app.provider';

const AppRouteProvider: React.FC = () => {


    const router = createBrowserRouter([
        {
            path: "/",
            element: <RouterRender component={<Home />} />,
            errorElement: <div>Error</div>,
        }
    ]);

    return <div>
        <RouterProvider router={router} />
    </div>;
};

export default AppRouteProvider;

const RouterRender: React.FC<{ component: React.ReactNode }> = ({ component }) => {
    const { appLoading } = useContext(ThemeContext);

    return <div className='bg-background flex flex-col justify-center  top-0 left-0 right-0 bottom-0 absolute'>
        {appLoading && <Loading />}
        {component}
        {/* <AppBar />
    {authDetail.isAuthenticated ?
        <div style={{ display: 'flex', width: '100%', height: '93vh' }}>
            <Box visibleFrom='md' style={{ flex: 1, maxWidth: '270px' }}>
                <DrawerContent />
            </Box>
            <div style={{ overflow: 'auto', flex: 1 }}>
                {component}
            </div>
        </div>
        : <Auth />}
    {
        !authDetail.isAuthenticated && component
    } */}
    </div>
}
