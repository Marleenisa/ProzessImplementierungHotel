var System = Java.type("java.lang.System");
var URL = Java.type("java.net.URL");
var BufferedReader = Java.type("java.io.BufferedReader");
var InputStreamReader = Java.type("java.io.InputStreamReader");
var Collectors = Java.type("java.util.stream.Collectors");
var HashMap = Java.type("java.util.HashMap");

var city = execution.getVariable("city");
var spree = execution.getVariable("spree");
var tour = execution.getVariable("tour");
var park = execution.getVariable("park");
var url = new URL("http://34.78.33.136:8080/hotels/"+city+"/packages/")

var con = url.openConnection();
con.setRequestMethod("GET");
con.connect()

reader = new BufferedReader(new InputStreamReader(con.getInputStream()));
jsonstring = reader.lines().collect(Collectors.joining("\n"));
reader.close()
System.out.println("Paket: " + jsonstring) //anpassen
var spreeobj = JSON.parse(jsonstring);
var tourobj = JSON.parse(jsonstring);
var parkobj = JSON.parse(jsonstring);

execution.setVariable("package1", spreeobj.title)
execution.setVariable("package2", tourobj.title)
execution.setVariable("package3", parkobj.title)





/*
var reader = new BufferedReader(new InputStreamReader(con.getInputStream()));
var jsonString = reader.lines().collect(Collectors.joining("\n"));
reader.close()
//pakete
let packageObj = JSON.parse(jsonString);
    // Key = "Flussfahrt über die Spree" Value="spree"
    //dictionary.put("Flussfahrt über die Spree","spree");
    let dictionary= new HashMap();
    execution.setVariable("dictionary", dictionary);

    let packageCounter=1;
    for(let tour in packageObj.keys){
        let packageTitle = packageObj[tour].title
        execution.setVariable("package"+packageCounter,packageTitle)
        packageCounter++;
        dictionary.put(packageTitle,tour)
        dictionary.put(packageTitle,spree)
        dictionary.put(packageTitle,park)
    }

execution.setVariable("packageDictionary",dictionary)


// Wert vom Nutzer -> Flussfahrt
// dictonary.get(Flussfahrt) -> tour name
//-> Das speichern wir dann in den Hotelroom */