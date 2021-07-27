import {
    Button,
    Card,
    CardBody,
    CardGroup,
    Col,
    Container,
    Row
} from 'reactstrap';
import {Link} from 'react-router-dom';
import React from 'react';

const Home = () => {
    return (
        <>
            <Container>
                <Row className="justify-content-center">
                    <Col md="8">
                        <CardGroup>
                            <Card className="text-white bg-primary py-5 d-md-down-none" style={{width: '44%'}}>
                                <CardBody className="text-center">
                                    <div>
                                        <Link to="/register">
                                            <Button color="primary" className="mt-3" active
                                                    tabIndex={0}>Register</Button>
                                        </Link> &nbsp;&nbsp;
                                        <Link to="/assignments">
                                            <Button color="primary" className="mt-3" active
                                                    tabIndex={1}>Assignments</Button>
                                        </Link> &nbsp;&nbsp;
                                        <Link to="/grades">
                                            <Button color="primary" className="mt-3" active tabIndex={1}>Grades</Button>
                                        </Link> &nbsp;&nbsp;
                                        <Link to="/admin/users">
                                            <Button color="primary" className="mt-3" active tabIndex={1}>UserList</Button>
                                        </Link> &nbsp;&nbsp;
                                    </div>
                                </CardBody>
                            </Card>
                        </CardGroup>
                    </Col>
                </Row>
            </Container>
        </>
    )
};
export default Home