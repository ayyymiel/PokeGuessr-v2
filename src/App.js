import * as React from 'react';
import { useState, useEffect } from 'react';
import myHints from "./OtherComponents/Hints";
import myLetters from "./OtherComponents/Letters";

import axios from 'axios';

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

const allowedCharacters = 15;
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let letterLibrary = [];
let hintsLibrary = [];
const randomNumber = Math.round(Math.random() * 151);

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

function generateRandom(pokemonChar, pokemon) {

  for (let i=0; i<=pokemon.length; i++) {
    letterLibrary.push(pokemonChar[i]);
  }
  letterLibrary.pop();

  const dummyLetters = allowedCharacters-pokemonChar.length;

  for (let d=1; d<=dummyLetters-1; d++){
    letterLibrary.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
  }
  shufflingKnuth(letterLibrary);
  return(letterLibrary);
  
};

const generalTheme = createTheme({
  palette: {
    mode: 'dark',
  }
});

export default function App() {
  
  const [pokeHints, setPokeHints] = useState(null);
  const [loading, setLoading] = useState(false);

  const pokeFunction = async () => {
    try {
      const pokeData = await axios.get(`https://pokeapi.co/api/v2/pokemon-form/${randomNumber}`)
      .then(res => {
        let poke = res.data.name;
        let pokeUpper = poke.toUpperCase();
        let pokeChar = pokeUpper.split("");
        let pokeType = res.data.type;
        let pokeID = res.data.id;
        let pokeSprite = res.data.sprites.front_default;
        generateRandom(pokeChar, poke);
        hintsLibrary.push(pokeType, pokeID, pokeSprite);
        console.log(hintsLibrary);
        // setPokeHints(myHints(hintsLibrary));
      });
      setLoading(true);
    } catch (e) {
      console.log(e)
    }
  };
  
  useEffect(() => {
    pokeFunction()
  });
  
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
                  PokeGuessrv2!
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>

        <Stack>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center">
            {/* <Suspense fallback={<div>Loading...</div>}>
              <HintArea getPokeDetails={hintsLibrary}/>
            </Suspense> */}
            <div>
              {loading ? (pokeHints) : "Loading..."}
            </div>
            <Typography sx={{
              pt: 5, pb: 5
              }}>
                Who's that Pokemon?
            </Typography>
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