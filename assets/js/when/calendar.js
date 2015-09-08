	var startDate;
	function switchToWeekView(weekClicked){
		$('#'+weekClicked).addClass('weekView');
		var weekDiv = document.getElementById(weekClicked);
		var i=0;
		var days=weekDiv.childNodes;
		while(i<7){
		var morningDiv = document.createElement('div');
		morningDiv.setAttribute('class','morningDiv');
		morningDiv.innerHTML= 'Morning';
		addHours(morningDiv,3);
		days[i].appendChild(morningDiv);
		var middayDiv = document.createElement('div');
		middayDiv.setAttribute('class','middayDiv');
		middayDiv.innerHTML= 'Midday';
		addHours(middayDiv,11);
		days[i].appendChild(middayDiv);
		var eveningDiv = document.createElement('div');
		eveningDiv.setAttribute('class','eveningDiv');
		eveningDiv.innerHTML= 'Evening';
		addHours(eveningDiv,7);
		days[i].appendChild(eveningDiv);
		i++;
		}
	}
			function addHours(period,when){
			j=when;k=0;
		while(k<8){
		var amDiv = document.createElement('div');
		amDiv.setAttribute('class','hour');
		amDiv.innerHTML = j;
		period.appendChild(amDiv);
			if(j==12){j=0};
			k++;
			j++;
		}
		}

$(document).ready(function() {
   $.localScroll({
   	duration:800,
   	target:'#datepicker',
   	lazy:true,
   	hash:false
   	});
   $('#monthList a').click(function(){
   	var month = Date.parse(this.firstChild.id);
   	 while (month.compareTo(startDate)==1){
   	 	createMonth(startDate);
   	 }
   	var earliestDayID = document.getElementById('calendarTable').firstChild.firstChild.id; //get the date of the first child day of the first child week of the calendarTable
	var earliestDay = Date.parse(earliestDayID);
	 while (month.compareTo(earliestDay)==-1){
	 createPastWeek();
	 earliestDayID = document.getElementById('calendarTable').firstChild.firstChild.id;
	 earliestDay = Date.parse(earliestDayID);
	}
    });
   function getDateID(date){
   		console.log(date);
		var dayNumber = date.toString('dd');	
		var monthNumber = date.toString('MM');
		yearNumber = date.toString('yyyy');
		var fullDateClass = '#'+yearNumber+'-'+monthNumber+'-'+dayNumber;
		return fullDateClass;
   }
   	$('#today').hover(function(){
   		$('.today').toggleClass('hover');
   	})
   	$('#tomorrow').hover(function(){
		$(getDateID(Date.today().addDays(1))).toggleClass('hover');
   	})
   	$('#thisWeekend').hover(function(){
   		$(getDateID(Date.today().saturday())).toggleClass('hover');
   		$(getDateID(Date.today().sunday())).toggleClass('hover');
   	})
   	$('#nextWeek').hover(function(){
   		$(getDateID(Date.today().monday().next())).toggleClass('hover');
   		$(getDateID(Date.today().tuesday().next())).toggleClass('hover');
   		$(getDateID(Date.today().wednesday().next())).toggleClass('hover');
   		$(getDateID(Date.today().thursday().next())).toggleClass('hover');
   		$(getDateID(Date.today().friday().next())).toggleClass('hover');
   	})
   	$('#nextWeekend').hover(function(){
   		$(getDateID(Date.today().saturday().addDays(7))).toggleClass('hover');
   		$(getDateID(Date.today().sunday().addDays(7))).toggleClass('hover');
   	})
   		$('tr').click(function(){
		console.log(this.id);
		switchToWeekView(this.id);
	})
});
	var lastPixelTop = "";
if (Date.today().is().monday()){startDate = Date.today().last().monday().addDays(-1)} 
else {startDate = Date.today().last().week().last().monday().addDays(-1)}

function createWeek(startDate){
	var weekNumber = startDate.getISOWeek();
	var yearNumber = startDate.toString('yyyy');
	var week = document.createElement('tr');
	var weekID = yearNumber+'week'+weekNumber;
	week.setAttribute('id', weekID);
	document.getElementById('calendarTable').appendChild(week);
	// document.getElementById('yearDiv').innerHTML = yearNumber;
	var i = 0;
	while (i<7){
		var date = startDate.addDays(1); 
		var dayNumber = date.toString('dd');
		var dayName = date.toString('dddd');
		var dayLetter = dayName.charAt(0);
		var monthNumber = date.toString('MM');
		var monthName = date.toString('MMMM');
		yearNumber = date.toString('yyyy');
		function isOdd(num) { return num % 2;};
		var monthClass = 'evenMonth'
		if (isOdd(monthNumber*1)) {
			monthClass = 'oddMonth';
		};
		var fullDate = yearNumber+'-'+monthNumber+'-'+dayNumber;
		var day = document.createElement('td');
		var dayClass = dayName+' picker-day '+monthClass;
				if (Date.today().compareTo(date)==0) {
					dayClass = dayClass+' today';
					document.getElementById('todaylink').setAttribute('href','#'+fullDate);
				};
				if (Date.today().compareTo(date)==1) {
					dayClass = dayClass+' past-day';
				}
		day.setAttribute('class',dayClass);
		day.setAttribute('id',fullDate);
		var linkAnchor = document.createElement('a');
		linkAnchor.setAttribute('name',fullDate);
		var dayDiv = document.createElement('div');
		dayDiv.setAttribute('class','dayDiv');
		var monDiv = document.createElement('div');
		monDiv.setAttribute('class','monDiv');
		var dayLetterDiv = document.createElement('div');
		dayLetterDiv.setAttribute('class','dayLetterDiv');
		document.getElementById(weekID).appendChild(day);
		var dateBox = document.getElementById(fullDate)
		dateBox.appendChild(linkAnchor);
		dateBox.appendChild(monDiv);
		dateBox.appendChild(dayDiv);
		dateBox.appendChild(dayLetterDiv);
		monDiv.innerHTML = monthName;
		dayDiv.innerHTML = dayNumber;
		dayLetterDiv.innerHTML = dayLetter;
		i++;
	}
}

