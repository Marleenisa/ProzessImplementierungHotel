var System = Java.type("java.lang.System");
var URL = Java.type("java.net.URL");
var BufferedReader = Java.type("java.io.BufferedReader");
var InputStreamReader = Java.type("java.io.InputStreamReader");
var OutputStream = Java.type("java.io.OutputStream");
var PrintWriter = Java.type("java.io.PrintWriter");
var Collectors = Java.type("java.util.stream.Collectors");

var roomid = execution.getVariable("room")
var guestName = execution.getVariable("name")


var url = new URL("http://34.79.164.87:8080/hotels/berlin/rooms/" + roomid);

var con = url.openConnection();
con.setRequestMethod("POST");
con.setDoOutput(true);
con.setRequestProperty("Content-Type", "application/json");
con.setRequestProperty("Accept", "application/json");
con.connect()


var content = {status : "occupied", guest : "name"}

var jsoncontent = JSON.stringify(content);

var os = con.getOutputStream();
var ps = new PrintWriter(os);

System.out.println(jsoncontent.toString());

ps.println(jsoncontent.toString());

ps.flush();

ps.close();

reader = new BufferedReader(new 
  InputStreamReader(con.getInputStream()));
  

  reader.close();


