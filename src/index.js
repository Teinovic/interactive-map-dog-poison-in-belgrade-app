import * as React from 'react';
import { render } from 'react-dom';
import App from './App';
import Map from './components/MapGL'
import MarkerPopupContainer from './containers/markerPopup/MarkerPopup';


function Root() {
  return (
    <div style={{ height: "100vh" }}>
      <App />
      <Map />
      <MarkerPopupContainer />
    </div>
  );
}

document.body.style.margin = 0;
render(<Root />, document.body.appendChild(document.createElement('div')));