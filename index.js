function autoCSS (elementId_0, elementId_1, elementId_2 ,condition) {
    //top background
    var topBack = document.getElementById("backgroundTop");

    //first tab button
    var tabButtonArray = document.getElementsByClassName("tablinks");
    tabButton = tabButtonArray[0];

    var absoluteElemObj = {
        screenWidth: screen.width,
        screenHeight: window.innerHeight,
        topBackgroundHeight: parseInt (window.getComputedStyle(topBack, null).getPropertyValue('height'), 10),
        scrolbarWidth: 17, //scrollbar width
    };

    //tab content and the whole tab
    if (condition == 0) {

        //content div
        var tabContentDiv = document.getElementById(elementId_0);

        //whole tab
        var tabWhole = document.getElementById(elementId_1);

        //actual divs inside the tab content div
        var tabContentArray = document.getElementsByClassName(elementId_2);
        var lastDiv = tabContentArray[tabContentArray.length - 1];

        //css propierties of the specific elements
        var tabHeight = parseInt (window.getComputedStyle(tabWhole, null).getPropertyValue('height'), 10);
        
        var tabContTopPadding = parseInt (window.getComputedStyle(tabContentDiv, null).getPropertyValue('padding-top'), 10);
        
        //tab content div position (top)
        tabContentDiv.style.top = absoluteElemObj.topBackgroundHeight;

        //tab content div height        
        tabContentDiv.style.height = absoluteElemObj.screenHeight - ((absoluteElemObj.topBackgroundHeight * 2) + (tabContTopPadding * 2));

        //tab content div width
        var tabButtonRightMargin = parseInt (window.getComputedStyle(tabButton, null).getPropertyValue('margin-right'), 10);
        var tabWidth = parseInt (window.getComputedStyle(tabWhole, null).getPropertyValue('width'), 10);
        tabContentDiv.style.width = tabWidth + tabButtonRightMargin + absoluteElemObj.scrolbarWidth;

        //tab content divs of the content div width
        var tabContWidth = parseInt (window.getComputedStyle(tabContentDiv, null).getPropertyValue('width'), 10);
        for (var i = 0; i < tabContentArray.length; i++) {
            tabContentArray[i].style.width = tabContWidth - (absoluteElemObj.scrolbarWidth + 16); //16 = padding * 2
        }

        //makes the last content div have no border
        lastDiv.style.borderBottomWidth = 0;

        //whole tab position (top)
        tabWhole.style.top = absoluteElemObj.topBackgroundHeight - tabHeight;
        }

    //background divs
    else if (condition == 1) {
        var backgroundId = document.getElementById(elementId_0);

        backgroundId.style.width = absoluteElemObj.screenWidth;
    }
}

//executes function once for each element that needs css fixing
autoCSS("building", "mechanicTabBlock", "unitDivs", 0);
autoCSS("upgrade", "mechanicTabBlock", "upgradeDivs", 0);
autoCSS("option", "mechanicTabBlock", "optionDivs", 0);

autoCSS("backgroundTop", null, null, 1)
autoCSS("backgroundBottom", null, null, 1)

autoCSS("clickerButton")

function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

//money variables
var VALUE = 0;
var VALUE_W = VALUE;
var VALUE_S = 0;
var VALUE_RECLAIM = 0;

//function that changes items shown on screen
function itemNumChecking () {

    VALUE_W = VALUE;

    VALUE_S = parseInt(VALUE_W / 2);

    if (VALUE_W % 2 == 0) {
        VALUE_W = 0;
    }
    
    else if (VALUE_W % 2 != 0) {
        VALUE_W = 1;
    }
    
    /*if (VALUE_S % 3 == 0) {
        VALUE_RECLAIM = VALUE_RECLAIM + 1;
        VALUE_S = 0;
    }*/

    document.getElementById("itemNum").innerHTML = "Backpack Value: " + VALUE_W + " weapons and " + VALUE_S + " scrap.";
}

function clickerFunc(){

    VALUE = VALUE + 1;

    VALUE_W = VALUE;

    VALUE_S = parseInt(VALUE_W / 2);

    if (VALUE_W % 2 == 0) {
        VALUE_W = 0;
    }
    else if (VALUE_W % 2 != 0) {
        VALUE_W = 1;
    }
    //calls the function and sets 100 ms delay
    setInterval(itemNumChecking, 100);
}

//arrays of unit data (gain, cost, quantity)
var arraysObject = {
    UNIT_0: [1, 5, 0],
}

//function that runs every
function gainFunction (unitType) {
    VALUE = VALUE + (arraysObject[unitType][0] * arraysObject[unitType][2]);
}

//verifies if setInterval has already run for that building
var VERIFICATION = [];
var INTERVAL = 0;

function idleUnit (unitType, unitNum){

    if (VALUE >= arraysObject[unitType][1] && VERIFICATION.includes(unitNum) == false){

        VALUE = VALUE - arraysObject[unitType][1];   

        arraysObject[unitType][2] = arraysObject[unitType][2] + 1;

        INTERVAL = setInterval (gainFunction, 1000, unitType);

        //adds the unit number to the array
        VERIFICATION.push(unitNum);
    }

    else if (VALUE >= arraysObject[unitType][1] && VERIFICATION.includes(unitNum) == true) {

        VALUE = VALUE - arraysObject[unitType][1];   

        arraysObject[unitType][2] = arraysObject[unitType][2] + 1;

        clearInterval(INTERVAL)

        INTERVAL = setInterval (gainFunction, 1000, unitType);
    }

    else {
        console.log("You don't have enough scrap !");
    }

    /*
    else {
        //create text
        var elem = document.createElement("P");
        var t = document.createTextNode("You don't have enough scrap !");
        elem.appendChild(t);
        .appendChild(elem);  

        //css setting
        elem.style.color = "FB0404";
        elem.style.fontSize = "50px";
        
        var opacity = 1;
        var top = "50px";

        //"physics"
        for (var i = 0; i > 10; i++) {

            elem.style.opacity = opacity;
            elem.style.top = top;

            opacity = opacity - 0.1;

            console.log("saa");
        }

        //deletes text
        elem.removeChild(elem.firstChild);

        i = 0
    }
    */
}