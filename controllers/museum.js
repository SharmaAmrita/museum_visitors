const { response } = require('express');
var http = require('http');
// set month array
let Months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
module.exports = {
    fetchVisitors : async function (data, ret) {    
        var timestamp = data.date
        var append_data = undefined;
        var date = new Date(parseInt(timestamp)); 
        if (date == "Invalid Date") {
            datresponse = {
                error: "invalid date entered"
            }
            return ret (datresponse)
        }
        var month = date.getMonth()+1;
        var year = date.getFullYear();
        if (month == NaN || year == NaN) {
            datresponse = {
                error: "invalid date"
            }
            return ret (datresponse)
        }
       
        try {
            // This is the function call to the api that will provide the list of museums and other information.
            getList (function (res) {
                var final_data = {};
                let total = 0;
                let highest = 0;
                let lowest = 0;
                let highestkey = "";
                let lowestkey = "";
                museumpresent = false;
                var museum_list = JSON.parse(res);
                //iterate the list
                for (const element of museum_list) {
                    var new_date = element.month.split('-');
                    var compared_month = new_date[1];
                    var compared_year = new_date[0];
                    if (compared_month == month && compared_year == year) {
                        final_data = element;
                        // Remove month key from the data
                        delete final_data.month;  
                        // check if ignored museum is present or not 
                        if (data.ignore != undefined) {
                            museumpresent = data.ignore;
                        }
                        if(museumpresent && final_data[museumpresent] != undefined) {
                            // The ignored museum is added as a separate object, which will be appended in the end.
                            append_data = {
                                    museum: museumpresent,
                                    visitors: parseInt(final_data[museumpresent])
                            }
                            // Remove the ignored museum from the object to calculate the visitors without it
                            delete final_data[museumpresent];
                        }
                        // To fetch the highest, lowest and total number of visitors from the data for a given month and year.
                        for (const key in final_data) {    
                            if (Object.hasOwnProperty.call(final_data, key)) {
                                let val = parseInt(final_data[key]);
                                total = total+val;
                                if(val > highest) {
                                    highest = val;
                                    highestkey = key;
                                   if (lowest < highest) {
                                        lowest = highest;
                                        lowestkey = key;
                                    }
                                }
                                if (val < lowest) {
                                    lowest = val;
                                    lowestkey = key;
                                }
                            }
                        }
                        // Object creation according to the requirement
                        final_data = {
                            attendance : {
                                month: Months[month-1],
                                year: year,
                                highest : {
                                    museum: highestkey,
                                    visitors: highest
                                },
                                lowest : {
                                    museum: lowestkey,
                                    visitors: lowest
                                },
                                total: total

                            }
                        }
                        // The ignored museum, if exists will be appended here.
                        if(museumpresent && append_data != undefined) {
                            final_data.attendance['ignored'] = append_data;
                        }
                        return ret(final_data);  
                    } 
                    else {
                        final_data = {
                            "msg": "The requested data doesn't exist"
                        }
                    }
                }
                return ret(final_data);  
    
            });
        }
        catch {
            throw new Error ("Failed");
        }
  
          
    }
}
function getList (result) {
    var res;
    var options = {
        host: "data.lacity.org",
        path: "/resource/trxm-jn3c.json"
    }
    callback = function(response) {
        var str = '';
        response.on('data', function (chunk) {
          str += chunk;
        });
      
        response.on('end', function () {
        return result(str)
       
        });
      }
    http.request(options, callback).end();
   
} 