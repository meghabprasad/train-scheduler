var firebaseConfig = {
    apiKey: "AIzaSyD88wLXAUe7vXwxLWDntnNIFCADdguKfBc",
    authDomain: "baba-d89b9.firebaseapp.com",
    databaseURL: "https://baba-d89b9.firebaseio.com",
    projectId: "baba-d89b9",
    storageBucket: "baba-d89b9.appspot.com",
    messagingSenderId: "42750083891",
    appId: "1:42750083891:web:b6b59de831e01ef1"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  var trainName = "";
  var destination = "";
  var time = "";
  var frequency = "";
  

$("#add-train-btn").on("click", function(event){
    event.preventDefault();
    trainName = $("#train-name-input").val().trim();
    destination = $("#destination-input").val().trim();
    time = $("#time-input").val().trim();
    frequency = $("#frequency-input").val().trim();


    database.ref().push({
        trainNameF: trainName,
        destinationF: destination,
        timeF: time,
        frequencyF: frequency
    })
})

database.ref().on("child_added", function(snapshot){

    console.log(snapshot.val())
    console.log(snapshot.val().trainNameF);
    console.log(snapshot.val().destinationF);
    console.log(snapshot.val().timeF);
    console.log(snapshot.val().frequencyF);

    var row = $("<tr>");
    var nameData = $("<td>");
    var destinationData = $("<td>");
    var timeData = $("<td>");
    var frequencyData = $("<td>");

    nameData.text(snapshot.val().trainNameF);
    destinationData.text(snapshot.val().destinationF);
    timeData.text(snapshot.val().timeF);
    frequencyData.text(snapshot.val().frequencyF);

    row.append(nameData);
    row.append(destinationData);
    row.append(timeData);
    row.append(frequencyData);
    $("#table-head").after(row);
}, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
});

