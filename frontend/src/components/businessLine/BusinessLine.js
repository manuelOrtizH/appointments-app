import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Postcard from './Postcard';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Loading from '../common/Loading';
import { getAllBusinessLines } from '../../actions/api';


const BusinessLine = () => {

    const options = {
        items: 1,
        nav: true,
        loop: true,
        fluidSpeed: true,
        animateIn: true,
        autoplay: true,
    };

    const [businessLines, setBusinessLines] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const cardItems = [];

    useEffect(async () => {
        setIsLoading(true);
        await getAllBusinessLines(setBusinessLines);
        setIsLoading(false);

    }, []);
    
    for (const [key, business] of Object.entries(businessLines)) {
        cardItems.push(<div key={key} className='item'>
                        <Postcard
                        name={business.name}
                        description={business.description}
                        pymes={business.pymes}
                        imageUrl={business.image_description}
                        />
                       </div>)
    };

    return (
        <div>
            {!isLoading && <OwlCarousel className='slider-items owl-theme' {...options}>
                {cardItems}
            </OwlCarousel>}
            {isLoading && <p className='text-center'><Loading/></p>}
 
        </div>
    );
}


export default BusinessLine;