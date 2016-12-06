// This object contains the expressions to find as keys and their replacements as value
// The replacement works on capitalized, uppercase and tiret-separated words
// But the words to replace are searched as full words only
// So don't forget to add plurals or feminines as well to have them replaced correctly
var replacements = {
	"bobo" : "citoyen aisé, diplômé et progressiste", 
	"bobos" : "citoyens aisés, diplômés et progressistes", // define plurals
	"bien-pensance" : "pensée bienveillante", // replaces also "bienpensance"
	"bien-pensant" : "bienveillant",
	"bien-pensants" : "bienveillants",
	"bien-pensante" : "bienveillante", // define feminines 
	"bien-pensantes" : "bienveillantes", // and their plurals
	"dissidence" : "divergence d'opinion",
	"dissident" : "divergeant d'opinion",
	"dissidents" : "divergeants d'opinion",
	"dissidente" : "divergeante d'opinion",
	"dissidentes" : "divergeantes d'opinion",
	"gauchisme" : "pensée de gauche",
	"gauchiste" : "partisan de gauche",
	"gauchistes" : "partisans de gauche",
	"gaucho" : "partisan de gauche",
	"gauchos" : "partisans de gauche",
	"gauchiasse" : "partisanne de gauche",
	"gauchiasses" : "partisannes de gauche",
};

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

	Object.keys(replacements).map(function(expression, index) {
		var remplacement = replacements[expression];
		v = replace(v, expression, remplacement);
		if(expression.indexOf("-"))
			v = replace(v, expression.replace("-", ""), remplacement);
	});
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