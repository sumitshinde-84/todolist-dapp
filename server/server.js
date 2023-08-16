const express = require("express");
const app = express();
const cors = require('cors')
const port = 3000;
const taskRoutes = require('./routes/index')

app.use('/',taskRoutes);
app.use(cors())
app.use(express.json());


app.listen(port, () => {
    console.log(`server is running at ${port}`);
});