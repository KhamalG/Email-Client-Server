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
    text: {
      fontFamily: 'Copperplate' ,
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
    header: {
        fontFamily: 'Copperplate',
        fontWeight: 'bold',
    }
}

// Emails are passed into the modal, and displayed
export default function Email({closeModal, email}) {
    const {to, subject, text, createdAt} = email

    return (
        <div style={styles.modalBackground}>
            <div style={styles.modalContainer}>
                <form>
                    <h1 style={styles.header}>Email from : </h1>
                    <h2 style={styles.header}>{createdAt}</h2>
                    <div style={styles.labelBackground}>
                        <label for="floatingInput" style={styles.label}>To: </label>
                        <p style={styles.text}>{to}</p>
                    </div>
                    <div style={styles.labelBackground}>
                        <label for="floatingInput" style={styles.label}>Subject: </label>
                        <p style={styles.text} >{subject}</p>
                    </div> 
                    <div style={styles.labelBackground}>
                        <label for="floatingInput" style={styles.label}>Body: </label>
                        <p style={styles.text}>{text}</p>
                    </div>
                    <div>
                        <button onClick={() => closeModal(false)} style={styles.button}>Close</button>
                    </div>  
                </form>
            </div>
        </div>
    )
}