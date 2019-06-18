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
  var nextTrain = "";
  var tMinutesTillTrain = "";
  

$("#add-train-btn").on("click", function(event){
    event.preventDefault();
    trainName = $("#train-name-input").val().trim();
    destination = $("#destination-input").val().trim();
    time = $("#time-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    // Assumptions
    var tFrequency = frequency;

    // Time is 3:30 AM
    var firstTime = time;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    nextTrainConverted = moment(nextTrain).format("hh:mm");
    
    database.ref().push({
        trainNameF: trainName,
        destinationF: destination,
        timeF: time,
        frequencyF: frequency,
        nextTrainF: nextTrainConverted,
        tMinutesTillTrainF: tMinutesTillTrain
    });
})

database.ref().on("child_added", function(snapshot){

    console.log(snapshot.val())
    console.log(snapshot.val().trainNameF);
    console.log(snapshot.val().destinationF);
    console.log(snapshot.val().timeF);
    console.log(snapshot.val().frequencyF);
    console.log(snapshot.val().nextTrainF);
    console.log(snapshot.val().tMinutesTillTrainF);


    var row = $("<tr>");
    var nameData = $("<td>");
    var destinationData = $("<td>");
    var nextTrainData = $("<td>");
    var frequencyData = $("<td>");
    var tMinutesTillTrainData = $("<td>");

    nameData.text(snapshot.val().trainNameF);
    destinationData.text(snapshot.val().destinationF);
    frequencyData.text(snapshot.val().frequencyF);
    nextTrainData.text(snapshot.val().nextTrainF);
    tMinutesTillTrainData.text(snapshot.val().tMinutesTillTrainF);

    row.append(nameData);
    row.append(destinationData);
    row.append(frequencyData);
    row.append(nextTrainData);
    row.append(tMinutesTillTrainData);
    $("#table-head").after(row);
}, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
});

