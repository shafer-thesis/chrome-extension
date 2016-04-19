
'usestrict';
var dataset = [];
var labels = [];
var minimumTimesUsed = 0;
var wordsToCount = 25;
var longest = 0;
var longestWord = [];
var highestScore = 0;
var highestScoreWord = [];

var words = (function(){

	var sWords = document.body.innerText.toLowerCase().trim()
						 .replace(/[,;.!"?)()-_=+~%$#@^&*\/`<>{}|]/g,'')
						 .split(/[\s\/]+/g).sort();
	
	var iWordsCount = sWords.length; // count w/ duplicates

	// array of words to ignore
	var ignore = ['and','the','to','a','of','for','as','i','with','it','is','on',
					'that','this','can','in','be','has','if','was','at'];
	
	ignore = (function(){
		var o = {}; // object prop checking > in array checking
		var iCount = ignore.length;
		for (var i=0;i<iCount;i++){
			o[ignore[i]] = true;
		}
		return o;
	}());

	var counts = {}; // object for math
	for (var i=0; i<iWordsCount; i++) {
		var sWord = sWords[i];
		if (!ignore[sWord]) {
			counts[sWord] = counts[sWord] || 0;
			counts[sWord]++;
		}
	}

	var arr = []; // an array of objects to return
	for (sWord in counts) {
		arr.push({
			text: sWord,
			frequency: counts[sWord],
			score: 0
		});
	}

	// sort array by descending frequency | http://stackoverflow.com/a/8837505
	return arr.sort(function(a,b){
		return (a.frequency > b.frequency) ? -1 : ((a.frequency < b.frequency) ? 1 : 0);
	});

}());

(function(){
	var scrabble = {"a":1, "b":3, "c":3, "d":2, "e":1, "f":4, "g":2, "h":4, "i":1,
					 "j":8, "k":5, "l":1, "m":3, "n":1, "o":1, "p":3, "q":10, "r":1, 
					 "s":1, "t":1, "u":1, "v":4, "w":4, "x":8, "y":4, "z":10};
	for (var i=0; i<wordsToCount; i++) {
		var word = words[i];
		//console.log(word.frequency, word.text);
		if (word.frequency >= minimumTimesUsed) {
		labels.push(word.text + ': ' + word.frequency);
		dataset.push(word.frequency);
		//labels.push(word.text);
		}
		if (word.text.length > longest){
			//document.getElementById("longest").innerHTML = word.length;
			longest = word.text.length;
			longestWord.length = 0;
			longestWord.push(word.text);
		} else if (word.text.length === longest){
			longestWord.push(word.text);
		}
		//perform scrabble measures
		for (var j=0; j<word.text.length; j++){
			var letter = word.text.charAt(j);
			word.score = word.score + scrabble[letter];
		}
		if (word.score > highestScore){
			highestScore = word.score;
			highestScoreWord.length = 0;
			highestScoreWord.push(word.text);
		} else if (word.score === highestScore){
			highestScoreWord.push(word.text);
			} 
		
	}
	document.getElementById("longest").innerHTML = longestWord.toString();
	document.getElementById("highest").innerHTML = highestScoreWord.toString();	
}());

//start graph production

var w = 600;
var h = 1000;
var padding = 30;

var xScale = d3.scale.linear()
    		   .domain([0, d3.max(dataset, function(d){return d; })]) 
    		   .range([padding, w - (padding*2)]);

var yScale = d3.scale.ordinal()
    		.domain(d3.range(dataset.length))
    		.rangeRoundBands([padding, h- padding], 0.05);

//create canvas
var svg = d3.select("body")
    		.append("svg")
    		.attr("width", w)
    		.attr("height", h);

//make bars
svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", 110 + padding)
    .attr("y", function(d, i){
    return yScale(i);
    })
    .attr("width", function(d) {
        return xScale(d);
    })
    .attr("height", yScale.rangeBand())
    .attr('fill', 'black');

//Create word labels
svg.selectAll("text")
	.data(labels)
	.enter()
	.append("text")
	.text(function(d) {
	return d;
	})
	.attr("text-anchor", "end")
	.attr("x", 100 + padding)
	.attr("y", function(d, i){
    return yScale(i) + 23;
    })
	.attr("font-family", "sans-serif")
	.attr("font-size", "15px")
	.attr("fill", "red");
/*
svg.append('text')
	.data(dataset)
	.enter()
	.attr('x', 150)
	.attr('y' function(d, i) {
		return yScale(i) + 17;
	})
	.attr("font-family", "sans-serif")
	.attr("font-size", "15px")
	.attr("fill", "white");

*/

