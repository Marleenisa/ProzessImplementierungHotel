let port = 8080;
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Hinzufügen von installment, um bei Ratenzahlung den neuen Preis zu speichern (Gesamt und monatlich)
let rooms = {};
for (let i = 100; i < 120; ++i) {
	rooms[i] = {
		roomtype : "single",
		price : 80,
		guest : "none",
		status : "free",
		duration : 0 ,
		payment: "none",
		total_price: 0,
		monthly_price: 0
	}
}
for (let i = 200; i < 210; ++i) {
	rooms[i] = {
		roomtype : "double",
		price : 120,
		guest : "none",
		status : "free",
		duration : 0 ,
		payment: "none",
		total_price: 0,
		monthly_price: 0
	}
}
for (let i = 300; i < 305; ++i) {
	rooms[i] = {
		roomtype : "suite",
		price : 250,
		guest : "none",
		status : "free",
		duration : 0 ,
		payment: "none",
		total_price: 0,
		monthly_price: 0
	}
}

app.get('/hotels/berlin/rooms', (req, res) => {
	res.send(Object.keys(rooms));
});

app.get('/hotels/berlin/rooms/:roomid', (req, res) => {
	res.send(rooms[req.params.roomid]);
});

app.put('/hotels/berlin/rooms/:roomid', (req, res) => {
	let change = req.body;
	if (change.status === "free") {
		rooms[req.params.roomid].guest = "none";
		rooms[req.params.roomid].status = "free";
	}
	else if (change.status === "occupied" && change.guest != undefined) {
		rooms[req.params.roomid].guest = change.guest;
		rooms[req.params.roomid].status = "occupied";
		rooms[req.params.roomid].duration = change.duration; 
		rooms[req.params.roomid].total_price = change.total_price; 
		rooms[req.params.roomid].monthly_price = change.monthly_price; 
	}
	else if (change.payment === "invoice") {
		rooms[req.params.roomid].payment = "invoice";
		rooms[req.params.roomid].total_price = change.total_price; 
	}
	else if (change.payment === "installment") {
		rooms[req.params.roomid].payment = "installment";
		rooms[req.params.roomid].total_price = change.total_price; 
		rooms[req.params.roomid].monthly_price = change.monthly_price;
}
	else {
		res.sendStatus(400);
		return;
	}
	res.sendStatus(200);
});


let server = app.listen(port, function () {
	let host = server.address().address;
	let port = server.address().port;
	console.log("Webserver running at http://%s:%s", host, port);
})
