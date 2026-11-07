const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const modal=$("#modal"), body=$("#modalBody");
const templates={
 join:["Join E-CONNEKTE","Create a demo student profile.",["Name","Email address","City"]],
 offer:["Offer a ride","Share your planned trip with fellow students.",["Departure city","Destination","Travel date","Available seats"]],
 request:["Request a seat","Introduce yourself to the driver.",["Your name","Message"]],
 sell:["List a second-hand item","Add the details of something you want to sell.",["Item title","Price (€)","City","Category"]],
 contact:["Contact the seller","Ask a question about this item.",["Your name","Message"]],
 housing:["Accommodation support","Tell us what you are looking for.",["City","Monthly budget (€)","Move-in date"]],
 checklist:["Arrival checklist","A few useful first steps: confirm accommodation; plan your route from the station; prepare essential documents; locate nearby shops and services.",[]],
 community:["Connect with local students","Tell us where you are arriving and what local advice would help.",["City","What help do you need?"]]
};
function openModal(key){const [title,desc,fields]=templates[key];body.innerHTML=`<form class="modalform"><h2>${title}</h2><p>${desc}</p>${fields.map((f,i)=>`<label>${f}<input ${f.toLowerCase().includes("date")?'type="date"':f.toLowerCase().includes("email")?'type="email"':'type="text"'} placeholder="${f}" required></label>`).join("")}<button class="primary">${key==="checklist"?"Done":"Submit demo request"} →</button><div id="feedback"></div></form>`;body.querySelector("form").addEventListener("submit",e=>{e.preventDefault();$("#feedback").innerHTML='<div class="success">Thank you! This demo has captured your input locally. A live version needs a secure backend.</div>';});modal.showModal();}
$$("[data-modal]").forEach(b=>b.addEventListener("click",()=>openModal(b.dataset.modal)));
$("#rideForm").addEventListener("submit",e=>{e.preventDefault();$("#rideResult").textContent=`Searching sample rides: ${$("#from").value} → ${$("#to").value} on ${$("#date").value}, for ${$("#seats").value} passenger(s). Live results need a backend.`;});
$("#filters").addEventListener("click",e=>{const b=e.target.closest("[data-cat]");if(!b)return;$$(".filter").forEach(x=>x.classList.toggle("active",x===b));$$(".products article").forEach(card=>card.hidden=b.dataset.cat!=="All"&&card.dataset.category!==b.dataset.cat);});
$$(".save").forEach(b=>b.addEventListener("click",()=>{b.classList.toggle("saved");b.textContent=b.classList.contains("saved")?"♥":"♡";}));
$("#menu").addEventListener("click",()=>$("#nav").classList.toggle("open"));
$("#nav").addEventListener("click",e=>{if(e.target.tagName==="A")$("#nav").classList.remove("open");});
$("#year").textContent=new Date().getFullYear();
// Progressive disclosure: keep the landing page focused until visitors ask for more.
const aboutToggle = document.querySelector("#aboutToggle");
if (aboutToggle) aboutToggle.addEventListener("click", () => {
  const panel = document.querySelector("#aboutReveal");
  const opening = panel.hidden;
  panel.hidden = !opening;
  aboutToggle.setAttribute("aria-expanded", String(opening));
  aboutToggle.innerHTML = opening ? "Hide details <span>−</span>" : "Who we are <span>＋</span>";
});

// Suggested shared-cost estimator. Includes driver in the cost split.
const costForm = document.querySelector("#costForm");
if (costForm) costForm.addEventListener("submit", event => {
  event.preventDefault();
  const km = Number(document.querySelector("#distanceKm").value);
  const consumption = Number(document.querySelector("#consumption").value);
  const fuelPrice = Number(document.querySelector("#fuelPrice").value);
  const tolls = Number(document.querySelector("#tolls").value || 0);
  const passengers = Number(document.querySelector("#passengerCount").value);
  if (!(km > 0 && consumption > 0 && fuelPrice > 0 && tolls >= 0 && passengers >= 1)) return;
  const fuelCost = (km * consumption / 100) * fuelPrice;
  const total = fuelCost + tolls;
  const occupants = passengers + 1; // driver plus passengers
  const each = total / occupants;
  document.querySelector("#costResult").innerHTML =
    `Estimated trip costs: €${total.toFixed(2)} · Suggested share: €${each.toFixed(2)} per person (${occupants} people including the driver).`;
});

const menuToggle=document.querySelector("#menuToggle");
if(menuToggle)menuToggle.addEventListener("click",()=>{
 const nav=document.querySelector("#mainNav");const open=nav.classList.toggle("open");
 menuToggle.setAttribute("aria-expanded",String(open));
});
document.querySelectorAll("#mainNav a").forEach(a=>a.addEventListener("click",()=>document.querySelector("#mainNav").classList.remove("open")));
