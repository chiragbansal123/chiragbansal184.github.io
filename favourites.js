var meal_box = document.getElementById("display-meals");

var arrfavorites = localStorage.getItem('arrfavourites');
var  displayArr = [];

var mealID = "";
var mealTitle = "";
function addMealIdToLocal(meal_id,meal_title){
    console.log("Clicked to see more");
    localStorage.setItem('mealID', meal_id);
    localStorage.setItem('mealTitle', meal_title);
}

function removeFromfavorites(meal_id){
    var indexdisplayArr=displayArr.indexOf(meal_id);
    displayArr.splice(indexdisplayArr,1);
    let mid = document.getElementById(meal_id);
    console.log(mid);
    mid.parentNode.removeChild(mid);
    console.log(mid);
    localStorage.setItem('arrfavourites',displayArr);
    

    if(displayArr==null || displayArr.length==0){
        arrfavorites = [];
        localStorage.setItem('arrfavorites', arrfavorites);
        let html = `<div><h1>You Don't have any favorites yet.....!</h1></div>`;
        meal_box.innerHTML = html;
        localStorage.clear();
    }
}

function favoriteItemsPage(){
    if(arrfavorites==null||arrfavorites.length==0){
        let html = `<div><h1>You Don't have any favorites yet.....!</h1></div>`;
        meal_box .innerHTML = html;
    }
    else
    {
        let meal_id = "";
        for(let data of arrfavorites){
            if(data!=',')
                meal_id += data;
            else{
                displayArr.push(parseInt(meal_id));
                meal_id = "";
            }
        }
        displayArr.push(parseInt(meal_id));
        let html = "";
        for(let mealId of displayArr){
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
            .then((res) => res.json())
            .then((data) =>{
                console.log(data);
                
                html += `
                    <div class="card" id = "${data.meals[0].idMeal}" style="margin-left:4%;width: 18rem; margin-bottom:3%; border-radius: 30px; overflow:hidden">
                    <img src="${data.meals[0].strMealThumb}" class="card-img-top" alt="Meal App">
                    <div class="card-body" style="text-align:center">
                      <h5 class="card-title">${data.meals[0].strMeal}</h5>
                      <a href="details.html" id = "show-more" onclick="return addMealIdToLocal(${data.meals[0].idMeal},'${data.meals[0].strMeal}')" class="btn btn-primary">See More Details</a>
                      <button type = "submit" onclick = "removeFromfavorites(${data.meals[0].idMeal})" class="btn btn-primary" style="margin-top: 3%; ">Remove From Favorites</button>
                    </div>
                  </div>
                `;
                meal_box.innerHTML = html;
            });
           
        }
        
    
    }
}
