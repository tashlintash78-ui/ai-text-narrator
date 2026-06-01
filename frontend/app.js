let voices=[];

window.speechSynthesis.onvoiceschanged=()=>{

voices=
window.speechSynthesis.getVoices();

const voiceSelect=
document.getElementById(
"voiceSelect"
);

voices.forEach((voice,index)=>{

const option=
document.createElement("option");

option.value=index;

option.text=
voice.name;

voiceSelect.appendChild(
option
);

});

};


async function generateNarration(){

const text=
document.getElementById(
"textInput"
).value;

const result=
document.getElementById(
"result"
);

const loader=
document.getElementById(
"loader"
);

loader.hidden=false;

result.innerHTML=
"Loading...";

try{

const response=
await fetch(
"https://ai-text-narrator-1.onrender.com/narrate",
{
method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:JSON.stringify({
text:text
})
}
);

const data=
await response.json();

const output=
data.narration||
data.error;

result.innerHTML=
output;

loader.hidden=true;

window.speechSynthesis.cancel();

const speech=
new SpeechSynthesisUtterance(
output
);

const selectedVoice=
document.getElementById(
"voiceSelect"
).value;

if(selectedVoice!==""){

speech.voice=
voices[selectedVoice];

}

window.speechSynthesis.speak(
speech
);

}
catch(error){

loader.hidden=true;

result.innerHTML=
"Connection failed";

}

}


function copyText(){

const text=
document.getElementById(
"result"
).innerText;

navigator.clipboard.writeText(
text
);

alert("Copied!");

}