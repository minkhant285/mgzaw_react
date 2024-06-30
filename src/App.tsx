import Home from "./pages/home";
import { ThemeProvider } from "./providers/Theme.provider";

function App() {
    return (
        <ThemeProvider>
            <Home />
        </ThemeProvider>
    )
}

export default App
