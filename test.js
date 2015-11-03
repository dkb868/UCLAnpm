var library = require('./index.js');

var diningHall = 0, meal = 2;

library.getMenu(diningHall, meal, printMenu);

function printMenu(menu){
	for(var i = 0; i < menu.items.length; i++){
    	console.log(menu.items[i].name + ", isVegan: " + menu.items[i].isVegan);
    }
}