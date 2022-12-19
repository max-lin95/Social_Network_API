const express = Require('express');
const app = express();
const mongoose = Require('mongoose');
const routes = Require('./routes');
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));
app.use(require('./routes'));

// CONNECT TO MONGODB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/socialnetworkAPI', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(routes);

mongoose.set('debug', true);

app.listen(PORT, () => console.log(`API server running on port ${PORT}!`));