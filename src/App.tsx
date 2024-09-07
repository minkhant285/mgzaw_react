import { AppProvider } from "./providers/app.provider";
import ReduxProvider from "./providers/redux.provider";
import AppRouteProvider from "./providers/route.provider";

function App() {
    return (
        <ReduxProvider>
            <AppProvider>
                <AppRouteProvider />
            </AppProvider>
        </ReduxProvider>
    )
}

export default App
