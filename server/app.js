const express = require('express');
const createError = require('http-errors');
const cors = require("cors") ;
const morgan = require('morgan');
const member = require("./routes/member")



require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors({
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
app.set('view engine', 'ejs');

app.get("/RequestBooking", function (req, res) {
  res.render("DeleteEvents",{name:'Akashdeep',email:'Akashdeep@gamil.com',password:"Akashdeep@123"});
});
app.get("/signup", function (req, res) {
  res.render("signup",{name:'Akashdeep',email:'Akashdeep@gamil.com',password:"Akashdeep@123"});
});
app.get("/host", function (req, res) {
  res.render("host",{name:'Akashdeep',email:'Akashdeep@gamil.com',password:"Akashdeep@123"});
});
app.get("/CRBookingDatesHost", function (req, res) {
  res.render("CRBookingDatesHost",{name:'Akashdeep',email:'Akashdeep@gamil.com',password:"Akashdeep@123"});
});

app.use("/api",member)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
