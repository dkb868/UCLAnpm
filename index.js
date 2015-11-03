var cheerio = require('cheerio');
var request = require('request');
var exports = module.exports = {};

exports.getMenu = function(options){
	var diningHallString;
	switch(options.diningHall){
		case 0: diningHallString = "Bruin%20Plate";
				break;
		case 1: diningHallString = "Covel%20Dining";
				break;
		case 2: diningHallString = "De%20Neve";
				break;
		case 3: diningHallString = "FEAST%20at%20Rieber";
				break;
		default: diningHallString = "Bruin%20Plate";
	}

	var mealString;
	switch(options.meal){
		case 0: mealString = "Breakfast";
				break;
		case 1: mealString = "Lunch";
				break;
		case 2: mealString = "Dinner";
				break;
		default: mealString = "Dinner";
	}

	var menu = {
		items: []
	};

	request('http://m.dining.ucla.edu/menu/index.cfm?m=' + mealString + '&r=' + diningHallString, function (error, response, body) {
	 if (!error && response.statusCode == 200) {

	    $ = cheerio.load(body);
	    //var numItems = $("div.menu-full.menu-detailed > ol > li").length;
	    $("div.menu-full.menu-detailed > ol > li > a").each(function(i, element){
	    	var itemTemplate = {
		 		name: "",
		 		isVegan: false,
		 		isVegetarian: false
	 		};

	    	var veganText = $(this).find("span").text();
	    	itemTemplate.isVegan = (veganText == "  vegan");
	    	itemTemplate.isVegetarian = (veganText == "  vegetarian") || itemTemplate.isVegan;

	    	$(this).find("span").remove();
	    	itemTemplate.name = $(this).text();
	    	switch(options.diet){
	    		case 0: menu.items.push(itemTemplate);
	    				break;
	    		case 1: if(itemTemplate.isVegetarian || itemTemplate.isVegan){
	    					menu.items.push(itemTemplate);
	    				}
	    				break;
	    		case 2: if(itemTemplate.isVegan){
	    					menu.items.push(itemTemplate);
	    				}
	    	}
	    });

	    options.callback(menu);
	  }
	})
}
