
function getText(document_root) {
    var desiredLength = 10,
    matches = [],
    tempString = '<ol id="matchList">',
    words = document_root.body.textContent.toLowerCase().trim()
						 .replace(/[,;.!"?)()-_=+~%$#@^&*\/`'<>{•}|]/g,' ')
						 .split(/[\s\/]+/g).sort();

						 //return words.length;
    
		for (var i=0; i<words.length; i++) {
			if (words[i].length === desiredLength){
			matches.push(words[i]);
			}
		}

		uniqueArray = matches.filter(function(item, pos) {
    		return matches.indexOf(item) == pos;
		})
		
		for(var j=0; j < uniqueArray.length; j++){
			tempString+='<li>'+uniqueArray[j]+'</li>';
		}
		tempString+="</ol><p>Made in honor of /u/RomanReigns1</p>";
	
	return tempString;
};

chrome.runtime.sendMessage({
    action: "getSource",
    source: getText(document)
});
