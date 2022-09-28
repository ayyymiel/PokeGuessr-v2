import React from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

function myLetterBox(fromLetterList) {
    console.log(fromLetterList);
    return(
        <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
            m: 1,
            width: 30,
            height: 30,
            },
        }}>
            <Paper variant="outlined" sx={{backgroundColor: "black"}}>
            <Typography>fromLetterList</Typography>
            </Paper>
        </Box> 
)}; 

export default myLetterBox;