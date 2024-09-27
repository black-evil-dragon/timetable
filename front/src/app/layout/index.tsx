import React from 'react';
import { Outlet } from 'react-router-dom';


function Layout() {
    return (
        <>
            {/* App header component */}
            <header className="app-header">
                <div className="app-header__title">
                    <span>Расписание занятий</span>
                </div>

                <div className="app-header__nav">
                    <div className="app-header__nav-item">
                        Войти
                    </div>
                </div>
            </header>

            {/* App content */}
            <main className="app-body">
                <Outlet />
            </main>

            {/* App footer component */}
            <footer className="app-footer">

            </footer>
        </>
    );
}


export default Layout;