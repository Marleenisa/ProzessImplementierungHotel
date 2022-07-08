let port = 8080;
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//räume

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
		monthly_price: 0,
		print: "none"
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
		monthly_price: 0,
		print: "none"
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
		monthly_price: 0,
		print: "none"
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
	else if (change.status === "cancelled") {
		rooms[req.params.roomid].status = "free";
		rooms[req.params.roomid].guest = "none"; 
		rooms[req.params.roomid].duration = 0;
		rooms[req.params.roomid].payment = "none";
		rooms[req.params.roomid].total_price = 0;
		rooms[req.params.roomid].monthly_price = 0;
}
//To Do: Eigene Schleife aufmachen für Rechnung oder Stornogenerierung
else if (change.print === "pdf") {
	var fs = require('fs');
                var i_name = "Name: " + rooms[req.params.roomid].guest;
				var i_room = "Zimmer Ihrer Wahl: " + rooms[req.params.roomid] ; //Raumnummer ausgeben + eeeeigentlich, auch Doppelzimmer bei double
				var i_duration = "Ihre Aufenthaltsdauer: " + rooms[req.params.roomid].duration; 
				var i_price = "Zu zahlender Betrag: " + rooms[req.params.roomid].total_price;
				var i_payment = "Bezahlart: " 
					if (rooms[req.params.roomid].payment === "installment") {
						" Sie haben gewählt den Betrag in Raten zu zahlen. Ihr monatlich zu zahlender Betrag beläuft sich auf: " + rooms[req.params.roomid].monthly_price;
					}
					else {
						"Sie begleichen den vollen Betrag per Rechnung." ;
					}
                var stream = fs.createWriteStream("rechnung.txt");
                stream.once('open', function(fd) {
                        stream.write("Ihre Rechnung\n");
						stream.write(i_name + "\n");
                        stream.write(i_room + "\n");
						stream.write(i_duration + "Tage\n");
                        stream.write(i_price + "€\n");
						stream.write(i_payment + "\n");
                        stream.end();
				});
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