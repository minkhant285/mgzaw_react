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
import Profile from '../pages/profile/profile';
import About from '../pages/about';
import Auth from '../pages/auth/auth';
import useApi from '../hooks/useApi';
import { UserInfoResult } from '../models';
import ComponentPage from '../pages/component/component';
import ChangePasswordPage from '../pages/auth/changepass';
import ChangePhonePage from '../pages/profile/change_phone';
import ChangeEmailPage from '../pages/profile/change_email';
import CreateMovie from '../pages/dashboard/create';
import Movie from '../pages/movie/movie_detail';
import MovieFeed from '../pages/movie/feed';
import Footer from '../components/footer';
import TNC from '../pages/about/terms';
import Privacy from '../pages/about/privacy';
import DownloadPage from '../pages/movie/download';
import MovieDashboard from '../pages/dashboard/dashboard';
import EditMovie from '../pages/dashboard/edit';
// import { ApiInstance } from '../services';
import Landing from '../pages/landing';
import DMCA from '../pages/about/dmca';
import US2257 from '../pages/about/us2257';

const AppRouteProvider: React.FC = () => {

    const { token } = useContext(AppContext);

    const AuthLoader: LoaderFunction = async () => {
        // const res = await ApiInstance({ method: 'GET', url: 'auth/checkAuthStatus' });
        // if (res) {
        //     if (res.data.result !== userInfo?.id || res.status === 401) {
        //         return redirect('/login');
        //     }
        // }
        return 0;
    }


    const router = createBrowserRouter([
        // {
        //     path: "/",
        //     element: <RouterRender component={<Landing />} />,
        //     errorElement: <div>Error</div>,
        // },
        {
            path: "/",
            element: <RouterRender component={<MovieFeed />} />,
            errorElement: <div>Error</div>,
        },
        {
            path: "/s/category/:c_name",
            element: <RouterRender component={<MovieFeed />} />,
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
            path: "/dmca",
            element: <RouterRender component={<DMCA />} />,
            errorElement: <div>Error</div>,
        },
        {
            path: "/us2257",
            element: <RouterRender component={<US2257 />} />,
            errorElement: <div>Error</div>,
        },
        {
            path: "/terms",
            element: <RouterRender component={<TNC />} />,
            errorElement: <div>Error</div>,
        },
        {
            path: "/privacy",
            element: <RouterRender component={<Privacy />} />,
            errorElement: <div>Error</div>,
        },
        {
            path: "/movie/create",
            loader: AuthLoader,
            element: <RouterRender component={<CreateMovie />} />,
            errorElement: <div>Error</div>,
        },
        {
            path: "/movie/edit",
            loader: AuthLoader,
            element: <RouterRender component={<EditMovie />} />,
            errorElement: <div>Error</div>,
        },
        {
            path: "/movie/dashboard",
            loader: AuthLoader,
            element: <RouterRender component={<MovieDashboard />} />,
            errorElement: <div>Error</div>,
        },
        {
            path: "/movie/watch",
            element: <RouterRender component={<Movie />} />,
            // errorElement: <div>Error</div>,
        },
        {
            path: "/movie/download",
            element: <RouterRender component={<DownloadPage />} />,
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
            path: "/changephone",
            loader: AuthLoader,
            element: <RouterRender component={<ChangePhonePage />} />,
            errorElement: <div>Error</div>,
        },
        {
            path: "/changeemail",
            loader: AuthLoader,
            element: <RouterRender component={<ChangeEmailPage />} />,
            errorElement: <div>Error</div>,
        },
        {
            path: "/login",
            loader: () => {
                if (token) {
                    return redirect('/')
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
                    return redirect('/')
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
                    return redirect('/')
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
                saveUserInfo(r.result);
                console.log("main user info called", userInfo)
            }
        })()
    }, [user.data])

    return <div className='bg-background min-h-screen overflow-y-auto '>
        {appLoading && <Loading />}
        <AppBar />
        <div className='min-h-[calc(100vh-90px)] pt-[56px]'>
            {component}
        </div>
        <Footer />
    </div>
}
