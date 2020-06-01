import React, { useState, useEffect } from 'react'
import { Container, Typography, Button, Box, Snackbar, Slide } from '@material-ui/core'

import './styles/app.css'

function App() {
    const [status, setStatus] = useState(false);                        //ON or OFF status of the light
    const [color, setColor] = useState("#f44336");                      //color of the light, default: RED
    const [glowColor, setGlowColor] = useState("#ffffff");
    const [open, setOpen] = useState(false);                            //open or close status of the message
    const [message, setMessage] = useState("Red");
    const [transition, setTransition] = useState(undefined);            //transition type of the message pop-up

    useEffect(() => {
        let interval = null;
        let counter = 1;                                                //based on counter value light will blink
        if (status) {
            interval = setInterval(() => {
                if(counter%2 !== 0) {
                    setGlowColor(color);                                //Odd -> Blink light ON
                }
                else {
                    setGlowColor("#ffffff");                            //Even -> Blink light OFF
                }
                counter++;
            }, 900);
        }
        else {                                                          //light color in OFF state
            setGlowColor("#ffffff");
        }
        return () => clearInterval(interval);
    }, [status, color]);

    function toggle() {                                                 //toggles between ON and OFF status of the light
        setStatus(!status);
    }

    function TransitionUp(props) {                                      //gives transition effect to the selected color message pop-up
        return <Slide {...props} direction="up"/>
    }

    const handleClick = (colour, Transition) => {                       //gets triggered based on change in color of the light
        setTransition(() => Transition);
        if(colour === "#ffea00") {
            setColor(colour);
            setMessage("Yellow");
        }
        else if(colour === "#64dd17") {
            setColor(colour);
            setMessage("Green");
        }
        else if(colour === "#536dfe") {
            setColor(colour);
            setMessage("Blue");
        }
        else {
            setColor(colour);
            setMessage("Red");
        }
        setOpen(true);                                                  //displays the selected color message
    };
    
    const handleClose = (event, reason) => {                            //gets triggered on closing the message
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);                                                 //closes the selected color message
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" align="center" style={{marginBottom: "20px"}}>
                Blinking Light
            </Typography>

            <Box display="flex" justifyContent="center">
                <div className="bulb" style={{backgroundColor: glowColor}}></div>
            </Box>

            <div style={{textAlign: "center", margin: "20px"}}>
                <Button variant="contained" size="large" onClick={() => toggle()}>
                    {status ? "OFF": "ON"}
                </Button>
            </div>

            {/* Buttons to set different colors of the light */}
            <div id="content">
                <div className="titlebox">Select color</div>
                <Box display="flex" flexWrap="wrap" justifyContent="space-around">
                    <Button variant="contained" size="large" style={{backgroundColor: "#f44336"}} onClick={() => handleClick("#f44336", TransitionUp)}>RED</Button>
                    <Button variant="contained" size="large" style={{backgroundColor: "#64dd17"}} onClick={() => handleClick("#64dd17", TransitionUp)}>GREEN</Button>
                    <Button variant="contained" size="large" style={{backgroundColor: "#536dfe"}} onClick={() => handleClick("#536dfe", TransitionUp)}>BLUE</Button>
                    <Button variant="contained" size="large" style={{backgroundColor: "#ffea00"}} onClick={() => handleClick("#ffea00", TransitionUp)}>YELLOW</Button>
                </Box>
            </div>

            {/* Displays selected color message */}
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center'}}
                open={open}
                autoHideDuration={1500}
                onClose={handleClose}
                TransitionComponent={transition}
                message={`${message} selected`}
            />
        </Container>
    )
}

export default App;