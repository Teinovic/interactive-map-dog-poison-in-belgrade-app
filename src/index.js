import * as React from 'react';
import { render } from 'react-dom';
import App from './App';
import Map from './components/MapGL'



function Root() {
  return (
    <div style={{ height: "100vh" }}>
      <h1>map project</h1>
      <App />
    </div>
  );
}

document.body.style.margin = 0;
render(<Root />, document.body.appendChild(document.createElement('div')));