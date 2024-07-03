import { createServer } from 'node:http';
import express from 'express';
import cors from 'cors';
import hangulJson from './src/hangul.json' with { type: "json" };

const hostname = '127.0.0.1';
const port = 5000;
// const server = createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });
// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

const app = express();
const corsOptions = {
  credentials: true,
  origin: ['http://localhost:5173']
};

app.use(cors(corsOptions));

var wordsToShow = hangulJson.slice();
var currentWord = hangulJson[0];

// let jsonData = [];
// const charId = 'r';
// for(var i in hangulJson) {
//     if(hangulJson[i].char_id == charId) {
//         jsonData = hangulJson[i];
//     }
// }
// console.log(jsonData);
// if (jsonData == 0) {
//     console.log("null jsonData");
// }
// console.log(jsonData.romanization);

app.post('/api/removeCurrentWord', (req,res) => {
  console.log("Removing " + currentWord + " from the list");
  let idx = wordsToShow.findIndex(item => item.char_id == currentWord.char_id);
  if(idx != -1) {
    wordsToShow.splice(idx, 1);
  } else {
    console.log("currentWord: " + currentWord.char_id + " does not exist. It has already been removed.");
  }

});

app.get('/api/getNextWord', (req, res) => {
  console.log("Getting next word");
  if(wordsToShow.length == 0) {
    console.log("Resetting the wordsToShow list");
    wordsToShow = hangulJson.slice();
  }
  let newIndex = Math.floor(Math.random() * wordsToShow.length);
  const nextWord = wordsToShow[newIndex];
  currentWord = nextWord;
  console.log("The next word is: %j", nextWord);
  res.json(nextWord);
});

app.get('/api/test', (req, res) => {
  // Handle your API logic here
  const data = { message: 'Hello from the server!' };
  console.log('data requested');
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});