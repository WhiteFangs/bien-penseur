walk(document.body);

function walk(node) 
{
	// I stole this function from here:
	// http://is.gd/mwZp7E
	
	var child, next;
	switch ( node.nodeType )  
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
		child = node.firstChild;
		while ( child ) 
		{
			next = child.nextSibling;
			walk(child);
			child = next;
		}
		break;

		case 3: // Text node
		handleText(node);
		break;
	}
}

function handleText(textNode) 
{
	var v = textNode.nodeValue;

	v = replace(v, "bobo", "citoyen sympa");
	v = replace(v, "bobos", "citoyens sympas");

	textNode.nodeValue = v;
}


function replace(str, before, after) {
	str = str.replace(getBeforeRegex(before), after);
	before = before.toUpperCase();
	after = after.toUpperCase();
	str = str.replace(getBeforeRegex(before), after);
	before = before.charAt(0).toUpperCase() + before.slice(1).toLowerCase();
	after = after.charAt(0).toUpperCase() + after.slice(1).toLowerCase();
	str = str.replace(getBeforeRegex(before), after);
	return str;
}

function getBeforeRegex(before){
	return new RegExp("\\b" + before.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + "\\b", 'g');
}