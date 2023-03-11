const router = require('express').Router();

const { createRoom, bookRoom, listAllRooms, listAllCustomers } = require('../CR Functions/cr_func');

let roomId;

router.post("/create", (req, res) => {

    try {
        const seatsavailable = req.body.seatsavailable;
        const amenities = req.body.amenities;
        const price = req.body.price;

        if (roomId == undefined)
            roomId = 1;
        else
            ++roomId;

        let Rooms = createRoom(roomId, `Room ${roomId}`, seatsavailable, amenities, price);
        res.status(200).json(Rooms);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }

});

router.post("/book", (req, res) => {

    try {
        const customername = req.body.customername;
        const date = req.body.date;
        const starttime = req.body.starttime;
        const endtime = req.body.endtime;
        const roomid = req.body.roomid;

        let bookedRooms = bookRoom(customername, date, starttime, endtime, roomid);
        res.status(200).json(bookedRooms);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }

});

router.get("/", (req, res) => {

    try {
        let Rooms = listAllRooms();
        res.status(200).json(Rooms);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }

});

router.get("/customers", (req, res) => {

    try {
        let Customers = listAllCustomers();
        res.status(200).json(Customers);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }

});

module.exports = router;



