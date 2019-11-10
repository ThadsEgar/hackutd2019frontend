import React, {useState,useEffect} from "react"
import {Button,Form} from "react-bootstrap"
import axios from "axios"


function FormRegistration() {

    const [username, setUsername] = useState({usernameValue:""})
    const [userpassword, setUserpassword] = useState({passwordValue:""})
    const [useremail, setUseremail] = useState({emailValue:""})
    const [userphone, setUserphone] = useState({phoneValue:""})

    function userChangeHandler(e) {
        setUsername({usernameValue:e.target.value})
    }
    function passwordChangeHandler(e) {
        setUserpassword({passwordValue:e.target.value})
    }
    function emailChangeHandler(e) {
        setUseremail({emailValue:e.target.value})
    }

    function phoneChangeHandler(e) {
        setUserphone({phoneValue:e.target.value})
    }

    let data = {
        username: "wiueiweiubw",
        userpassword: userpassword.passwordValue,
        useremail: useremail.emailValue,
        userphone: userphone.phoneValue
    }

    function handleSubmit(e) {
        e.preventDefault()
        axios.post("/register", data)
            .then(response => console.log(response))
    }
    
    return (
           <Form className="registration-form" onSubmit= {handleSubmit}>
                <h2>Sign Up</h2>
                <Form.Group controlId="username">
                    <Form.Control type="text" placeholder="Your username" value={username.usernameValuealue} onChange={userChangeHandler}/>
                </Form.Group>

                <Form.Group controlId="userpassword">
                    <Form.Control type="password" placeholder="Password" value={userpassword.passwordValue} onChange={passwordChangeHandler}/>
                </Form.Group>

                <Form.Group controlId="useremail">
                    <Form.Control type="email" placeholder="Enter email..." value={useremail.emailValue} onChange={emailChangeHandler} />
                </Form.Group>

                <Form.Group controlId="userphone">
                    <Form.Control type="tel" placeholder="Your phone number" value={userphone.phoneValue} onChange={phoneChangeHandler}/>
                </Form.Group>
                
                <Button variant="secondary" type="submit">
                    Submit
                </Button>
            </Form>
    )
}

export default FormRegistration