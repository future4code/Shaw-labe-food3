import React from 'react';
import Router from "./routes/Router";
import { GlobalStyle } from "./AppStyle"
import GlobalState from './global/GlobalState';


function App() {
    return (
        <div>
            <GlobalStyle />
            <GlobalState>
                <Router />
            </GlobalState>
        </div>
    );
}

export default App;