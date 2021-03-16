import { useEffect, useMemo, useRef, useState } from 'react';
import React from 'react';
import '../App.css';
import { useGlobalState } from '../GlobalStateProvider';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import cleanText from '../cleanText';
import useInterval from 'use-interval'

function Teleprompter() {
  const [state, disptach] = useGlobalState();
  const { transcript, resetTranscript } = useSpeechRecognition()
  const [speak, setSpeak] = useState(cleanText(state.text).split(' ').map((i) => ({
    word: i,
    spoken: false
  })));
  const wordRefs = useMemo(() => speak.map((i) => React.createRef()), []);
  const [currentSpeakIndex, setCurrentSpeakIndex] = useState(0);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const windowSize = 2;
    const minWordsInWindow = 1;
    const words = transcript.split(' ');
    const windowWords = words.slice(words.length - (words.length >= windowSize ? windowSize : words.length), words.length);
    const givenWords = speak.slice(currentSpeakIndex, currentSpeakIndex + windowSize);
    let sameWordCounter = 0;
    for (let i of windowWords) {
      for (let j of givenWords) {
        if (i.toLocaleLowerCase() == j.word.toLocaleLowerCase())
          sameWordCounter++;
      }
    }
    if (sameWordCounter >= minWordsInWindow) {
      setCurrentSpeakIndex(currentSpeakIndex + windowSize);
      for (let j of givenWords) {
        j.spoken = true;
      }
    }
    if (wordRefs.length > (currentSpeakIndex + windowSize)) {
      wordRefs[currentSpeakIndex + windowSize].current.scrollIntoView();
    }
  }, [transcript])

  useInterval(() => {
    if (!state.pause) {
      setTimer(timer + .1);
    }
  }, 100)

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null
  }

  const goBackToEditMode = () => {
    disptach({ ...state, editMode: true });
  }

  const pause = () => {
    disptach({ ...state, pause: !state.pause });
    if (state.pause) {
      SpeechRecognition.startListening({
        continuous: true,
        language: 'de-DE'
      });
    } else {
      SpeechRecognition.stopListening();
    }
  }

  return (
    <div class="teleprompter">
      <div class="screen">
        {
          speak.map((val, key) => (
            <span key={key} ref={wordRefs[key]} id={`word-${key}`} class={val.spoken ? 'word word-spoken' : 'word word-unspoken'} >{val.word}</span>
          ))
        }
      </div>
      <div class="menu-layer"></div>
      <div class="bottom-menu">
        <div class="menu-item">
          <button onClick={goBackToEditMode}>Edit</button>
        </div>
        <div class="menu-item">
          <button onClick={pause}>{
            state.pause ? (<span>
              <svg fill="black" viewBox="0 0 60 60" width="5%">
                <polygon fill="black" points="0,0 50,30 0,60" />
              </svg>
            </span>) : (<span>
              <svg fill="black" viewBox="0 0 60 60" width="5%">
                <polygon fill="black" points="0,0 15,0 15,60 0,60" />
                <polygon fill="black" points="25,0 40,0 40,60 25,60" />
              </svg>
            </span>)
          }</button>
        </div>
        <div class="menu-item">
          {Math.floor(timer * 10) / 10} s
          </div>
      </div>
    </div>
  )
}

export default Teleprompter;