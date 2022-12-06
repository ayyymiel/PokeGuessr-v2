import * as React from 'react';
import { useState, useEffect } from 'react';

import axios from 'axios';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

const allowedCharacters = 15;
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let letterLibrary = [];
const randomNumber = Math.round(Math.random() * 151);

function myLetterBox(fromLetterList) {
  const letterBoxes = [];

  for (let boxNum=0; boxNum <= 13; boxNum++) {
      letterBoxes.push(
        <Col className="d-flex">
          <Card.Body className="flex-fill" key={boxNum} variant="outlined" sx={{backgroundColor: "black", textAlign: "center"}}>
              <p style={{"fontFamily": "pokemonFont"}}>{fromLetterList[boxNum]}</p>
          </Card.Body>
        </Col>
      );
  }
  return letterBoxes;
};

function shufflingKnuth(letterArray) {
  let currentIndex = letterArray.length, randomIndex;

  // while there are still unshuffled elements left
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [letterArray[currentIndex], letterArray[randomIndex]] = [letterArray[randomIndex], letterArray[currentIndex]]
  }
  myLetterBox(letterArray);
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
};

const generalTheme = createTheme({
  palette: {
    mode: 'dark',
  }
});

export default function App() {
  
  const [pokeID, setPokeID] = useState(null);
  const [pokeSprite, setPokeSprite] = useState(null);
  const [pokeLetters, setPokeLetters] = useState(null);
  const [initGuess, setInitGuess] = useState('');
  const [pokeAns, setPokeAns] = useState(null);
  const [loading, setLoading] = useState(false);

  const pokeFunction = async () => {
    try {
      await axios.get(`https://pokeapi.co/api/v2/pokemon-form/${randomNumber}`)
      .then(res => {
        let poke = res.data.name;
        let pokeUpper = poke.toUpperCase();
        let pokeChar = pokeUpper.split("");
        let pokeID = res.data.id;
        let pokeSprite = res.data.sprites.front_default;
        let pokeName = res.data.name;
        generateRandom(pokeChar, poke);
        setPokeID(pokeID);
        setPokeSprite(pokeSprite);
        setPokeLetters(letterLibrary);
        setPokeAns(pokeName);
      });
      setLoading(true);
    } catch (e) {
      console.log(e)
    }
  };
  useEffect(() => {
    pokeFunction();
  }, []); // WHY DOES ADDING THIS LIST HERE WORK
  
  function answerChecker() {
    let initGuessLower;
    initGuessLower = initGuess.toLowerCase();
    if (initGuessLower === pokeAns) {
      alert('Good Job!');
      window.location.reload(false);
    } else {
      alert('Try again!');
    }
  }
  
  return (
    <ThemeProvider theme={generalTheme}>
      <CssBaseline />
      <Container fluid style={{"border-bottom": "1px solid white"}}>
        <Row>
          <Col>
            <h2 style={{"paddingTop": 20, 
            "paddingLeft": 20,
            "paddingBottom": 20,
            "fontFamily": "pokemonFont"}}>PokeGuessr!</h2>
          </Col>
          <Col>
            <a href="https://github.com/ayyymiel/PokeGuessr-v2">
              <img src={require("./themesAndPics/github-png.png")} 
              alt="GitHub Logo"
              style={{"paddingTop": 30, 
              "paddingRight": 20,
              "height": 60}}
              align="right"
              />
            </a>
          </Col>
        </Row>
      </Container>

      <Container display flex justify-content-center>
        <Col>
          <p>ID: {loading ? (pokeID) : "Loading..."}</p>

          <img 
            width='200px'
            height='200px'
            component="img"
            src={loading ? (pokeSprite) : "Loading..."} alt="pokemon sprite"/>

          <Row>
            {loading ? (myLetterBox(pokeLetters)) : "Loading..."}
          </Row>
        
          <Row>
            <p style={{"padding": "20px"}}>
                Who's that Pokemon?
            </p>
          </Row>
          
          <TextField value={initGuess} 
            id="filled-basic" 
            label="Enter a Guess!" 
            variant="filled" 
            onChange={(event) => setInitGuess(event.target.value)}/>

          <Button variant="submit" sx={{p: 2}} onClick={answerChecker}>Submit</Button>
        </Col>
      </Container>
    </ThemeProvider>
  );
}