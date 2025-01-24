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
    - Note that the Document Converter will not allow you to convert files if the output file format matches the input (why are you using it otherwise?!)

- `lineSeparator`: The character you want to use to separate your Document's segments when resolving plain text files.
- `elementSeparator`: The character you want to use to separate your Document's elements within a segment when resolving plain text files.

## Stay in touch

- Author - [Drew Leung](https://github.com/drewmatics)
