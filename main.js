
function getParks(){
    let apiKey = "xMCkYGaWrywCCuG6ZBcSY1dKAEtgFEygsdaaACcm";
    let str = $('.states').val()
    let states = str.split(' ');
    let choosenStates = multiStates(states);
    let maxResults = $('.maxResults').val()
    console.log(choosenStates)
  fetch(`https://developer.nps.gov/api/v1/parks?${choosenStates}&limit=${maxResults}&api_key=${apiKey}`)
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.total > 0){
        parkList(responseJson)
      } else {
        alert("No parks were found")
      }
    })
    .catch(error => console.log(error));
  }

function multiStates(arr){
  let stateA = [];
  for (i = 0; i < arr.length; i++){
    stateA.push(`stateCode=${arr[i]}`)
  }
  return stateA.join('&')
}


  function formSubmit(){
    $('.submit').submit(event => {
      event.preventDefault();
      getParks();
    })
  }


function parkList(obj){
  $('.resultList').empty();
  for (let i = 0; i < obj.data.length; i++){
    $('.resultList').append(`<li><ul><li>${obj.data[i].fullName}</li><li>${obj.data[i].description}</li><li><a href="${obj.data[i].url}">${obj.data[i].url}</a></li></ul></li>`)
  }
}
$(formSubmit)
