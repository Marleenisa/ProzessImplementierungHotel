var System = Java.type("java.lang.System");
var URL = Java.type("java.net.URL");
var BufferedReader = Java.type("java.io.BufferedReader");
var InputStreamReader = Java.type("java.io.InputStreamReader");
var Collectors = Java.type("java.util.stream.Collectors");

var city = execution.getVariable("city");
var url = new URL("http://34.78.33.136:8080/hotels/"+city+"/rooms/")

var con = url.openConnection();
con.setRequestMethod("GET");
con.connect()

var reader = new BufferedReader(new InputStreamReader(con.getInputStream()));
var jsonstring = reader.lines().collect(Collectors.joining("\n"));
reader.close()
var resobj = JSON.parse(jsonstring);

for (var roomid of resobj) {
   url = new URL("http://34.78.33.136:8080/hotels/"+city+"/rooms/" + 
  roomid)

  con = url.openConnection();
  con.setRequestMethod("GET");
  con.connect()

  reader = new BufferedReader(new 
  InputStreamReader(con.getInputStream()));
  jsonstring = reader.lines().collect(Collectors.joining("\n"));
  reader.close()
  var roomobj = JSON.parse(jsonstring);

  if (roomobj.roomtype === "double" && roomobj.status === "free") 
  {break}
}

execution.setVariable("room", roomid)