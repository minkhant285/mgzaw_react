import React, { useContext, useEffect } from 'react';
import {
    createBrowserRouter,
    LoaderFunction,
    redirect,
    RouterProvider
} from "react-router-dom";
import Loading from '../components/loading';
import { AppContext } from './app.provider';
import AppBar from '../components/appbar';
import Home from '../pages/home';
import Landing from '../pages/landing';
import Profile from '../pages/profile/profile';
import About from '../pages/about';
import Auth from '../pages/auth/auth';
import useApi from '../hooks/useApi';
import { UserInfoResult } from '../models';
import ComponentPage from '../pages/component/component';
import ChangePasswordPage from '../pages/auth/changepass';

const AppRouteProvider: React.FC = () => {

    const { token } = useContext(AppContext);

    const AuthLoader: LoaderFunction = () => {
        if (!token || token === '') {
            return redirect('/login')
        }
        return 0;
    }


    const router = createBrowserRouter([
        {
            path: "/",
            element: <RouterRender component={<Landing />} />,
            errorElement: <div>Error</div>,
        },
        {
            path: "/components",
            element: <RouterRender component={<ComponentPage />} />,
            errorElement: <div>Error</div>,
        },
        {
            path: "/about",
            element: <RouterRender component={<About />} />,
            errorElement: <div>Error</div>,
        },
        {
            path: "/home",
            loader: AuthLoader,
            element: <RouterRender component={<Home />} />,
            errorElement: <div>Error</div>,
        },
        {
            path: "/profile",
            loader: AuthLoader,
            element: <RouterRender component={<Profile />} />,
            errorElement: <div>Error</div>,
        },
        {
            path: "/changepass",
            loader: AuthLoader,
            element: <RouterRender component={<ChangePasswordPage />} />,
            errorElement: <div>Error</div>,
        },
        {
            path: "/login",
            loader: () => {
                if (token) {
                    return redirect('/home')
                }
                return 0;
            },
            element: <RouterRender component={<Auth />} />,
            errorElement: <div>Error</div>,
        },
        {
            path: "/register",
            loader: () => {
                if (token) {
                    return redirect('/home')
                }
                return 0;
            },
            element: <RouterRender component={<Auth />} />,
            errorElement: <div>Error</div>,
        },
        {
            path: "/forgotpass",
            loader: () => {
                if (token) {
                    return redirect('/home')
                }
                return 0;
            },
            element: <RouterRender component={<Auth />} />,
            errorElement: <div>Error</div>,
        }
    ]);

    return <div>
        <RouterProvider router={router} />
    </div>;
};

export default AppRouteProvider;

const RouterRender: React.FC<{ component: React.ReactNode }> = ({ component }) => {
    const { appLoading, userInfo, saveUserInfo, token } = useContext(AppContext);
    const user = useApi('getUser');

    useEffect(() => {
        (async () => {
            if (!userInfo && token) {
                let r = await user.sendRequest({
                    url: `user`,
                    method: 'GET',
                }) as UserInfoResult;
                saveUserInfo(r.data);
                console.log("main user info called", userInfo)
            }
        })()
    }, [user.data])

    return <div className='bg-background flex flex-col   top-0 left-0 right-0 bottom-0 absolute'>
        {appLoading && <Loading />}
        <AppBar />
        {component}
    </div>
}
