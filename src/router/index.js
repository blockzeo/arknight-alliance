import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Login from '../pages/Login';
import About from '../pages/About';
import Wxexcel from '../pages/WxExcel';


const AppRouter = () => {
    return (
        <Router>
            <Routes>
                {/* 根路由嵌套其他页面 */}
                <Route path="/" element={<App />}>
                    <Route index element={<Wxexcel />} />
                    <Route path="login" element={<Login />} />
                    <Route path="about" element={<About />} />
                    <Route path="wxexcel" element={<Wxexcel />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRouter;