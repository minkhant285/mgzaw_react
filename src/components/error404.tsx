import { useNavigate } from 'react-router-dom';

function Error404() {
    const navigation = useNavigate();

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-background text-white">
            <div className="text-center text-white">
                <h1 className="text-9xl font-bold mb-4">404</h1>
                <h2 className="text-3xl md:text-4xl font-medium mb-2">Oops! Page not found</h2>
                <p className="text-lg md:text-xl mb-6">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <button
                    onClick={() => navigation('/', { replace: true })}
                    className="px-6 py-3 bg-primary text-white font-semibold rounded-full shadow-md hover:bg-gray-200 transition duration-300"
                >
                    Go Back Home
                </button>
            </div>
        </div>
    );
}

export default Error404;
