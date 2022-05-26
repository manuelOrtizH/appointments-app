import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { getPyme } from '../../../actions/api';


const InfoPyme = () => {
    const { id } = useParams();

    
    
    const [pyme, setPyme] = useState([])
    const [isLoading, setIsLoading] = useState(false);  
    
    useEffect(async () => {
        setIsLoading(true);
        await getPyme(id, setPyme);
        setIsLoading(false);
    }, []);

    console.log(pyme);

    return(
        <div>
            <div className = 'jumbotron-fluid text-white' 
            style={{height: '250px', 
                    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2) 0%,rgba(0,0,0,0.6) 100%), url(${pyme.image_url})`, 
                    backgroundSize: 'contain'}} >
            </div>
            <div className='container mt-4'>
                <h1 style={{ color: '#880808'}} className='text-center'>{pyme.name}</h1>
                
            </div>
        </div>
    );
};
export default InfoPyme;