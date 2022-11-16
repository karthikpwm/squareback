const express = require('express')
const fileUpload = require('express-fileupload');
var bodyParser = require('body-parser')
var cors = require('cors')
const Razorpay = require('razorpay')
require('dotenv').config()
const app = express();

app.use(express.static('public'));
app.use(cors())
//app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());

// app.post('/uploadnse', (req, res) => {

// console.log(req.body.excelData)
// res.send();
// })

app.post('/fetch', (req, res) => {
  console.log(req.body)
  res.send();
})
app.post('/upload', (req, res) => {
  console.log(req.files)
  // function autogen() {
  let date = new Date()
  console.log(date.toTimeString())
  //}
  if (!req.files) {
    return res.status(500).send({ msg: "file is not found" })
  }
  const myFile = req.files.files;
  console.log(myFile)
  //const filename = myFile.name
  //console.log(filename)
  myFile.mv(`${__dirname}/public/${myFile.name}`,
    function (err) {
      if (err) {
        console.log(err)
        return res.status(500).send({ msg: " error" });
      }
      return res.send({ file: myFile.name, path: `/${myFile.name}`, ty: myFile.type });
    })

})
// Bring in the routes
// localhost
app.use("/newbuy", require('./routes/newbuy'))
app.use("/analytic", require('./routes/analytic'))

app.use("/user", require('./routes/user'))
app.use("/guest", require('./routes/guest'))
app.use("/token", require('./routes/token'))
app.use("/payment", require('./routes/payment'))
// app.use( "/credit", require('./routes/credit'))
// app.use( "/customer", require('./routes/customer'))
// app.use( "/bill", require('./routes/bill'))
// app.use( "/dictionary/place", require('./routes/place'))
// app.use('/company', require('./routes/company'))

// Setup Error Handlers
const errorHandlers = require('./handlers/errorHandler')

app.use(errorHandlers.notFound)
app.use(errorHandlers.mongoseError)
if (process.env.ENV === 'DEVELOPMENT') {
  app.use(errorHandlers.developmentErrors)
} else {
  app.use(errorHandlers.productionError)
}

app.use(errorHandlers.notFound)



module.exports = app;