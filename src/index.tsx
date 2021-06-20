import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';
import { ErrorBoundary } from './components';
import { Root } from './Root';
import Routes from './Routes';

ReactDOM.render(<Router>
  <ErrorBoundary>
    <Root>
      <App>
        <Routes />
      </App>
    </Root>
  </ErrorBoundary>
</Router >, document.getElementById('root'));