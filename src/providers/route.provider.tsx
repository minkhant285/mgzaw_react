import React, { useContext, useEffect } from 'react';
import {
    createBrowserRouter,
    ErrorResponse,
    LoaderFunction,
    Navigate,
    redirect,
    RouterProvider,
    useParams,
    useRouteError
} from "react-router-dom";
import Loading from '../components/loading';
import { AppContext } from './app.provider';
import AppBar from '../components/appbar';
import Profile from '../pages/profile/profile';
import About from '../pages/about';
import Auth from '../pages/auth/auth';
import useApi from '../hooks/useApi';
import { UserInfoResult } from '../models';
import ChangePasswordPage from '../pages/auth/changepass';
import ChangePhonePage from '../pages/profile/change_phone';
import ChangeEmailPage from '../pages/profile/change_email';
import CreateMovie from '../pages/dashboard/create';
import Movie from '../pages/video/movie_detail';
import MovieFeed from '../pages/video/feed';
import Footer from '../components/footer';
import TNC from '../pages/about/terms';
import Privacy from '../pages/about/privacy';
import DownloadPage from '../pages/video/download';
import MovieDashboard from '../pages/dashboard/dashboard';
import EditMovie from '../pages/dashboard/edit';
import { ApiInstance } from '../services';
import DMCA from '../pages/about/dmca';
import US2257 from '../pages/about/us2257';
import GlobalError from '../components/error';
import { AxiosError, AxiosResponse } from 'axios';
import Error404 from '../components/error404';
import { StickyBanner } from 'exoclick-react';


