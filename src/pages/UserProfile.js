import React, {useEffect, useState} from "react";
import "../assets/css/Common.css";
import {
    Button,
    Container,
    Form,
    FormControl,
    Image,
    InputGroup,
} from "react-bootstrap";
import axios from "axios";
import {useParams} from "react-router";

const UserProfile = () => {

    let {id} = useParams();
    const [user, setUser] = useState({});
    useEffect(() => {
        axios.get(`/api/user/${id}`).then((response) => {
            return setUser(response.data.users);
        });
    }, [id]);

    const [err, setErr] = useState({
        userName: false,
    });
    const handleInputChange = (keyName, e) => {
        if (keyName === "userName") {
            let regex = new RegExp(/^[a-zA-Z0-9]*$/); //check the alpha-numeric characters.
            if (!regex.test(e.target.value)) {
                setErr({...err, [keyName]: true});
                return;
            }
        }
        if (keyName === "type") {
            setUser({
                ...user,
                [keyName]: e.target.id.substr(e.target.id.length - 1),
            });
        } else {
          setUser({ ...user, [keyName]: e.target.value });
        }
    };
    const submitForm = (e) => {
        e.preventDefault();
        axios
            .put(`/api/user/${id}`, user)
            .then((res) => {
                if (res.status === 200) {
                    alert(res.data.message);
                }
            })
            .catch((e) => {
                console.log(e);
            });
    };
    const deleteUser = () => {
        if (window.confirm("Do you want to delete account?")) {
            axios
                .delete(`/api/user/${id}`, user)
                .then((res) => {
                    if (res.status === 200) {
                        localStorage.removeItem("lmsToken");
                        if (!localStorage.getItem("lmsToken")) {
                            window.location = "/";
                        }
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        }

    };
    return (
        <>
            <Container className="wrap">
                <Image src="https://picsum.photos/170/170" roundedCircle/>
                <Form onSubmit={submitForm}>
                    <Form.Group className="mb-3" controlId="formBasicUserName">
                        <Form.Control
                            type="text"
                            placeholder="UserName"
                            value={user.userName}
                            isInvalid={!!err.userName}
                            onChange={(e) => handleInputChange("userName", e)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicUserBio">
                        <Form.Control
                            as="textarea"
                            value={user.bio}
                            placeholder="Add a bio"
                            style={{height: "100px"}}
                            onChange={(e) => handleInputChange("bio", e)}
                        />
                    </Form.Group>
                    <Form.Group md="4">
                        <InputGroup>
                            <InputGroup.Text>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-github"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                                </svg>
                            </InputGroup.Text>
                            <FormControl
                                id="inlineFormInputGroupUsername"
                                placeholder="Github"
                                onChange={(e) => handleInputChange("github", e)}
                                value={user.github}
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group md="4">
                        <InputGroup>
                            <InputGroup.Text>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-linkedin"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                                </svg>
                            </InputGroup.Text>
                            <FormControl
                                placeholder="LinkedIn"
                                onChange={(e) => handleInputChange("linkedin", e)}
                                value={user.linkedin}
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group md="4">
                        <InputGroup>
                            <InputGroup.Text>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-link-45deg"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/>
                                    <path
                                        d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/>
                                </svg>
                            </InputGroup.Text>
                            <FormControl
                                id="inlineFormInputGroupUsername"
                                placeholder="Website"
                                onChange={(e) => handleInputChange("web", e)}
                                value={user.web}
                            />
                        </InputGroup>
                    </Form.Group>

                    <Button type="submit">Save</Button>
                    <Button variant="danger" onClick={deleteUser}>
                        Delete
                    </Button>
                </Form>
            </Container>
        </>
    );
};
export default UserProfile;
