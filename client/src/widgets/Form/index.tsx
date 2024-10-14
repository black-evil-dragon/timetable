import React from 'react';
import Input from '@shared/ui/Input';

import '@styles/widgets/form.scss'
import Button from '@shared/ui/Button';


function Form() {
    const [userName, setUserName] = React.useState('')
    const [userPhone, setUserPhone] = React.useState('')
    const [userMail, setUserMail] = React.useState('')

    const onSubmit = () => {
        if (userName && userPhone) {
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
            <div className="form content-block">
                <div className="form__content">
                    <div className="form__text">
                        <h2>Получить консультацию на интересующий вас продукт</h2>
                        <p>Наши специалисты свяжуться с Вами!</p>
                    </div>

                    <div className="form__group">
                        <Input
                            type='text'
                            value={userName}
                            onChange={setUserName}
                            className='form__input --name'
                            placeholder='Ваше имя'
                            required={true}
                        />

                        <Input
                            type='text'
                            value={userPhone}
                            onChange={setUserPhone}
                            className='form__input --phone'
                            placeholder='Номер телефона'
                            required={true}
                        />

                        <Input
                            type='text'
                            value={userMail}
                            onChange={setUserMail}
                            className='form__input --mail'
                            placeholder='E-mail'
                        />

                        <div className="form__button">
                            <Button
                                type='button'
                                text='Оставить заявку'
                                callback={onSubmit}
                            />
                        </div>

                        {/* <button className="form__button" onClick={onSubmit}>
                            Оставить заявку
                        </button> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Form