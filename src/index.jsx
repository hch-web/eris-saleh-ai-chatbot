import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './app/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

const el = document.createElement('div');
el.id = 'chat-bot';

document.getElementsByTagName('body')[0].appendChild(el);

const root = ReactDOM.createRoot(el);

root.render(<App />);
