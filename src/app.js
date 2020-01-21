const path = require('path');
const express = require('express');
const hbs = require('hbs');
const weather = require('../utils/weather');

const app = express();

const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup template engine
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

//set static resources, css js image
app.use(express.static(publicPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'John Ding'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About App',
        name: 'John Ding'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'John Ding',
        helpText: 'This is a good app'
    });
});

app.get('/weather', (req, res) => {
    if(req.query.address) {
        weather.getWeather(req.query.address, (data) => {
            res.send({
                address: data
            });        
        });
    } else {
        res.send({
            error: 'No address'
        });    
    }
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        page: 'help article',
        name: 'John DIng'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        page: 'help article',
        name: 'John DIng'
    });
});

app.listen(3000, () => {
    console.log('Server is up port 3000');
});