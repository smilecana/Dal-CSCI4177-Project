import {
    Button,
    Card,
    CardBody,
    CardGroup,
    Col,
    Container,
    Row
} from 'reactstrap';
import { Link } from 'react-router-dom';
import React from 'react';

const Home = () => {
    return (
        <div>
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="8">
                            <CardGroup>
                                <Card className="text-white bg-primary py-5 d-md-down-none" style={{width: '44%'}}>
                                    <CardBody className="text-center">
                                        <div>
                                            <h2>Home</h2>
                                            {/*<Link to="/register">*/}
                                            {/*    <Button color="primary" className="mt-3" active tabIndex={-1}>Register</Button>*/}
                                            {/*</Link>*/}
                                            <Link to="/login">
                                                <Button color="primary" className="mt-3" active tabIndex={0}>Signin</Button>
                                            </Link>
                                            <Link to="/users">
                                                <Button color="primary" className="mt-3" active tabIndex={0}>UserList</Button>
                                            </Link>
                                        </div>
                                    </CardBody>
                                </Card>
                            </CardGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>)}
    export default Home