// Function to parse JSON data, ensuring single quotes are properly handled
function ParseJson(jsonObj) {
  // Replaces double quotes within single quotes with escaped double quotes. And Replaces wrapped single quotes with double quotes
  jsonObj = jsonObj.replace(/'([^']*)"([^']*)"'/g, '"$1\\"$2"');
  // Replaces escaped single quotes with escaped dpouble quotes followed by replacing double quote with escaped double quote within wrapped single quotes into double quotes
  jsonObj = jsonObj.replace(/'([^']*)\\'([^']*)\\'([^"])"([^']*)'/g, '"$1\\"$2\\"$3\\"$4"');
  jsonObj = jsonObj.replace(/"([^']*)'([^']*)"/g, '"$1\\"$2"'); // Replace single quotes within double quotes with escaped double quotes
  validJsonData = jsonObj.replace(/'/g, '"'); // Replace all remaining single quotes with double quotes
  parsedData = JSON.parse(validJsonData);  // Parse the valid JSON data
  return parsedData;
}

// Function to traverse the JSON object using the specified path
function TraverseJson(jsonObj, path) {
  // Split the path into individual keys
  const keys = path.split(".");
  const result = [];
  
  // Recursive function to explore the JSON structure
  function RecursiveTraversal(jsonObj, currentPath) {
    const key = keys[currentPath];
    if (jsonObj.hasOwnProperty(key)) {
      // Check if the current path is the last path
      if (currentPath === keys.length - 1) {
        if (key === keys[keys.length - 1]) {
          // Check if the value is an object and store it as a string if so
          if (typeof jsonObj[key] === "object" && jsonObj[key] !== null) {
            result.push(JSON.stringify(jsonObj[key]));
          } else {
            result.push(jsonObj[key]);
          }
        }
      } else if (Array.isArray(jsonObj[key])) {
        // Recursively process each item in the array
        result[key] = jsonObj[key].map((item) =>
          RecursiveTraversal(item, currentPath + 1)
        );
      } else {
        RecursiveTraversal(jsonObj[key], currentPath + 1); // Recursively process nested objects
      }
    }
  }
  // Initiate the recursive traversal
  RecursiveTraversal(jsonObj, 0);

  return result;
}

// Function to retrieve data from the JSON object using the specified path
function GetData(jsonObj, path) {
  let result = [];

  parsedData = ParseJson(jsonObj);
  result = TraverseJson(parsedData, path);

  return result.join("\n").trim();
}

// Function to compare two sets of data, considering a specified path
function CompareData(data1, data2, path) {
  var differences = [];
  // Initialize the result data objects
  resultData = { result1: [], result2: [] };

  // Check if the path is provided
  if (path != undefined) {
    // Parse the JSON objects before comparison if path is provided
    var parsedData = {
      parsedData1: ParseJson(data1),
      parsedData2: ParseJson(data2)
    };
    // Traverse the JSON objects to extract data
    for (i = 1; i <= 2; i++) {
      var current = parsedData["parsedData" + i];
      resultData["result" + i] = TraverseJson(current, path);
    }
    // Store the extracted data for comparison
    var value1 = resultData.result1;
    var value2 = resultData.result2;
  }
  else {
    // Split the data into individual lines for comparison
    var value1 = data1.split("\n");
    var value2 = data2.split("\n");
  }
  // Check if the data is a single line
  if (value1.length === 1 && value2.length === 1) {
    var oneLiner = "true";
  }

  var maxLength = Math.max(value1.length, value2.length);

  // Compare the values and handle differences
  for (var i = 0; i < maxLength; i++) {
    if (value1[i] !== value2[i]) {
      differences.push({
        index: i + 1,
        diff1: value1[i] === undefined ? "" : value1[i], // Convert undefined to empty string
        diff2: value2[i] === undefined ? "" : value2[i]  // Convert undefined to empty string
      });
    }
  }
  // Generate the output text based on the differences
  if (differences.length === 0) {
    outputText = "Correct";
  }
  else if (oneLiner == "true") {
    difference = differences[0]
    var outputText = difference.diff1 + " ==> " + difference.diff2;
  }

  else {
    var outputText = "";
    for (var j = 0; j < differences.length; j++) {
      var difference = differences[j];
      outputText += "Difference at line " + difference.index + ":\n";
      outputText += "\t" + "Range1: " + difference.diff1 + "\n";
      outputText += "\t" + "Range2: " + difference.diff2 + "\n";
    }
  }
  return outputText;
}