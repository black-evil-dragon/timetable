import React from "react";

import Input from "@shared/ui/Input";


import '@styles/ui/button.scss'

function CourseForm() {

    const [userName, setUserName] = React.useState('')
    const [userPhone, setUserPhone] = React.useState('')
    const [userMail, setUserMail] = React.useState('')



    const onSubmit = () => {
        if (userName && userPhone && userMail) {
            const payload = {
                userName,
                userPhone,
                userMail,
            }
            console.log(payload);
        }
    }

    return ( 
        <>
            {/* Change to form? */}
            <div className="course-form">
                
                {/* <Input className="insitute" placeholder="Институт"/>

                <Input className="course" placeholder="Курс" />

                <Input className="group" placeholder="Группа" /> */}

                <button className="button-component">Дальше</button>

                {/* <div className="logs">
                    <div className="logs__item error">
                        <p className="title">Some error</p>
                        <p>text error</p>
                    </div>

                    <div className="logs__item warn">
                        Some warn
                    </div>

                    <div className="logs__item info">
                        Some info
                    </div>
                </div> */}

            </div>
        </>
     );
}

export default CourseForm;