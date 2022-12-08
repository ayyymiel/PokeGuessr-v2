import * as React from 'react';
import { useState, useEffect } from 'react';

import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const allowedCharacters = 15;
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let letterLibrary = [];
const randomNumber = Math.round(Math.random() * 151);

document.body.style.backgroundColor = "black";

function myLetterBox(fromLetterList) {
  const letterBoxes = [];

  for (let boxNum=0; boxNum <= 13; boxNum++) {
      letterBoxes.push(
        <Col>
          <Card.Body 
            key={boxNum} 
            variant="outlined" 
            style={{
              backgroundColor: "black", 
              textAlign: "center"}}>
              <Card.Text style={{"fontFamily": "pokemonFont"}}>{fromLetterList[boxNum]}</Card.Text>
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
    <div>
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

      <Container>
        <Row>  
          <p className="d-flex justify-content-center">ID: {loading ? (pokeID) : "Loading..."}</p>
        </Row>
        
        <div style={{"text-align": "center"}}>
          <img 
            margin="auto"
            display="block"
            width="200"
            height="200"
            component="img"
            src={loading ? (pokeSprite) : "Loading..."} alt="pokemon sprite"/>
        </div>
        
        <Row>
          {loading ? (myLetterBox(pokeLetters)) : "Loading..."}
        </Row>      
        <p style={{"padding": "20px", "text-align": "center"}}>
          Who's that Pokemon?
        </p>
        
        <Form>
          <Form.Group>
            <Form.Control 
              type="pokeAns"
              style={{backgroundColor: "black", color: "white"}}
              onChange={(event) => setInitGuess(event.target.value)}/>
          </Form.Group>
        </Form>

        <Button variant="submit"
          style={{
            display: "flex",
            color: "white",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "20px"}} 
          onClick={answerChecker}>
            Submit
          </Button>
      </Container>
    </div>
  );
}