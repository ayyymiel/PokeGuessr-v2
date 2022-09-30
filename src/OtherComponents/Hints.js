import React from "react";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

function myHints(getPokeDetails) {
    return(
        <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            sx={{
            width: '100%',
            height: '100%',
            pt: 5}}>
                <Stack>
                    <Typography>Types(s): {getPokeDetails.getPokeDetails[0]}</Typography>
                    <Typography>Pokemon No.: {getPokeDetails.getPokeDetails[1]}</Typography>
                    <Box sx={{
                        display: 'flex',
                        width: '100%',
                        height: '100%',
                    }}
                    component="img"
                    src={getPokeDetails.getPokeDetails[2]}/>
                </Stack>
        </Box>
)};

export default myHints;