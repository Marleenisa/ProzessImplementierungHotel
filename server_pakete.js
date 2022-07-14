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
            rate: 0,
			monthly_price: 0,
			print: "none",
            packages: "Gebuchtes Zusatzpaket",
            package: "none",
            p_booked: "none",
            p_title: "none",
            p_price: 0,
            vendor: "none"
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
let berlin_package = {
	package1: {
		p_title : "Fahrt über die Spree",
        vendor : "Mister X", 
		description : "Lorem ipsum",
		p_price : 15
	},
	package2: {
		p_title : "Kulinarische Tour durch Berlin",
        vendor : "Mister Z", 
		description : "Lorem ipsum",
		p_price : 20,
	},
    package3: {
		p_title : "Tour durch den Spreepark",
        vendor : "Niemand", 
		description : "Lorem ipsum",
		p_price : 50
	}
}

let dresden_package = {
	package1: {
		title : "Besuch in der Frauenkirche",
        anbieter : "Mister X", 
		description : "Lorem ipsum",
		price : 30
	},
	package2: {
		title : "Einlass und Führung durch den Zwinger",
        anbieter : "Mister Z", 
		description : "Lorem ipsum",
		price : 20,
	},
    package3: {
		title : "Fahrt auf der Elbe",
        anbieter : "Niemand", 
		description : "Lorem ipsum",
		price : 50
	}
}

let rostock_package = {
	package1: {
		title : "Mini-Kreuzfahrt über die Ostsee",
        anbieter : "Mister X", 
		description : "Lorem ipsum",
		price : 100
	},
	package2: {
		title : "Hafenrundfahrt",
        anbieter : "Mister Z", 
		description : "Lorem ipsum",
		price : 30,
	},
    package3: {
		title : "Besuch im Rostocker Zoo",
        anbieter : "Niemand", 
		description : "Lorem ipsum",
		price : 20
	}
}

let hotels = {
    berlin: {
        rooms: berlin_rooms,
        packages: berlin_package
    },
    rostock:{
        rooms: rostock_rooms,
        packages: rostock_package
    },
    dresden:{
        rooms: dresden_rooms,
        packages: dresden_package
    }
}

//Aufruf der verfügbaren Pakete je nach Stadt
app.get('/hotels/:city/packages', (req, res) => {
    let city = req.params.city
    if(isLegitCity(city)){
        res.send(hotels[city].packages);
    }
    else{
        //TODO: Send Error message -> Invalid package
        res.sendStatus(400)
    }
	
});

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

