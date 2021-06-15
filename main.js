 prediction1="";
 prediction2="";
 Webcam.set({
     width:350,
     height:300,
     Imageformat:'png',
pngquality:90,
 });
 camera=document.getElementById("camera");
 Webcam.attach('#camera');
 function takesnapshot(){
     Webcam.snap(function(data_uri){
         document.getElementById("result").innerHTML='<img id="captureimage" src="'+data_uri+'"/>';

     });

 }
 console.log('ml5 version:',ml5.version);
 classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/LQzDEHzbl/model.json',modelLoaded);
 function modelLoaded(){
     console.log('ModelLoaded!');
 }
 function speak(){
     var synth=window.speechSynthesis;
     speakdata1="The first prediction is "+prediction1;
     speakdata2=" And The second prediction is "+prediction2;
var utterThis=new SpeechSynthesisUtterance(speakdata1+speakdata2);
synth.speak(utterThis);  
 }
 function check(){
     img=document.getElementById('captureimage');
     classifier.classify(img, gotresult);
 }
 function gotresult(error,results){
     if(error){
         console.error(error);
     }
     else{
         console.log(results);
         document.getElementById("resultemotionname").innerHTML=results[0].label;
         document.getElementById("resultemotionname2").innerHTML=results[1].label;
         prediction1=results[0].label;
         prediction2=results[1].label;
         speak();
        if(results[0].label=="happy"){
            document.getElementById("updateemoji").innerHTML="&#128522;";
        }
        if(results[0].label=="sad"){
            document.getElementById("updateemoji").innerHTML="&#128532;";
        }
        if(results[0].label=="angry"){
            document.getElementById("updateemoji").innerHTML="&#128548;";
        }
       
        if(results[1].label=="happy"){
            document.getElementById("updateemoji2").innerHTML="&#128522;";
        }
        if(results[1].label=="sad"){
            document.getElementById("updateemoji2").innerHTML="&#128532;";
        }
        if(results[1].label=="angry"){
            document.getElementById("updateemoji2").innerHTML="&#128548;";
        }
     }
 }