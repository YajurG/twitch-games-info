import React, {useState, useEffect} from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Register = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [valid, setValid] = useState(false);

    function validateForm() {
        return username.length > 0 && password.length > 0;
    }
    
    async function onSubmit() {
        console.log("this is the submit method")
    }
    
    return (
        <div style={{textAlign: "left", marginLeft: "10px", marginRight: "10px"}}>
            <h3 style={{textAlign: "center"}}>Register</h3>
            <div>
                <form className="form-inline">
                    <Form.Group className="mb-3">
                        <Form.Control type="username" placeholder="Enter username here"></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control type="password" placeholder="Enter password here"></Form.Control>
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