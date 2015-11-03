var cheerio = require('cheerio');
var request = require('request');


var url = "http://menu.ha.ucla.edu/foodpro/default.asp?location=01&date=11%2F3%2F2015";
request(url, function(error, response, html){
	if(!error){
		$ = cheerio.load(html);
        $(".itemlinkt,.itemlink")
            .each(function(i, element){
                console.log("wtf");
                var x = $(this).attr('href');
                var nutritionUrl = "http://menu.ha.ucla.edu/foodpro/" + x;
                request(nutritionUrl, function(error, response, html){
                    $ = cheerio.load(html);
                    var foodItem = {
                        title: $(".rdtitle").text(),
                        calories: $(".nfcal").text(),
                        fat_calories: $(".nffatcal").text(),
                        total_fat: $("p.nfnutrient:nth-child(6)").text(),
                        saturated_fat: $("div.nfindent:nth-child(7) > p:nth-child(1)").text(),
                        trans_fat : $("div.nfindent:nth-child(7) > p:nth-child(2)").text(),
                        cholesterol: $("p.nfnutrient:nth-child(8)").text(),
                        sodium: $("p.nfnutrient:nth-child(9)").text(),
                        total_carbohydrate: $("p.nfnutrient:nth-child(10)").text(),
                        dietary_fiber: $("div.nfindent:nth-child(11) > p:nth-child(1)").text(),
                        sugars: $("div.nfindent:nth-child(11) > p:nth-child(2)").text(),
                        protein: $("p.nfnutrient:nth-child(12)").text(),
                        vitamin_a: $(".nfvitfirst > span:nth-child(1) > span:nth-child(2)").text(),
                        vitamin_c: $(".nfvitfirst > span:nth-child(2) > span:nth-child(2)").text(),
                        calcium: $(".nfvit > span:nth-child(1) > span:nth-child(2)").text(),
                        iron: $(".nfvit > span:nth-child(2) > span:nth-child(2)").text()
                    };
                    console.log(foodItem);
                });
        });
    }
});


