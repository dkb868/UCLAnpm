var library = require('./index.js');

var diningHall = 0, meal = 2;

var options = {
	diningHall: 0,
	meal: 2,
	diet: 0,
	callback: printMenu
};

//library.getMenu(diningHall, meal, printMenu);
library.getMenu(options);




function printMenu(menu){
	for(var i = 0; i < menu.items.length; i++){
    	console.log(menu.items[i].name + ", isVegan: " + menu.items[i].isVegan);
    }
}