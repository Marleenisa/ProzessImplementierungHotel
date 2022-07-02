var System = Java.type("java.lang.System");
var URL = Java.type("java.net.URL");
var BufferedReader = Java.type("java.io.BufferedReader");
var InputStreamReader = Java.type("java.io.InputStreamReader");
var Collectors = Java.type("java.util.stream.Collectors");

var roomid = execution.getVariable("room")
var duration = execution.getVariable("duration")

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

//Berechnung des Gesamtpreises der Hotelübernachtungen
var roomprice = duration * roomobj.price

//Ausgabevariablen definieren für Usertask: Buchungsübersicht anzeigen
execution.setVariable("guestName", roomobj.guest)
execution.setVariable("type", roomobj.roomtype)
execution.setVariable("roomnr", roomid)
execution.setVariable("duration", duration)
execution.setVariable("price", roomprice)
execution.setVariable("roomstatus", roomobj.status)
