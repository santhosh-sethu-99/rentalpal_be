const express = require('express');
// const logger = require('./middlewares/logger');
const loginRoutes = require('./routes/login.routes');

const app = express();
const port = 3000;

// app.use(logger);
app.use(express.json());

// initialize routes
app.use('/api/v1', loginRoutes);


// dummy method for testing
app.get('/hello-world', (req, res) => {
    res.status(200).send({ success: true, message: 'Hello World!' });
});

app.listen(port, () => {
    console.log(`Project running on port number: ${port}`);
});
