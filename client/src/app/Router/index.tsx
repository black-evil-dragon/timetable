import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Layout from '@app/Layout';

import NoPage from '@pages/404';
import HomePage from '@pages/home';
import { Timetable } from '@pages/timetable';


function Routing() {
    return (
        <BrowserRouter basename='/'>
            <Routes>
                <Route path="/" element={<Layout />}>
                    {/* Home page */}
                    <Route path="" element={<HomePage />} />

                    {/* Pages */}
                    {/*     Timetable */}
                    <Route path="/timetable/:page" element={<Timetable />} />

                    {/*     ... */}

                    {/* System pages */}
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}


export default Routing;
