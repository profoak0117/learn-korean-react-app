import { useState } from 'react'
import './App.css'
import HangulImage from './HangulImage.jsx'
import TextBox from './TextBox.jsx'
import Results from './Results.jsx'
import hangulJson from './hangul.json'
import axios from 'axios';
import PropTypes from 'prop-types'

var timesToSkip = new Map();
var totalTimesToSkip = new Map();
var wordsToShow = hangulJson.slice();
var currentWord = hangulJson[0];
wordsToShow.forEach((currentElement) => {
  timesToSkip.set(currentElement.char_id, Number(0));
  totalTimesToSkip.set(currentElement.char_id, Number(0));
  console.log("prev time ot skip : " + currentElement.char_id + " set to " + Number(0));
});
console.log([...timesToSkip]);

const App = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [currentHangulJson, setCurrentHangulJson] = useState(currentWord);

  function removeCurrentWord() {
    let idx = wordsToShow.findIndex(item => item.char_id == currentWord.char_id);
    if(idx != -1) {
      wordsToShow.splice(idx, 1);
    } else {
      console.log("currentWord: " + currentWord.char_id + " does not exist. It has already been removed.");
    }
  }

  function getNextWord() {
    console.log("Getting next word");
    if(wordsToShow.length == 0) {
      console.log("Resetting the wordsToShow list");
      wordsToShow = hangulJson.slice();
      for(var word in wordsToShow){
        let curWord = word.char_id.toLowerCase();
        let curTimesToSkip = timesToSkip.get(curWord);
        if (curTimesToSkip != 0) {
          currentWord = word;
          removeCurrentWord();
          timesToSkip.set(curWord, curTimesToSkip-Number(1));
          console.log("Old cur times to skip: " + curTimesToSkip);
          console.log("New cur times to skip: " + (curTimesToSkip-Number(1)));
        }
      }
    }
    let newIndex = Math.floor(Math.random() * wordsToShow.length);
    const nextWord = wordsToShow[newIndex];
    currentWord = nextWord;
    console.log("The next word is: %j", nextWord);
    return(nextWord);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const correctWord = currentHangulJson.romanization;
    const formJson = Object.fromEntries(formData.entries());
    console.log("formJson: " + formJson);
    console.log("the answer input:" + formJson["answerInput"]);
    console.log("correct word legnth: " + correctWord.length);
    console.log("correct word: " + correctWord);
    for(var word in correctWord){
        console.log("word:" + correctWord[word]);
        if (formJson["answerInput"].toUpperCase() == correctWord[word].toUpperCase()) {
            console.log("correct answer");
            setIsCorrect(true);
            removeCurrentWord();
            let currentHangulJsonIdx = currentHangulJson.char_id.toLowerCase();
            let newTotalTimeToSkip = Number(totalTimesToSkip.get(currentHangulJsonIdx)) + Number(1);
            console.log("oldTotalTimeToSkip: " + (newTotalTimeToSkip - Number(1)));
            totalTimesToSkip.set(currentHangulJsonIdx, newTotalTimeToSkip);
            console.log("newTotalTimeToSkip: " + Number(totalTimesToSkip.get(currentHangulJsonIdx)));
            timesToSkip.set(currentHangulJsonIdx, newTotalTimeToSkip);
            console.log("time to skip: " + timesToSkip.get(currentHangulJsonIdx));
            break;
        } else {
            console.log("incorrect answer");
            setIsCorrect(false);
        }
    }
    setHasSubmitted(true);
  }

  function handleNextWord(e) {
    e.preventDefault();
    console.log("handling next word");
    setHasSubmitted(false);
    setCurrentHangulJson(getNextWord());
    console.log("currentHangulJson: %j", currentHangulJson);
  }

  return (
    <>
      <HangulImage hangulCharacter={currentHangulJson.character}/>
      <TextBox correctWord={currentHangulJson.romanization} onAnswerSubmitted={handleSubmit} handleNextClicked={handleNextWord} hideSubmit={hasSubmitted}/>
      <Results jsonData={currentHangulJson} isCorrect={isCorrect} hasSubmitted={hasSubmitted}/>
    </>
  )
}

// App.propTypes = {
//   firstHangulJson : PropTypes.jsonData
// }

export default App
