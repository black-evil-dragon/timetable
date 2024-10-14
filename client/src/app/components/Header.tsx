function Header(props: {
    parent: {
        className: string,
    }
}) {
    return (
    <>
        <div className={`${props.parent.className}__content`}>
            {/* <div className="header__item header__logo">
                <img src={''} alt="" />
            </div>

            <div className="header__item">Услуги</div>
            <div className="header__item">Ваш агент</div>
            <div className="header__item">Контакты</div>

            <div className="header__item">
                +7 (000) 000 00 00
            </div> */}
        </div>
    </>
    );
}

export default Header;