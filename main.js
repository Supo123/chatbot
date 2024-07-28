let input=document.querySelector("#input");
let icon=document.querySelector("#input_icon");
let searchbox=document.querySelector(".search");
let  loading_icon = document.querySelector(".loading");
let buttons= document.getElementsByClassName("button");
icon.addEventListener("click",()=>{
 // console.log("hii")
 if(input.value!=""){
     searchbox.style.boxShadow =`5px 5px 10px rgb(0,0,0,.6),inset 5px 5px 10px rgb(0,0,0,.2)`;
     loading_icon.style.display="flex";
     loading_icon.style.innerhtml=`   <div class="load">
     <h6></h6>
     <h6></h6>
     <h6></h6>
         </div>`;
         icon.style.cursor=`not-allowed`;
         runmessage(input.value);
 }
 else{
     searchbox.style.boxShadow =`5px 10px 10px rgb(0,0,0,.2),inset 5px 5px 10px rgb(255,0,0,.2)`;
 }
})
let offbutton=()=>{
Array.from(buttons).forEach((el)=>{
el.classList.remove("ln");
})
}
Array.from(buttons).forEach((el)=>{
el.addEventListener("click",()=>{
 offbutton();
 el.classList.add('ln');
})
})
let runmessage = async (message)=>{
// alert(message);
let language = document.getElementsByClassName("ln")[0].innerHTML;
const API_KEY ="AIzaSyCWLLo5u-n8WEItH-gmHFZgZkegEXL8atk";
const API_URL =`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;
try{
const response = await fetch(API_URL,{
 method: "POST",
 headers: {"Content-Type": "application/json"},
 body:JSON.stringify({
    contents: [{
      role:"user",
         parts:[{text:input.value}]
     }]
 })
});

if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
     }
const data = await response.json();
{
 const responseText = data?.candidates[0].content.parts[0].text;
 // console.log(responseText);


}
}
catch (error) {
        console.error('Error fetching data:', error);
    } finally {
     icon.style.cursor=`pointer`;
     input.value = "";
     loading_icon.style.display="none";
    }
}
//    let messagebox= (input.value,responseText) => {

//    }


// show loading animation while waiting for reply
const showloadinganimation =()=>{
 const html =`<pre class="ans_box">
<p class="text"></p>
</pre>`
loading_icon.style.display="flex";
     loading_icon.style.innerhtml=`   <div class="load">
     <h6></h6>
     <h6></h6>
     <h6></h6>
         </div>`;

;
 const incomingmessagediv = createMessageElement(html,"ans_box","load");

chatlist.appendChild(incomingmessagediv);
runmessage(incomingmessagediv);
}


const handleoutgoingchat =() =>{

 if(!input.value)return;// exit if there is no message
 const html =`<pre class="ques_box">
<p class="text"></p>
</pre>`;
const outgoingmessagediv = createMessageElement(html,"ques_box");
outgoingmessagediv.querySelector(".text").innerText = input.value;
chatlist.appendChild(outgoingmessagediv);

input.reset();//clear the input field
setTimeout(showloadinganimation,500);//show loading animaton after a delay
}

// prevent default form submission and handle outgoing chat
typingform.addEventListener("submit",(e) =>{
 e.preventDefault();
 handleoutgoingchat();
})


