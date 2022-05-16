import React from 'react';
import Router from "./routes/Router";
import { GlobalStyle } from "./AppStyle"


function App() {
  return (
    <div>
      <GlobalStyle />
      <Router />
    </div>
  );
}

export default App;