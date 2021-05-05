const express = require('express');
const app = express();
const port = 8000;
const db = require('./config/mongoose');

const session = require('express-session');
const passport = require('passport');
const LocalPassport = require('./config/passport_local_strategy');

const MongoDBStore = require('connect-mongodb-session')(session);

app.use(express.urlencoded());

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(session({
    name:'MovieReview',
    secret:'Sonething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store : new MongoDBStore({
        uri: 'mongodb://localhost:27017/connect_mongodb_session_test',
        collection: 'mySessions'
      })
    }
));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.checkAuthtenticatedUser);

app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err)
    {
        console.log('Error while running server', err);
        return;
    }
});