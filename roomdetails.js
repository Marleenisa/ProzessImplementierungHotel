var System = Java.type("java.lang.System");
var URL = Java.type("java.net.URL");
var BufferedReader = Java.type("java.io.BufferedReader");
var InputStreamReader = Java.type("java.io.InputStreamReader");
var Collectors = Java.type("java.util.stream.Collectors");

var roomid = execution.getVariable("room")
var duration = execution.getVariable("duration")

var city = execution.getVariable("city");
var url = new URL("http://34.78.33.136:8080/hotels/"+city+"/rooms/" + roomid)

con = url.openConnection();
con.setRequestMethod("GET");
con.connect()

reader = new BufferedReader(new InputStreamReader(con.getInputStream()));
jsonstring = reader.lines().collect(Collectors.joining("\n"));
reader.close()
System.out.println("Room: " + jsonstring)
var roomobj = JSON.parse(jsonstring);

var roomprice = duration * roomobj.price

execution.setVariable("guestName", guestName)
execution.setVariable("type", roomobj.roomtype)
execution.setVariable("roomnr", roomid)
execution.setVariable("duration", duration)
execution.setVariable("price", roomprice)
execution.setVariable("roomstatus", roomobj.status)