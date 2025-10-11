import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';

import Home from './pages/Home';
import Info from './pages/Info';
import Settings from './pages/Settings';
import './App.css';
import Layout from './components/Layout';

function App() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/home" element={<Home />} />
                        <Route path="/info" element={<Info />} />
                        <Route path="/settings" element={<Settings />} />
                    </Route>

                    {/* Catch-all routes */}
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path="*" element={<Navigate to="/home" />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;