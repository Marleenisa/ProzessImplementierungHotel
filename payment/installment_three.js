var System = Java.type("java.lang.System");
var URL = Java.type("java.net.URL");
var BufferedReader = Java.type("java.io.BufferedReader");
var InputStreamReader = Java.type("java.io.InputStreamReader");
var Collectors = Java.type("java.util.stream.Collectors");

var roomid = execution.getVariable("room")
var roomprice = execution.getVariable("price")
//API Call
var url = new URL("http://35.205.175.225:8080/hotels/berlin/rooms/" + roomid);

  con = url.openConnection();
  con.setRequestMethod("GET");
  con.connect()

  reader = new BufferedReader(new 
  InputStreamReader(con.getInputStream()));
  jsonstring = reader.lines().collect(Collectors.joining("\n"));
  reader.close()
  System.out.println("Room: " + jsonstring)
  var roomobj = JSON.parse(jsonstring);


// Neuer Gesamtbetrag inkl. Zinsatzsatz 1,2%
var totalPrice = ((duration * roomobj.price)*0,0012) + roomprice

//Variable für Ratenzahlung: 3 Monate mit Zinsatz 1,2% => Monatliche Zahlung für 6 Monate
var monthlyPrice= totalPrice/3


//Ausgabevariablen definieren für Usertask: Modalitäten anzeigen
execution.setVariable("guestName", roomobj.guest)
execution.setVariable("type", roomobj.roomtype)
execution.setVariable("roomnr", roomnr)
execution.setVariable("duration", duration)
//Neue Variablen für Ratenzahlung
execution.setVariable("totalPrice", totalPrice)
execution.setVariable("monthlyPrice", monthlyPrice)