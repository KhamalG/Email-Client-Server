import axios from "axios";
import { useState } from "react";

const styles = {
    modalBackground: {
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(200, 200, 200)',
        position: 'fixed',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        width: '500px',
        height: '500px',
        borderRadius: '12px',
        backgroundColor: 'white',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        display: 'flex',
        flexDirection: 'column',
        padding: '25px'
    },
    label: {
        fontFamily: 'Copperplate',
        fontWeight: 'bold',
        paddingRight: '10px',
    },
    button: {
        padding: '10px',
        border: '2px solid gray',
        margin: '10px',
        fontFamily: 'Copperplate',
    },
    header: {
        fontFamily: 'Copperplate',
        fontWeight: 'bold',
    }
}

export default function NewEmail({closeModal}) {
    const [to, setTo] = useState('');
    const [subject, setSubject] = useState('');
    const [text, setText] = useState('');
    const user = localStorage.getItem('user');
    console.log("userssss: ", user)

    const submit = async (e) => {
        e.preventDefault()
        // Body consists of email information that the user input and is sent to the API created on the monolith
        const result = await axios.post('http://localhost:3050/api/emails', {
            userId: user,
            to: to,
            subject: subject,
            text: text,
        });

        console.log("resultsss: ", result);
        closeModal(false);
    }

    return (
        <div style={styles.modalBackground}>
            <div style={styles.modalContainer}>
                <form onSubmit={submit}>
                    <h1 style={styles.header}>New Email</h1>
                    <div style={styles}>
                        <label for="floatingInput" style={styles.label}>To</label>
                        <input type="email" style={styles.label} id="floatingInput" placeholder="name@example.com"
                        onChange={e => setTo(e.target.value)}
                        />
                    </div>
                    <div style={styles}>
                        <label for="floatingInput" style={styles.label}>Subject</label>
                        <input type="text" style={styles.label} id="floatingInput" placeholder="Sample Subject"
                        onChange={e => setSubject(e.target.value)}
                        />
                    </div> 
                    <div style={styles}>
                        <label for="floatingInput" style={styles.label}>Body</label>
                        <input type="text" style={styles.label} id="floatingInput" placeholder="Sample Body"
                        onChange={e => setText(e.target.value)}
                        />
                    </div>
                    <div style={styles}>
                        <button onClick={() => closeModal(false)} style={styles.button}>Cancel</button>
                        <button type="submit" style={styles.button}>Send Email</button>
                    </div>  
                </form>
            </div>
        </div>
    )
}