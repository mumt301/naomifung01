"use strict";

let urlParams=(new URL(document.location)).searchParams;

let oscillatorType="sine";
let semitones=0;
let minFrequency = 220.0;
let maxFrequency = 880.0;

if (urlParams.has("oscillatorType"))
    {oscillatorType=urlParams.get("oscillatorType");}

if (urlParams.has("minfreq")) {
    minFrequency = parseInt(urlParams.get("minfreq"));}

if (urlParams.has("maxfreq")) {
    maxFrequency = parseInt(urlParams.get("maxfreq"));}

if (urlParams.has("semitones")) {
        semitones = parseInt (urlParams.get("semitones"));}


function thereminOn(oscillator, oscillator2) {
    oscillator.play();
    oscillator2.play();
}
function thereminControl(e, oscillator, oscillator2, theremin) {

    let x = e.offsetX;
    let y = e.offsetY;
    console.log(x, y);
    
    let freqRange = maxFrequency - minFrequency;
    let thereminFreq = minFrequency + (x / theremin.clientWidth) * freqRange;
    let thereminVolume = 1.0 - (y / theremin.clientHeight);

    console.log("Frequency: ", thereminFreq);
    oscillator.frequency = thereminFreq;
    
    let note = document.getElementById("note");
    let frequency = document.getElementById("frequency")
    let note2 = document.getElementById("note2");
    let frequency2 = document.getElementById("frequency2")

    if (semitones==0)
    {oscillator2.frequency= thereminFreq;}
    else{
    oscillator2.frequency = interval(thereminFreq, semitones);}

    frequency.innerHTML="First Oscillator Frequency: " + oscillator.frequency + " Hz";
    note.innerHTML="First Oscillator Note: " + noteFromFrequency(oscillator.frequency, true);
    frequency2.innerHTML="Second Oscillator Frequency: " + oscillator2.frequency + " Hz";
    note2.innerHTML="Second Oscillator Note: " + noteFromFrequency(oscillator2.frequency, true);
 
    
    console.log("Volume: ", thereminVolume);
    oscillator.volume = thereminVolume;
    oscillator2.volume=thereminVolume;


}
function thereminOff(oscillator, oscillator2) {
        oscillator.stop();
        oscillator2.stop();
    }


function runAfterLoadingPage() {

    const oscillator = new Pizzicato.Sound({
        source: 'wave',
        options: {
            type: oscillatorType,
            frequency: 220
        }
    });

    const oscillator2 = new Pizzicato.Sound({
        source: 'wave',
        options: {
            type: oscillatorType,
            frequency: 220
        }
    });

    const theremin = document.getElementById("thereminZone");

    theremin.addEventListener("mouseenter", function (e) {
        thereminOn(oscillator,oscillator2);
    });

    theremin.addEventListener("mousemove", function (e) {
        thereminControl(e, oscillator, oscillator2, theremin);
    });

    theremin.addEventListener("mouseleave", function () {
        thereminOff(oscillator, oscillator2);
    });
}

window.onload = runAfterLoadingPage;