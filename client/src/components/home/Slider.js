import { Carousel } from 'antd';
import React from 'react';
import slider1 from '../../images/slider-1.jpg';
import slider2 from '../../images/slider-2.png';

const Slider = () => {
    const contentStyle = {
        height: '400px',
        width: '100%',
        objectFit: 'cover',
        objectPosition: '0% 50%',
    };
    return (
        <div className="row mt-3">
            <div className="col-12">
                <Carousel autoplay autoplaySpeed={4000}>
                    <div>
                        <img src={slider1} style={contentStyle} alt="Slider-1" />
                    </div>
                    <div>
                        <img src={slider2} style={contentStyle} alt="Slider-1" />
                    </div>
                </Carousel>
            </div>
        </div>
    );
};

export default Slider;
