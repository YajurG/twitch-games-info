import React, {useState, useEffect} from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    validateForm = () => {
        return username.length > 0 && password.length > 0;
    }
    
    return (
        <div className="Login">
        <Form onSubmit={handleSubmit}>
            <Form.Group size="lg" controlId="email">
            <Form.Label>Username</Form.Label>
            <Form.Control
                autoFocus
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            </Form.Group>
            <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            </Form.Group>
            <Button block size="lg" type="submit" disabled={!validateForm()}>
                Login
            </Button>
        </Form>
        </div>
    );
}