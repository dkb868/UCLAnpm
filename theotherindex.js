var request = require("request-promise");
var cheerio = require("cheerio");

var lib = {
  getMajors: function(callback) {

    if(typeof(callback) != 'function') {
      callback = function() {};
    }

    return request('http://www.registrar.ucla.edu/schedule/schedulehome.aspx')
    .then(function(body) {
      $ = cheerio.load(body);
      var array = $('#ctl00_BodyContentPlaceHolder_SOCmain_lstSubjectArea option');
      var majorArr = {};
      array.each(function(i, elem) {
        majorArr[$(this).val()] = $(this).text();
      });
      callback(majorArr);
      return majorArr;
    });
  },

  getFullCourseOffering: function(courseId, session, callback) {
    return request({
      method: 'GET',
      uri: 'http://www.registrar.ucla.edu/schedule/detmain.aspx?termsel=' + session + '&subareasel=' + courseId
    })
    .then(function(body) {
      $ = cheerio.load(body);
      var output = [];
      var temp = {};
      var count = 0;
      var tempOption = {};
      $('.dgdTemplateGrid').each(function(i, elem){
        if($(this).children('.SAHeaderDarkGreenBar').length == 1) {
          if(temp.hasOwnProperty("name")) {
            output.push(temp);
          }
          temp = {};
          temp.options = [];
          count = 0;
          temp.name = $(this).text();
          count++;
        } else if(count == 1){
          //catalog / definitions
          //maybe future use?
          count++;
        } else if(count >= 2){
          var optionIndex = (count-2)%3;
          if(optionIndex == 0) {
            tempOption = {};
            console.log($(this).children().html());
            //this isnt working for some reasoning
            tempOption.name = $(this).children('.coursehead').text();
            tempOption.lecturer = $(this).children('.fachead').text();
          } else if(optionIndex == 1) {
            //Course Webpage   Library Reserves   Textbooks
            //for future
          } else if(optionIndex == 2) {
            tempOption.classesHtml = $(this).html();
            temp.options.push(tempOption);
          }
          count++;
        }
      });
      //for the last item
      if(temp.hasOwnProperty("name")) {
        output.push(temp);
      }

      return output;
    })
  }
}

module.exports = lib;