app.get('/hotels/:city/packages/:packageName', (req, res) => {
    let city = req.params.city
    let p_name = req.params.packageName
    if(isLegitCity(city)){
        res.send(hotels[city].packages[p_name]);
    }
    else{
        //TODO: Send Error message -> Invalid package
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
    }
    else{
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
		roomData.monthly_price = change.monthly_price
        roomData.rate = change.rate;
    }
	else if (change.status === "cancelled") {
        roomData.city = "none";
		roomData.status = "free";
		roomData.guest = "none"; 
		roomData.duration = 0;
		roomData.payment = "none";
		roomData.total_price = 0;
		roomData.monthly_price = 0; 
        roomData.package = "none";
        roomData.p_booked = "none";
        roomData.p_title = "none";
        roomData.p_price = 0;
        roomData.vendor = "none"   
    }
    //Posting der Packages
    else if (p_booked = "booked" && change.package == "spree") {
        roomData.p_booked = "booked";
        roomData.p_title = "Fahrt über die Spree";
        roomData.p_price = 15;
        roomData.vendor = "Mister Lorem";
        roomData.description = "Lorem ipsum"
    }
    else if (p_booked = "booked" && change.package == "park") {
        roomData.p_booked = "booked";
        roomData.p_title = "Tour durch den Spreepark";
        roomData.p_price = 50;
        roomData.vendor = "Agentur ipsum";
        roomData.description = "Lorem ipsum"
    }
    else if (p_booked = "booked" && change.package == "ostsee") {
        roomData.p_booked = "booked";
        roomData.p_title = "Mini-Kreuzfahrt über die Ostsee";
        roomData.p_price = 100;
        roomData.vendor = "Agentur Sit";
        roomData.description = "Lorem ipsum"
    }
    else if (p_booked = "booked" && change.package == "zoo") {
        roomData.p_booked = "booked";
        roomData.p_title = "Besuch im Rostocker Zoo";
        roomData.p_price = 20;
        roomData.vendor = "Agentur Sit";
        roomData.description = "Lorem ipsum"
    }
    else if (p_booked = "booked" && change.package == "kirche") {
        roomData.p_booked = "booked";
        roomData.p_title = "Besuch in der Frauenkirche";
        roomData.p_price = 30;
        roomData.vendor = "Agentur Sit";
        roomData.description = "Lorem ipsum"
    }
    else if (p_booked = "booked" && change.package == "elbe") {
        roomData.p_booked = "booked";
        roomData.p_title = "Fahrt über die Elbe";
        roomData.p_price = 50;
        roomData.vendor = "Mister Lorem";
        roomData.description = "Lorem ipsum"
    }
    else if (change.print === "invoice") {
        var fs = require('fs');
                    var d = new Date(); 
                    var t = new Date().getTime();
                    var i_number = Math.floor(Math.random() * (1000 -  500000)) + 1000;
                    i_number = d.getFullYear() + (d.getMonth()+1) + (d.getDate()) + i_number; 
                    i_number = i_number + t;
                    var i_name = roomData.guest;
                    var i_kontakt = "Hotel Anhalter";
                    var i_adresse = "Lorem-Ipsum-Straße 42";
                    var i_city = city;
                    var i_room = "Zimmer Ihrer Wahl: " + roomData.roomtype+" "+ roomData.roomnr ; //Raumnummer ausgeben + eeeeigentlich, auch Doppelzimmer bei double
                    var i_duration = "Ihre Aufenthaltsdauer: " + roomData.duration; 
                    var i_ust=(roomData.total_price*0.07);
                    var i_netto =(roomData.total_price-i_ust);
                    var i_brutto=roomData.total_price;
                    var i_payment = "Bezahlart: Rechnung " 
                    var stream = fs.createWriteStream("Rechnung_" + roomData.guest+".txt");
                    //generate date
                    var date = new Date();
                    let output = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();
                    //packages
                    var ip_title = roomData.p_title;
                    var ip_mwst = (roomData.p_price*0.19);
                    var ip_netto = (roomData.p_price-ip_mwst);
                    var ip_brutto = roomData.p_price;
                    var ip_vendor = roomData.vendor;
                    stream.once('open', function(fd) {
                            stream.write("Ihre Rechnung\n");
                            stream.write(i_kontakt + "\n" + i_adresse + "\n" + i_city + "\n");
                            stream.write(i_city + ", den " + output + "\n");
                            stream.write("Rechnungsnummer: "+ i_number + "\n")
                            stream.write("Gast: "+i_name + "\n");
                            stream.write("Leistung: Hotelübernachtung"+ "\n")
                            stream.write(i_room + "\n");
                            stream.write(i_duration + " Tage\n");
                            stream.write("Preis (netto): "+i_netto + " €\n"); //Ausrechnen
                            stream.write("USt: " + i_ust + "€\n")
                            stream.write("Preis (brutto inkl. Steuersatz von 7%): "+i_brutto + " €\n");
                            stream.write(i_payment + "\n");
                            stream.write("Sie begleichen den vollen Betrag per Rechnung. Bitte begleichen Sie den Betrag innerhalb von 14 Tagen. \n")
                            if (p_booked = "booked"){
                                stream.write("Ihre gewünschten Zusatzleistung: "+"\n");
                                stream.write(ip_title+"\n");
                                stream.write("Anbieter: "+ip_vendor + "\n")
                                stream.write("Preis (netto): "+ip_netto + " €\n");
                                stream.write("MwSt: " + ip_mwst + "€\n")
                                stream.write("Preis (brutto inkl. MwSt. von 19%): "+ip_brutto + " €\n");
                                stream.write("Sie begleichen den vollen Betrag per Rechnung. Bitte begleichen Sie den Betrag innerhalb von 14 Tagen an den Anbieter" + ip_vendor + ".\n")
                            }
                            stream.end();
                    });
    }
    else if (change.print === "installment") {
        var fs = require('fs');
                    var d = new Date(); 
                    var t = new Date().getTime();
                    var i_number = Math.floor(Math.random() * (1000 -  500000)) + 1000;
                    i_number = d.getFullYear() + (d.getMonth()+1) + (d.getDate()) + i_number; 
                    i_number = i_number + t;
                    var i_name = roomData.guest;
                    var i_kontakt = "Hotel Anhalter";
                    var i_adresse = "Lorem-Ipsum-Straße 42";
                    var i_city = city;
                    //calculate rates
                    var i_room = "Zimmer Ihrer Wahl: " + roomData.roomtype+" "+ roomData.roomnr ; //Raumnummer ausgeben + eeeeigentlich, auch Doppelzimmer bei double
                    var i_duration = "Ihre Aufenthaltsdauer: " + roomData.duration; 
                    var i_ust=(roomData.total_price*0.07);
                    var i_netto =(roomData.total_price-i_ust);
                    var i_brutto=roomData.total_price;
                    var i_payment = "Bezahlart: Ratenzahlung " 
                    //pay per installment
                    var i_rate = roomData.rate;
                    //generate date
                    var date = new Date();
                    let output = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();
                    //packages
                    var ip_title = roomData.p_title;
                    var ip_mwst = (roomData.p_price*0.19);
                    var ip_netto = (roomData.p_price-ip_mwst);
                    var ip_brutto = roomData.p_price;
                    var ip_vendor = roomData.vendor;
                    var stream = fs.createWriteStream("Rechnung_" + roomData.guest+".txt");
                    stream.once('open', function(fd) {
                            stream.write("Ihre Rechnung\n");
                            stream.write(i_kontakt + "\n" + i_adresse + "\n" + i_city + "\n");
                            stream.write(i_city + ", den " + output + "\n");
                            stream.write("Rechnungsnummer: "+ i_number + "\n")
                            stream.write("Gast: "+i_name + "\n");
                            stream.write("Leistung: Hotelübernachtung"+ "\n")
                            stream.write(i_room + "\n");
                            stream.write(i_duration + " Tage\n");
                            stream.write("Preis (netto): "+i_netto + " €\n"); //Ausrechnen
                            stream.write("USt: " + i_ust + "€\n")
                            stream.write("Preis (brutto inkl. Steuersatz von 7%): "+i_brutto + " €\n");
                            stream.write(i_payment + "\n");
                            stream.write("Sie haben gewählt den Betrag in Raten in " + i_rate + " Monaten zu zahlen. Ihr monatlich zu zahlender Betrag beläuft sich auf: " + roomData.monthly_price+"\n")
                            if (p_booked = "booked"){
                                stream.write("Ihre gewünschten Zusatzleistung: "+"\n");
                                stream.write(ip_title+"\n");
                                stream.write("Anbieter: "+ip_vendor + "\n")
                                stream.write("Preis (netto): "+ip_netto + " €\n");
                                stream.write("MwSt: " + ip_mwst + "€\n")
                                stream.write("Preis (brutto inkl. MwSt. von 19%): "+ip_brutto + " €\n");
                                stream.write("Sie begleichen den vollen Betrag per Rechnung. Bitte begleichen Sie den Betrag innerhalb von 14 Tagen an den Anbieter " + ip_vendor + ".\n")
                            }
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
