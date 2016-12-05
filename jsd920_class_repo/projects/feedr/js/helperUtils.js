function sortByDate(arr) {
	arr.sort( function(a,b){
	  return a.date - b.date
	});
}

// not sure if it's ok to declare this twice but this needs to be declared earlier in excution in order for the recontext helper to work
var articlesSource = $('#articleTemplate').html();
var articlesCompiled = Handlebars.compile(articlesSource);

function recontext(container, context) {
	container.empty();
    var articlesTemplate = articlesCompiled(context);
    container.append(articlesTemplate)
}