/*
wth??
Im TISS das Curriculum aufmachen, den JS-Code mit firebug ausführen, dann in einem neuen Tab die Zeugnisübersicht (https://tiss.tuwien.ac.at/graduation/certificates.xhtml) aufrufen, die Tabelle markieren, "view Source" und den Source in die Textbox ganz unten auf der Seite kopieren.

Es erscheinen magisch Häkchen neben den abgeschlossenen Fächern.

Korrektur: neben den Fächern, in denen man eine Prüfung abgelegt hat.

*/


function lvachecker_update_results() {
        console.log("running");
	var set = $$('td a');
	for(i=0;i<set.length;i++) {
		var x = set[i];
		var y = x.parentNode.parentNode.parentNode.parentNode;
		if(y.nodeName=="TR") { y.style.display="none" }
	}

	jQuery('span.lvachecker').remove();
	function extractLVAs() {
		var result = [];
		var othertable = document.createElement("div");
		othertable.id = "lvachecker_othertable_lol";

		var html = $$("textarea#lvachecker_othertable")[0].value;
		if(html.indexOf('table')<0) {
			html = "<table>"+html+"</html>";
		}
		othertable.innerHTML=html;
		document.body.appendChild(othertable);
		var set = $$("#lvachecker_othertable_lol tr");
		for(var j=0;j<set.length;j++) {
			var x = set[j];
			if(x.className.indexOf('ui-datatable-first')>-1) {continue;}
			result.push(
				x.childNodes[1].childNodes[0].innerHTML+" "+x.childNodes[2].childNodes[0].innerHTML
			);
		}
		othertable.parentNode.removeChild(othertable);
		return result;
	}
	var lvas = extractLVAs();
	for(var i=0;i<lvas.length;i++) {
		var x = lvas[i];
		console.log(x);
		console.log(jQuery(".nodeTableNameColumn:contains("+x+")").prepend("<span class='lvachecker' style='color: red; font-weight: bold;'>✓</span>"));
	}
}
if($("lvachecker_othertable")) {
	$("lvachecker_othertable").parentNode.removeChild($("lvachecker_othertable"));
}
var othertbl = document.createElement("textarea");
othertbl.id="lvachecker_othertable";
othertbl.onblur = lvachecker_update_results;
document.body.appendChild(othertbl);

