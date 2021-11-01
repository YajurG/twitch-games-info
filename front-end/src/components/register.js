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
        <div>
            <h3>Register</h3>
            <div style={{textAlign: "left", marginLeft: "10px", marginBottom: "10px"}}>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Control type="username" placeholder="Enter username here"></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control type="password" placeholder="Enter password here"></Form.Control>
                        <Form.Text className="text-muted">
                            Password should be at least 8 characters
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Create Account
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default Register;