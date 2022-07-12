var System = Java.type("java.lang.System");
var URL = Java.type("java.net.URL");
var BufferedReader = Java.type("java.io.BufferedReader");
var InputStreamReader = Java.type("java.io.InputStreamReader");
var Collectors = Java.type("java.util.stream.Collectors");
var HashMap = Java.type("java.util.HashMap");



let packageObj = JSON.parse(jsonString);
// Key = "Flussfahrt über die Spree" Value="spree"
dictionary.put("Flussfahrt über die Spree","spree");
execution.setVariable("dictionary", dictionary)
let dictionary= new HashMap();

let packageCounter=1;
for(let tour in packageObj.keys){
    let packageTitle = packageObj[tour].title
    execution.setVariable("package"+packageCounter,packageTitle)
    packageCounter++;
    dictionary.put(packageTitle,tour)
    // tour
    // spree
}
Execution.setVariable("packageDictionary",dictionary)


// Wert vom Nutzer -> Flussfahrt
// dictonary.get(Flussfahrt) -> tour name
//-> Das speichern wir dann in den Hotelroom