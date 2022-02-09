// var imagediv=document.createElement('div');
var searchbox = document.getElementById('searchbox');
searchbox.addEventListener("keypress", function () {
    getResults(searchbox.value);
});
var results = document.getElementById('showing-results');
var mealID = "";
var mealTitle = "";
var arr=[];
function favorites(meal_id,meal_title)
{
     arr.push(meal_id);
     localStorage.setItem('arrfavourites', arr);
     console.log(meal_id);
    alert(`Your ${meal_title} Successfully add to favorites`);
}

var mealID = "";
var mealTitle = "";
function addMealIdToLocal(meal_id,meal_title){
    localStorage.setItem('mealID', meal_id);
    localStorage.setItem('mealTitle', meal_title);
}
function getResults(searchvalue) {
    console.log(searchvalue);
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchvalue}`)
        .then(res => res.json())
        .then(data => {
            let innerdata = "";
            console.log(data);
            if (data.meals) {
                data.meals.forEach(meal => {
                    innerdata += `
                <div class="card" id ="${meal.idMeal}" style="width: 20rem; margin-bottom:3%;overflow:hidden;height:13%" >
                <img src="${meal.strMealThumb}" class="card-img-top" alt="Meal App">
                <div class="card-body" style="text-align:center">
                  <h5 class="card-title">${meal.strMeal}</h5>
                  
                  <a href="details.html" id = "show-more" onclick="return addMealIdToLocal(${meal.idMeal},'${meal.strMeal}')" class="btn btn-primary">See More Details</a>
                  <button id="favourites" type = "submit" onclick = "favorites(${meal.idMeal},'${meal.strMeal}')" class="btn btn-primary" style="margin-top: 3%; ">Add To Favourites</button>
                </div>
              </div>
                `;
                });
            } else {
                innerdata = `<h3 >Sorry! We Did'nt find anything related to "<b style="color:red;">${searchvalue}</b>"</h3>`;
            }

            results.innerHTML = innerdata;
        })
}

