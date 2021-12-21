
import { useState } from "react";
import { Container, Row, Col, Button, Card, Image } from "react-bootstrap";
import admin from '../images/admin.png'
import responsable from '../images/responsable.png'
import { Link } from 'react-router-dom'


const Home = () => {

    return (
        <div style={{ marginTop: "5%" ,height: "100vh",}}>
            <Container>
                <Row>
                    <Col>
                        <Link to='/admin'>
                            <Image
                                src={admin}
                                alt="Preview"
                                rounded
                                style={{ width: "80%", height: "80%", marginLeft: '20%' }}
                            />
                        </Link>
                    </Col>

                    <Col>
                        <Link to='/responsable'>
                            <Image
                                src={responsable}
                                alt="Preview"
                                rounded
                                style={{ width: "80%", height: "80%", marginLeft: '20%' }}
                            />
                        </Link>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Home;
