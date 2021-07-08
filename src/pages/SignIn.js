import React, {useState} from 'react'
import { useHistory } from "react-router-dom"
import axios from 'axios';
const SignIn =  () => {
    let history = useHistory();
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    function submitForm(e) {
        e.preventDefault();
        if (password === "") {
            alert("Please fill the username field");
            return;
        }
        if (email === "") {
            alert("Please fill the email field");
            return;
        }
        axios
            .post("/api/users", {
                email: email,
                password: password,
            })
            .then(function () {
                alert("Account created successfully");
                history.push('/users');
            })
            .catch(function () {
                alert("Could not creat account. Please try again");
            });
    }
    return (
        <>
            <form onSubmit={submitForm}>
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    placeholder="Enter your email address"
                />
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="text"
                    placeholder="Enter your password"
                />
                <input type="submit" />
            </form>
        </>
    )
};
export default SignIn