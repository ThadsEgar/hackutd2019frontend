import React from "react"
import {Button,Form} from "react-bootstrap"


function FormRegistration() {
    return (
           <Form className="registration-form">
                <h2>Sign Up</h2>
                <Form.Group controlId="formBasicUsername">
                    <Form.Control type="email" placeholder="Your username" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Enter email..." />
                </Form.Group>

                <Form.Group controlId="formBasicPhone">
                    <Form.Control type="email" placeholder="Your phone number" />
                </Form.Group>
                
                <Button variant="secondary" type="submit">
                    Submit
                </Button>
            </Form>
    )
}

export default FormRegistration