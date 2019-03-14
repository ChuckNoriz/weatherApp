const express = require('express');
const path = require('path');
const hbs = require('hbs');
const getWeather = require('../weather-app/weather.js')
const axios = require('axios');

const app = express();
const pubDir = path.join(__dirname, '../public');
const partPath = path.join(__dirname, '../templates/partials');
const PORT = process.env.PORT || 3000;

//if template folder name is NOT 'views'(default), then one should set defeult folder for views
app.set('views',path.join(__dirname,'../templates/views'))
app.set('view engine', 'hbs');
hbs.registerPartials(partPath);
//for static pages only (not compatible with hbs templates views)
app.use(express.static(pubDir));


app.get('',(req,res) => res.render('index',{
    title: 'Weather'
}));

app.get('/about', (req,res) => res.render('about', {
    title: 'about.hbs page'
}))

app.get('/help', (req,res) => res.render('help', {
    title:'Help me, help me!'
}));

//for non-existing routes
// app.get('*', (req,res) => {
//     res.redirect('https://apps.thecodepost.org/trex/trex.html');    
// });

app.get('/weather', (req,res) => {
    if (!req.query.address){
        //return statement stops execution so it wouldnt proceed (no 2 http responses). ALso cound do the same with ELSE statement
        return res.send({error:'no search query provided'})
    }
    //using promises res.json is a special one that renders returned primise data
    getWeather(req.query.address).then(data => {
        res.json(data);
    }).catch(err => console.log('ERROR',err))
    
})

app.listen(PORT,() => console.log('Listening on port:', PORT));