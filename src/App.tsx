import { AppProvider } from "./providers/app.provider";
import AppRouteProvider from "./providers/route.provider";

function App() {
    return (
        <AppProvider>
            <AppRouteProvider />
        </AppProvider>
    )
}

export default App
