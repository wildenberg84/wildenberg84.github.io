"use strict"

// TODO: refactor code

var searchTermsMap = new Map();
searchTermsMap.set('github', 'https://github.com/wildenberg84');
searchTermsMap.set('youtube', 'https://www.youtube.com/channel/UCsQK1Ux9fd5m-iOLlaPjomw?view_as=subscriber');
searchTermsMap.set('codepen', 'https://codepen.io/wildenberg84/#');

var activeMenuItem;

function init(){
	startTimer();
	
	hookSearchBar();
	hookSearchBtn();
	hookEditMenu();
	hookSaveBtn();
	hookIconUpload();
	
	initCtxMenu();
	loadQuickLinks();
}


function hookIconUpload(){
	// click on icon
	document.querySelector('#linkIcon').addEventListener('click', (event) => {
			document.querySelector('#iconUpload').click();
		}
	);
		
	document.querySelector('#iconUpload').addEventListener('change', (event) => {
			var img = document.querySelector('#linkIcon');
			var file = document.querySelector('#iconUpload').files[0];
			
			// check if valid image file
			if(!checkValidImageType(file.type)){
				alert('Invalid image type!');
				return false;
			}else{			
				// asynch load image
				getImgFile(img, file);
			}
		}
	);
	
	// drag / drop from desktop
	var img = document.querySelector('#linkIcon');

	img.addEventListener('dragover', function handleDragOver(evt) {
	  evt.stopPropagation();
	  evt.preventDefault();
	  evt.dataTransfer.dropEffect = 'copy';
	  });

	img.addEventListener('drop', function(evt) {
		evt.stopPropagation();
		evt.preventDefault();
		var files = evt.dataTransfer.files;  // FileList object.
		var file = files[0];                // File     object.
		
		// asynch load image
		getImgFile(img, file);
	});
}

const toBase64 = file => new Promise((resolve, reject) => {
	const reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = () => resolve(reader.result);
	reader.onerror = error => reject(error);
});

async function getImgFile(imgElem, file) {
	// NOTE storage is limited, it's highly adviced to check the file's size and other limitations
	imgElem.src = await toBase64(file);;
}


// type parameter is full file.type
function checkValidImageType(type){
	var validTypes = ['apng', 'bmp', 'gif', 'x-icon', 'jpeg', 'png', 'svg+xml', 'tiff', 'webp'];
	var imgType = type.substring(6); // cuts off 'image/'
	
	if(validTypes.includes(imgType)){
		return true;
	}else{
		return false;
	}
}

function loadQuickLinks(){
	if (storageAvailable('localStorage')) {
		if(localStorage['link1'] == undefined){
			// no links to load
		}else{
			let link1 = localStorage['link1'];
			let link2 = localStorage['link2'];
			let link3 = localStorage['link3'];
			let link4 = localStorage['link4'];
			
			
			if(link1 != undefined){
				link1 = JSON.parse(link1); // either check the storage or catch SyntaxError from JSON
				document.querySelector('#link1').src = link1[0];
				if(document.querySelector('#link1').src = './images/noicon.png'){
					document.querySelector('#link1').classList.toggle('empty');
				}
				
				document.querySelector('#link1').alt = link1[1];
				document.querySelector('#link1HREF').href = link1[2];
			
				if(link1[3] == true){
					document.querySelector('#link1HREF').target = '_blank';
				}else{
					document.querySelector('#link1HREF').target = '_self';	
				}
			}
			
			if(link2 != undefined){
				link2 = JSON.parse(link2);
				
				document.querySelector('#link2').src = link2[0];
				if(document.querySelector('#link2').src = './images/noicon.png'){
					document.querySelector('#link2').classList.toggle('empty');
				}
				
				document.querySelector('#link2').alt = link2[1];
				document.querySelector('#link2HREF').href = link2[2];
				
				if(link2[3] == true){
					document.querySelector('#link2HREF').target = '_blank';				
				}else{
					document.querySelector('#link2HREF').target = '_self';	
				}
			}
			if(link3 != undefined){
				link3 = JSON.parse(link3);
				
				document.querySelector('#link3').src = link3[0];
				if(document.querySelector('#link3').src = './images/noicon.png'){
					document.querySelector('#link3').classList.toggle('empty');
				}
				
				document.querySelector('#link3').alt = link3[1];
				document.querySelector('#link3HREF').href = link3[2];

				if(link3[3] == true){
					document.querySelector('#link3HREF').target = '_blank';				
				}else{
					document.querySelector('#link3HREF').target = '_self';	
				}
			}
			if(link4 != undefined){
				link4 = JSON.parse(link4);
				
				document.querySelector('#link4').src = link4[0];
				if(document.querySelector('#link4').src = './images/noicon.png'){
					document.querySelector('#link4').classList.toggle('empty');
				}
				
				document.querySelector('#link4').alt = link4[1];
				document.querySelector('#link4HREF').href = link4[2];
				
				if(link4[3] == true){
					document.querySelector('#link4HREF').target = '_blank';				
				}else{
					document.querySelector('#link4HREF').target = '_self';	
				}
			}
		}
	} else {
		document.querySelector('#quickLinks').style.display = 'none';
	}
}

