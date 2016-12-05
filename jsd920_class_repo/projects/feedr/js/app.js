/*
  Please add all Javascript code to this file.
*/
$(document).ready(function() {
	var sources = [
		{
			name: 'Mashable',
			url: 'https://accesscontrolalloworiginall.herokuapp.com/http://mashable.com/stories.json',
			articles: []
		},

		{
			name: 'Reddit',
			url: 'https://accesscontrolalloworiginall.herokuapp.com/https://www.reddit.com/top.json',
			articles: []
		},

		{
			name: 'Digg',
			url: 'https://accesscontrolalloworiginall.herokuapp.com/http://digg.com/api/news/popular.json',
			articles: []
		}
	]


	var uniqueId = 0; // using this to create a unique ID for each object created
	
	// Create an article constructor (sets uniform structure for all incoming data)
	function Article(source, title, tags, image, summary, ranking, url, date) {
		this.source = source;
		this.title = title;
		this.tags = tags; // needs to be an array as some articles have more than one tag
		this.image = image;
		this.summary = summary;
		this.ranking = ranking;
		this.url = url;
		this.date = Date(date);
		this.id = uniqueId++;
	}

	
	
	$.when(
		// Access Mashable content
		$.get(sources[0].url, function(result) {
			for (i=0; i < result.new.length; i++) {
				// pull elements needed from feed
				var title = result.new[i].title;
				var tags = [result.new[i].channel];
				var image = result.new[i].responsive_images[0].image;
				var summary = result.new[i].content.plain;
				var ranking = result.new[i].shares.total;
				var url = result.new[i].link;
				var date = result.new[i].post_date_rfc

				// Properly format data to be used later in template
				var newArticle = new Article(sources[0].name, title, tags, image, summary, ranking, url, date);

				// Push the properly formatted article data into the master array
				sources[0].articles.push(newArticle)
			}
		}),

		// Access Reddit content
		$.get(sources[1].url, function(result) {
			for (i=0; i < result.data.children.length; i++) {
				// pull elements needed from feed
				var title = result.data.children[i].data.title;
				var tags = [result.data.children[i].data.subreddit];

				// it seems that Reddit leaves out the 'preview' property if there is no image for the article
				// this confirms that it's present so the code will keep running
				if (result.data.children[i].data.hasOwnProperty('preview')) {
					var image = result.data.children[i].data.preview.images[0].source.url
				} else {
					var image = 'http://rochellebarlow.com/wp-content/uploads/2013/07/blank-white-RB.jpg'
				};
				var summary = result.data.children[i].data.title;
				var ranking = result.data.children[i].data.score;
				var url = result.data.children[i].data.url;
				var date = result.data.children[i].data.created

				// Properly format data to be used later in template
				var newArticle = new Article(sources[1].name, title, tags, image, summary, ranking, url, date);

				// Push the properly formatted article data into the master array
				sources[1].articles.push(newArticle)
			}
		}),

		// Access Digg content
		$.get(sources[2].url, function(result) {
			for (i=0; i < result.data.feed.length; i++) {
				// pull elements needed from feed
				var title = result.data.feed[i].content.title_alt;

				// Diggs tags are buried in objects, so this pushes them into an array
				var tags = []
				for (j=0; j < result.data.feed[i].content.tags.length; j++) {
					tags.push(result.data.feed[i].content.tags[j].display)
				}

				var image = result.data.feed[i].content.media.images[0].original_url;
				var summary = result.data.feed[i].content.description;
				var ranking = result.data.feed[i].diggs.count;
				var url = result.data.feed[i].content.original_url;
				var date = result.data.feed[i].date

				// Properly format data to be used later in template
				var newArticle = new Article(sources[2].name, title, tags, image, summary, ranking, url, date);

				// Push the properly formatted article data into the master array
				sources[2].articles.push(newArticle)
			}
		})
	).done(function() {

		// Master article container. All of the properly formatted objects will be pushed into this array
		var articlesMaster = [];
		for (i = 0; i < sources.length; i++) {
			articlesMaster.push.apply(articlesMaster, sources[i].articles)
			console.log(sources[i].articles.date)
		}
		console.log(articlesMaster)
		sortByDate(articlesMaster);


		
		// Creates a new article for each available
		var articlesSource = $('#articleTemplate').html();
		var articlesCompiled = Handlebars.compile(articlesSource);
		var articlesTemplate = articlesCompiled(articlesMaster)
		$('#main').append(articlesTemplate)

		$('#popUp').addClass('hidden'); // Hides the loading gif
		

		// allows articles to be filtered by publication when nav items are clicked
		$('body').on('click', '#sourceMenuMain li a', function(e) {
		    e.preventDefault();
			$('#main').empty(); // clear current contents of article container 
		    var sourceChoice = e.currentTarget.innerHTML; // The innerHTML will always be the value of name in the objects in the sources array
		    // search the objects in the sources array for a 
		    for (i = 0; i < sources.length; i++) {
		    	if (sources[i].name === sourceChoice) {
				    
				    var articlesTemplate = articlesCompiled(sources[i].articles);
				    $('#main').append(articlesTemplate)
		    	}
		    }
		});

		// show all articles in chronological order when logo is clicked
		$('body').on('click', 'h1', function(e) {
			$('#main').empty();
		    var articlesTemplate = articlesCompiled(articlesMaster);
		    $('#main').append(articlesTemplate)
		});

		// when an article is clicked, show the article summary and a link to the article source
		$('body').on('click', '.articleContent a', function(e) {
			e.preventDefault;
			$('body').css('overflow', 'hidden') // prevent page scrolling when popup is opened

			// remove the loading styling for the pop up
			$('#popUp').removeClass('hidden');
			$('#popUp').removeClass('loader');
			
			var showId = $(this).attr('id'); // finds the unique id of the article clicked on
			console.log($(this))

			// searches the master array for the unique ID and returns the object containing the article's info
			var moreArticle = $.grep(articlesMaster, function(e) {
				return e.id == showId;
			})

			// render the article content in the popup
			var popUpSource = $('#popUpTemplate').html();
			var popUpCompiled = Handlebars.compile(popUpSource);
			var popUpTemplate = popUpCompiled(moreArticle)
			$('#popUp').append(popUpTemplate)
		});

		// close the popup and empty the popup container!
		$('body').on('click', '.closePopUp', function() {
			$('#popUp').toggleClass('hidden')
			$('#popUp').empty();
			$('body').css('overflow', 'auto')
		})


		// expand searchbar when magnifying glass is clicked
		$('body').on('click', '#search a', function(e) {
			e.preventDefault();
			$('#search').toggleClass('active');
		})

		// automatically search articles on the page as the user types
		//window.addEventListener('input', function (e) {
		$('#search input').on('input', function(e) {

			var userInput = e.target.value.toLowerCase() 
			//var userInput = $('#search input').val().toLowerCase();

			// search through the master array to find the articles that contain the string the user is typing
			var matchesArticle = $.grep(articlesMaster, function(e) {
				var fomatTitle = e.title.toLowerCase()
				return fomatTitle.indexOf(userInput) > -1
			})

			console.log(matchesArticle)
			console.log(articlesMaster)

			// if the input is zero, this rerenders the original array, otherwise renders an array that contains the articles that match the user's search
	    	if ( !userInput.length ) {
				recontext($('#main'), articlesMaster);
		    } else {
				recontext($('#main'), matchesArticle);
		    }
	})

	}).fail(function() {
	    alert('error');
	})


	// Navigation, creates a menu item for each source
	var sourcesMenuSource = $('#sourceMenuTemplate').html();
	var sourcesCompiled = Handlebars.compile(sourcesMenuSource);
	var sourcesTemplate = sourcesCompiled(sources)
	$('#sourceMenuMain').append(sourcesTemplate)

})


