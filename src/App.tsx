import { ThemeProvider } from "./providers/app.provider";
import AppRouteProvider from "./providers/route.provider";

function App() {
    return (
        <ThemeProvider>
            <AppRouteProvider />
        </ThemeProvider>
    )
}

export default App
