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
import axios from "axios";

const Home = () => {
    function addDumpData(e) {
        e.preventDefault();
        axios
            .post(`/api/dump`)
            .then(res => {
                if (res.status === 200) {
                    alert('added dump data');
                }

            });
    }

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md="8">
                    <CardGroup>
                        <Card className="text-white bg-primary py-5 d-md-down-none" style={{width: '44%'}}>
                            <CardBody className="text-center">
                                <div>
                                    <h2>Home</h2>
                                    <Link to="/register">
                                        <Button color="primary" className="mt-3" active tabIndex={0}>Register</Button>
                                    </Link> &nbsp;&nbsp;
                                    <Link to="/users">
                                        <Button color="primary" className="mt-3" active tabIndex={1}>UserList</Button>
                                    </Link> &nbsp;&nbsp;
                                    <Button color="primary" className="mt-3" active tabIndex={2} onClick={addDumpData}>DumpData</Button>
                                </div>
                            </CardBody>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
    )
};
export default Home