prediction= "";

Webcam.set({
width:350,
height:300,
image_format:'png',
png_quality: 90
});

camera= document.getElementById("camera");

Webcam.attach('#camera');

function snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("results").innerHTML= '<img id="snapshot" src="'+data_uri+'"/>'
    });
}

console.log('ml5 version:', ml5.version);

classifier= ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/AqGvfjLBd/model.json', modelloaded);

function modelloaded(){
    console.log('Model Loaded');
}

function speak(){
    var synth= window.speechSynthesis;
    speak_data= "The Prediction is" + prediction;
    var utter= new SpeechSynthesisUtterance(speak_data);
    synth.speak(utter);
}

function check(){
    img= document.getElementById('snapshot');
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if (error){
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("emotion_name").innerHTML= results[0].label;
        prediction= results[0].label;
        speak();
        if(results[0].label== "Amazing"){
            document.getElementById("emotion_pic").innerHTML= "&#128076;";
           }
           if(results[0].label== "Best"){
               document.getElementById("emotion_pic").innerHTML= "&#128077;";   
              }
              if(results[0].label== "Victory"){
               document.getElementById("emotion_pic").innerHTML= "&#9996;";   
              }
       
            }
    
}