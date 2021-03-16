import React from 'react';

const globalState = {
    text: 'Hi! This text will be pretty random. This is an interactive telepromter built with react. You can use it to prepare better for videos and stuff like that. This is a random senetcen, I am not very creative, I know. Test, this is just a test. Hi! This text will be pretty random. This is an interactive telepromter built with react. You can use it to prepare better for videos and stuff like that. This is a random senetcen, I am not very creative, I know. Test, this is just a test.',
    editMode: true,
    pause: true
}

const globalStateContext = React.createContext(globalState);
const dispatchStateContext = React.createContext(undefined);

const GlobalStateProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(
        (state, newValue) => ({ ...state, ...newValue }),
        globalState
    );
    return (
        <globalStateContext.Provider value={state}>
            <dispatchStateContext.Provider value={dispatch}>
                {children}
            </dispatchStateContext.Provider>
        </globalStateContext.Provider>
    );
};

const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext)
];


export { GlobalStateProvider, useGlobalState };