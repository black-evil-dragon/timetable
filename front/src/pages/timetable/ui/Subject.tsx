

interface SubjectProps {
    title?: string,
    teacher?: string,
    cabinet?: string,
}

const Subject: React.FunctionComponent<SubjectProps> = (props = {
    title:'',
    teacher: '',
    cabinet: '',
}) => {
    return ( 
        <div className="subject">
            <div className="subject__title">
                {props.title}
            </div>
            <div className="subject__content">
                <div className="subject__teacher --content-item">
                    {props.teacher}
                </div>

                <div className="subject__cabinet --content-item">
                    {props.cabinet}
                </div>
            </div>
        </div>
    );
}

export default Subject;