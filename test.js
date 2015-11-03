var library = require('./index.js');

var options = {
	diningHall: 0,
	meal: 2,
	diet: 1,
	callback: printMenu
};

library.getMenu(options);




function printMenu(menu){
	for(var i = 0; i < menu.items.length; i++){
    	//console.log(menu.items[i].name + ", isVegan: " + menu.items[i].isVegan);
    	console.log(menu.items[i].name + ", isVegetarian: " + menu.items[i].isVegetarian);
    }
}