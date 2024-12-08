import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import Header from '@app/Components/Header';
import { NotificationList } from '@entities/Notification';

import { useAppDispatch, useAppSelector } from '@app/Store/hooks';




export default function Layout() {
    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.user.data);


    React.useEffect(() => {
        if (!user.is_login || !user.is_active) {
            navigate('/auth')
        }
    }, [])
    
    return (
        <>
            {/* App header component */}
            <header className="app-header">
                <Header
                    parent={{
                        className:'app-header'
                    }}
                />
            </header>

            {/* App content */}
            <main className="app-body">
                <Outlet />
            </main>

            <div className="app-notification">
                <NotificationList />
            </div>

            {/* App footer component */}
            <footer className="app-footer">

            </footer>
        </>
    );
}