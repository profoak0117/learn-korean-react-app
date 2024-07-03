import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HangulImage from './HangulImage.jsx'
import TextBox from './TextBox.jsx'
import Results from './Results.jsx'
import hangulJson from './hangul.json'
import axios from 'axios';
import PropTypes from 'prop-types'

const App = ({firstHangulJson}) => {
  const [count, setCount] = useState(0)
  const [isCorrect, setIsCorrect] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [currentHangulJson, setCurrentHangulJson] = useState(firstHangulJson);

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
            axios.post('http://localhost:5000/api/removeCurrentWord');
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
    axios.get('http://localhost:5000/api/getNextWord')
      .then(response => {
        console.log("response: %j", response);
        setCurrentHangulJson(response.data);
      })
      .catch(error => {
        console.error(error);
      });
    console.log("currentHangulJson: %j", currentHangulJson);
  }

  return (
    <>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React </h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
      <HangulImage hangulCharacter={currentHangulJson.character}/>
      <TextBox correctWord={currentHangulJson.romanization} onAnswerSubmitted={handleSubmit} handleNextClicked={handleNextWord} hideSubmit={hasSubmitted}/>
      <Results jsonData={currentHangulJson} isCorrect={isCorrect} hasSubmitted={hasSubmitted}/>
    </>
  )
}

App.propTypes = {
  firstHangulJson : PropTypes.jsonData
}

export default App