const AppRouteProvider: React.FC = () => {

    const { authStatusControl, isAuthenticated } = useContext(AppContext);

    const AuthCheckerApi = async () => {
        const res = await ApiInstance({ method: 'GET', url: 'auth/checkAuthStatus' });
        const resData = res as AxiosResponse;
        if (resData.data) {
            authStatusControl(true);
        }
        return res;
    }

    function ErrorBoundary() {
        const error = useRouteError() as ErrorResponse;
        if (error.status === 404) {
            return <Error404 />;
        }
        return <div>Something went wrong!</div>;
    }

    const AuthLoader: LoaderFunction = async () => {

        const resErr = await AuthCheckerApi() as AxiosError<unknown, any>;
        if (resErr.code === AxiosError.ERR_BAD_REQUEST) {
            // console.log(resErr.code)
            return redirect('/login');
        }
        return 0;
    }

    const RedirectToPageOne: React.FC = () => {
        const { c_name } = useParams<{ c_name: string }>(); // Retrieve the c_name parameter from the URL

        // If c_name is undefined or empty, return null to prevent erroneous redirects
        if (!c_name) return null;

        // Redirect to /video/category/{c_name}/page/1
        return <Navigate to={`/video/category/${c_name}/page/1`} replace />;
    };

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Navigate to={'/video/page/1'} replace />,
            // element: <RouterRender component={<MovieFeed />} />,
            errorElement: <ErrorBoundary />
        },
        {
            path: "/video/page/:pg_number",
            element: <RouterRender component={<MovieFeed />} />,
            errorElement: <ErrorBoundary />
        },
        {
            path: "/video/category/:c_name",
            element: <RedirectToPageOne />,
            errorElement: <ErrorBoundary />,

        },
        {
            path: "/video/category/:c_name/page/:pg_number",
            element: <RouterRender component={<MovieFeed />} />,
            errorElement: <ErrorBoundary />,

        },
        {
            path: "/about",
            element: <RouterRender component={<About />} />,
            errorElement: <ErrorBoundary />
        },
        {
            path: "/dmca",
            element: <RouterRender component={<DMCA />} />,
            errorElement: <ErrorBoundary />
        },
        {
            path: "/us2257",
            element: <RouterRender component={<US2257 />} />,
            errorElement: <ErrorBoundary />
        },
        {
            path: "/terms",
            element: <RouterRender component={<TNC />} />,
            errorElement: <ErrorBoundary />
        },
        {
            path: "/privacy",
            element: <RouterRender component={<Privacy />} />,
            errorElement: <ErrorBoundary />
        },
        {
            path: "/video/create",
            loader: AuthLoader,
            element: <RouterRender component={<CreateMovie />} />,
            errorElement: <ErrorBoundary />
        },
        {
            path: "/video/edit",
            loader: AuthLoader,
            element: <RouterRender component={<EditMovie />} />,
            errorElement: <ErrorBoundary />
        },
        {
            path: "/manage/dashboard/:mode",
            loader: AuthLoader,
            element: <RouterRender component={<MovieDashboard />} />,
            errorElement: <ErrorBoundary />
        },
        {
            path: "/manage/dashboard",
            loader: AuthLoader,
            element: <RouterRender component={<MovieDashboard />} />,
            errorElement: <ErrorBoundary />
        },
        {
            path: "/video/watch/:name",
            element: <RouterRender component={<Movie />} />,
            errorElement: <ErrorBoundary />
        },
        {
            path: "/video/download",
            element: <RouterRender component={<DownloadPage />} />,
            errorElement: <ErrorBoundary />
        },
        {
            path: "/profile",
            loader: AuthLoader,
            element: <RouterRender component={<Profile />} />,
            errorElement: <ErrorBoundary />
        },
        {
            path: "/changepass",
            loader: AuthLoader,
            element: <RouterRender component={<ChangePasswordPage />} />,
            errorElement: <ErrorBoundary />
        },
        {
            path: "/changephone",
            loader: AuthLoader,
            element: <RouterRender component={<ChangePhonePage />} />,
            errorElement: <ErrorBoundary />
        },
        {
            path: "/changeemail",
            loader: AuthLoader,
            element: <RouterRender component={<ChangeEmailPage />} />,
            errorElement: <ErrorBoundary />
        },
        {
            path: "/login",
            loader: async () => {
                const resErr = await AuthCheckerApi() as AxiosError;

                if (resErr.code === AxiosError.ERR_BAD_REQUEST) {
                    // console.log(resErr.code)
                    return 0;
                }
                return redirect('/manage/dashboard');
            },
            element: <RouterRender component={<Auth />} />,
            errorElement: <ErrorBoundary />
        },
        {
            path: "/register",
            loader: async () => {
                await AuthCheckerApi();
                if (isAuthenticated) {
                    return redirect('/')
                }
                return 0;
            },
            element: <RouterRender component={<Auth />} />,
            errorElement: <ErrorBoundary />
        },
        {
            path: "/forgotpass",
            loader: async () => {
                await AuthCheckerApi();
                if (isAuthenticated) {
                    return redirect('/')
                }
                return 0;
            },
            element: <RouterRender component={<Auth />} />,
            errorElement: <ErrorBoundary />
        }
    ]);

    return <div>
        <RouterProvider router={router} />
    </div>;
};

export default AppRouteProvider;

const RouterRender: React.FC<{ component: React.ReactNode }> = ({ component }) => {
    const { appLoading, userInfo, saveUserInfo, token, appError } = useContext(AppContext);
    const user = useApi('getUser');

    useEffect(() => {
        (async () => {
            if (!userInfo && token) {
                let r = await user.sendRequest({
                    url: `user`,
                    method: 'GET',
                }) as UserInfoResult;
                saveUserInfo(r.result);
            }
        })()
    }, [user.data])

    return <div className='bg-background min-h-screen overflow-y-auto '>
        {appLoading && <Loading />}
        {appError && <GlobalError />}
        <AppBar />
        <div className='min-h-[calc(100vh-90px)] pt-[56px]'>
            {component}
        </div>
        <Footer />
        {process.env.NODE_ENV === 'production' && <StickyBanner format='300x250' zoneId={5425980} />}
    </div>
}
