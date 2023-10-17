# JSON Data Extractor and Comparison Tool

This Google Apps Script (GAS) includes several functions to parse and compare JSON data. It allows you to compare two sets of `JSON data` or `plain text data`, highlighting differences between them, with the option to specify a path for comparison within the JSON structure.

## Functions

1. ParseJson(jsonObj)
This function ensures proper handling of single quotes within JSON data by replacing single quotes with double quotes. It then parses the valid JSON data and returns the parsed result.

2. TraverseJson(jsonObj, path)
This function is used to traverse a JSON object using the specified path. It splits the path into individual keys and recursively explores the JSON structure, extracting the desired data.

3. GetData(jsonObj, path)
The GetData function retrieves data from the JSON object using the specified path. It calls the `ParseJson` and `TraverseJson` functions to extract and format the data before returning it.

4. CompareData(data1, data2, path)
This function compares two sets of data

    - If a path is specified, the function retrieves data from the JSON object.

    - If no path is specified, pre retrieved data should be provided.

It then compares the data line by line if the data are in multiple lines. It then generates a comparison report highlighting the differences between the two data sets.

## How to Use

- Installation: Copy the code into the Google Apps Script editor.

- Usage: Call the `CompareData` function, providing the two sets of data you want to compare. Optionally, you can specify the path for comparison within the JSON structure.

## Note

Make sure to handle the JSON data and paths properly while using these functions to get accurate comparison results.
This script assumes that the input data is well-formed JSON. Any invalid JSON data might lead to unexpected results.
When specifying a path, ensure that the path provided is valid and exists within the JSON data.

## Example

`GetData(jsonObj, path)`
```
=GetData(A1, "result.extracted_data.form_data.invoice_number")
```

`CompareData(jsonObj1, jsonObj2, path)`
```
=CompareData(A1, B1, "result.extracted_data.form_data.invoice_number")
```

`CompareData(textData1, textData2)`
```
=CompareData(A1, B1)
```