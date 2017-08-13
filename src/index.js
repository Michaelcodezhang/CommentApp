import React from 'react';
import ReactDOM from 'react-dom';
import CommentApp from './CommentApp'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<CommentApp/>,document.getElementById('root'))
// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
