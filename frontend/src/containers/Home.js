import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import { Card, Grid, Row, Text } from "@nextui-org/react";

const Home = () => (
    <div>
        <div className = 'jumbotron jumbotron-fluid text-white' >
            <div className='container'>
                <h1 className='display-4' style={{color:'#880808'}}>Resérvame</h1>
                <p className='lead'>Nunca antes había sido tan fácil agendar una cita.</p>
                <hr className='my-4 text-white'/>
                <p >Registrate aquí</p>
                <Link className='btn-main btn btn-warning btn-lg' to='/login' role='button'>Avanzar</Link>
                <br></br>
                <br></br>
            </div>
        </div>
        <div className='container'> 
            <div className=' mt-4 mb-5'>
                
                <h1 className='key-words-l mb-4 mt-2' ><i>/ ¿Quiénes somos? /</i></h1>
                <h1 className='main-description mb-2'>
                    Una plataforma encargada de facilitar las citas de las diversas empresas pequeñas y medianas con 
                    sus clientes.
                </h1>
                
                <h3 className='second-description mt-5'>
                    Nunca había sido tan fácil agendar una cita
                </h3>
            </div>
            <section className="dl-blurbs text-center mb-5">
                <dl>
                    <dt>Clave 1</dt>
                    <dd>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.</dd>
                    <dt>Clave 2</dt>
                    <dd>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.</dd>
                </dl>
                <dl>
                    <dt>Clave 3</dt>
                    <dd>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.</dd>
                    <dt>Clave 4</dt>
                    <dd>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.</dd>                
                </dl>
            </section>
        </div>
        
        <div className='second-level' >
            <div className=' mt-4 mb-5 container'>
                <h1 className='key-words-r mb-4'><i>/ ¿Qué hacemos? /</i></h1>
                <h1 className='main-description mb-2' style={{textAlign: 'right'}}>
                    Facilitar el acceso a la información de las citas que se generan con las diferentes
                    empresas pequeñas y medianas.
                </h1>
                
                <h3 className='second-description mt-5'>
                    Nunca había sido tan fácil agendar una cita
                </h3>
            </div>
            <div className="container mb-5">
                <div className="row">

                    <div className="col-sm">
                        <Card hoverable className='mb-3'>
                            <Card.Body css={{ p: 0 }}>
                            <Card.Image
                                objectFit="cover"
                                src='https://images.unsplash.com/photo-1643446757604-c2b7c45c45dc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80'
                                width="100%"
                                height={140}
                                alt='sda'
                            />
                            </Card.Body>
                            <Card.Footer justify="flex-start" style={{backgroundColor: '#880808'}}>
                            <Row wrap="wrap" justify="space-between">
                                <Text b style={{fontSize: '35px', color: 'white'}}>Agenda tu cita de conveniencia</Text>
                            </Row>
                            </Card.Footer>
                        </Card>
                    </div>
                    <div className="col-sm">
                        <Card hoverable className='mb-3'>
                            <Card.Body css={{ p: 0 }}>
                            <Card.Image
                                objectFit="cover"
                                src='https://images.unsplash.com/photo-1534073828943-f801091bb18c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
                                width="100%"
                                height={140}
                                alt='sda'
                            />
                            </Card.Body>
                            <Card.Footer justify="flex-start" style={{backgroundColor: '#880808'}}>
                            <Row wrap="wrap" justify="space-between">
                            <Text b style={{fontSize: '35px', color: 'white'}}>Fácil comunicación</Text>
                            </Row>
                            </Card.Footer>
                        </Card>
                    </div>
                    <div className="col-sm">
                        <Card hoverable className='mb-3'>
                            <Card.Body css={{ p: 0 }}>
                            <Card.Image
                                objectFit="cover"
                                src='https://images.unsplash.com/photo-1495364141860-b0d03eccd065?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80'
                                width="100%"
                                height={140}
                                alt='sda'
                            />
                            </Card.Body>
                            <Card.Footer justify="flex-start" style={{backgroundColor: '#880808'}}>
                            <Row wrap="wrap" justify="space-between">
                                <Text b style={{fontSize: '35px', color: 'white'}}>De forma rápida y eficaz</Text>
                            </Row>
                            </Card.Footer>
                        </Card>
                    </div>
                </div>
            </div>

        </div>
        
        <div className='third-level' >
            <div className=' mt-4 mb-5 container'>
                <h1 className='key-words-l mb-4'><i>/ Equipo /</i></h1>
                <h1 className='main-description mb-2' style={{textAlign: 'left'}}>
                    El equipo de desarrollo de <span style={{color: '#880808'}}>RESÉRVAME</span>.
                </h1>
                
                <h3 className='second-description mt-5'>
                    Estudiantes del <b>Tecnonlógico de Monterrey</b> dedicados al amor por el América.
                    Se viene la 14 perros!!!!
                </h3>
            </div>
            <div className="container mb-5">
                <div className="row text-center">
                    <a className="col text-center" >
                        <img style={{ width:'18%', borderRadius: '50%', margin:'0 auto', height:'auto'}} src='https://www.seekpng.com/png/full/612-6121902_pingu-the-penguin-pingu-cartoon.png'/>
                    </a>
                </div>
                <div className="row text-center">
                    <Card hoverable className='mb-3 text-center' style={{width: '30%', margin: 'auto'}}>
                        <Card.Body >
                        <Text b style={{fontSize: '25px', color: 'black', textAlign:'center'}}>Manuel Ortiz</Text>
                        </Card.Body>
                        <Card.Footer style={{backgroundColor: 'yellow'}}>
                        <Row wrap="wrap" justify="space-between">
                            <Text b style={{fontSize: '15px', color: 'black', textAlign:'center'}}>Arquitecto de Software y Desarrollador</Text>
                        </Row>
                        </Card.Footer>
                    </Card>
                </div>
                <div className="row">
                    <div className="col text-center">                   
                        <a className="text-center" >
                            <img style={{ width:'30%', borderRadius: '50%', margin:'auto'}} src='https://www.seekpng.com/png/full/612-6121902_pingu-the-penguin-pingu-cartoon.png'/>
                        </a>
                    </div>
                    <div className="col text-center">
                        
                        <img style={{ width:'30%', borderRadius: '50%', margin:'auto'}} src='https://www.seekpng.com/png/full/612-6121902_pingu-the-penguin-pingu-cartoon.png'/>
                        
                    </div>
                </div>
                <div className="row">
                    <div className="col align-self-start">                   
                        <Card hoverable className='mb-3 text-center' style={{width: '60%', margin: 'auto'}}>
                            <Card.Body >
                            <Text b style={{fontSize: '25px', color: 'black', textAlign:'center'}}>Manuel Ortiz</Text>
                            </Card.Body>
                            <Card.Footer style={{backgroundColor: 'blue'}}>
                            <Row wrap="wrap" justify="space-between">
                                <Text b style={{fontSize: '15px', color: 'white', textAlign:'center'}}>Modelado de Base de Datos y Desarrollador</Text>
                            </Row>
                            </Card.Footer>
                        </Card>
                    </div>
                    <div className="col align-self-center">
                        <Card hoverable className='mb-3 text-center' style={{width: '60%', margin: 'auto'}}>
                            <Card.Body >
                            <Text b style={{fontSize: '25px', color: 'black', textAlign:'center'}}>Manuel Ortiz</Text>
                            </Card.Body>
                            <Card.Footer style={{backgroundColor: 'green'}}>
                            <Row wrap="wrap" justify="space-between">
                                <Text b style={{fontSize: '15px', color: 'white', textAlign:'center'}}>Diseño Frontend y Desarrollador</Text>
                            </Row>
                            </Card.Footer>
                        </Card>
                    </div>
                </div>
                <div className="row">
                    <div className="col text-center">                   
                        <a className="text-center" >
                            <img style={{ width:'30%', borderRadius: '50%', margin:'auto'}} src='https://www.seekpng.com/png/full/612-6121902_pingu-the-penguin-pingu-cartoon.png'/>
                        </a>
                    </div>
                    <div className="col text-center">
                        
                        <img style={{ width:'30%', borderRadius: '50%', margin:'auto'}} src='https://www.seekpng.com/png/full/612-6121902_pingu-the-penguin-pingu-cartoon.png'/>
                        
                    </div>
                </div>
                <div className="row">
                    <div className="col align-self-start">                   
                        <Card hoverable className='mb-3 text-center' style={{width: '60%', margin: 'auto'}}>
                            <Card.Body >
                            <Text b style={{fontSize: '25px', color: 'black', textAlign:'center'}}>Manuel Ortiz</Text>
                            </Card.Body>
                            <Card.Footer style={{backgroundColor: 'orange'}}>
                            <Row wrap="wrap" justify="space-between">
                                <Text b style={{fontSize: '15px', color: 'white', textAlign:'center'}}>Desarrollador</Text>
                            </Row>
                            </Card.Footer>
                        </Card>
                    </div>
                    <div className="col align-self-center">
                        <Card hoverable className='mb-3 text-center' style={{width: '60%', margin: 'auto'}}>
                            <Card.Body >
                            <Text b style={{fontSize: '25px', color: 'black', textAlign:'center'}}>Manuel Ortiz</Text>
                            </Card.Body>
                            <Card.Footer style={{backgroundColor: 'pink'}}>
                            <Row wrap="wrap" justify="space-between" >
                                <Text b style={{fontSize: '15px', color: 'black', textAlign:'center'}}>Desarrollador</Text>
                            </Row>
                            </Card.Footer>
                        </Card>
                    </div>
                </div>

            </div>

        </div>

    

    </div>
);

export default Home;