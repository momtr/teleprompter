import React from 'react';

const globalState = {
    text: 'Hi! Heite zeige ich dir wie Du dir ganz einfach eine eigene Website zusammenstellen kannst und diese auch verwenden kannst. Dazu sind wenige Schritte notwendig, die ich dir aber alle bebringen möchte. Als erstes musst du die Differentialgleichung dritten Grades lösen, um dann mit dem Rest fortzufahren. Dann nimm ein Noughatknödel zur Hand und iss es auf.',
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