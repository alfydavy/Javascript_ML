/**
	* Code by ®alfydavy
	* Simple Linear Regression using regression-ml javascript library
	* PoC for viability of JS for ml taks
	* 3 july 2017
	* Feel free to copy and resuse the same
*/



const ml = require('ml-regression');
const csv = require('csvtojson');
const SLR = ml.SLR; // simple linear regression
//const SLR = require('ml-regression').SLR;

const csvFilePath = 'Advertising.csv'; // mapping Data file
let csvData = [], // parsed data
	X = [], //input data
	y = [];  // output data


	let regressionModel;   // place holder model
	
	const readline = require('readline'); //user prompt
	
	
	// creating an interface to read user input
	const rl = readline.createInterface({       
		
		input: process.stdin,
		output: process.stdout
	});
	
	// converting the contents of the CSV file to a JSON object 
	// We modify the data for analysis on the JSON object
	
	csv()
		.fromFile(csvFilePath)
		.on('json', (jsonObj) => {
			csvData.push(jsonObj);
	})
	.on('done', () => {
		
		dressData();  // get data from the JSON object
		doRegression();	// do regression on the given data  by building a model
		
	})
	
	
	// Build a Training model and training the same
	
	function doRegression() {
		
		regressionModel = new SLR(X,y); // Training the model on training data 
		console.log(regressionModel.toString(3));
		predictOutput();
		
	}
	
	
	// This will populate the X & y variables
	
	function dressData() {
		
   /**
        * One row of the data object looks like:
        * {
        *   TV: "10",
        *   Radio: "100",
        *   Newspaper: "20",
        *   "Sales": "1000"
        * }
        *
        * Hence, while adding the data points,
        * we need to parse the String value as a Float.
        */
		
		csvData.forEach((row) => {
			
			X.push(f(row.Radio));
			y.push(f(row.Sales));
			
			
		});
	}
	
// handles floats	
	
	function f(s) {
		return parseFloat(s);
	}
	
	
 // this runs the predict function on the model 	
	
	function  predictOutput() {
		
		rl.question('Enter input X for prediction (Press CTRL+c to exit) : ' , (answer) => {
			
			console.log(`At X = ${answer}, y = ${regressionModel.predict(parseFloat(answer))}`);
			predictOutput();
			
		});
		
		
	}
