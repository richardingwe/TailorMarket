const express = require('express');
const app = express();
const { Sequelize } = require('sequelize');
const ejs = require('ejs');
const sequelize = require('./config/database');
const passport = require('passport');
const session = require('express-session');
const methodOverride = require('method-override');
const path = require('path');
require('dotenv').config();
const SessionStore = require('express-session-sequelize')(session.Store);

const sequelizeSessionStore = new SessionStore({
	db : sequelize
});

const jobsRoute = require('./routes/jobs');
const authRoute = require('./routes/auth');
const dashboardRoute = require('./routes/dashboard');

require('dotenv').config({ path: './config/config.env' });
require('./config/passport')(passport);

app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

app.use(
	session({
		secret            : 'keyboard cat',
		store             : sequelizeSessionStore,
		resave            : false,
		saveUninitialized : false
	})
);

app.use(passport.initialize());
app.use(passport.session());

sequelize
	.authenticate()
	.then(() => console.log('Connection has been established successfully.'))
	.catch((error) => console.error('Unable to connect to the database:', error));

app.use('/jobs', jobsRoute);
app.use('/auth', authRoute);
app.use('/dashboard', dashboardRoute);

app.get('/', (req, res) => res.render('index', { name: req.user }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`server has started at port: ${PORT}`));
