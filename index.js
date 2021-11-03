const express = require('express');
const path = require('path')

const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/', (req, res) => {
    res.send(`<h2>Welcome<\h2>
    <h3>Click here <b> <a href="/student/list">Database</a></b></h3>`)
})


app.set('middlewares', path.join(__dirname, '/middlewares/'))
app.set('models', path.join(__dirname, '/models/'))
app.set('views', path.join(__dirname, '/views/'))
app.set('routes', path.join(__dirname, '/routes/'))

require(app.get('routes') + 'item')(app)
require(app.get('routes') + 'category')(app)
require(app.get('routes') + 'stats')(app)

const port = 3000
app.listen(port, () => {
    console.log('server started at port ' + port );
});