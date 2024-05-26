import { ThemeProvider } from '@mui/material';
import theme from './Themes/Theme';
import Layout from './Pages/Layout/Layout';
import { BrowserRouter } from 'react-router-dom';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Layout />
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
