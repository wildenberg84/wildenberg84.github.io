"use strict"

var searchTermsMap = new Map();
searchTermsMap.set('github', 'https://github.com/wildenberg84');
searchTermsMap.set('youtube', 'https://www.youtube.com/channel/UCsQK1Ux9fd5m-iOLlaPjomw?view_as=subscriber');

var activeMenuItem;

function init(){
	startTimer();
	hookSearchBar();
	hookSearchBtn();
	initCtxMenu();
}


function initCtxMenu(){
	window.ctxMenu = document.querySelector('#btnMenu');
	
	var links = document.querySelectorAll('.link')
	
	links.forEach(function(link){
		link.addEventListener('contextmenu', showCtxMenu);
	});
	
	document.addEventListener('click', processClick);
	document.addEventListener('contextmenu', processClick);
	
	window.addEventListener('resize', hideCtxMenu);
}

function showCtxMenu(event){
	activeMenuItem = event.target;
	ctxMenu.style.display = 'block';
  
	ctxMenu.style.left = event.pageX + 'px';
	ctxMenu.style.top = (event.pageY - ctxMenu.offsetHeight) + 'px';
  
	event.stopPropagation(); // prevent any parent element from getting the event
	event.preventDefault(); // disable the default behavior of the contextmenu event
}

function hideCtxMenu(){
	activeMenuItem = undefined;
	ctxMenu.style.display = 'none';
}

function processClick(event){
	if(event.target.classList.contains('menuItem')){
		var task = event.target.dataset.value;
		
		// add settings to localStorage
		// use default if not stored already
		switch(task){
			case 'edit': 
				document.querySelector('#editMenuItem').style.display = 'flex';
				hideCtxMenu();
				break;
			case 'remove': 
				activeMenuItem.style.display = 'none';
				hideCtxMenu();
				break;
			default: break;
		}
	}else{
		// click is not on a context menu item
		hideCtxMenu();
	}
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
		
	var now = new Date();
	var date = now.getDate() + '-' + (now.getMonth()+1) + '-' + now.getFullYear();
	
	var seconds = now.getSeconds();
	var minutes = now.getMinutes();
	var hours = now.getHours();
	
	var time;
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
	
	var weekNumber = now.getWeek();	
	document.getElementById("weekNumber").innerHTML = "week " + weekNumber;
	
}

function startTimer(){
	updateTime(); // immediately set display value
	setInterval(updateTime, 500);
}

function search(event){	
	var term = searchBar.value;
			
	if(
		(
			(event.target.id == 'searchBar' && event.key == 'Enter') || (event.target.id == 'go' && event.button == 0)
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