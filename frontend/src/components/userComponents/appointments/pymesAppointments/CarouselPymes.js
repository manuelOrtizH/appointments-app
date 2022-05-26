import React, {useState, useEffect} from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { getAllPymes } from '../../../../actions/api';
import PymeAppointment from './PymeAppointment';


const CarouselPymes = ({pymes, professionals, appointments, user}) => {
    const options = {
        items: 2,
        nav: true,
        loop: true,
        
        
    };
    const listPymes = []

    pymes.map((pyme, key) => {
        listPymes.push(
            <div key={key} className='item'>
                <PymeAppointment
                    id={pyme.id}
                    name={pyme.name}
                    imageUrl={pyme.image_url}
                    address={pyme.address}
                    customForm={pyme.custom_data_form}
                    professionals={professionals}
                    employees={pyme.employees}
                    appointments={appointments}
                    user={user}
                />
            </div>
        );
    });

    return (
        <div >
            <OwlCarousel className='slider-items owl-theme' {...options}>
                {listPymes}
            </OwlCarousel>
        </div>
    );

};

export default CarouselPymes