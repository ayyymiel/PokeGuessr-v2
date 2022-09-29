import React from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

function myLetterBox(fromLetterList) {
    const letterBoxes = [];

    for (let boxNum=0; boxNum <= 13; boxNum++) {
        letterBoxes.push(
            <Paper key={boxNum} variant="outlined" sx={{backgroundColor: "black"}}>
                <Typography>{fromLetterList.fromLetterList[boxNum]}</Typography>
            </Paper>
        );
    }
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
            {letterBoxes}
        </Box> 
)}; 

export default myLetterBox;