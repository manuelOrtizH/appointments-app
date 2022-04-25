import React from 'react';
import '../styles/Appointments.css';
import '../../common/styles/Card.css';
import '../styles/ListAppts.css';
import useCollapse from 'react-collapsed';


const ListAppt = ({pyme,reason,responsable,day,month,hour, imageUrl, customForm}) => {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    const listInfoAppt = [];
    let key = 0
    for (const [field,value] of Object.entries(customForm)){
        listInfoAppt.push(
            <div key={key}>
                <span className='main-info text-left' style={{fontSize: '100%', color: 'green'}}>
                    <i>{field}: </i> <span className='main-info'>{value}</span>
                </span> <hr></hr>
            </div>
        );
        key+=1;
    };    

    return (

        <section className='collapsible'>
            <article className='appt header' {...getToggleProps()} >
                <img className='appt-icon' src={imageUrl} alt='img-pyme'/> 
                
                <span className='main-info'>{pyme} <br></br>
                    <span style={{fontSize: '80%', color: 'green'}}>
                        <i>Razón:</i>
                    </span> {reason}
                    <span> <br></br> 
                        <i> 
                            <span style={{fontSize: '80%', color: 'green'}}>Responsable:</span> {responsable}
                        </i>
                    </span>
                </span>
                <span className='date-info'>{day} <span>de</span> {month}<span> <br></br> Hora: {hour}</span></span>


            </article>
            <article className='appt-info' {...getCollapseProps()} >
                <div className='content text-center'  style={{margintTop: '10px'}} >
                <p className='text-center'>Más información con respecto a la cita</p>
                    {listInfoAppt }
                    {listInfoAppt.length === 0 && <p>No se encontraron más datos</p>}

                    <div className='row mt-3'>
                        <div className='col'>
                            <button className='btn btn-success'> Editar Cita</button>
                        </div>
                        <div className='col'>
                            <button className='btn btn-danger'> Eliminar Cita</button>
                        </div>
                    </div>

                </div>
            </article>

            <hr></hr>

        </section>

    );

};

export default ListAppt;