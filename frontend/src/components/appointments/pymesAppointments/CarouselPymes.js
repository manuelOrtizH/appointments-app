import React, {useState, useEffect} from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { getAllPymes } from '../../../actions/api';
import Postcard from './Postcard';


const CarouselPymes = () => {
    const options = {
        items: 2,
        nav: true,
        loop: true,
        
        
    };

    const [pymes, setPymes] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const listPymes = []

    useEffect(async () =>{
        setIsLoading(true)
        await getAllPymes(setPymes)
        setIsLoading(false)
    }, []);

    pymes.map((pyme, key) => {
        listPymes.push(
            <div key={key} className='item'>
                <Postcard
                    id={pyme.id}
                    name={pyme.name}
                    imageUrl={pyme.image_url}
                    address={pyme.address}
                    customForm={pyme.custom_data_form}
                />
            </div>
        );
    });

    
    console.log(pymes)
    // name, description, pymes, imageUrl
    return (
        <div >
            {!isLoading && <OwlCarousel className='slider-items owl-theme' {...options}>
                {listPymes}
            </OwlCarousel>}


        </div>

    );



};

export default CarouselPymes