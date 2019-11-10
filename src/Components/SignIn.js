import React, {useState} from "react"
import {Form, Button} from "react-bootstrap"
import {Link} from "react-router-dom"
import axios from "axios"
import MapVisual from "./MapVisual"


function SignIn(props) {

    const [username, setUsername] = useState({usernameValue:""})
    const [userpassword, setUserpassword] = useState({userpasswordValue:""})

    function userChangeHandler(e) {
        setUsername({usernameValue:e.target.value})
    }

    function passwordChangeHandler(e) {
        setUserpassword({userpasswordValue:e.target.value})
    }

    let data = {
        username:username.usernameValue,
        userpassword: userpassword.userpasswordValue
    }

    function handleSubmit(e) {
        e.preventDefault()
        console.log(data)
        axios.get("/login", {params:{
            username: username.usernameValue,
            userpassword: userpassword.userpasswordValue
        }}
        )
            .then(response => {
                console.log(response.data)
                if (response.data) {
                    alert("Log In successfully")
                    props.setLoggedin({isloggedin: true})
                    if (window.confirm('If you click "ok" you would be redirected . Cancel will load this website ')) 
                    {
                        window.location.href='/map';
                    };
                } else {
                    alert("Log In unsuccessfully")
                    props.setLoggedin({isloggedin: false})
                }
            })
    }

    return(
        <div className="sign-in-page" >
            <Form className="registration-form" onSubmit={handleSubmit}>
                <h2>Sign In</h2>
                <Form.Group controlId="username">
                    <Form.Control 
                        type="text" 
                        placeholder="Your username" 
                        value={username.usernameValue} 
                        onChange={userChangeHandler}   
                    />
                </Form.Group>

                <Form.Group controlId="userpassword">
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        value={userpassword.userpasswordValue} 
                        onChange={passwordChangeHandler}    
                    />
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