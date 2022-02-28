import { Box } from "@mui/material";
import React from "react";
import "./ErrorBoundary.scss";
export default class ErrorBoundary extends React.Component {
    state = {
        hasError: false
    };
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    render() {
        if (this.state.hasError) {
            return <Box className="Error-Boundary">
        <h1>
          Something went wrong. But don't panic.
        </h1>
        Please follow the following steps
        <ul>
          <li>
            Press ctrl + shift + I, or any other key combo depending on your browser to open up the developer tools.
          </li>
          <li>
            Search for the Application tab, and here you'll find the Local Storage tab.
          </li>
          <li>
            Remove all the data from the local storage and reload
          </li>
        </ul>
      </Box>;
        }
        return this.props.children;
    }
}
