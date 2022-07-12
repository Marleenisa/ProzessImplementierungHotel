var System = Java.type("java.lang.System");
var URL = Java.type("java.net.URL");
var BufferedReader = Java.type("java.io.BufferedReader");
var InputStreamReader = Java.type("java.io.InputStreamReader");
var Collectors = Java.type("java.util.stream.Collectors");
var HashMap = Java.type("java.util.HashMap");

var city = execution.getVariable("city");
var url = new URL("http://34.78.33.136:8080/hotels/"+city+"/packages/")

var con = url.openConnection();
con.setRequestMethod("GET");
con.connect()

var reader = new BufferedReader(new InputStreamReader(con.getInputStream()));
var jsonstring = reader.lines().collect(Collectors.joining("\n"));
reader.close()
var resobj = JSON.parse(jsonstring);
 
    //pakete
    let packageObj = JSON.parse(jsonString);
    // Key = "Flussfahrt über die Spree" Value="spree"
    //dictionary.put("Flussfahrt über die Spree","spree");
    execution.setVariable("dictionary", dictionary)
    let dictionary= new HashMap();

    let packageCounter=1;
    for(let tour in packageObj.keys){
        let packageTitle = packageObj[tour].title
        execution.setVariable("package"+packageCounter,packageTitle)
        packageCounter++;
        dictionary.put(packageTitle,tour)
        dictionary.put(packageTitle,spree)
        dictionary.put(packageTitle,park)
    }

Execution.setVariable("packageDictionary",dictionary)


// Wert vom Nutzer -> Flussfahrt
// dictonary.get(Flussfahrt) -> tour name
//-> Das speichern wir dann in den Hotelroom