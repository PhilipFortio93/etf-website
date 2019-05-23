function standardDeviation(values){
  var avg = average(values);
  
  var squareDiffs = values.map(function(value){
    var diff = value - avg;
    var sqrDiff = diff * diff;
    return sqrDiff*252; //annualised
  });
  
  var avgSquareDiff = average(squareDiffs);

  var stdDev = Math.sqrt(avgSquareDiff);
  return stdDev;
}

function average(data){
  var sum = data.reduce(function(sum, value){
    return sum + value;
  }, 0);

  var avg = sum / data.length;
  return avg;
}

const dateMap = {
  "Jan":0,
  "Feb":1,
  "Mar":2,
  "Apr":3,
  "May":4,
  "Jun":5,
  "Jul":6,
  "Aug":7,
  "Sep":8,
  "Oct":9,
  "Nov":10,
  "Dec":11
}

function stringToDateMapper(_date,_format,_delimiter)
  {
    var formatLowerCase=_format.toLowerCase();
    var formatItems=formatLowerCase.split(_delimiter);
    var dateItems=_date.split(_delimiter);
    var monthIndex=formatItems.indexOf("mmm");
    var dayIndex=formatItems.indexOf("dd");
    var yearIndex=formatItems.indexOf("yyyy");
    var month=parseInt(dateMap[dateItems[monthIndex]]);
    var formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
    return formatedDate;
  }

 function stringToDate(_date,_format,_delimiter)
  {
    var formatLowerCase=_format.toLowerCase();
    var formatItems=formatLowerCase.split(_delimiter);
    var dateItems=_date.split(_delimiter);
    var monthIndex=formatItems.indexOf("mm");
    var dayIndex=formatItems.indexOf("dd");
    var yearIndex=formatItems.indexOf("yyyy");
    var month=parseInt(dateItems[monthIndex]);
    month-=1;
    var formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
    return formatedDate;
  }

function standardiseDate(date){
  var datearray = date.split(" ")
  var month =  datearray[0]
  var day = datearray[1].substring(0,2)
  var year = datearray[2]
  return day+"/"+month+"/"+year;
}

