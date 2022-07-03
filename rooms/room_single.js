var System = Java.type("java.lang.System");
var URL = Java.type("java.net.URL");
var BufferedReader = Java.type("java.io.BufferedReader");
var InputStreamReader = Java.type("java.io.InputStreamReader");
var Collectors = Java.type("java.util.stream.Collectors");

var url = new URL("http://34.76.112.173:8080/hotels/berlin/rooms/")

var con = url.openConnection();
con.setRequestMethod("GET");
con.connect()

var reader = new BufferedReader(new InputStreamReader(con.getInputStream()));
var jsonstring = reader.lines().collect(Collectors.joining("\n"));
reader.close()
var resobj = JSON.parse(jsonstring);

for (var roomid of resobj) {
  url = new URL("http://34.76.112.173:8080/hotels/berlin/rooms/" + 
  roomid)

  con = url.openConnection();
  con.setRequestMethod("GET");
  con.connect()

  reader = new BufferedReader(new 
  InputStreamReader(con.getInputStream()));
  jsonstring = reader.lines().collect(Collectors.joining("\n"));
  reader.close()
  var roomobj = JSON.parse(jsonstring);

  if (roomobj.roomtype === "single" && roomobj.status === "free") 
  {break}
}

execution.setVariable("room", roomid)


