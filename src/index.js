import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './App';
import reducers from './reducers';



function Root() {
  return (
    <div style={{ height: "100vh" }}>
      <h1>map project</h1>
      <Provider store={createStore(reducers)}>
        <App />
      </Provider>
    </div>
  );
}

document.body.style.margin = 0;
render(<Root />, document.body.appendChild(document.createElement('div')));