function getReturn(data, weight, notional){

    // console.log("divs :", div_data);
    data = data.reverse()
    let output = [{
          // "Date":stringToDateMapper(data[i].Date,"dd/mmm/yyyy","/"),
          "dailyreturn_nodivs":0,
          "dailyreturn_withdivs":0,
          "dailycashreturn_nodivs":notional,
          "dailycashreturn_withdivs":notional,
          "cumulativereturn_withdivs":0,
          "cumulativereturn_nodivs":0,
          "cumulativecashreturn_nodivs":notional,
          "cumulativecashreturn_withdivs":notional,
          "weighteddailyreturn_nodivs": 0,
          "weightedcumulativereturn_nodivs": 0,
          "weighteddailycashwithdivs":0,
          "totalweighteddailycashwithdivs":notional*weight,
          "cumulativeweightedreturn_withdivs":0,
          "weighteddailyreturn_withdivs":0,
        }];
    let arrayLength = data.length;
    let returnmade = 0;
    let returnmadewithdivs = 0;
    let totalweightedreturn =0;
    let dataoutput ={};
    let total = 0
    let totalreturnwithdivs = 0;
    let dailycash = 0;
    let dailycashwithdivs = 0;
    let totalcashwithdivs =notional;
    let totalcash = notional;
    let weighteddailycashreturn = notional*weight;
    let weighteddailyreturn = 0;
    let weighteddailycashwithdivs = 0;
    let weighteddailyreturn_withdivs = 0;
    let cumulativeweightedreturn_withdivs = 0;
    let totalweighteddailycashwithdivs = notional*weight;
    for (var i = 1; i < (arrayLength); i++) {
        // console.log(data[i].Date);
        returnmadewithdivs = 0;
        returnmade = 0;
        weighteddailyreturn = 0;
        weighteddailycashreturn = 0;
        weighteddailyreturn_withdivs = 0;
        if(parseFloat(data[i-1].NAV)!=0){

          //daily returns no divs
          returnmade = (parseFloat(data[i].NAV )- parseFloat(data[i-1].NAV))/parseFloat(data[i-1].NAV)*100;
          dailycash = totalcash*returnmade/100;
          weighteddailyreturn = returnmade*weight;
          weighteddailycashreturn = returnmade*weight*totalcash/100;

          // daily returns with divs
          if(data[i].dist_amount){
            returnmadewithdivs = (parseFloat(data[i].NAV) + parseFloat(data[i].dist_amount) - parseFloat(data[i-1].NAV))/parseFloat(data[i-1].NAV)*100;
            // returnmadewithdivs = (returnmadewithdivs +parseFloat(data[i].dist_amount)/parseFloat(data[0].NAV))*100;// div yield is different, yield based on initial
          }
          else{
            returnmadewithdivs = returnmade;
          }
          
          dailycashwithdivs = returnmadewithdivs*totalcashwithdivs/100
          weighteddailycashwithdivs = dailycashwithdivs*weight;
          weighteddailyreturn_withdivs = returnmadewithdivs*weight;
          // dailycashwithdivs = returnmadewithdivs*notional/100    

          //cumulative returns no divs
          total = total + returnmade;
          totalcash= totalcash + dailycash;
          totalweightedreturn = totalweightedreturn + weighteddailyreturn;

          //cumulative returns with divs
          totalreturnwithdivs = totalreturnwithdivs +returnmadewithdivs;
          totalcashwithdivs= totalcashwithdivs + dailycashwithdivs;
          totalweighteddailycashwithdivs = totalweighteddailycashwithdivs + weighteddailycashwithdivs;
          cumulativeweightedreturn_withdivs = cumulativeweightedreturn_withdivs + weighteddailyreturn_withdivs;
          // console.log(totalcashwithdivs);
          
        }
        dataoutput ={
          // "Date":stringToDateMapper(data[i].Date,"dd/mmm/yyyy","/"),
          "dailyreturn_nodivs":returnmade,
          "dailyreturn_withdivs":returnmadewithdivs,
          "dailycashreturn_nodivs":dailycash,
          "dailycashreturn_withdivs":dailycashwithdivs,
          "cumulativereturn_withdivs":totalreturnwithdivs,
          "cumulativereturn_nodivs":total,
          "cumulativecashreturn_nodivs":totalcash,
          "cumulativecashreturn_withdivs":totalcashwithdivs,
          "weighteddailyreturn_nodivs": weighteddailyreturn,
          "weightedcumulativereturn_nodivs": totalweightedreturn,
          "weighteddailycashwithdivs":weighteddailycashwithdivs,
          "totalweighteddailycashwithdivs":totalweighteddailycashwithdivs,
          "cumulativeweightedreturn_withdivs":cumulativeweightedreturn_withdivs,
          "weighteddailyreturn_withdivs":weighteddailyreturn_withdivs,
        }
        output.push(dataoutput);
        // console.log(returnmade);
        //Do something
    }

    return output.reverse()
}

function getCashReturn(data, notional){

    data = data.reverse()
    let output = [];
    let arrayLength = data.length;
    let returnmade = 0;
    let dataoutput ={};
    let dailycash = 0;
    let totalcash = parseFloat(notional);
    for (var i = 0; i < (arrayLength-1); i++) {
        returnmade = 0;
        if(parseFloat(data[i].NAV)!=0){
          returnmade = (parseFloat(data[i+1].NAV )- parseFloat(data[i].NAV))/parseFloat(data[i].NAV)*100;
          dailycash = totalcash*returnmade/100;
          totalcash= totalcash + dailycash;
        }
        dataoutput ={
          "Date":stringToDateMapper(data[i].Date,"dd/mmm/yyyy","/"),
          "dailyreturn":dailycash,
          "totalreturn":totalcash,
        }
        output.push(dataoutput);
        // console.log(returnmade);
        //Do something
    }

    return output.reverse()
}

function NAVComparison(data, quote){
  // console.log(data)
  // console.log(quote)
  let quotefactor = 1
  if(quote){
    quotefactor = quote;
  }
  let returndata = data.map(function(value){
    return {"Date": standardiseDate(value['Date']), "Price": parseFloat(value['Price'])/quotefactor}
  })

  console.log(returndata)
  return returndata
}

function portfolioreturn(portfolio){
    let output = [];
    for (var i = 0; i < portfolio.length; i++){

    }
}
export {standardDeviation, average, getReturn, stringToDateMapper, stringToDate, getCashReturn, portfolioreturn, NAVComparison}