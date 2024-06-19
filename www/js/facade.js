document.addEventListener("DOMContentLoaded", function() {
    // Your script here
    const text = "Welcome to our Fitness App!";
    const typingSpeed = 150;

    function typeText() {
        const element = document.getElementById("typing-effect");
        let i = 0;

        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, typingSpeed);
            }
        }

        type();
    }

    typeText();
});
document.addEventListener("DOMContentLoaded", function () {
    var ctx = document.getElementById("nutritionChart").getContext("2d");
    var nutritionChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Protein', 'Carbohydrates', 'Fats'],
            datasets: [{
                data: [30, 50, 20],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
            }]
        },
        options: {
            legend: {
                position: 'bottom',
                labels: {
                    generateLabels: function (chart) {
                        var data = chart.data;
                        if (data.labels.length && data.datasets.length) {
                            return data.labels.map(function (label, i) {
                                var meta = chart.getDatasetMeta(0);
                                var ds = data.datasets[0];
                                var arc = meta.data[i];
                                var value = ds.data[i];
                                var percentage = parseFloat((value / ds._meta[0].total * 100).toFixed(1));
                                return {
                                    text: `${label}: ${value}% (${percentage}%)`,
                                    fillStyle: ds.backgroundColor[i],
                                    hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
                                    index: i
                                };
                            });
                        }
                        return [];
                    }
                }
            },
            responsive: true
        }
    });
});





function displaySavedData() {
    var savedData = localStorage.getItem('savedData') || '[]';
    savedData = JSON.parse(savedData);

    var savedDataDiv = document.getElementById('savedData');
    savedDataDiv.innerHTML = '';

    if (savedData.length > 0) {
        var heading = document.createElement('h2');
        heading.textContent = 'Saved Nutrition Data';
        savedDataDiv.appendChild(heading);

        for (var i = 0; i < savedData.length; i++) {
            var dataItem = document.createElement('p');
            dataItem.textContent = `Protein: ${savedData[i].protein}g, Carbs: ${savedData[i].carbs}g, Fats: ${savedData[i].fats}g`;
            savedDataDiv.appendChild(dataItem);
        }
    } else {
        savedDataDiv.innerHTML = 'No saved nutrition data.';
    }
}

// Display saved data on page load
displaySavedData();
function toggleImageUpload() {
    // Toggle the display of the image upload section based on checkbox status
    var imageUploadSection = document.getElementById('imageUpload');
    var postImageCheckbox = document.getElementById('postImage');
    var chosenImage = document.getElementById('chosenImage');

    if (postImageCheckbox.checked) {
        imageUploadSection.style.display = 'block';

        // Display the chosen image if already selected
        if (chosenImage.files && chosenImage.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                chosenImage.style.display = 'block';
                chosenImage.src = e.target.result;
            };
            reader.readAsDataURL(chosenImage.files[0]);
        }
    } else {
        imageUploadSection.style.display = 'none';
        chosenImage.style.display = 'none';
    }
}

function recordUserData() {
    // Retrieve and record user data
    var exercise = document.getElementById('exercise').value;
    var sets = document.getElementById('sets').value;
    var reps = document.getElementById('reps').value;
    var time = document.getElementById('time').value;
    var intensity = document.querySelector('input[name="intensity"]:checked').value;
    var notes = document.getElementById('notes').value;

    // Check if the "Post Image" checkbox is checked
    var postImageCheckbox = document.getElementById('postImage');
    var postImage = postImageCheckbox.checked;

    // If checked, retrieve the chosen image file
    var imageFile = null;
    if (postImage) {
        imageFile = document.getElementById('camera').files[0];
    }

    // Log or handle the user data and image file as needed
    console.log("Recorded Data:");
    console.log("Exercise: " + exercise);
    console.log("Sets: " + sets);
    console.log("Reps: " + reps);
    console.log("Time: " + time);
    console.log("Intensity: " + intensity);
    console.log("Notes: " + notes);

    if (postImage) {
        console.log("Image Posted:", imageFile);

        // Display the chosen image in the form
        var chosenImage = document.getElementById('chosenImage');
        chosenImage.style.display = 'block';

        var reader = new FileReader();
        reader.onload = function (e) {
            chosenImage.src = e.target.result;
        };
        reader.readAsDataURL(imageFile);

        // You can customize this part to handle the image file, such as uploading to a server
    }

    // You can customize this part to save data to a database or perform other actions
    alert("Data recorded successfully!");
}
var postIdCounter = 0; // Counter to generate unique post IDs

function postAchievement() {
    // Retrieve user's name
    var userName = document.getElementById('userName').value;

    // Retrieve user's thoughts
    var thoughts = document.getElementById('thoughts').value;

    // Retrieve the chosen image file
    var imageFile = document.getElementById('communityImage').files[0];

    // Check if all fields are filled
    if (!userName || !thoughts || !imageFile) {
        alert("All fields must be filled to post an achievement.");
        return false;
    }

    // Display the posted achievement
    var postedAchievementsDiv = document.getElementById('postedAchievements');
    var newPost = document.createElement('div');
    newPost.className = 'postedAchievement';
    newPost.id = 'post' + postIdCounter++; // Unique ID for each post

    // Display user's name
    var userNamePara = document.createElement('p');
    userNamePara.textContent = 'Posted by: ' + userName;
    newPost.appendChild(userNamePara);

    // Display user's thoughts
    var thoughtsPara = document.createElement('p');
    thoughtsPara.textContent = thoughts;
    newPost.appendChild(thoughtsPara);

    // Display the chosen image
    if (imageFile) {
        var image = document.createElement('img');
        image.src = URL.createObjectURL(imageFile);
        image.alt = 'Posted Image';
        newPost.appendChild(image);
    }

    // Add the new post to the posted achievements section
    postedAchievementsDiv.appendChild(newPost);

    // Clear the input fields
    document.getElementById('userName').value = '';
    document.getElementById('thoughts').value = '';
    document.getElementById('communityImage').value = '';

    // Prevent the form from submitting and refreshing the page
    return false;
}
function deleteEntryFromDB() {
    var transaction = db.transaction(['exerciseEntries'], 'readwrite');
    var objectStore = transaction.objectStore('exerciseEntries');

    // Assume you have a way to uniquely identify the entry, e.g., using an ID
    var entryId = 1; // Replace with the actual ID

    var request = objectStore.delete(entryId);

    request.onsuccess = function (event) {
        console.log('Entry deleted successfully from database');
    };

    request.onerror = function (event) {
        console.error('Error deleting entry from database: ' + event.target.errorCode);
    };
}