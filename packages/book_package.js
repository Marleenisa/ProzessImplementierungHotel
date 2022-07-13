
//Zimmer buchen (Task) -> dann Vorschlag Zusatzpakete gewünscht? -> Wenn ja, Usertask mit Anzeige der Pakete -> Pakete werden im Anschluss in die RoomId gebucht -> dann werden die Zimmerdetails generiert
// nötige Anpassungen: Zimmerdetails, Preisberechnung, Buchungsübersicht, Rechnung, Stornierung

var System = Java.type("java.lang.System");
var URL = Java.type("java.net.URL");
var BufferedReader = Java.type("java.io.BufferedReader");
var InputStreamReader = Java.type("java.io.InputStreamReader");
var OutputStream = Java.type("java.io.OutputStream");
var OutputStreamWriter = Java.type("java.io.OutputStreamWriter");
var PrintWriter = Java.type("java.io.PrintWriter");
var Collectors = Java.type("java.util.stream.Collectors");

var city = execution.getVariable("city");
var roomid = execution.getVariable("room");
var p_booked = execution.getVariable("p_booked");
var package = execution.getVariable("chosenPackage")


var url = new URL("http://34.78.33.136:8080/hotels/"+city+"/rooms/" + roomid)


var con = url.openConnection();
con.setRequestMethod("PUT");
con.setDoOutput(true);
con.setRequestProperty("Content-Type", "application/json");
con.setRequestProperty("Accept", "application/json");
con.connect()


var content = {p_booked: "booked", package: chosenPackage}

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