function createMonth(startDate){
	var j = 0;
	while (j<8){
		createWeek(startDate);
		j++;
	}
}

function createPastWeek(){
	var earliestWeek = document.getElementById('calendarTable').firstElementChild;
	var earliestDayID = document.getElementById('calendarTable').firstElementChild.firstChild.id; //get the date of the first child day of the first child week of the calendarTable
	var earliestDay = Date.parse(earliestDayID);
	var pastStartDate = earliestDay.last().monday().addDays(-1)
	// document.getElementById('yearDiv').innerHTML = pastStartDate;

	var weekNumber = pastStartDate.getISOWeek();
	var yearNumber = pastStartDate.toString('yyyy');
	var week = document.createElement('tr');
	var weekID = yearNumber+'week'+weekNumber;
	week.setAttribute('id', weekID);
	// $('#datepicker').prepend(week);
	// document.getElementById('calendarTable').insertRowBefore(0, week);

	earliestWeek.parentNode.insertBefore(week, earliestWeek);
	// document.getElementById('calendarTable').appendChild(week);

	var i = 0;
	while (i<7){
		var date = pastStartDate.addDays(1); 
		var dayNumber = date.toString('dd');
		var dayName = date.toString('dddd');
		var dayLetter = dayName.charAt(0);
		var monthNumber = date.toString('MM');
		var monthName = date.toString('MMMM');
		yearNumber = date.toString('yyyy');
		function isOdd(num) { return num % 2;};
		var monthClass = 'evenMonth'
		if (isOdd(monthNumber*1)) {
			monthClass = 'oddMonth';
		};
		var fullDate = yearNumber+'-'+monthNumber+'-'+dayNumber;
		var day = document.createElement('td');
		var dayClass = dayName+' picker-day '+monthClass;
				if (Date.today().compareTo(date)==0) {
					dayClass = dayClass+' today';
					document.getElementById('todaylink').setAttribute('href','#'+fullDate);
				};
				if (Date.today().compareTo(date)==1) {
					dayClass = dayClass+' past-day';
				}
		day.setAttribute('class',dayClass);
		day.setAttribute('id',fullDate);
		var linkAnchor = document.createElement('a');
		linkAnchor.setAttribute('name',fullDate);
		var dayDiv = document.createElement('div');
		dayDiv.setAttribute('class','dayDiv');
		var monDiv = document.createElement('div');
		monDiv.setAttribute('class','monDiv');
		var dayLetterDiv = document.createElement('div');
		dayLetterDiv.setAttribute('class','dayLetterDiv');
		document.getElementById(weekID).appendChild(day);
		var dateBox = document.getElementById(fullDate)
		dateBox.appendChild(linkAnchor);
		dateBox.appendChild(monDiv);
		dateBox.appendChild(dayDiv);
		dateBox.appendChild(dayLetterDiv);
		monDiv.innerHTML = monthName;
		dayDiv.innerHTML = dayNumber;
		dayLetterDiv.innerHTML = dayLetter;
		i++;
	}
}

function initialPastMonth(){
	var i=0;
	while(i<4){
		createPastWeek();
		i++;
	}
	var xstartDate
if (Date.today().is().sunday()){xstartDate = Date.today().last().sunday()} 
else {xstartDate = Date.today().last().week().last().sunday()}
	// window.location.hash = xstartDate.toString('yyyy')+'-'+xstartDate.toString('MM')+'-'+xstartDate.toString('dd');
	window.location.hash = Date.today().toString('yyyy')+'-'+Date.today().toString('MM')+'-'+Date.today().toString('dd');
}
function pageDatepicker(){
	var pixels = $("#calendarTable").height();
	var pixelTop = $("#datepicker").scrollTop();
	var page = window.innerHeight;
	document.getElementById('yearDiv').innerHTML= 'pixels = '+pixels+' pixelTop = '+pixelTop
	 if (pixels-pixelTop*1<page*1) {
		createMonth(startDate)
	};
	if (pixelTop*1<4 && pixelTop<lastPixelTop){
		createPastWeek();
	}
	lastPixelTop = pixelTop;
}


