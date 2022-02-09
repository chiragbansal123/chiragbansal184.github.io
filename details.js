var detailsContainer=document.getElementById('container');
var mealId=localStorage.getItem('mealID');
var mealtitle=localStorage.getItem('mealTitle');
console.log(mealId+" "+mealtitle);

function detailsPage(){
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(res => res.json())
    .then(data =>{
        let innerdata="";
        innerdata+=
        `<div id="detailsContainer" style="width:fit-content;height:fit-content;border:1px solid black;margin-top:1.5%;background-color:lightgrey;color:black;margin-left:10%;margin-right:13%">
        <h3 style="text-align:center"> Showing the details of ${data.meals[0].strMeal}</h3>
        <div id="image" style="text-align:center">
        <img src="${data.meals[0].strMealThumb}" alt="Meal Image" style="width:20rem;height:14rem;>
        </div>
        <div id="detailsBody" style="text-align:justify">
        <h5 style="font-size:1.5rem">${mealtitle}</h5>
        <p style="padding:2%;font-family:cursive">${data.meals[0].strInstructions}</p>
        <p><small>Youtube: <a href ="${data.meals[0].strYoutube}"> Click here to watch on Youtube</a></small></p>
        </div>
        </div>`
        detailsContainer.innerHTML=innerdata;


    })

}