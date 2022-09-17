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
/*
fetch('https://pokeapi.co/api/v2/pokemon-form/151')
  .then((response) => response.json())
  .then((data) => console.log(data))
*/
const pokemon = 'CHARIZARD';

console.log(pokemon);
const pokemonChar = pokemon.split("");
const allowedCharacters = 15;
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const letterLibrary = [];

function shufflingKnuth(letterArray) {
  let currentIndex = letterArray.length, randomIndex;

  // while there are still unshuffled elements left
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [letterArray[currentIndex], letterArray[randomIndex]] = [letterArray[randomIndex], letterArray[currentIndex]]
  }
  return letterArray;
};

function generateRandom() {
  shufflingKnuth(pokemonChar);

  for (let i=0; i<=pokemon.length; i++) {
    letterLibrary.push(pokemonChar[i]);
  }
  console.log(letterLibrary);
  letterLibrary.pop();
  console.log(letterLibrary);
  const dummyLetters = allowedCharacters-pokemonChar.length;

  for (let d=1; d<=dummyLetters-1; d++){
    letterLibrary.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
  }
};

generateRandom()

const generalTheme = createTheme({
  palette: {
    mode: 'dark',
  }
});

export default function App() {
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
-              </IconButton>
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
                pt: 5}}
            >
              <Stack>
                <Typography>Types(s): Fire, Flying</Typography>
                <Typography>Gen: 1</Typography>
                <Typography>Evolution: 3</Typography>
                <Typography>Letter #: {pokemon.length}</Typography>
              </Stack>
            </Box>
            <Typography sx={{
              pt: 5, pb: 5
              }}>
                Who's that Pokemon?
            </Typography>
            
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
                <Typography>{letterLibrary[0]}</Typography>
              </Paper>
              <Paper variant="outlined" sx={{backgroundColor: "black"}}>
                <Typography>{letterLibrary[1]}</Typography>
              </Paper>
              <Paper variant="outlined" sx={{backgroundColor: "black"}}>
                <Typography>{letterLibrary[2]}</Typography>
              </Paper>
              <Paper variant="outlined" sx={{backgroundColor: "black"}}>
                <Typography>{letterLibrary[3]}</Typography>
              </Paper>
              <Paper variant="outlined" sx={{backgroundColor: "black"}}>
                <Typography>{letterLibrary[4]}</Typography>
              </Paper>
              <Paper variant="outlined" sx={{backgroundColor: "black"}}>
                <Typography>{letterLibrary[5]}</Typography>
              </Paper>
              <Paper variant="outlined" sx={{backgroundColor: "black"}}>
                <Typography>{letterLibrary[6]}</Typography>
              </Paper>
              <Paper variant="outlined" sx={{backgroundColor: "black"}}>
                <Typography>{letterLibrary[7]}</Typography>
              </Paper>
              <Paper variant="outlined" sx={{backgroundColor: "black"}}>
                <Typography>{letterLibrary[8]}</Typography>
              </Paper>
              <Paper variant="outlined" sx={{backgroundColor: "black"}}>
                <Typography>{letterLibrary[9]}</Typography>
              </Paper>
              <Paper variant="outlined" sx={{backgroundColor: "black"}}>
                <Typography>{letterLibrary[10]}</Typography>
              </Paper>
              <Paper variant="outlined" sx={{backgroundColor: "black"}}>
                <Typography>{letterLibrary[11]}</Typography>
              </Paper>
              <Paper variant="outlined" sx={{backgroundColor: "black"}}>
                <Typography>{letterLibrary[12]}</Typography>
              </Paper>
              <Paper variant="outlined" sx={{backgroundColor: "black"}}>
                <Typography>{letterLibrary[13]}</Typography>
              </Paper>
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