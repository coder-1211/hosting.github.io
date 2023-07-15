const popup = document.querySelector(".popup"),
connct = document.querySelector(".icon i"),
title = document.querySelector(".popup .title"),
popupdesc = document.querySelector(".desc"),
btn=document.querySelector(".retry");


let Isonline = true, intervalid, timer = 10;
const connectioncheck = async () => {
  try {
    const resp = await fetch("https://jsonplaceholder.typicode.com/posts")
    Isonline = resp.status >= 200 && resp.status < 300;
    
  }
  catch (error) {
    Isonline = false;

  }
  timer=10;
  clearInterval(intervalid)

  showpopup(Isonline);
}
const showpopup = (status) => {
  if (status) {
    connct.className="uil uil-wifi";
    title.innerText="Connection Restored";
    popupdesc.innerHTML="Your Network Connection is Restored . Your Device is connected to internet.";
    popup.classList.add("online");
    return setTimeout(()=>{popup.classList.remove("main");},2000) 

  }
  connct.className="uil uil-wifi-slash";
  title.innerText="You Are Offline";
  popupdesc.innerHTML="Your Network is unavaliable . We will again attemp in <strong>10 </strong> seconds";
  popup.className="popup main";
   
  
  intervalid = setInterval(() => {
    timer--;
    if(timer===0) connectioncheck();
    popup.querySelector(".desc strong").innerText = timer;
  }, 1000);
}
setInterval(()=> Isonline && connectioncheck(), 3000);
btn(addEventListener("click",connectioncheck));