import React, {useState, useEffect} from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Register = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [valid, setValid] = useState(false);
    const [error, setError] = useState(false);

    function validateForm() {
        return username.length > 0 && password.length > 0;
    }
    
    async function onSubmit(e) {
        e.preventDefault();
        if (username == null || password == null) {
            console.log("")
        }
        console.log(username);
        const res = await axios.post("http://localhost:8080/api/register", {username: username, password: password});
        console.log(res);
    }

    const usernameOnChange = (e) => {
        setUsername(e.target.value);
        console.log(username);
    }

    const passwordOnChange = (e) => {
        setPassword(e.target.value);
    }
    
    return (
        <div style={{textAlign: "left", marginLeft: "10px", marginRight: "10px"}}>
            <h3 style={{textAlign: "center"}}>Register</h3>
            <div>
                <form className="form-inline" onSubmit={onSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Control type="username" placeholder="Enter username here" onChange={usernameOnChange}></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control type="password" placeholder="Enter password here" onChange={passwordOnChange}></Form.Control>
                        <Form.Text className="text-muted">
                            <b>Password should be at least 8 characters</b>
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Create Account
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Register;