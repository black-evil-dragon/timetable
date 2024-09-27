import React from 'react';

import CourseForm from '@features/CourseForm/ui';

import '@styles/pages/home.scss'

interface HomePageProps {
    
}
 
const HomePage: React.FunctionComponent<HomePageProps> = () => {
    return ( 
        <div className="page home">
            <div className="home__content">
                <div className="home__title">
                    <h1 className='title'>Расписание занятий</h1>
                </div>

                <div className="home__form">
                    <CourseForm />
                </div>
            </div>
        </div>
     );
}
 
export default HomePage;