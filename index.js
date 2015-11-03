var cheerio = require('cheerio');
var request = require('request');
var exports = module.exports = {};

var options = {
	diningHall: 0,
	meal: 1,
	
};

exports.getMenu = function(diningHall, meal, callback){
	var diningHallString;
	switch(diningHall){
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
	switch(meal){
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
	    var numItems = $("div.menu-full.menu-detailed > ol > li").length;
	    $("div.menu-full.menu-detailed > ol > li > a").each(function(i, element){
	    	var itemTemplate = {
		 		name: "",
		 		isVegan: false,
		 		isVegetarian: false
	 		};

	    	var veganText = $(this).find("span").text();
	    	itemTemplate.isVegan = (veganText == "  vegan");
	    	itemTemplate.isVegetarian = (veganText == "  vegetarian");

	    	$(this).find("span").remove();
	    	itemTemplate.name = $(this).text();

	    	menu.items.push(itemTemplate);
	    });

	    callback(menu);
	  }
	})
}

export.veganMenu = function(){

}