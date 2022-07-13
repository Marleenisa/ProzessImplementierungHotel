var System = Java.type("java.lang.System");
var URL = Java.type("java.net.URL");
var BufferedReader = Java.type("java.io.BufferedReader");
var InputStreamReader = Java.type("java.io.InputStreamReader");
var Collectors = Java.type("java.util.stream.Collectors");

var city = execution.getVariable("city");

var url = new URL("http://34.78.33.136:8080/hotels/"+city+"/packages/")

con = url.openConnection();
con.setRequestMethod("GET");
con.connect()

reader = new BufferedReader(new InputStreamReader(con.getInputStream()));
jsonstring = reader.lines().collect(Collectors.joining("\n"));
reader.close()
System.out.println("Room: " + jsonstring)
var packageobj = JSON.parse(jsonstring);

/*
let berlin_package = {
	spree = {
		title : "Fahrt über die Spree",
        anbieter : "Mister X", 
		description : "Lorem ipsum",
		price : 15
	},
	tour = {
		title : "Kulinariche Tour durch Berlin",
        anbieter : "Mister Z", 
		description : "Lorem ipsum",
		price : 20,
	},
    park = {
		title : "Tour durch den Spreepark",
        anbieter : "Niemand", 
		description : "Lorem ipsum",
		price : 50
	}
}
*/
//if berlin
let title_package1 = packageobj[0].title
execution.setVariable("package1", spree)
execution.setVariable("package2", tour)
execution.setVariable("package3", park)
