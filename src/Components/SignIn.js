import React from "react"
import {Form, Button} from "react-bootstrap"
import {Link} from "react-router-dom"


function SignIn() {
    return(
        <div className="sign-in-page">
            <Form className="registration-form">
                <h2>Sign In</h2>
                <Form.Group controlId="username">
                    <Form.Control type="text" placeholder="Your username" />
                </Form.Group>

                <Form.Group controlId="userpassword">
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                
                <Button variant="secondary" type="submit">
                    Sign In
                </Button>

                <Form.Text className="text-muted">
                    <Link to="/">If you don't have an account, click here !!!</Link>
                </Form.Text>
            </Form>
        </div>
    )
}

export default SignIn