var db;
var request = indexedDB.open('NutritionDB', 1);
var db;

request.onupgradeneeded = function (event) {
    db = event.target.result;
    var objectStore = db.createObjectStore('nutrition', { keyPath: 'id', autoIncrement: true });
    objectStore.createIndex('protein', 'protein', { unique: false });
    objectStore.createIndex('carbs', 'carbs', { unique: false });
    objectStore.createIndex('fats', 'fats', { unique: false });
    objectStore.createIndex('timestamp', 'timestamp', { unique: false });
};

request.onsuccess = function (event) {
    db = event.target.result;
};

request.onerror = function (event) {
    console.error('IndexedDB error: ' + event.target.errorCode);
};

function displaySavedData() {
    var transaction = db.transaction(['nutrition'], 'readonly');
    var objectStore = transaction.objectStore('nutrition');

    objectStore.openCursor().onsuccess = function (event) {
        var cursor = event.target.result;

        if (cursor) {
            var message = "Protein: " + cursor.value.protein + "g, Carbohydrates: " + cursor.value.carbs + "g, Fats: " + cursor.value.fats + "g";
            displayMessage(message);

            cursor.continue();
        }
    };
}

function displayMessage(message) {
    var savedDataElement = document.getElementById('savedData');
    var p = document.createElement('p');
    p.textContent = message;
    savedDataElement.appendChild(p);
}

function updateChartAndDisplayData(protein, carbs, fats) {
    var ctx = document.getElementById('barChart').getContext('2d');
    var barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Protein', 'Carbohydrates', 'Fats'],
            datasets: [{
                label: 'Nutrition Intake',
                data: [protein, carbs, fats],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    saveToIndexedDB(protein, carbs, fats);

    console.log('Bar chart loaded successfully');
}

function saveToIndexedDB(protein, carbs, fats) {
    var transaction = db.transaction(['nutrition'], 'readwrite');
    var objectStore = transaction.objectStore('nutrition');

    var timestamp = new Date().getTime();

    var request = objectStore.add({
        protein: protein,
        carbs: carbs,
        fats: fats,
        timestamp: timestamp
    });

    request.onsuccess = function () {
        console.log('Data saved to IndexedDB');
    };

    request.onerror = function (event) {
        console.error('IndexedDB error: ' + event.target.errorCode);
    };
}

function generateBarChart() {
    var protein = document.getElementById('protein').value;
    var carbs = document.getElementById('carbs').value;
    var fats = document.getElementById('fats').value;

    if (protein === '' || carbs === '' || fats === '') {
        alert("Please enter values for all fields to generate the bar chart.");
        return;
    }

    updateChartAndDisplayData(protein, carbs, fats);

    // Save data to IndexedDB
    saveToIndexedDB(protein, carbs, fats);

    // Display saved data
    displaySavedData();
}


//database.js

var db;
var request = indexedDB.open('ZenFitDB', 1);

request.onupgradeneeded = function (event) {
    db = event.target.result;
    var exerciseObjectStore = db.createObjectStore('exerciseEntries', { keyPath: 'id', autoIncrement: true });
    // Add more properties to the object store based on your data model
    exerciseObjectStore.createIndex('exercise', 'exercise', { unique: false });
    exerciseObjectStore.createIndex('sets', 'sets', { unique: false });
    exerciseObjectStore.createIndex('reps', 'reps', { unique: false });
    exerciseObjectStore.createIndex('notes', 'notes', { unique: false });
    // Add more indexes as needed

    console.log('exerciseEntries object store created successfully');


};

request.onsuccess = function (event) {
    // Assign the opened database to the db variable
    db = event.target.result;
    console.log('Database opened successfully');
};

request.onerror = function (event) {
    console.error('Error opening database: ' + event.target.errorCode);
};


function recordUserData() {
    // Retrieve form values
    var exercise = $("#exercise").val();
    var sets = parseFloat($("#sets").val()) || 0;
    var reps = parseFloat($("#reps").val()) || 0;
    var notes = $("#notes").val();

    // Calculate nutrition
    var nutritionInfo = {
        running: { caloriesBurnt: 100, weightLoss: 5, carbsLost: 15 },
        cycling: { caloriesBurnt: 150, weightLoss: 8, carbsLost: 20 },
        "jumping-jacks": { caloriesBurnt: 50, weightLoss: 2, carbsLost: 10 }
        // Add more exercises and their nutrition info
    };
    var caloriesBurnt = sets * reps * nutritionInfo[exercise].caloriesBurnt;
    var weightLoss = sets * reps * nutritionInfo[exercise].weightLoss;

    // Display nutrition information
    $("#calories").text(caloriesBurnt.toFixed(2));
    $("#weightLoss").text((weightLoss / 1000).toFixed(2) + "kg");


    // Save entry to IndexedDB
    saveEntryToDB(exercise, sets, reps, notes);

    // Show success message dynamically
    displayDynamicSuccessMessage("Data added successfully!");
}

function displayDynamicSuccessMessage(message) {
    // Create a new div element
    var successDiv = document.createElement('div');
    successDiv.className = 'alert alert-success';
    successDiv.role = 'alert';
    successDiv.textContent = message;

    // Append the new div to the body or another appropriate container
    document.body.appendChild(successDiv);

    // Remove the div after a few seconds (adjust as needed)
    setTimeout(function () {
        document.body.removeChild(successDiv);
    }, 3000); // 3000 milliseconds = 3 seconds
}



function saveEntryToDB(exercise, sets, reps, notes) {
    // Open a transaction to the database
    var transaction = db.transaction(['exerciseEntries'], 'readwrite');

    // Get the object store
    var objectStore = transaction.objectStore('exerciseEntries');

    // Calculate nutrition information
    var nutritionInfo = {
        running: { caloriesBurnt: 100, weightLoss: 5, carbsLost: 15 },
        cycling: { caloriesBurnt: 150, weightLoss: 8, carbsLost: 20 },
        "jumping-jacks": { caloriesBurnt: 50, weightLoss: 2, carbsLost: 10 }
        // Add more exercises and their nutrition info
    };
    var caloriesBurnt = sets * reps * nutritionInfo[exercise].caloriesBurnt;
    var weightLoss = sets * reps * nutritionInfo[exercise].weightLoss;


    var entry = {
        exercise: exercise,
        sets: sets,
        reps: reps,
        notes: notes,
        caloriesBurnt: caloriesBurnt,
        weightLoss: weightLoss
    };

    // Add the entry to the object store
    var request = objectStore.add(entry);

    request.onsuccess = function (event) {
        console.log('Entry added to the database with key: ' + event.target.result);
    };

    request.onerror = function (event) {
        console.error('Error adding entry to the database: ' + event.target.errorCode);
    };
}

