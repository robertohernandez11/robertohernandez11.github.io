var presidentObject = {
    presidents: [
        'Washington',
        'Adams',
        'Jefferson',
        'Madison',
        'Monroe',
        'Adams',
        'Jackson',
        'Van Buren',
        'Harrison',
        'Tyler',
        'Polk',
        'Taylor',
        'Fillmore',
        'Pierce',
        'Buchanan',
        'Lincoln',
        'Johnson',
        'Grant',
        'Hayes',
        'Garfield',
        'Arthur',
        'Cleveland',
        'Harrison',
        'Cleveland',
        'McKinley',
        'Roosevelt',
        'Taft',
        'Wilson',
        'Harding',
        'Coolidge',
        'Hoover',
        'Roosevelt',
        'Truman',
        'Eisenhower',
        'Kennedy',
        'Johnson',
        'Nixon',
        'Ford',
        'Carter',
        'Reagan',
        'Bush',
        'Clinton',
        'Bush',
        'Obama',
    ]
}
//HB need to be in an object
var titleObj = {
    title: "Handlebars", 
    description: "A HB Test"
}
//step 1: grab the template
var titleTemplate = $("#title-template").html()
//step 2: compile the template
var compileTemp = Handlebars.compile(titleTemplate)
//step 3: pass it an object
var addObj = compileTemp(titleObj);
//step 4: append the item
$("#handlebars-list").append(addObj)

var presTemplate = $("#pres-template").html()
var compilePresTemp = Handlebars.compile(presTemplate)
var addPressObj = compilePresTemp(presidentObject)
$("#jquery-list").append(addPressObj)