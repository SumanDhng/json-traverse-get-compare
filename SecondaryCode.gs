// Formats the input JSON data with an indentation level of 4 spaces
function FormatJson(jsonObj) {
    return JSON.stringify(JSON.parse(jsonObj), null, 4);
}

// Retrieves data from the 'form_data' section based on the provided key name
function GetFormData(jsonObj, keyName) {
    jsonObj = JSON.parse(jsonObj);
    var form_data = jsonObj["result"][0]["process_data"]["form_data"][keyName];
    return form_data;
}
// Retrieves the value from the 'raw_data' section based on the provided key name
function GetRawData(jsonObj, columnName){
    parsedJson = JSON.parse(jsonObj);
    var raw_data = parsedJson["result"][0]["raw_data"][columnName]["value"];
    return raw_data;
}

// Extracts data based on the provided key name from a JSON array
function GetData(jsonArray, keyName) {
    var result = "";
    var validJsonData = jsonArray.replace(/'/g, '"');
    parsedJson = JSON.parse(validJsonData);
    for (var i = 0; i < parsedJson.length; i++) {
        var subData = parsedJson[i];
        result += subData[keyName] + "\n";
    }
    return result.trim();;
    }

// Retrieves data from the 'table_data' section based on the provided table index and column name
function GetTableData(jsonObj, tableIndex, arrayIndex, keyName) {
    var result = "";
    parsedJson = JSON.parse(jsonObj);
    var tableData = parsedJson["result"][0]["process_data"]["table_data"][tableIndex]["data"];

    if (arrayIndex === undefined) {
        for (var i = 0; i < tableData.length; i++) {
        var subData = tableData[i];
        result += subData[keyName] + "+";
        }
    } else {
        var subData = tableData[arrayIndex];
        result = subData[keyName];
    }

    return result;
}

// Retrieves data from specific JSON structure (For email automation task)
function GetEmailData(jsonObj, parentKey,subKey1,subKey2) {
    var result = "";
    jsonObj = JSON.parse(jsonObj);

    if(subKey1 !== undefined || subKey2 !== undefined){
        if(subKey2 == undefined){
        var jsonArray = jsonObj["extracted_data"][parentKey];
        key = subKey1;
        }
        else{
        var jsonArray = jsonObj["extracted_data"][parentKey][subKey1];
        key = subKey2;
        }

        for (var i = 0; i < jsonArray.length; i++) {
        var subData = jsonArray[i];
        var value = subData[key];
        if (value !== undefined && value !== null && value !== "") {
            result += value + "+";
        }
        }
        if (result.endsWith("+")) {
        result = result.slice(0, -1);
        }
    }
    
    else{
        var data = jsonObj["extracted_data"][parentKey];
        result = data;
    }
    return result;
}