import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './main.css';
import registerServiceWorker from './registerServiceWorker';
import fontAwesome from '@fortawesome/fontawesome-free/css/all.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();