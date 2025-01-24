# Drew's Document Converter

## Description
The Document Converter is a NestJS TypeScript Application responsible converting documents between three different formats:
- String (plain text)
- JSON
- XML


## Project setup
After cloning the repository, navigate to the root directory and build the project's dependencies by running:
```bash
$ npm install
```

## Compile and run the project
Once running the command above, the Document Converter can be spun up by running the following commands:
```bash
npm run build
npm run start
```

You can double check that the Document Converter is up and running by navigating to http://localhost:3000/health and verify that a healthy status is returned.

## Usage Instructions
Once spun up, you be able to make POST API requests to the following endpoint: http://localhost:3000/documents/parse. Here is an example:
```
curl --location 'localhost:3000/documents/parse' \
--form 'file=@"/Users/drewleung/Downloads/document.xml"' \
--form 'lineSeparator="~"' \
--form 'output="json"' \
--form 'elementSeparator="*"'
```

The following fields are required:
- `file`: A link to the file that you want to convert. 
    - If the file extension is `.txt`, then the file will be treated as a plain text file
    - If the file extension is `.json`, then the file will be treated as a JSON Object
    - If the file extension is `.xml`, then the file will be treated as XML
    - No other extensions are supported currently

- `output`: The file format that you wish to have your data converted to. Only the following values are accepted:
    - `string`
    - `json`
    - `xml`
    - Note that the Document Converter will not allow you to convert files if the output file format matches the input.

- `lineSeparator`: The character you want to use to separate your Document's segments when resolving plain text files.
- `elementSeparator`: The character you want to use to separate your Document's elements within a segment when resolving plain text files.

## Validation
### JSON and XML Files
JSON Files should be structured like the following:
```
{
  "ProductID": [
    {
      "ProductID1": "4",
      "ProductID2": "8",
      "ProductID3": "15",
      "ProductID4": "16",
      "ProductID5": "23"
    },
    {
      "ProductID1": "a",
      "ProductID2": "b",
      "ProductID3": "c"
    }
  ],
  "AddressID": [
    {
      "AddressID1": "42",
      "AddressID2": "108",
      "AddressID3": "3",
      "AddressID4": "14"
    }
  ],
  "ContactID": [
    {
      "ContactID1": "59",
      "ContactID2": "26"
    }
  ]
}
```
- Each Segment has a nested array containing their respective Elements
- Elements MUST be prefixed with their corresponding Segment name. If the Segment is labelled "ProductID", then there cannot be an element in the nested array labelled "AddressID".
```
{
    "message": "Element with name: AddressID1 does not start with its corresponding segment name: ProductID",
    "error": "Bad Request",
    "statusCode": 400
}
```
- Each Element MUST be suffixed with an index number. This number starts from 1 and increments up to the number of elements in the array. This is what makes each Element's name unique. For example, if there are 4 elements in a "ProductID" Segment, and one is named "ProductID8", then the Document Converter will return you a 400 Bad Request
```
{
    "message": "Element with name: ProductID8 cannot be tied to its corresponding segment name: ProductID. The element's name must be prefixed with the segment name and suffixed with a number with a maximum of 5.",
    "error": "Bad Request",
    "statusCode": 400
}
```
XML Files should follow the same Segment/Element structure. 

## Stay in touch

- Author - [Drew Leung](https://github.com/drewmatics)
