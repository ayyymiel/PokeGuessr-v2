import * as React from 'react';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

import Typography from '@mui/material/Typography';

const pokemon = 'Charizard';
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];

const generalTheme = createTheme({
  palette: {
    mode: 'dark',
  }
});

export default function App() {

  const getLetterLibrary = () => {
    let letterLibrary = [];
    for (let i=0; i <= 12; i++) {
      letterLibrary.push(randomLetter);
    };
    for (let i=0; i <= 12; i++) {
      <Button variant="outlined" size="medium">letterLibrary[i]</Button>
    }
  }
  return (
    <ThemeProvider theme={generalTheme}>
      <CssBaseline />
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                >
                  <MenuIcon />
              </IconButton>
              <Typography variant="h5" 
                component="div" 
                align="center" 
                sx={{flexGrow: 1}}>
                  Poke-dle!
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>

        <Stack>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              display='flex'
              justifyContent='center'
              alignItems='center'
              sx={{
                width: '100%',
                height: '100%',
                border: 4,
                pt: 5}}
            >
              <Stack>
                <Typography>Types(s): Fire, Flying</Typography>
                <Typography>Gen: 1</Typography>
                <Typography>Evolution: 3</Typography>
              </Stack>
            </Box>
            <Typography sx={{
              pt: 5, pb: 5
              }}>
                Who's that Pokemon?
            </Typography>
            <Box>
              (/*Add boxes here */)
            </Box>
            <TextField id="filled-basic" label="Enter a Guess!" variant="filled" />
            <Button variant="submit" sx={{p: 2}}>Submit</Button>

            <Box sx={{
              display: 'flex',
              flexWrap: 'wrap',
              '& > :not(style)': {
                m: 1,
                width: 30,
                height: 30,
              },
            }}>
              <Paper variant="outlined" sx={{backgroundColor: "white"}}/>
              <Paper variant="outlined" sx={{backgroundColor: "white"}}/>
              <Paper variant="outlined" sx={{backgroundColor: "white"}}/>
              <Paper variant="outlined" sx={{backgroundColor: "white"}}/>
            </Box>
          </Grid>
        </Stack>
          
    </ThemeProvider>
  );
}