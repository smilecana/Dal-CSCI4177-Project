import React, {useState, useEffect} from 'react'
import axios from 'axios';
const SignIn =  () => {
    const [users, setUsers] = useState([]);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    useEffect(() => {
        axios
            .get("/api/users")
            .then(response => {
                return setUsers(response.data)
            });
    }, []);
    function submitForm() {
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
                window.location.reload();
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
                    placeholder="Enter your username"
                />
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="text"
                    placeholder="Enter your email address"
                />
                <input type="submit" />
            </form>
            <ul>
                {users && users.map(item => <li key={item.email}> {item.email} </li> )}
            </ul>
        </>
    )
};
export default SignIn