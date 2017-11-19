import React from 'react'
import ReactDOM from 'react-dom';
import './index.css';
import Panel from './panel.js'
import Album from './album'

// Main App

class App extends React.Component {
  render() {
    return (
      <div className="My First App">
        <Album />
      </div>
    );
  }
}

// =======================================

ReactDOM.render(
  <App />,
  document.getElementById('container')
)