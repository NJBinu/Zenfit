$(document).ready(function () {
    // Form validation setup
    $("form").validate({
        rules: {
            exercise: {
                required: true
            },
            sets: {
                required: true,
                digits: true
            },
            reps: {
                required: true,
                digits: true
            },
            time: {
                required: true,
                digits: true
            },
            intensity: {
                required: true
            },
            notes: {
                required: true
            }
        },
        messages: {
            exercise: "Please enter an exercise name",
            sets: {
                required: "Please enter the number of sets",
                digits: "Please enter a valid number"
            },
            reps: {
                required: "Please enter the number of reps",
                digits: "Please enter a valid number"
            },
            time: {
                required: "Please enter the time in minutes",
                digits: "Please enter a valid number"
            },
            intensity: "Please select the intensity",
            notes: "Please add some notes"
        },
        errorClass: "error",
        errorElement: "div",
        errorPlacement: function (error, element) {
            error.insertAfter(element);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass(errorClass).removeClass(validClass);
            $(element).css({ 'border': '1px solid red', 'color': '#F00' });
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass(errorClass).addClass(validClass);
            $(element).css({ 'border': '', 'color': '' });
        },
    });

    // Save entry button click event
    $("button.save-entry").click(function () {
        // If form is valid, record user data and calculate nutrition
        if ($("form").valid()) {
            recordUserData();
        }
    });
});

// Function to calculate nutrition and record user data
function recordUserData() {
    // Your existing code to retrieve form values
    var exercise = $("#exercise").val();
    var sets = parseFloat($("#sets").val()) || 0;
    var reps = parseFloat($("#reps").val()) || 0;
    var notes = $("#notes").val();

    // Save the entry to the indexedDB
    saveEntryToDB(exercise, sets, reps, notes);

    // Your existing nutrition information
    var nutritionInfo = {
        running: { caloriesBurnt: 100, weightLoss: 5 },
        cycling: { caloriesBurnt: 150, weightLoss: 8 },
        "jumping-jacks": { caloriesBurnt: 50, weightLoss: 2 }
        // Add more exercises and their nutrition info
    };

    // Your existing calculation logic
    var caloriesBurnt = sets * reps * nutritionInfo[exercise].caloriesBurnt;
    var weightLoss = sets * reps * nutritionInfo[exercise].weightLoss;

    // Display the calculated nutrition information
    $("#calories").text(caloriesBurnt.toFixed(2));
    $("#weightLoss").text(weightLoss.toFixed(2) + "g");
    // Remove the line displaying carbsLost
}



