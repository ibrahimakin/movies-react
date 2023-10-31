import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Router><App /></Router>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
/*
import { lang_movies as lang_obj } from './lang';
const buttons = [];
const langs = ['tr', 'en'];
for (let i = 0; i < 2; i++) {
    buttons.push(document.createElement('button'));
    buttons[i].setAttribute('lang-name', langs[i]);
    buttons[i].onclick = event => {
        let lang = event.target.getAttribute('lang-name');
        try { localStorage.setItem('lang', lang); } catch (e) { }
        for (const element of document.querySelectorAll('[lang-tag]')) {
            let value = lang_obj[lang][element.getAttribute('lang-tag')]
            if (element.placeholder) element.placeholder = value;
            else element.textContent = value;
        }
    };
    buttons[i].innerText = langs[i];
    buttons[i].style.zIndex = 3;
    buttons[i].style.bottom = 0;
    buttons[i].style.position = 'fixed';
    buttons[i].style.left = 70 * i + 'px';
    document.body.appendChild(buttons[i]);
}
*/