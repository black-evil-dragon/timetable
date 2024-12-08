import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@app/Store/hooks";

import './auth.scss'
import { Input } from "@shared/Input";
import { Button } from "@shared/Button";

interface AuthProps {
    
}
 
const AuthPage: React.FunctionComponent<AuthProps> = () => {

    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.user.data);

    const [isEnter, setEnter] = React.useState(false)
    const [userEmail, setUserEmail] = React.useState('')
    const [userPassword, setUserPassword] = React.useState('')

    React.useEffect(() => {
        if (user.is_login && user.is_active) {
            navigate('/')
        }
    }, [])


    React.useEffect(() => {
        setTimeout(() => {
            setEnter(true)
        }, 100)
    })

    return (
        <>
            <div className="auth">
                <div className="auth__wrapper">
                    <div className="auth__welcome">
                        <div className="auth-welcome__title">
                            <p className="--line-1">Планируй.</p>
                            <p className="--line-2">Учись. Достигай.</p>
                        </div>

                        <p className="auth-welcome__text">Мы создали удобный инструмент, который поможет вам организовать мероприятия, уроки, кружки и многое другое.</p>
                        <p className="auth-welcome__text">Независимо от того, являетесь ли вы организатором крупных событий или просто хотите упорядочить свой график, наше приложение станет вашим незаменимым помощником.</p>

                    </div>

                    <div className="auth__form">
                        <div className="auth-form__wrapper">
                            <div className="auth-form__title">
                                Создать новый аккаунт
                            </div>

                            <div className="auth-form__text">
                                Уже есть аккаунт? <Link to={'/'} >Перейдите по ссылке</Link>
                            </div>

                            {/* <input className="auth-form__input" type="text" /> */}
                            <Input
                                className="auth-form__input"
                                onChange={setUserEmail}
                                placeholder="Почта"
                            />
                            {/* <input className="auth-form__input" type="text" /> */}
                            <Input
                                className="auth-form__input"
                                type="password"
                                onChange={setUserPassword}
                                placeholder="Пароль"
                            />

                            <div className="auth-form__input auth-form__submit">
                                <Button 
                                    className="auth-form__input"
                                    callback={() => {
                                        console.log(userEmail, userPassword)
                                    }}
                                >
                                    Продолжить
                                </Button>
                                {/* <span>Регистрируясь, вы соглашаетесь с нашими условиями использования и политикой конфиденциальности.</span> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="auth__blur">
                    <div className="circle circle-1"></div>
                    <div className="circle circle-2"></div>
                    <div className="circle circle-3"></div>
                    <div className="circle circle-4"></div>
                </div>
            </div>
        </>
    );
}
 
export default AuthPage;