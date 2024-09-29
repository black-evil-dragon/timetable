import { useParams } from "react-router-dom";
import TimetableCreate from "./ui/TimetableCreate";
import TimetableView from "./ui/TimetableView";
import NoPage from "@pages/404";
import Input from "@shared/ui/Input";


import '@styles/pages/timetable.scss'

interface TimetableProps {

}
 
const Timetable: React.FunctionComponent<TimetableProps> = () => {
    const { page } = useParams();
    
    return ( 
        <>
            {
                page === 'create' ?
                    <TimetableCreate />
                : page === 'view' ? 
                    <TimetableView /> 
                : <NoPage />
            }
        </>
     );
}
 
export default Timetable;