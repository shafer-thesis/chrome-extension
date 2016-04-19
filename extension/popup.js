
'usestrict';
console.log(document.getElementById('checkPage'));

chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    message.innerHTML = request.source;
  }
});

function onWindowLoad() {
document.getElementById('checkPage').addEventListener('click', onCheckPage);
}

function onCheckPage() {
  var message = document.querySelector('#message');

  chrome.tabs.executeScript(null, {
    file: "getPageSource.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  });

}

window.onload = onWindowLoad;


/*
chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.sendMessage(tab.id, {method: "getText"}, function(response) {
        if(response.method=="getText"){
            var allText = response.data;
        }
    });
});



//_________________
document.addEventListener('DOMContentLoaded', function() {
	var checkPageButton = document.getElementById('checkPage');
		checkPageButton.addEventListener('click', function(){
			chrome.tabs.getSelected(null, function(tab) {
	
	var matches = [],
	desiredLength = 3;

	var words = function(){

	var allWords = allText.toLowerCase().trim()
						 .replace(/[,;.!"?)()-_=+~%$#@^&*\/`<>{}|]/g,'')
						 .split(/[\s\/]+/g).sort();
		console.log(typeof allWords);

		for (var i=0; i<allWords.length; i++) {
			console.log(i);
			if (words[i].text.length === desiredLength){
			matches.push(word.text);
			console.log(word.text);
			}
		}
		return matches;	
	}; 

	var printWords = function(matches){
		tempString = '<ul id="matchList">'
		for(var i = 0; i < matches.length; i++){
			tempString+='<li>'+matches[i]+'</li>';
		}
		tempString+="</ul>";
		return tempString;
	};
	document.getElementById("matches").innerHTML = printWords(matches);

		});
	}, false);
}, false);

*/
