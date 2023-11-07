import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

export function Register () {
    const styles = {
        registerBody: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "auto",
          backgroundColor: 'blue'
        },
        label: {
          fontFamily: 'Copperplate',
          color: 'white',
          textShadow: '2px 2px gray',
          paddingRight: '10px',
        },
        labelBackground: {
          display: 'flex-inline'
        },
        button: {
            padding: '10px',
            border: '2px solid gray',
            margin: '10px',
            fontFamily: 'Copperplate',
        },
        text: {
          fontFamily: 'Copperplate' ,
          paddingRight: '10px', 
        },
        passwordText: {
            fontFamily: 'Copperplate',
            color: 'white',
            textShadow: '2px 2px gray',
            fontSize: '10px'
        },
        header: {
          fontFamily: 'Copperplate',
          color: 'white',
          textShadow: '2px 2px gray'
        }
      }
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [navigate, setNavigate] = useState(false);

    const submit = async (e) => {
        e.preventDefault()

        await axios.post('http://localhost:3050/api/users', {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        });

        setNavigate(true);
    }

    if (navigate === true) {
        return <Navigate to="/"/>
    }

    return (
        <main style={styles.registerBody}>
            <form onSubmit={submit}>
                <h1 style={styles.header}>New Account</h1>
                <div>
                    <label for="floatingInput" style={styles.label}>First Name</label>
                    <input type="text" style={styles.text} id="floatingInput" placeholder="John"
                    onChange={e => setFirstName(e.target.value)}
                    />
                </div> 
                <div>
                    <label for="floatingInput" style={styles.label}>Last Name</label>
                    <input type="text" style={styles.text} id="floatingInput" placeholder="Doe"
                    onChange={e => setLastName(e.target.value)}
                    />
                </div> 
                <div>
                    <label for="floatingInput" style={styles.label}>Email Address</label>
                    <input type="email" style={styles.text} id="floatingInput" placeholder="name@example.com"
                    onChange={e => setEmail(e.target.value)}
                    />
                </div> 
                <div className="form-floating">
                    <label for="floatingPassword" style={styles.label}>Password</label>
                    <input type="password" style={styles.text} id="floatingPassword" placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                    />
                    <p style={styles.passwordText}>Password should be at least 8 characters</p>
                    <p style={styles.passwordText}>Password should contain at least 1 uppercase letter</p>
                    <p style={styles.passwordText}>Password should contain at least 1 number</p>
                    <p style={styles.passwordText}>Password should contain at least 1 symbol</p>
                </div>
                <button style={styles.button} type="submit">Register</button>
                <button style={styles.button}><Link to='/'>Sign in</Link></button>
            </form>
        </main>
    );
}