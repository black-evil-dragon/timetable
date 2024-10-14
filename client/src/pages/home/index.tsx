import React from 'react';

import '@styles/pages/home.scss'
import { Link } from 'react-router-dom';



interface HomePageProps {
    
}
 
const HomePage: React.FunctionComponent<HomePageProps> = () => {
    return ( 
        <>
            <Link to={'/timetable/create'}>Create timetable</Link>
            <Link to={'/timetable/view'}>View timetable</Link>
        </>
     );
}
 
export default HomePage;