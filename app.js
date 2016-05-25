var something = document.querySelector("p");
console.log(something);
something.click(function() {
	console.log("it works hazaaaahh");
});

/* TOC.js: create a table of contents for a document
 * 
 * This module registers an anonymous function that runs automatically
 * when the document finishes loading. When it runs, the function first
 * looks for a document element with an id of "TOC". If there is no
 * such element it creates one at the start of the document.

 * Next, the functon finds all <h1> through <h6> tags, treats them as
 * section titles, and creates a table of contents with the TOC
 * element. The function adds section number to each section heading
 * and wraps the heading in named anchors so that the TOC can link to
 * them. The generated anchors have names that begin with "TOC", so
 * you should avoid this in your HTML.

 * The entries in the generated TOC can be styled with CSS. All entries have
 * a class "TOCEntry". Entries also have a class that corresponds to the level
 * of the section heading. <h1> tags generate entries of class "TOCLevel1",
 * <h2> tags generate entries of class "TOCLevel2", and so on. Section numbers
 * inserted into heading have class "TOCSectNum".
 */

// Anonymous function defines a local scope
 window.onload = (function() {

 	// Find if there is a div with an id of "TOC"
 	var toc = document.getElementById("TOC");
 	if(!toc) {
 		toc = document.createElement("div");
 		toc.id = "TOC";
 		document.body.insertBefore(toc, document.body.firstChild);
 	}

 	var headings;
 	// Get headers, either the easy way or the hard way
 	if(document.querySelectorAll) {
 		headings = document.querySelectorAll("h1,h2,h3,h4,h5,h6");
 	} else {

		headings = findHeadings(document.body, []);

 		function findHeadings(root, sect) {
 			for(var i = root.firstChild; i !== null; i = i.nextSibling) {
 				if (i.nodeType == 1) {
 					if ( i.tagName.length == 2 && i.tagName.charAt(0) == "H" )
 						sect.push(i);
 					findHeadings(i, sect);
 				}
 			}
 			return sect;
 		}

 	}

 	var sections = [0,0,0,0,0,0];

 	for (var h = 0; h < headings.length; h++) {
 		var header = headings[h];
 		level = header.tagName.charAt(1);

 		// Skip if directly under document as it looks stupid/excessive
 		if (header.parentNode == document) continue;
 		// Skip if not a read header
 		if(isNaN(level) || parseInt(level) < 1 || parseInt(level) > 6) continue;

 		// Increment section number and reset following dividers (eg 2.3.4 -> 3.0.0)
 		sections[level-1]++;
 		for (var j = level; j < 6; j++) sections[j] = 0;

 		// Trim the fat and make it pretty
 		var sect = sections.slice(0, level).join(".");

 		var por = document.createElement("a");
 		por.id = "POC" + sect;
 		por.href = "#POC" + sect;
 		por.className = "POCNumber";
 		header.parentNode.insertBefore(por, header);
 		por.appendChild(header);

 		var a = document.createElement("a");
 		a.href = "#POC" + sect;
 		a.innerHTML = sect + " " + header.innerHTML;

 		toc.appendChild(a);
 		toc.appendChild(document.createElement("br"));

 	}










 	console.log(headings);
 });