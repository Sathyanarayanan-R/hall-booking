const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.json());

const port = process.env.PORT || 1509;

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});

const RoomsRoutes = require('./routes/room');
app.use("/api/rooms", RoomsRoutes);