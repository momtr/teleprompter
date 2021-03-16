import { useEffect, useState } from 'react';
import '../App.css';
import { useGlobalState } from '../GlobalStateProvider';

function Editor() {
  const [state, disptach] = useGlobalState();
  const [text, setText] = useState(state.text);

  const startTeleprompter = () => {
    disptach({ ...state, text, editMode: false });
  }

  return (
    <div className="edit">
      <h1 className="center">🚀 Tell your story</h1>
      <textarea className="editor-box" id="editor" onChange={(e) => setText(e.target.value)} defaultValue={state.text} />
      <button className="editor-button" onClick={startTeleprompter}>Start Teleprompter</button>
    </div>
  )
}

export default Editor;