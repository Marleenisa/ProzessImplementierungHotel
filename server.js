let port = 8080;
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


function generateRooms (start, end, roomtype, price, rooms) {
	for (let i = start; i < end; ++i) {
		rooms[i] = {
            city : "none",
			roomtype : roomtype,
            roomnr : 0, 
			price : price,
			guest : "none",
			status : "free",
			duration : 0 ,
			payment: "none",
			total_price: 0,
			monthly_price: 0,
			print: "none"
		}
	}
	return rooms
}


let berlin =  {
    single: {
        start:100,
        end:120,
        type:"single",
        price:80
    },
    double: {
        start:200,
        end:210,
        type:"double",
        price:120
    },
    suite: {
        start:300,
        end:305,
        type:"suite",
        price:250
    },
    
}

let rostock =  {
    single: {
        start:200,
        end:215,
        type:"single",
        price:60
    },
    double: {
        start:220,
        end:230,
        type:"double",
        price:90
    },
    suite: {
        start:240,
        end:245,
        type:"suite",
        price:1000
    }
}

let dresden =  {
    single: {
        start:500,
        end:550,
        type:"single",
        price:70
    },
    double: {
        start:600,
        end:650,
        type:"double",
        price:150
    },
    suite: {
        start:700,
        end:730,
        type:"suite",
        price:850
    }
}

function generateAllRooms(rooms, city){
    for(let type in city){
        let curObj = city[type];
        // Merge old room object with generated rooms
        rooms = {...rooms, ...generateRooms(curObj.start,curObj.end,curObj.type,curObj.price,rooms)};
    }
    return rooms;
}

let berlin_rooms = {};
berlin_rooms = generateAllRooms(berlin_rooms, berlin);
let rostock_rooms ={};
rostock_rooms = generateAllRooms(rostock_rooms, rostock);
let dresden_rooms ={};
dresden_rooms = generateAllRooms(dresden_rooms, dresden);
let cities = ['berlin','dresden','rostock']

// Check if city in list

function isLegitCity(cityname){
    return cities.includes(cityname.toLowerCase());
}
//let pakete

let hotels = {
    berlin: {
        rooms: berlin_rooms, 
    },
    rostock:{
        rooms: rostock_rooms
    },
    dresden:{
        rooms: dresden_rooms
    }
}

app.get('/hotels/:city/rooms', (req, res) => {
    let city = req.params.city
    if(isLegitCity(city)){
        res.send(Object.keys(hotels[city].rooms));
    }
    else{
        //TODO: Send Error message -> Invalid city
        res.sendStatus(400)
    }
	
});

app.get('/hotels/:city/rooms/:roomid', (req, res) => {
    let city = req.params.city
    let roomId = req.params.roomid
    if(isLegitCity(city)){
        res.send(hotels[city].rooms[roomId]);
    }
    else{
        //TODO: Send Error message -> Invalid city
        res.sendStatus(400)
    }
});

app.put('/hotels/:city/rooms/:roomid', (req, res) => {
	let change = req.body;
    
    // Get params
    let roomId = req.params.roomid;
    let city = req.params.city;

    // Get Room
    let rooms = {}
    if(isLegitCity(city)){
       rooms = hotels[city].rooms
    }else{
        //TODO: Send Error message -> Invalid city
        res.send("Wrong city")
        res.sendStatus(400)
    }

    let roomData = rooms[roomId];

	if (change.status === "free") {
		roomData.guest = "none";
		roomData.status = "free";
	}
	else if (change.status === "occupied" && change.guest != undefined) {
		roomData.city = change.city;
        roomData.guest = change.guest;
        roomData.roomnr = change.roomnr;
		roomData.status = "occupied";
		roomData.duration = change.duration; 
		roomData.total_price = change.total_price; 
		roomData.monthly_price = change.monthly_price; 
	}
	else if (change.payment === "invoice") {
		roomData.payment = "invoice";
		roomData.total_price = change.total_price; 
	}
	else if (change.payment === "installment") {
		roomData.payment = "installment";
		roomData.total_price = change.total_price; 
		roomData.monthly_price = change.monthly_price;
}
	else if (change.status === "cancelled") {
        roomData.city = "none";
		roomData.status = "free";
		roomData.guest = "none"; 
		roomData.duration = 0;
		roomData.payment = "none";
		roomData.total_price = 0;
		roomData.monthly_price = 0;
}
else if (change.print === "invoice") {
    var fs = require('fs');
                var i_name = "Name: " + roomData.guest;
                var i_room = "Zimmer Ihrer Wahl: " + roomData.roomtype+" "+ roomData.roomnr ; //Raumnummer ausgeben + eeeeigentlich, auch Doppelzimmer bei double
                var i_duration = "Ihre Aufenthaltsdauer: " + roomData.duration; 
                var i_price = "Zu zahlender Betrag: " + roomData.total_price;
                var i_payment = "Bezahlart: Rechnung " 
                var stream = fs.createWriteStream("Rechnung_" + roomData.guest+".txt");
                stream.once('open', function(fd) {
                        stream.write("Ihre Rechnung\n");
                        stream.write(i_name + "\n");
                        stream.write(i_room + "\n");
                        stream.write(i_duration + " Tage\n");
                        stream.write(i_price + " €\n");
                        stream.write(i_payment + "\n");
                        stream.write("Sie begleichen den vollen Betrag per Rechnung. Bitte begleichen Sie den Betrag innerhalb von 14 Tagen. \n")
                        stream.end();
                });
}
else if (change.print === "installment") {
    var fs = require('fs');
                var i_name = "Name: " + roomData.guest;
                var i_room = "Zimmer Ihrer Wahl: " + roomData.roomtype+" "+ roomData.roomnr  ; //Raumnummer ausgeben + eeeeigentlich, auch Doppelzimmer bei double
                var i_duration = "Ihre Aufenthaltsdauer: " + roomData.duration;
                var i_price = "Zu zahlender Betrag: " + roomData.total_price;
                var i_payment = "Bezahlart: Ratenzahlung " 
                var stream = fs.createWriteStream("Rechnung_" + roomData.guest+".txt");
                stream.once('open', function(fd) {
                        stream.write("Ihre Rechnung\n");
                        stream.write(i_name + "\n");
                        stream.write(i_room + "\n");
                        stream.write(i_duration + " Tage\n");
                        stream.write(i_price + " €\n");
                        stream.write(i_payment + "\n");
                        stream.write("Sie haben gewählt den Betrag in Raten zu zahlen. Ihr monatlich zu zahlender Betrag beläuft sich auf: " + roomData.monthly_price+"\n")
                        stream.end();
                });
}
	else {
        res.send("Other cause");
		res.sendStatus(400);
		return;
	}
    // Save all changes
    hotels[city].rooms[roomId] = roomData;

	res.sendStatus(200);
});

let server = app.listen(port, function () {
	let host = server.address().address;
	let port = server.address().port;
	console.log("Webserver running at http://%s:%s", host, port);
})
