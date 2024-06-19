function btnAllDivStyle_click(){
    $("div").addClass(  "divStyle");
}

function btnAdjacentSibling_click(){
    $("h2 + div").addClass(  "sibling");
}

function btnDescendant_click(){
    $("#story2 p").addClass(  "descendantp");
}

function btnNthchild_click() {
    $("li:nth-child(2)").addClass(  "nthChild")
}

function btnChildren_click() {
    $("div > ul").addClass(  "uls");
}

function btnSibling_click() {
    $("ul ~ p").addClass(  "Sibling");
}

function btnTypeSelectorHdr_click() {
    $(":header").addClass(  "headerStyle");
    $(":header:last").html(  "heading changed");
}

function btnAddList_click() {
    var newUL = $("<ul></ul>");
    for (var i = 0; i < 10; i++) {
        newUL.append("<li> Item " + i + "</li>");
    }
    $("#story1").append(newUl);
}
function btnRemoveDivs_click() {
    $("div").remove();
}
function btnTypeSelectorBtn_click() {
    $(":button").val( "I am a Button");
}


function init(){
    $("#btnAllDivStyle").on( "click", btnAllDivStyle_click);
    $("#btnAdjacentSibling").on("click", btnAdjacentSibling_click);
    $("#btnDescendant").on("click", btnDescendant_click);
    $("#btnNthchild").on("click",btnNthchild_click);
    $("#btnChildren").on("click",btnChildren_click);
    $("#btnSibling").on("click",btnSibling_click);
    $("#btnTypeSelectorHdr").on("click",btnTypeSelectorHdr_click);
    $("#btnAddList").on("click",btnAddList_click);
    $("#btnTypeSelectorBtn").on("click",btnTypeSelectorBtn_click);
    $("#btnRemoveDivs").on("click",btnRemoveDivs_click);
}

$($document).ready(function(){
    init()
});

//bmi

async function calculateBMI() {
    const age = document.getElementById("age").value;
    const weight = document.getElementById("weight").value;
    const height = document.getElementById("height").value;

    const url = `https://fitness-calculator.p.rapidapi.com/bmi?age=${age}&weight=${weight}&height=${height}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '9e6420f89cmsh49633c11a344bbep1f276fjsn1be6543c7d1d',
            'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();

        if (result.status_code === 200) {
            const bmi = result.data.bmi;
            const health = result.data.health;
            const healthyRange = result.data.healthy_bmi_range;

            const bmiResultElement = document.getElementById("bmiResult");
            bmiResultElement.textContent = `BMI: ${bmi}`;
            bmiResultElement.innerHTML += `<br>Health: ${health}`;
            bmiResultElement.innerHTML += `<br>Healthy BMI Range: ${healthyRange}`;
        } else {
            document.getElementById("bmiResult").textContent = "Error: Unable to calculate BMI.";
        }
    } catch (error) {
        console.error(error);
        document.getElementById("bmiResult").textContent = "Error: Unable to fetch BMI data.";
    }
}
