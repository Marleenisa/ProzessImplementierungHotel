const { executionAsyncId } = require("async_hooks");
const { stringAt } = require("pdfkit/js/data");

var System = Java.type("java.lang.System");
var URL = Java.type("java.net.URL");
var BufferedReader = Java.type("java.io.BufferedReader");
var InputStreamReader = Java.type("java.io.InputStreamReader");
var Collectors = Java.type("java.util.stream.Collectors");
var HashMap = Java.type("java.util.HashMap");

var dictionary = execution.getVariable("dictionary")
var output = dictionary.get("key1");
execution.setVariable("output", output)
// Wert vom Nutzer -> Flussfahrt
// dictonary.get(Flussfahrt) -> tour name
//-> Das speichern wir dann in den Hotelroom