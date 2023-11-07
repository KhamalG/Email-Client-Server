import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import NewEmail from "./components/newEmail";
import Email from "./components/emails";

const stlyes = {
    header: {
        display: 'flex',
        justifyContent: 'space-evenly',
        border: '5px solid gray',
        backgroundColor: 'blue'
    },
    header_buttons: {
        width: '100px',
        height: '50px',
        padding: '10px',
        border: '5px solid gray',
        margin: '10px',
        fontFamily: 'Copperplate',
    },
    header_title: {
        fontFamily: 'Copperplate',
        color: 'white',
        textShadow: '2px 2px gray'
    },
    table: {
        width: '100%',
        border: 'gray',
        height: '100%'
    },
    td: {
        backgroundColor: 'white',
        fontFamily: 'Copperplate',
        padding: '0.5rem',
        lastChild: {borderRight: '0'}
    },
    th: {
        background: 'blue',
        color: 'white',
        fontWeight: 'bold',
        border: '5px solid gray',
        textShadow: '2px 2px gray',
        fontFamily: 'Copperplate',
        margin: '5px',
        height: '100%'
    },
    modal: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
}

const getEmails = async () => {
    //User id retireved from local storage. Then that userid is used in the request params to get all the emails associated to that user
    const userId = localStorage.getItem('user');
    const result = await axios.get(`http://localhost:3050/api/${userId}/emails`);
    if (result && result.data && result.data.emails) {
        return result.data.emails;
    }
}

const emails = await getEmails();

export function Home () {

    const [openNewModal, setOpenNewModal] = useState(false);
    const [openEmailModal, setOpenEmailModal] = useState(false);
    const [navigate, setNavigate] = useState(false);
    const [email, setEmail] = useState({});

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setNavigate(true);
    }


    if (navigate === true) {
        return <Navigate to="/"/>
    }

    return (
        <div>
            {(openEmailModal === false && openNewModal === false) && 
                <div>
                    <div style={stlyes.header}>
                        <button onClick={handleLogout} style={stlyes.header_buttons}>Log Out</button>
                        <h1 style={stlyes.header_title}>Dashboard</h1>
                        <button onClick={() => setOpenNewModal(true)} style={stlyes.header_buttons}>New Email</button>
                    </div>
                    <div>
                        <table style={stlyes.table}>
                            <tr>
                                <th style={stlyes.th}>Date</th>
                                <th style={stlyes.th}>To</th>
                                <th style={stlyes.th}>Subject</th>
                            </tr>
                            {emails.map((val, key) => {
                                return (
                                    <tr key={key} onClick={() => {
                                        setEmail(val)
                                        setOpenEmailModal(true)
                                    }}>
                                        <td style={stlyes.td}>{val.createdAt}</td>
                                        <td style={stlyes.td}>{val.to}</td>
                                        <td style={stlyes.td}>{val.subject}</td>
                                    </tr>
                                )
                            })}   
                        </table>
                    </div>
                </div>
            }
            {(openNewModal && openEmailModal === false) && <NewEmail closeModal={setOpenNewModal} />}
            {(openEmailModal && openNewModal === false) && <Email closeModal={setOpenEmailModal} email={email}/>}
        </div>
    )
}