const express = require('express');

const loginRoutes = require('./api/routes/login.routes.js');

const app = express();
const port = 3000;

app.use(express.json());

// initialize routes
app.use('/api/v1', loginRoutes);

// local hosting
app.listen(port, () => {
    console.log(`Project running on port number: ${port}`);
});
