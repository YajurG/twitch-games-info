import React, {useState, useEffect} from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Register = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [invalid, setInvalid] = useState(false);
    const [error, setError] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

    useEffect(() => {
        console.log(invalid)
        console.log(error);
    }, [invalid, error])
    
    async function onSubmit(e) {
        e.preventDefault();
        if (username == null || password == null) {
            console.log("")
        }
        console.log(username);
        try {
            const res = await axios.post("http://localhost:8080/api/register", {username: username, password: password});
            if (res.status == 200) {
                setInvalid(false);
                setError(false)
                setLoggedIn(true);
                console.log("sign up success")
            }
        } catch (err) {
            console.log(err.message)
            if (err.message == "Request failed with status code 401"){
                setInvalid(true);
                //console.log(invalid)
            }
            else if (err.message == "Request failed with status code 500") {
                setError(true)
            }
        }
        
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
                {invalid && <div style={{marginTop: "10px"}}>Username already exists. Please registering or choose another one</div>}
                {error && <div style={{marginTop: "10px"}}>Error occurred when registering. Please try again.</div>}
                {loggedIn && <div style={{marginTop: "10px"}}>Successfully registered. Please log in.</div>}
            </div>
        </div>
    );
}

export default Register;