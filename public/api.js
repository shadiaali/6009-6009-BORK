(function(){
    "use strict";
    console.log("seaf has fired");

function showUser() {
    var url = "http://localhost:3000/api/bork"

    fetch(url)
    .then(function(response){
        return response.json();
    }).then(function(bork){
        console.log(bork);


    for(var i=0; i < bork.length; i++) {
document.querySelector("#borkList").innerHTML +=
'<div class="card"><div class="card-body"><h3><img src="images/Icon material-pets.svg" style="width:30px;" alt="devices icon">'  + bork[i].name + '</h3></div><div class="card-footer"><div class="row d-flex justify-content-center"><div class="col-4 d-flex justify-content-center"><img src="images/'  + bork[i].image_url + '" style="height:150px;"></div><div class="col-8"><ul class="list-group list-group-flush"><li class="list-group-item"><span class="grey-text">Life Expectancy: </span>'  + bork[i].life_expectancy + '</li><li class="list-group-item"><span class="grey-text">Dog Group: </span>' + bork[i].group + '</li><li class="list-group-item"><span class="grey-text">Bio: </span>'  + bork[i].bio + '</li></ul></div></div></div></div>'


                
}
    }).catch(function(error){
        console.log(error);
    });
}


showUser();


})();