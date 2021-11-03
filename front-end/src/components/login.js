import React, {useState, useEffect} from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";
import "./login.css"

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [credentialBlank, setCredentialBlank] = useState(false);
    const [error, setError] = useState(false);
    const [invalid, setInvalid] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

    const usernameOnChange = (e) => {
        setUsername(e.target.value);
    }

    const passwordOnChange = (e) => {
        setPassword(e.target.value);
    }
    
    async function onSubmit(e) {
        e.preventDefault();
        if (username == null || password == null) {
            setCredentialBlank(true);
            return;
        }
        try {
            const res = await axios.post("http://localhost:8080/api/login", {username: username, password: password});
            if (res.status == 200) {
                setInvalid(false);
                setError(false)
                setLoggedIn(true);
                console.log("sign in success")
                await sessionStorage.setItem("loggedIn", true);
                await sessionStorage.setItem("username", username);
            }
        } catch (err) {
            console.log(err.message)
            if (err.message == "Request failed with status code 401"){
                setInvalid(true);
            }
            else if (err.message == "Request failed with status code 500") {
                setError(true)
            }
        }
    }

    return (
        <div style={{textAlign: "left", marginLeft: "10px", marginRight: "10px"}}>
            <h3 style={{textAlign: "center"}}>Login</h3>
            <div>
                <form className="form-inline" onSubmit={onSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Control type="username" placeholder="Enter username here" onChange={usernameOnChange}></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control type="password" placeholder="Enter password here" onChange={passwordOnChange}></Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </form>
                {invalid && <div style={{marginTop: "10px"}}>Username not found.</div>}
                {credentialBlank && <div style={{marginTop: "10px"}}>Username or password cannot be blank</div>}
                {error && <div style={{marginTop: "10px"}}>Error occurred when registering. Please try again.</div>}
                {loggedIn && <div style={{marginTop: "10px"}}>Successfully logged in.</div>}
            </div>
        </div>
    );
}

export default Login;