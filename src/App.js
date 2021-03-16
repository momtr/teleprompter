import React from 'react';
import './App.css';
import { useGlobalState } from './GlobalStateProvider';
import Editor from './components/Editor';
import Teleprompter from './components/Teleprompter';

function App() {
  const [state, disptach] = useGlobalState();
  return (
    <div>
      {
        state.editMode ? (<Editor />) : (<Teleprompter />)
      }
    </div>
  );
}


export default App;
