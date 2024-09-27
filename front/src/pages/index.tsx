import React from 'react';
import { HashRouter, Routes, Route } from "react-router-dom";

import Layout from '@app/layout';

import NoPage from '@pages/404';
import HomePage from '@pages/home';


function Routing() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="" element={<HomePage />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </HashRouter>
    );
}


export default Routing;
