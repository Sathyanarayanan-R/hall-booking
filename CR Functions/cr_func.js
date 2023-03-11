const Rooms = [];

const bookedRooms = [];

// To create a Room by using user provided data

const createRoom = (roomid, roomname, seatsavailable, amenities, price) => {
    Rooms.push({
        "roomId": roomid,
        "roomName": roomname,
        "seatsAvailable": seatsavailable,
        "amenities": amenities,
        "price": price,
        "bookedStatus": "no"
    });
    console.log("Room Created Successfully!!!");
    return { message: "Room Created Successfully!!!" };
}

// To book a Room by using user provided data

const bookRoom = (customername, date, starttime, endtime, roomid) => {
    
    // To check whether atleast one Room is there So that customer can proceed to book
    if (Rooms.length > 0) {      

        let room_proceedToBook = false, datetime_proceedToBook = true;

        const pushData = () => {
            bookedRooms.push({
                "customerName": customername,
                "date": date,
                "startTime": starttime,
                "endTime": endtime,
                "roomId": roomid,
            });
            return ({ message: "Room Booked Successully!!!" });
        }

        // To check whether the customer booking room id is there or not
        Rooms.forEach(room => {
            if (room.roomId == roomid) {
                room.bookedStatus = "yes";
                return room_proceedToBook = true;
            }
        })

        if (!room_proceedToBook) {
            return ({ message: `There is no Room with id ${roomid} is present. Please check & try to book the room with correct id` });
        }
        
        if (bookedRooms.length > 0) {

            let validateDateTimeMsg = "";

            // To check whether there is any room that is already booked on the same date & time
            bookedRooms.forEach(roomBooked => {

                if (roomBooked.roomId == roomid && roomBooked.date == date && Number(starttime.split(':')[0]) >= Number(roomBooked.startTime.split(':')[0]) && Number(starttime.split(':')[0]) < Number(roomBooked.endTime.split(':')[0])) {
                    datetime_proceedToBook = false;
                    return (validateDateTimeMsg = `For the same date & time the Room ${roomid} has been already booked. Hence, Please book differnt room/book the same room with different date/time`);
                }
            })

            if (!datetime_proceedToBook) {
                return {message: validateDateTimeMsg};
            }

            return pushData();

        } else {
            return pushData();
        }

    } else {
        return ({ message: "No Room is Created. Please create the Room first then try to book the room" });
    }
}

// To List All Rooms with Booked Data

const listAllRooms = () => {
    if (Rooms.length > 0) {
        console.log("\n\nListed All Rooms with Booked Data : \n");
        let roomsData = [];
        Rooms.forEach(room => {
            const { roomName, bookedStatus } = room;

            if (room.bookedStatus !== "no") {
                bookedRooms.forEach(roomBooked => {
                    if (roomBooked.roomId == room.roomId) {
                        const { customerName, date, startTime, endTime } = roomBooked;
                        roomsData.push({
                            "Room Name": roomName,
                            "Booked Status": bookedStatus,
                            "Customer Name": customerName,
                            "Date": date,
                            "Start Time": startTime,
                            "End Time": endTime
                        });
                    }
                })
            }
            else {
                roomsData.push({
                    "Room Name": roomName,
                    "Booked Status": bookedStatus,
                });
            }
        })
        return roomsData;
    } else {
        return ({ message: "No Room is Created. Please create the Room first then try to list the same" });
    }
}

// To List All Customers with Booked Data

const listAllCustomers = () => {
    if (bookedRooms.length > 0) {
        console.log("\n\nListed All Customers with Room Booked Data : \n");
        let customersData = [];
        bookedRooms.forEach(roomBooked => {
            const { customerName, date, startTime, endTime } = roomBooked;
            Rooms.forEach(room => {
                if (room.roomId == roomBooked.roomId) {
                    const { roomName } = room;
                    customersData.push({
                        "Customer Name": customerName,
                        "Room Name": roomName,
                        "Date": date,
                        "Start Time": startTime,
                        "End Time": endTime
                    })
                }
            });
        });
        return customersData;
    } else {
        return({message: "No customer booked any Room yet"});
    }
}

module.exports = { createRoom, bookRoom, listAllRooms, listAllCustomers };







