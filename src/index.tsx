import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';
import { ErrorBoundary } from './components';
import { Root } from './Root';
import initPrismLineNumbers from "./scripts/prism-line-numbers";
import './styles/index.scss';
import "./styles/prism-line-highlight.scss";
import "./styles/vs-light.scss";
import "./styles/vscode-dark.scss";

initPrismLineNumbers();

ReactDOM.render(<Router>
  <ErrorBoundary>
    <Root>
      <App />
    </Root>
  </ErrorBoundary>
</Router >, document.getElementById('root'));