import * as React from 'react';
import { render } from 'react-dom';
import App from './App';
import Map from './components/MapGL'



function Root() {
  return (
    <div style={{ height: "100vh" }}>
      <App />
      <Map />
    </div>
  );
}

document.body.style.margin = 0;
render(<Root />, document.body.appendChild(document.createElement('div')));