function createYear(){
	var monthBox = document.getElementById('monthList'); //get the container
	 var startMonth = Date.today().add(-3).months();//get the current month minus three.
	var k = 0;
	while (k<12){
		var month = document.createElement('li'); //create a new list item
		month.setAttribute('class','key'); //set the class to "key"
		month.innerHTML = startMonth.toString('MMM');
		month.setAttribute('id',startMonth.toString('MMM')+"-"+startMonth.toString('yyyy')); //set the id to the year and the month
		if (startMonth.toString('MMM')==Date.today().toString('MMM')){
		month.setAttribute('class','key today');
		} //check if it's this month and apply active class
		var monthLink = document.createElement('a');
		monthLink.setAttribute('href','#'+startMonth.toString('yyyy')+'-'+startMonth.toString('MM')+'-01')
		monthLink.appendChild(month);
		monthBox.appendChild(monthLink);
		startMonth.addMonths(1); //add a month to current month
		k++;
	}

}

// function getEvents(){
	// $.get('json/2013-02/month.json', function(data) {
  // alert(data);
  // var day = Date.parse(data.events[0].event['iso-date']);
  // var eventDate = day.toString('yyyy-MM-dd');
  // alert(eventDate);

  		var d=0;
 	function makeEventDay(date1,data){
 		// alert(date1);
 		var eventDate = date1.toString('yyyy-MM-dd');
 		var dayEventContainer = document.createElement('div');
 		dayEventContainer.setAttribute('class',Date.parse(date1).toString('ddd')+' day');
 		document.getElementById(Date.parse(eventDate).toString('yyyy-MM')+'-events').appendChild(dayEventContainer);
 		var dayEventSpan = document.createElement('span');
 		dayEventSpan.setAttribute('class','date-display-single');
 		dayEventSpan.innerHTML = Date.parse(date1).toString('dddd');
 		dayEventContainer.appendChild(dayEventSpan);

  		var clonedEventSpan = document.createElement('span');
  		clonedEventSpan.setAttribute('class','date-display-single floatingHeader');
  		clonedEventSpan.innerHTML = Date.parse(date1).toString('dddd');
  		dayEventContainer.appendChild(clonedEventSpan);
	// $('.day').each(function(){
	// 	clonedHeaderRow = $('.date-display-single', this);
	// 	clonedHeaderRow
	// 		.before(clonedHeaderRow.clone())
	// 		.addClass('floatingHeader');

	// });

 		 while(Date.parse(data.events[d].event['iso-date']).toString('yyyy-MM-dd') == eventDate){
  		var inlineEventContainer = document.createElement('div');
  		inlineEventContainer.setAttribute('class','inline-event-container');
  		var topThird = document.createElement('div');
  		topThird.setAttribute('class','top-third');
  		var whenInlineBlock = document.createElement('div');
  		whenInlineBlock.setAttribute('class','when inline-block');
 		 whenInlineBlock.innerHTML = data.events[d].event.time;
  		var whatInlineBlock = document.createElement('div');
  		whatInlineBlock.setAttribute('class','what inline-block');
  		whatInlineBlock.innerHTML = data.events[d].event['event-name'];
  		topThird.appendChild(whenInlineBlock);
  		topThird.appendChild(whatInlineBlock);
  		inlineEventContainer.appendChild(topThird);
  		dayEventContainer.appendChild(inlineEventContainer);
  		d++;
  		};
  		// alert('outside d = '+d);
  		return(d);
	};
	var m=0;

	$('.today').hover(function(){
	console.log('doin it')
})


/*	function makeEventMonth(date){
		var monthDate = Date.parse(date).toString('yyyy-MM');
		$.get('json/'+monthDate+'/month.json', function(data){
			var monthContainer = document.createElement('div');
			monthContainer.setAttribute('id',monthDate+'-events');
			var mainContainer = document.getElementById('events-container')
			mainContainer.innerHTML = '';
			mainContainer.appendChild(monthContainer);
			
			var n = Date.parse(data.events[m].event['iso-date']).toString('yyyy-MM');
			while(n == monthDate){
				m = makeEventDay(Date.parse(data.events[m].event['iso-date']).toString('yyyy-MM-dd'),data);
				// alert(data.events[m].event['event-name']);
				// m++;
				n = Date.parse(data.events[m].event['iso-date']).toString('yyyy-MM');
				date.addDays(1);
			}
			
		});

		// resizeElementHeight();
		// UpdateTableHeaders();

	}
*/
// });
// }

// makeEventDay(day)
// while loop 
// first create the day container with a day id.
// then while day of the event == the day of the day container, cycle through the JSON
// ++

// MakeEventMonth
// while loop
// first create the month container with a month id.
// then while month of the day == month of the month container, makeEventDay(day)




	// $(window).scroll(function(){
	// 	alert("scrolling!");
	// });