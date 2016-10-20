/* Independent Practice

Making a favorites list: DOM manipulation


- When the user clicks the submit button, take the value they've typed
  into the input box and add it to the list (hint: appendChild)

- Also, when a new item is added to the list, clear the input box.

*/

function addToList($list, thing) {
	// body...

	var $thingLi = $("<li>").html(thing);
	$list.append($thingLi);
	addCompleteList($thingLi);


}



function addToList(list, newThing) {
	var newThingLi =document.createElement("li");
	var newThingText = document.createTextNode(newThing);
	newThingLi.appendChild(newThingText);
	list.appendChild(newThingLi);

}
 
window.onload = function() {
  // YOUR CODE HERE!

var button = document.getElementById("new-thing-button");
var thingList = document.getElementById("fav-list");
var newThinginput = document.getElementById("new-thing");

	button.onclick = function(event){
	  event.preventDefault()

		var input = getElementById("new-thing").value	
		console.log(input)

		var li = document.createElement("li")
		
		var text = document.createTextNode(input)
		
		li.appendChild(text)
		
		ul.appendChild(li) 
	}
};

/*

Bonus:

When they click submit without typing anything, alert the user
"you must type in a value!"
  (Hint: the `value` property of the input box, before anyone types in it,
  is the empty string.)

*/


