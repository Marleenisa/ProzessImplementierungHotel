var System = Java.type("java.lang.System");
var URL = Java.type("java.net.URL");
var BufferedReader = Java.type("java.io.BufferedReader");
var InputStreamReader = Java.type("java.io.InputStreamReader");
var Collectors = Java.type("java.util.stream.Collectors");

//API Call
var url = new URL("http://34.79.164.87:8080/hotels/berlin/rooms/" + roomid);

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
var installtotal = ((duration * roomobj.price)*1,2)

//Variable für Ratenzahlung: 6 Monate mit Zinsatz 1,2% => Monatliche Zahlung für 6 Monate
var installsix = installtotal/6


//Ausgabevariablen definieren für Usertask: Modalitäten anzeigen
execution.setVariable("guestName", roomobj.guest)
execution.setVariable("type", roomobj.roomtype)
execution.setVariable("roomnr", roomid)
execution.setVariable("duration", duration)
//Neue Variablen für Ratenzahlung
execution.setVariable("totalPrice", roomobj.installment)
execution.setVariable("monthlyPrice", roomobj.installmentmonthly)


//Was machen wir mit der Bestägigung? Also das PUT in unseren server.js