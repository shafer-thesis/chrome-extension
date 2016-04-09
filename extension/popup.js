document.addEventListener('DOMContentLoaded', function() {
	var checkPageButton = document.getElementById('checkPage');
	checkPageButton.addEventListener('click', function(){

		chrome.tabs.getSelected(null, function(tab) {

			var elements = document.getElementsByTagName('*');

			uniqueList = {}

			for (var i = 0; i < elements.length; i++) {
			    var element = elements[i];

			    for (var j = 0; j < element.childNodes.length; j++) {
			        var node = element.childNodes[j];

			        if (node.nodeType === 3) {
			            var text = node.nodeValue;
			            
			            if text in uniqueList {
			            	uniqueList[text] = uniqueList[text] + 1; 
			            } else {
			            	uniqueList[text] = 1;
			            	}
			            }
			        }
			    }


		  chrome.tabs.executeScript({
		    	alert('hello there');
			}); 

			}

			/*
			d = document;

			var f = d.createElement('form');
			f.action = uniqueList;
			f.method = 'post';
			var i = d.createElement('input');
			i.type = 'hidden';
			i.name = 'url';
			i.value = tab.url;
			f.appendChild(i);
			d.body.appendChild(f);
			f.submit();
			*/
		});
	}, false);
}, false);