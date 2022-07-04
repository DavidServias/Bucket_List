const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8080;
const userRoutes = require('./routes/userRoutes');
const bucketListRoutes = require('./routes/bucketlist_routes');
const loginRoutes = require('./routes/login_routes');
const bodyParser = require("body-parser");
// const passport = require('passport');
require('dotenv').config();
console.log(process.env); // remove this after you've confirmed it working

console.log("db uri test:" + process.env.REACT_APP_DB_URI);

// connect to db
mongoose.connect(process.env.REACT_APP_DB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(function(result) {
        console.log('Database is connected');
    })
    .catch((err) => console.log(err));

// Apply CORS policy
app.use(cors({
    origin: 'http://localhost:3000'
}));


// Assign the PORT to our app
app.listen(PORT, () => console.log(`Server Running on port: http://localhost:${PORT}`));


//Message is shown  when visiting http://localhost:8080/
app.get('/', (req, res) => res.send('BucketList is up and running!'));

/**bodyParser.json(options)
* Parses the text as JSON and exposes the resulting object on req.body.
*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// project routes
app.use('/login', loginRoutes);
app.use('/users', userRoutes);
app.use('/bucket_list', bucketListRoutes);



// app.use (passport.initialize())
// app.use (passport.session())