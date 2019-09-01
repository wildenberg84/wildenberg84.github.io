"use strict"

// TODO: refactor code

var searchTermsMap = new Map();
searchTermsMap.set('github', 'https://github.com/wildenberg84');
searchTermsMap.set('youtube', 'https://www.youtube.com/channel/UCsQK1Ux9fd5m-iOLlaPjomw?view_as=subscriber');
searchTermsMap.set('codepen', 'https://codepen.io/wildenberg84/#');

var activeMenuItem;
var noIconImg = 'data:image/png;base64,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';

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
		let link1 = localStorage['link1'];
		let link2 = localStorage['link2'];
		let link3 = localStorage['link3'];
		let link4 = localStorage['link4'];
		
		if(link1 != undefined){
			link1 = JSON.parse(link1); // either check the storage or catch SyntaxError from JSON
			document.querySelector('#link1').src = link1[0];			
			document.querySelector('#link1').title = link1[1];
			document.querySelector('#link1HREF').href = link1[2];
		
			if(link1[3] == true){
				document.querySelector('#link1HREF').target = '_blank';
			}else{
				document.querySelector('#link1HREF').target = '_self';	
			}
		}else{
			document.querySelector('#link1').classList.add('nolink');
		}
		
		if(link2 != undefined){
			link2 = JSON.parse(link2);
			
			document.querySelector('#link2').src = link2[0];			
			document.querySelector('#link2').title = link2[1];
			document.querySelector('#link2HREF').href = link2[2];
			
			if(link2[3] == true){
				document.querySelector('#link2HREF').target = '_blank';				
			}else{
				document.querySelector('#link2HREF').target = '_self';	
			}
		}else{
			document.querySelector('#link2').classList.add('nolink');
		}
		
		if(link3 != undefined){
			link3 = JSON.parse(link3);
			
			document.querySelector('#link3').src = link3[0];			
			document.querySelector('#link3').title = link3[1];
			document.querySelector('#link3HREF').href = link3[2];

			if(link3[3] == true){
				document.querySelector('#link3HREF').target = '_blank';				
			}else{
				document.querySelector('#link3HREF').target = '_self';	
			}
		}else{
			document.querySelector('#link3').classList.add('nolink');
		}
		
		if(link4 != undefined){
			link4 = JSON.parse(link4);
			
			document.querySelector('#link4').src = link4[0];			
			document.querySelector('#link4').title = link4[1];
			document.querySelector('#link4HREF').href = link4[2];
			
			if(link4[3] == true){
				document.querySelector('#link4HREF').target = '_blank';				
			}else{
				document.querySelector('#link4HREF').target = '_self';	
			}
		}else{
			document.querySelector('#link4').classList.add('nolink');
		}
		
		document.querySelector('#quickLinks').style.display = 'flex'; // fixes loading issues -- alternative : inject code instead
			
	} else {
		document.querySelector('#quickLinks').style.display = 'none'; // fail-safe -- should be in the css
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
		
		if(document.querySelector('#linkIcon').src == './images/noicon.png'){
			iconImg = noIconImg;
		}else{
			iconImg = document.querySelector('#linkIcon').src;
		}
		
		localStorage[activeMenuItem.id] = JSON.stringify([iconImg, document.querySelector('#descr').value, document.querySelector('#url').value, document.querySelector('#newTab').checked]);
		
		activeMenuItem.src = iconImg;
		activeMenuItem.title = document.querySelector('#descr').value;
		document.querySelector('#' + activeMenuItem.id + 'HREF').href = document.querySelector('#url').value;
		
		if(document.querySelector('#newTab').checked){
			document.querySelector('#' + activeMenuItem.id + 'HREF').target = '_blank';
		}else{
			document.querySelector('#' + activeMenuItem.id + 'HREF').target = '';
		}
		
		document.querySelector('#descr').value = '';
		document.querySelector('#url').value = 'https://';					
		document.querySelector('#linkIcon').src = './images/noicon.png';
		document.querySelector('#newTab').checked = false;
		
		if(activeMenuItem.classList.contains('nolink')){
			activeMenuItem.classList.toggle('nolink');
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
	
	if(activeMenuItem.classList.contains('nolink')){
		document.querySelectorAll('.menuItem').forEach((item) => {
			if(item.dataset.value != 'add'){
				item.style.display = 'none';
			}else{
				item.style.display = '';
			}
		});
	}else{
		document.querySelectorAll('.menuItem').forEach((item) => {
			if(item.dataset.value == 'add'){
				item.style.display = 'none';
			}else{
				item.style.display = '';
			}
		});		
	}
	
	ctxMenu.style.display = 'block';
  
	ctxMenu.style.left = event.pageX + 'px';
	ctxMenu.style.top = (event.pageY - ctxMenu.offsetHeight) + 'px';
  
	event.stopPropagation(); // prevent any parent element from getting the event
	event.preventDefault(); // disable the default behavior of the contextmenu event
}

function hideCtxMenu(){
	ctxMenu.style.display = 'none';
}

function processClick(event){
	if(event.target.classList.contains('link') && event.target.classList.contains('nolink')){
		activeMenuItem = event.target;
		document.querySelector('#url').value = 'https://';
		document.querySelector('#editMenuItem').style.display = 'flex';
		
		event.stopPropagation(); // prevent any parent element from getting the event
		event.preventDefault(); // disable the default behavior of the contextmenu event
	}
	
	if(event.target.classList.contains('menuItem')){
		var task = event.target.dataset.value;
		
		// Menu item edit
		switch(task){
			case 'edit': 
				document.querySelector('#descr').value = activeMenuItem.getAttribute('title');
				
				if(document.querySelector('#' + activeMenuItem.id + 'HREF').getAttribute('href') == ''){
					document.querySelector('#url').value = 'https://';
				}else{
					document.querySelector('#url').value = document.querySelector('#' + activeMenuItem.id + 'HREF').getAttribute('href');
				}
					
				document.querySelector('#linkIcon').src = activeMenuItem.getAttribute('src');
				
				if(document.querySelector('#' + activeMenuItem.id + 'HREF').target == '_blank'){
					document.querySelector('#newTab').checked = true;
				}else{
					document.querySelector('#newTab').checked = false;
				}
				
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
				
				document.querySelector('#descr').value = '';
				document.querySelector('#url').value = 'https://';					
				document.querySelector('#linkIcon').src = './images/noicon.png';
				document.querySelector('#newTab').checked = false;
				
				if(!activeMenuItem.classList.contains('nolink')){
					activeMenuItem.classList.toggle('nolink');
				}
				
				hideCtxMenu();
				break;
			case 'add':
				document.querySelector('#url').value = 'https://';
				document.querySelector('#editMenuItem').style.display = 'flex';
				
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