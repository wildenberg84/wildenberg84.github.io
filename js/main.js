"use strict"

var searchTermsMap = new Map();
searchTermsMap.set('github', 'https://github.com/wildenberg84');
searchTermsMap.set('youtube', 'https://www.youtube.com/channel/UCsQK1Ux9fd5m-iOLlaPjomw?view_as=subscriber');


function init(){
	startTimer();
	hookSearchBar();
	hookSearchBtn();
}

function hookSearchBtn(){
	var searchBtn = document.querySelector('#go');
	searchBtn.addEventListener('click', search);
}

function hookSearchBar(){
	var searchBar = document.querySelector("#searchBar");
	searchBar.addEventListener('focus', function(){
			searchBar.style.width = "30vw";
		});
		
	searchBar.addEventListener('blur', function(){
			if(searchBar.value == ""){
				searchBar.style.width = "12vw";
			}
		});
		
	searchBar.addEventListener('keypress', search);
}


function updateTime(){
	Date.prototype.getWeek = function() {
		var onejan = new Date(this.getFullYear(), 0, 1);
		return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
	}
		
	let now = new Date();
	let date = now.getDate() + '-' + (now.getMonth()+1) + '-' + now.getFullYear();
	
	let seconds = now.getSeconds();
	let minutes = now.getMinutes();
	let hours = now.getHours();
	
	let time;
	if(seconds < 10){
		seconds = "0" + seconds;
	}
	if(minutes < 10){
		minutes = "0" + minutes;
	}
	if(hours < 10){
		hours = "0" + hours;
	}
	
	time = hours + ":" + minutes + ":" + seconds;
	
	document.getElementById("date").innerHTML = now.toLocaleDateString();
	document.getElementById("time").innerHTML = time;
	
	let weekNumber = now.getWeek();	
	document.getElementById("weekNumber").innerHTML = "week " + weekNumber;
	
}

function startTimer(){
	updateTime(); // immediately set display value
	setInterval(updateTime, 500);
}

function search(evt){	
	var term = searchBar.value;
			
	if(
		(
			(evt.target.id == 'searchBar' && evt.key == 'Enter') || (evt.target.id == 'go' && evt.button == 0)
		) 
			&& term != ''){
		
		if(!searchTermsMap.has(term.toLowerCase())){			
			window.open('https://www.google.com/search?q=' + term);
		}else{
			window.open(searchTermsMap.get(term));
		}
		
		searchBar.value = '';
		document.activeElement.blur(); // does not trigger a blur event
		searchBar.dispatchEvent(new Event('blur')); // so dispatch one
	}
}