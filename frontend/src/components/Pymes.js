import React, {useState, useEffect} from 'react';
import './Pymes.css';
import { useNavigate } from 'react-router-dom';
import { getAllPymes } from '../actions/api';
import OwlCarousel from 'react-owl-carousel';
import Loading from '../components/common/Loading';
import Avatar from '@mui/material/Avatar';

const Pymes = ({pymes}) => {
    let navigate = useNavigate();
    // const [pymes, setPymes] = useState();
    const [isLoading, setIsLoading] = useState();
    const listPymes = [];

    const options = {
        items: 3,
        nav: true,
        loop: true,
    };
    
    useEffect(() => {
        setIsLoading(true);
        // await getAllPymes(setPymes);
        setIsLoading(false);
    }, []);

    const pymesInfo = pymes;
    
    const handleMoreInfo = (id) =>{
        navigate(`/pyme/${id}`, { replace: true});
    }
    
    if(pymes){
        for(const[k,pyme] of Object.entries(pymes)){
            const slogan = `${pyme.slogan}` ? `"${pyme.slogan}"` : '';
            listPymes.push(
                <div className='card-body' key={k}>
                    <div className='no-border text-center'>
                        <h3 className='card-title text-center nextApptsTitle'>                      
                        
                        <Avatar
                            alt="Remy Sharp"
                            src={pyme.image_url}
                            style={{alignSelf: 'center'}}
                            sx={{ width: 90, height: 90 }}
                        />
                        {pyme.name}</h3>
                        <span><h6><i>{slogan}</i></h6></span> <br></br>
                        <span><h5>{pyme.address}</h5></span> <br></br>
                        <span><button className='btn btn-info' onClick={()=>handleMoreInfo(pyme.id)}>Ver mas Información</button> <button className='btn btn-success ml-3' >Disponibilidad</button></span> <br></br>
                        <span></span> <br></br>
                    </div>
                </div>
            );
        };
    }


    return(
        
        <div className='nextAppts'>
            {!isLoading && listPymes &&
                <OwlCarousel style={{marginBottom: '10px'}} className='slider-items owl-theme' {...options}>
                    {listPymes}
                </OwlCarousel>
            }
            {isLoading && <Loading/>} 
            {!isLoading && listPymes.length == 0 && <p className='text-center'>No se encontraron pymes</p>}
        </div>

    );
};
export default Pymes;