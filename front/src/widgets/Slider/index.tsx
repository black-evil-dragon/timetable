import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

import 'swiper/css';
import '@styles/widgets/slider.scss'
import Button from '@shared/ui/Button';


type SliderProps = {
    type?: 'banner' | 'slider',

    sliderList: Array<{
        slideImage: string,
        slideTitle?: string,
        slideSubTitle?: string,
        slideButtonText?: string,
        slideButtonLink?: string
    }>

}

const Slider: React.FC<SliderProps> = ({
    type='banner',
    sliderList,
}) => {

    const onClick = (event: any,) => {
        console.log(event);
    }
    return (
        <>
            <div className={`slider --${type}`}>
                <Swiper
                    modules={
                        [

                        ]
                    }
                    slidesPerView={1}
                    loop={true}
            
                    // spaceBetween={30}
                    // effect={'fade'}
                    // navigation
                    // pagination={{ clickable: true }}
                    // autoplay={{ delay: 2500, disableOnInteraction: false }}
                    className='slider__wrapper'
                >
                    {sliderList.map((slide, index) => (
                        <SwiperSlide key={index} className='slider__slide'>
                            <div className="slide">
                                <div className="slide__content">
                                    <div className="slide__title">
                                        {slide.slideTitle}
                                    </div>
                                    <div className="slide__subtitle">
                                        {slide.slideSubTitle}
                                    </div>
                                    <Button
                                        type='button'
                                        text={slide.slideButtonText}
                                        callback={onClick}
                                    />
                                </div>
                                <div className="slide__image">
                                    <img src={slide.slideImage} alt={`Слайд`} />
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
};

export default Slider;