// from https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

function hookSaveBtn(){
	document.querySelector('#saveBtn').addEventListener('click', save);
}

function save(){
	try{
		var iconImg = undefined;
		
		if(activeMenuItem.classList.contains('empty')){
			activeMenuItem.classList.toggle('empty');
			iconImg = './images/noicon.png';
		}else{
			iconImg = document.querySelector('#linkIcon').src;
		}
		
		localStorage[activeMenuItem.id] = JSON.stringify([iconImg, document.querySelector('#descr').value, document.querySelector('#url').value, document.querySelector('#newTab').checked]);
		
		activeMenuItem.src = iconImg;
		activeMenuItem.alt = document.querySelector('#descr').value;
		document.querySelector('#' + activeMenuItem.id + 'HREF').href = document.querySelector('#url').value;
		
		if(document.querySelector('#newTab').checked){
			document.querySelector('#' + activeMenuItem.id + 'HREF').target = '_blank';
		}else{
			document.querySelector('#' + activeMenuItem.id + 'HREF').target = '';
		}
	} catch(error){
		alert(error);
	}
	
	activeMenuItem = undefined;
	document.querySelector('#editMenuItem').style.display = 'none';
}


function hookEditMenu(){
	document.querySelector('#close').addEventListener('click', function(evt){
		activeMenuItem = undefined;
			
		var editMenu = document.querySelector('#editMenuItem');
		editMenu.style.display = 'none';
	});
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

function showCtxMenu(){};

function hideCtxMenu(){
	ctxMenu.style.display = 'none';
}

function processClick(event){
	if(event.target.classList.contains('link') && event.target.classList.contains('empty')){
		// simulate contextmenu event
		alert('implement contextmenu event');
	}
	
	if(event.target.classList.contains('menuItem')){
		var task = event.target.dataset.value;
		
		// Menu item edit
		switch(task){
			case 'edit': 
				document.querySelector('#descr').value = activeMenuItem.getAttribute('alt');
				
				if(document.querySelector('#' + activeMenuItem.id + 'HREF').getAttribute('href') == ''){
					document.querySelector('#url').value = 'https://';
				}else{
					document.querySelector('#url').value = document.querySelector('#' + activeMenuItem.id + 'HREF').getAttribute('href');
				}
					
				document.querySelector('#linkIcon').src = activeMenuItem.getAttribute('src');
				document.querySelector('#newTab').checked = document.querySelector('#' + activeMenuItem.id + 'HREF').checked;
				document.querySelector('#editMenuItem').style.display = 'flex';
				
				hideCtxMenu();
				break;
			case 'remove': 
				localStorage.removeItem(activeMenuItem.id);
				activeMenuItem.classList.toggle('empty');
				
				document.querySelector('#' + activeMenuItem.id).src = 'images/addlink.png';
				document.querySelector('#' + activeMenuItem.id).alt = '';
				document.querySelector('#' + activeMenuItem.id + 'HREF').href = '';
				document.querySelector('#' + activeMenuItem.id + 'HREF').target = '';	
				
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