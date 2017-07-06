/**
	* Code by ®alfydavy
	* K Nearest neighbours (KNN) using ml-knn javascript library
	* PoC for viability of JS for ml taks
	* PoC for Knn algorithm using iris data from kaggle
	* 4 july 2017
	* Feel free to copy and resuse the same
*/

// initialze declarations

const KNN = require('ml-knn');
const csv = require('csvtojson');
const prompt = require('prompt');
const knn = new KNN();

const csvFilePath = 'iris.csv'; // load data

const names = ['sepalLength', 'sepalWidth', 'petalLength', 'petalWidth', 'type'];  // column headers or labels

let separationSize; // factor separating test data and training data set

let data = [],
	X = [],
y = [];


let trainingSetX = [],
	trainingSetY = [],
	testSetX = [],
	testSetY = [];
	
	
	csv({noheader: true, headers: names })
		.fromFile(csvFilePath)
	.on('json', (jsonObj) => {
		data.push(jsonObj);  // Push each object to data array
		
	})
	.on('done', (error) => {
		separationSize = 0.7 * data.length;
		data = shuffleArray(data);
		dressData();
				
	});
	
   /**
    * https://stackoverflow.com/a/12646864
    * Randomize array element order in-place.
    * Using Durstenfeld shuffle algorithm.
    */
	
	function shuffleArray(array) {
		for( var i = array.length-1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i+1));
			
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
			
		}
		return array;
	}
	
	/**
	* Data Format
{
 sepalLength: ‘5.1’,
 sepalWidth: ‘3.5’,
 petalLength: ‘1.4’,
 petalWidth: ‘0.2’,
 type: ‘Iris-setosa’ 
}
	
	*/
	
	
	
	function dressData() {
		
/**
     * There are three different types of Iris flowers
     * that this dataset classifies.
     *
     * 1. Iris Setosa (Iris-setosa)
     * 2. Iris Versicolor (Iris-versicolor)
     * 3. Iris Virginica (Iris-virginica)
     *
     * We are going to change these classes from Strings to numbers.
     * Such that, a value of type equal to
     * 0 would mean setosa,
     * 1 would mean versicolor, and
     * 3 would mean virginica
     */
		
		
		let types = new Set(); // to gather unique classes
		
		data.forEach((row) => {
			types.add(row.type);
			
		});
		
		typesArray = [...types];  // to save different types of classes
		
		
		data.forEach((row) => {
			
			let rowArray, typeNumber;
			
			rowArray = Object.keys(row).map(key => parseFloat(row[key])).slice(0, 4);
			
			typeNumber = typesArray.indexOf(row.type); // converting type(String) to type(number)
			
			X.push(rowArray);
			y.push(typeNumber)
			
		});
		
		
		trainingSetX = X.slice(0, separationSize);
		trainingsetY = y.slice(0, separationSize);
		testSetX = X.slice(separationSize);
		testsetY = y.slice(separationSize);
		
		
		train();
		
		
	}
	
	
	function train() {
		
		knn.train(trainingSetX, trainingsetY);
		test();
	}
	

	function test() {
	    const result = knn.predict(testSetX);
	    const testSetLength = testSetX.length
	    const predictionError = error(result, testSetY);
	    console.log(`Test Set Size = ${testSetLength} and number of Misclassifications = ${predictionError}`);
	    predict();
	}
	
	function error(predicted, expected) {
	    let misclassifications = 0;
	    for (var index = 0; index < predicted.length; index++) {
	        if (predicted[index] !== expected[index]) {
	            misclassifications++;
	        }
	    }
	    return misclassifications;
	}
	
	
	function predict() {
		
		let temp = [];
		
		prompt.start();
		
		prompt.get(['Sepal Length', 'Sepal Width', 'Petal Length', 'Petal Width'], function(err, result) {
			
			if(!err) {
				for (var key in result) {
					temp.push(parseFloat(result[key])); 
					
					var type = knn.getSinglePrediction(temp);
					
					var flower
					
					switch(type) {
					
					//Add more cases depending on new flower data in the dataset	
						
					case 0: 
						
						flower = "Setosa";
						break;
						
					case 1:
						
						flower = "Versicolor";
						break;
						
					case 2:	
						flower = "Virginica";
						break;	
					
						}
						
					}
				
				//console.log(temp);
				//console.log(knn.getSinglePrediction(temp));
				//console.log(`**** type =  ${flower}`);
				// console.log(`With ${temp} -- type =  ${knn.getSinglePrediction(temp)}`);
				
				/**  Test Data 
				
 			   		**	Sepal Length:  1.7
 			   		**	Sepal Width:  2.5
 			   		**	Petal Length:  0.5
 			   		**	Petal Width:  3.4
				
				* should give an  answer setosa
				
				*/
				
				console.log(`With ${temp} **** Flower type =  ${flower}  -- Type = ${type}`);
				
		    }
		
		});
	
	}