// This object contains the expressions to find as keys and their replacements as value
// The replacement works on capitalized, uppercase and tiret-separated words
// But the words to replace are searched as full words only
// So don't forget to add plurals or feminines as well to have them replaced correctly
var replacements = {
	"bobo" : "citoyen aisé, diplômé et progressiste", 
	"bobos" : "citoyens aisés, diplômés et progressistes", // define plurals
	"bobosphère" : "réunion d'éclairés auto-déclarés",
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
	"gauchisme" : "mouvement de pensée de gauche",
	"gauchiste" : "partisan de gauche",
	"gauchistes" : "partisans de gauche",
	"gaucho" : "partisan de gauche",
	"gauchos" : "partisans de gauche",
	"gauchiasse" : "partisanne de gauche",
	"gauchiasses" : "partisannes de gauche",
	"islamo-gauchisme" : "esprit de gauche pour la diversité culturelle du couscous",
	"islamo-gauchiste" : "individu de gauche pour la diversité culturelle du couscous",
	"islamo-gauchistes" : "individus de gauche pour la diversité culturelle du couscous",
	"islamo-bolchévique" : "esprit de gauche pour la diversité culturelle du keftah",
	"islamo-bolchéviques" : "esprits de gauche pour la diversité culturelle du keftah",
	"judéo-bolchévique" : "esprit de gauche pour la diversité culturelle du falafel",
	"judéo-bolchéviques" : "esprits de gauche pour la diversité culturelle du falafel",
	"judéo-gauchiste" : "individu de gauche pour la diversité culturelle du falafel",
	"judéo-gauchistes" : "individus de gauche pour la diversité culturelle du falafel",
	"judéo-chrétien" : "d’héritage de l’Ancien et du Nouveau Testament, des Chroniques, du Livre des Rois, du Pentateuque, du Deutéronome, de la Genèse, et du Livre des Juges",
	"judéo-chrétiens" : "d’héritage de l’Ancien et du Nouveau Testament, des Chroniques, du Livre des Rois, du Pentateuque, du Deutéronome, de la Genèse, et du Livre des Juges",
	"judéo-chrétienne" : "d’héritage de l’Ancien et du Nouveau Testament, des Chroniques, du Livre des Rois, du Pentateuque, du Deutéronome, de la Genèse, et du Livre des Juges",
	"judéo-chrétiennes" : "d’héritage de l’Ancien et du Nouveau Testament, des Chroniques, du Livre des Rois, du Pentateuque, du Deutéronome, de la Genèse, et du Livre des Juges",
	"racine chrétienne" : "souche d’arbre héritée de Jésus",
	"racines chrétiennes" : "souches d’arbres héritées de Jésus",
	"gaulois" : "Vercingétorix",
	"gauloise" : "Vercingétorix",
	"gauloises" : "Vercingétorix",
	"racisme anti-blanc" : "soutien aux discriminés raciaux",
	"racisme anti-blancs" : "soutien aux discriminés raciaux",
	"journalope" : "rédacteur de journal",
	"journalopes" : "rédacteurs de journaux",
	"merdia" : "support d’informations",
	"merdias" : "supports d’informations",
	"bisounours" : "citoyens avec des sentiments exacerbés",
	"assisté" : "individu ne payant pas l’ISF",
	"assistée" : "personne ne payant pas l’ISF",
	"assistés" : "individus ne payant pas l’ISF",
	"assistées" : "personnes ne payant pas l’ISF",
	"fémi-nazi" : "militant virulent pour les droits des femmes",
	"fémi-nazie" : "militante virulente pour les droits des femmes",
	"fémi-nazis" : "militants virulents pour les droits des femmes",
	"fémi-nazies" : "militantes virulentes pour les droits des femmes",
	"grand remplacement" : "développement démographique à forte diversité culturelle",
	"multi-culturalisme" : "mouvement pour la diversité des cultures",
	"multi-culturaliste" : "citoyen pour la diversité des cultures",
	"multi-culturalistes" : "citoyens pour la diversité des cultures",
	"nouvel ordre mondial" : "changement de la géopolitique mondiale au nouveau millénaire",
	"nouvel ordre moral" : "changement des catégorisations de pensée",
	"pensée unique" : "pensée décrite comme partagée par la plupart des gens mais en fait non",
	"procès stalinien" : "débat contradictoire",
	"procès staliniens" : "débats contradictoires",
	"politburo" : "secrétariat général de la haute autorité",
	"police de la pensée" : "contradiction argumentée et éclairée",
	"polices de la pensée" : "contradictions argumentées et éclairées",
	"politiquement correct" : "traitement des gens avec respect",
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
	var lowerV = v.toLowerCase();
	if(lowerV.trim().length > 0){
		Object.keys(replacements).map(function(expression, index) {
			if(lowerV.indexOf(expression) > -1 || (expression.indexOf("-") > -1 && lowerV.indexOf(expression.replace("-", "")))){
				var remplacement = replacements[expression];
				if(lowerV.indexOf(expression) > -1)
					v = replace(v, expression, remplacement);
				if(expression.indexOf("-") > -1 && lowerV.indexOf(expression.replace("-", "")))
					v = replace(v, expression.replace("-", ""), remplacement);
			}
		});
	}
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

var timeout = null;
var walking = false;
document.addEventListener("DOMSubtreeModified", function() {
	if(!walking){
		if(timeout) {
			clearTimeout(timeout);
		}
		timeout = setTimeout(function(){ 
			walking = true;
			walk(document.body);
			walking = false;
		}, 500);
	}
}, false);