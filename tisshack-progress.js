/*
wth??
* Im TISS das Curriculum aufmachen,
* den bookmarklet-code ausführen (entweder in die kommandozeile pasten oder als bookmarklet)
* in einem neuen Tab die Zeugnisübersicht (https://tiss.tuwien.ac.at/graduation/certificates.xhtml) aufrufen,
  die Tabelle markieren und das fenster "view selection source" in die neu erschienene Textbox ganz oben auf der Curriculum-Seite kopieren.

bookmarklet:

javascript:(function(){_my_script=document.createElement('SCRIPT');_my_script.type='text/javascript';_my_script.src='http://github.com/fin/thelittlethings/raw/master/tisshack-progress.js';document.getElementsByTagName('head')[0].appendChild(_my_script);})();

javascript:(function(){_my_script=document.createElement('SCRIPT');_my_script.type='text/javascript';_my_script.src='file:///Users/fin/Projects/thelittlethings/tisshack-progress.js';document.getElementsByTagName('head')[0].appendChild(_my_script);})();


Es erscheinen magisch Häkchen neben den abgeschlossenen Fächern.

Korrektur: neben den Fächern, in denen man eine Prüfung abgelegt hat.

*/

$ = document.getElementById;

function lvachecker_update_results() {
        console.log("running");
	var set = document.querySelectorAll('td a');
	for(i=0;i<set.length;i++) {
		var x = set[i];
		var y = x.parentNode.parentNode.parentNode.parentNode;
		if(y.nodeName=="TR") { y.style.display="none" }
	}

	jQuery('span.lvachecker').remove();
	function extractLVAs() {
		var result = [];
		var w2 = document.querySelector("#lvachecker_certs iframe").contentWindow;
		console.log("lol?");
		console.log(w2);
		console.log(w2.document);
		console.log(w2.document.querySelectorAll);
		var set = w2.document.querySelectorAll("table tr");
		console.log("lol!");
		for(var j=0;j<set.length;j++) {
			var x = set[j];
			if(x.className.indexOf('ui-datatable-first')>-1) {continue;}
			result.push(
				x.childNodes[1].childNodes[0].innerHTML+" "+x.childNodes[2].childNodes[0].innerHTML
			);
		}
		return result;
	}
	var lvas = extractLVAs();
	for(var i=0;i<lvas.length;i++) {
		var x = lvas[i];
		console.log(x);
		console.log(jQuery(".nodeTableNameColumn:contains("+x+")").prepend("<span class='lvachecker' style='color: red; font-weight: bold;'>✓</span>"));
	}
}
try {
	var x = document.getElementById("lvachecker_othertable");
	if(x) {
		x.parentNode.removeChild(x);
	}
	x = document.getElementById("lvachecker_certs");
	if(x) {
		x.parentNode.removeChild(x);
	}

}catch(e) {
}
var div = document.createElement("div");
div.id = "lvachecker_certs";
document.getElementById('contentInner').insertBefore(div,document.getElementById('contentInner').firstChild)

var iframe = document.createElement("iframe");
iframe.src = "https://tiss.tuwien.ac.at/graduation/certificates.xhtml?locale=de";
iframe.name = "lvachecker_certs";
div.appendChild(iframe);

var btn = document.createElement("button");
btn.onclick = lvachecker_update_results;
btn.innerHTML = "go!";
div.appendChild(btn);
