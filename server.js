if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

// const MongoClient = require('mongodb').MongoClient;
// const connectionString = 'mongodb+srv://hqhuy:hqhuy@cluster0.nfhab.mongodb.net/test?retryWrites=true&w=majority';
// MongoClient.connect(connectionString, { useUnifiedTopology: true }).then(client => {
//   console.log('Connected to Database')
// }).catch(console.error)


app.use('/', indexRouter)

app.listen(3000, function() {
    console.log('Listening on 3000')
  })