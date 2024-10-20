require("dotenv").config();
const { createClient } = require("@deepgram/sdk");
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const { writeFileSync, readFileSync } = require("fs");

express()
  .use(cors())
  .use('/', express.static(__dirname))
  .get('/exec/:list', (req, res) => {
    const list = req.params.list;
    writeFileSync('keywords.txt', list.split(',').join(', '));
    exec('python index.py', (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
      res.json(JSON.parse(readFileSync('freelancers.json')));
    });
  })
  .get('/audio', async (req, res) => {
    getAudio().then(() => res.json({ message: 'Audio generated' }));
  })
  .listen(8000, () => console.log("Server running on http://localhost:8000"));

// STEP 1: Create a Deepgram client with your API key
const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

const keywords = ['Python', 'AWS', 'Docker', 'React'];
const candidates = [
  ['Sophia', 'Jones', 'JavaScript, HTML, CSS, React, Python, SQL, Cloud Computing, AWS, Docker, Flask, Django, Node.js, UX/UI Design'],
  ['Alice', 'Smith', 'JavaScript, React, Node.js, SQL'],
  ['Emma', 'Moore', 'React, Node.js, HTML, CSS, JavaScript, SQL, Python']
];

// Create names array
const names = candidates.map(([first, last, skills]) => `${first} ${last}`);

// Generate the allCandidates sentence
const allCandidates = `There are ${candidates.length} candidates who have the knowledge of what you are looking for: ${keywords.join(', ')}. The candidates are ${names.slice(0, -1).join(', ')}, and ${names[names.length - 1]}.`;

// Speak options object
const text = `Hello, there are good candidates for the specific skill set you are looking for. ${allCandidates}`;

const getAudio = async () => {
  // STEP 2: Make a request and configure the request with options (such as model choice, audio configuration, etc.)
  const response = await deepgram.speak.request(
    { text },
    {
      model: "aura-arcas-en",
      encoding: "linear16",
      container: "wav",
    }
  );
  // STEP 3: Get the audio stream and headers from the response
  const stream = await response.getStream();
  const headers = await response.getHeaders();
  if (stream) {
    // STEP 4: Convert the stream to an audio buffer
    const buffer = await getAudioBuffer(stream);
    // STEP 5: Write the audio buffer to a file
    fs.writeFile("output.wav", buffer, (err) => {
      if (err) {
        console.error("Error writing audio to file:", err);
      } else {
        console.log("Audio file written to output.wav");
      }
    });
  } else {
    console.error("Error generating audio:", stream);
  }

  if (headers) {
    console.log("Headers:", headers);
  }
};

// helper function to convert stream to audio buffer
const getAudioBuffer = async (response) => {
  const reader = response.getReader();
  const chunks = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    chunks.push(value);
  }

  const dataArray = chunks.reduce(
    (acc, chunk) => Uint8Array.from([...acc, ...chunk]),
    new Uint8Array(0)
  );

  return Buffer.from(dataArray.buffer);
};