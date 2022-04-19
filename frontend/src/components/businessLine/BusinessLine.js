import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import './Carousel.css';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const BusinessLine = () => {

    const options = {
        items: 2,
        nav: false,
        loop: true,
        center: true,
        dotsData: true,
        fluidSpeed: true,
        animateIn: true,

    };

    const [businessLines, setBusinessLines] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const cardItems = [];

    useEffect(async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        setIsLoading(true);

        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/business_lines/`, config)
        
        setBusinessLines(res.data);
        setIsLoading(false);

    }, []);
    
    for (const [key, business] of Object.entries(businessLines)) {
        cardItems.push(<div key={key} className='item'>
                        <Card
                        name={business.name}
                        description={business.description}
                        pymes={business.pymes}
                        imageUrl={business.image_description}
                        />
                       </div>)
    }

    console.log(cardItems);
    

    return (
        <div>
            {!isLoading && <OwlCarousel className='slider-items owl-theme' {...options}>
                {cardItems}
            </OwlCarousel>}
            {isLoading && <p className='container text-center'>Loading...</p>}
 
        </div>
    );
}


export default BusinessLine;