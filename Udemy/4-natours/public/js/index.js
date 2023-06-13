import '@babel/polyfill';
import { displayMap } from './mapbox';
import { login } from './login';

// DOM ELEMENTS
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form');

// VALUES
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;



// DELEGATION
if (mapbox) {
    const locations = JSON.parse(mapBox.dataset.locations);
    createScript('https://api.mapbox.com/mapbox-gl-js/v2.9.1/mapbox-gl.js');
    displayMap(locations);
}


if (loginForm){
    document.querySelector('.form').addEventListener('submit', e => {
        e.preventDefault();
        login(email, password);
    });
}
