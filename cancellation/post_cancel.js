var System = Java.type("java.lang.System");
var URL = Java.type("java.net.URL");
var BufferedReader = Java.type("java.io.BufferedReader");
var InputStreamReader = Java.type("java.io.InputStreamReader");
var OutputStream = Java.type("java.io.OutputStream");
var PrintWriter = Java.type("java.io.PrintWriter");
var Collectors = Java.type("java.util.stream.Collectors");

var roomid = execution.getVariable("room")
var status = execution.getVariable("status")


var city = execution.getVariable("city");
var url = new URL("http://34.78.33.136:8080/hotels/"+city+"/rooms/" + roomid)

var con = url.openConnection();
con.setRequestMethod("PUT");
con.setDoOutput(true);
con.setRequestProperty("Content-Type", "application/json");
con.setRequestProperty("Accept", "application/json");
con.connect()

var cancel = {status: "cancelled"}

var jsoncontent = JSON.stringify(cancel);

var os = con.getOutputStream();
var ps = new PrintWriter(os);

System.out.println(jsoncontent.toString());

ps.println(jsoncontent.toString());

ps.flush();

ps.close();

reader = new BufferedReader(new 
  InputStreamReader(con.getInputStream()));
  

  reader.close();



