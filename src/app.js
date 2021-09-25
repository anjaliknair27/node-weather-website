const express = require('express')
const hbs = require('hbs')
const { dirname } = require('path')
const path = require('path')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000;

//define paths for express config
const directoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//set up handle bars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(directoryPath));


//app.com
//app.com/help
//app.com/about
//app.com/weather

//renders the view mentioned
app.get('', (req, res) => {
    res.render('index', {

        title: "Weather",
        name: "Anjali K Nair"

    });
})


app.get('/about', (req, res) => {
    res.render('about', {

        title: "About me",
        name: "Anjali K Nair"

    });
})

app.get('/help', (req, res) => {
    res.render('help', {

        title: "Help",
        name: "Anjali K Nair"

    });
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }

    geoCode(req.query.address, (error, { lattitude, longitude, placeName } = {}) => {

        if (error) {
            return res.send({
                error: 'Place not found!'
            })
        }
        forecast(lattitude, longitude, (error, foreCastData) => {
            if (error) {
                return res.send({
                    error: 'Forecast not found!'
                })
            }

           res.send({
                forecast: foreCastData,
                location: placeName,
                address: req.query.address
            })
        })

    })

})
app.get('/help/*', (req, res) => {

    //add hbs name here
    res.render('help-404', {
        title: '404',
        errorMessage: "Help article not found",
        name: "Anali K Nair"

    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: "Page not found",
        name: "Anali K Nair"
    })
})



app.listen(port, () => {
    console.log('Server is up on port: '+port)
})

