const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const dialog=$("#dialog"),body=$("#dialogBody"),toast=$("#toast"),KEY="econnekte-demo-v2";
const initial={groups:[
{id:"sql",subject:"Database Systems",name:"SQL Study Circle",desc:"Practise queries and prepare for the exam.",members:3,when:"Wed · 14:00",place:"Cesena",joined:false},
{id:"web",subject:"Web Development",name:"Frontend Friends",desc:"Build skills in HTML, CSS and JavaScript.",members:5,when:"Thu · 16:00",place:"Online / Cesena",joined:false},
{id:"math",subject:"Mathematics",name:"Maths Together",desc:"Review key topics and solve exercises.",members:4,when:"Fri · 10:00",place:"Cesena",joined:false}],messages:[{text:"Welcome! Suggest a topic or a time to study.",mine:false}],sessions:[]};
let state;try{state={...initial,...JSON.parse(localStorage.getItem(KEY)||"{}")}}catch{state=initial}
const save=()=>localStorage.setItem(KEY,JSON.stringify(state));
function say(s){toast.textContent=s;toast.classList.add("show");clearTimeout(say.t);say.t=setTimeout(()=>toast.classList.remove("show"),2300)}
function esc(s){return String(s||"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function open(title,desc,content,note="Demo only. Information stays in this browser; it is not sent to a server."){body.innerHTML=`<span class="eyebrow">E-CONNEKTE</span><h2>${title}</h2><p>${desc}</p>${content}${note?`<div class="modal-note">${note}</div>`:""}`;dialog.showModal()}
function field(label,name,ph="",type="text"){return `<label>${label}<input name="${name}" type="${type}" placeholder="${ph}" required></label>`}
function sel(label,name,opts){return `<label>${label}<select name="${name}">${opts.map(x=>`<option>${x}</option>`).join("")}</select></label>`}
function form(id,fields,button){return `<form class="modal-form" id="${id}">${fields}<button class="btn primary">${button} →</button></form>`}
function createGroup(){open("Create a study group","Start a group around a shared subject.",form("groupForm",field("Group name","name","e.g. Study Buddies")+sel("Subject","subject",["Database Systems","Web Development","Mathematics","English","Other"])+`<label>Short description<textarea name="desc" required placeholder="What will you study?"></textarea></label>`+field("Suggested time","when","e.g. Tue · 15:00")+field("Meeting place","place","e.g. Cesena library"),"Create group"))}
function renderGroups(){const q=($("#groupQuery")?.value||"").toLowerCase(),sub=$("#subjectFilter")?.value||"All subjects";const list=state.groups.filter(g=>(sub==="All subjects"||g.subject===sub)&&`${g.name} ${g.subject} ${g.desc}`.toLowerCase().includes(q));$("#groupCards").innerHTML=list.map(g=>`<article class="study-card"><div class="study-card-top"><span class="pill lavender-bg">${esc(g.subject)}</span><span class="members">${g.members} members</span></div><h3>${esc(g.name)}</h3><p>${esc(g.desc)}</p><div class="study-meta"><span>◷ ${esc(g.when)}</span><span>⌖ ${esc(g.place)}</span></div><button class="btn outline full" data-join="${g.id}" ${g.joined?"disabled":""}>${g.joined?"Request sent":"Request to join"}</button></article>`).join("");$("#emptyGroups").hidden=list.length>0}
function chat(){const msgs=state.messages.map(m=>`<div class="bubble ${m.mine?"mine":""}">${esc(m.text)}</div>`).join("");open("Group conversation","SQL Study Circle · Sample group chat",`<div class="chat"><div class="chat-head">● Study group chat</div><div class="messages" id="messages">${msgs}</div><form class="compose" id="chatForm"><input name="message" placeholder="Write a message…" maxlength="300" required><button>Send</button></form></div>`)}
function session(){open("Plan a study session","Suggest a time and place for your group.",form("sessionForm",field("Session title","title","e.g. SQL practice")+field("Date","date","","date")+field("Time","time","","time")+field("Meeting place","place","University library")+`<label>Details<textarea name="details" placeholder="What will you work on?"></textarea></label>`,"Save session"))}
function checklist(){open("Arrival checklist","Tick off your first steps.",["Confirm accommodation","Plan your route from the station","Prepare key documents","Find nearby shops","Check university services"].map(x=>`<label class="checkrow"><input type="checkbox"> ${x}</label>`).join(""))}
const modals={
join:()=>open("Join E-CONNEKTE","The full account system will be added with the backend.",form("simpleForm",field("Your name","name","First name")+field("Email","email","you@example.com","email")+sel("Interested in","interest",["Mobility","Marketplace","Arrival & Living","Study groups"]),"Continue"),"Prototype only. No account is created."),
login:()=>open("Welcome back","Login will be available after secure accounts are implemented.",form("simpleForm",field("Email","email","you@example.com","email")+field("Password","password","Do not enter a real password","password"),"Continue"),"Do not enter real credentials in this prototype."),
offerRide:()=>open("Offer a ride","Share a journey and available seats.",form("simpleForm",field("From","from","Cesena")+field("To","to","Bologna")+field("Date","date","","date")+field("Time","time","","time")+sel("Available seats","seats",["1","2","3","4"]),"Save demo ride")),
rideDetails:()=>open("Journey details","Example journey: Cesena → Bologna · Friday 16:45","<p>Driver: Marco · 2 seats · Sample listing.</p><button class='btn primary' id='demoRequest'>Request a seat →</button>"),
sell:()=>open("List an item","Add a second-hand item for students.",form("simpleForm",field("Item name","name","e.g. Study desk")+sel("Category","category",["Furniture","Electronics","Bicycles","Home"])+field("Price (€)","price","25","number")+field("City","city","Cesena")+`<label>Condition<textarea name="condition" required></textarea></label>`,"Add demo listing")),
seller:()=>open("Contact seller","A secure contact flow will use student accounts later.",form("simpleForm",`<label>Your message<textarea name="message" required placeholder="Hi, is this item still available?"></textarea></label>`,"Send demo message")),
housing:()=>open("Accommodation information","Useful information for exploring local housing.","<p>Future content can include housing types, documents, questions to ask providers, deposit awareness and trusted local resources.</p><p>Listings must be labelled verified only when a real verification process exists.</p>"),
checklist,localHelp:()=>open("Ask the community","What local information do you need?",form("simpleForm",sel("Topic","topic",["Transport","University services","Shops and essentials","Living in Cesena","Other"])+`<label>Your question<textarea name="question" required></textarea></label>`,"Save demo request"))
};
document.addEventListener("click",e=>{
 const a=e.target.closest("[data-open]");if(a)modals[a.dataset.open]?.();
 const j=e.target.closest("[data-join]");if(j){const g=state.groups.find(x=>x.id===j.dataset.join);if(g){g.joined=true;save();renderGroups();say("Demo join request saved.");}}
 const f=e.target.closest(".heart");if(f){f.classList.toggle("saved");f.textContent=f.classList.contains("saved")?"♥":"♡";say(f.classList.contains("saved")?"Saved":"Removed");}
 if(e.target.closest("#createGroup"))createGroup();
 if(e.target.closest("#openChat"))chat();
 if(e.target.closest("#planSession"))session();
 if(e.target.closest("#demoRequest")){dialog.close();say("Demo seat request saved.");}
});
document.addEventListener("submit",e=>{const f=e.target;if(!f.id)return;e.preventDefault();const d=Object.fromEntries(new FormData(f));
 if(f.id==="rideForm"){$("#rideResult").textContent=`Demo search: ${d.from} → ${d.to}. Example journeys are shown below.`;say("Search complete.");return}
 if(f.id==="groupForm"){state.groups.unshift({id:"g"+Date.now(),subject:d.subject,name:d.name,desc:d.desc,members:1,when:d.when||"To be agreed",place:d.place||"To be agreed",joined:true});save();renderGroups();dialog.close();say("Demo group created.");return}
 if(f.id==="chatForm"){state.messages.push({text:d.message,mine:true});save();dialog.close();chat();return}
 if(f.id==="sessionForm"){state.sessions.push(d);save();dialog.close();say("Demo session saved.");return}
 dialog.close();say("Thanks! Demo action completed locally.");
});
$("#menuToggle").addEventListener("click",()=>$("#nav").classList.toggle("open"));$$('#nav a').forEach(a=>a.addEventListener("click",()=>$("#nav").classList.remove("open")));
$("#closeDialog").addEventListener("click",()=>dialog.close());dialog.addEventListener("click",e=>{if(e.target===dialog)dialog.close()});
$("#filters").addEventListener("click",e=>{const b=e.target.closest("[data-filter]");if(!b)return;$$(".filter").forEach(x=>x.classList.toggle("active",x===b));$$(".product").forEach(p=>p.hidden=b.dataset.filter!=="All"&&p.dataset.category!==b.dataset.filter)});
$("#groupQuery").addEventListener("input",renderGroups);$("#subjectFilter").addEventListener("change",renderGroups);
$$("[data-tab]").forEach(t=>t.addEventListener("click",()=>{$$("[data-tab]").forEach(x=>x.classList.toggle("active",x===t));const k=t.dataset.tab;
 if(k==="groups"){ $("#studyTitle").textContent="Find your study group";$("#studyDesc").textContent="Explore groups or start one of your own.";$ ("#createGroup").hidden=false;$("#studySearch").hidden=false;$("#groupCards").hidden=false;renderGroups();}
 if(k==="partners"){ $("#studyTitle").textContent="Find a study partner";$("#studyDesc").textContent="Meet students with similar subjects and goals.";$("#createGroup").hidden=true;$("#studySearch").hidden=true;$("#groupCards").hidden=false;$("#emptyGroups").hidden=true;$("#groupCards").innerHTML=`<article class="study-card"><span class="pill mint-bg">Database Systems</span><h3>Alex · Cesena</h3><p>Interested in SQL practice and exam preparation.</p><div class="study-meta">◷ Wed afternoons · ⌖ Cesena</div><button class="btn outline full" data-partner>Send demo message</button></article><article class="study-card"><span class="pill lavender-bg">Web Development</span><h3>Sara · Forlì</h3><p>Learning HTML, CSS and JavaScript.</p><div class="study-meta">◷ Thu evenings · ⌖ Online</div><button class="btn outline full" data-partner>Send demo message</button></article>`;}
 if(k==="sessions"){ $("#studyTitle").textContent="Study sessions";$("#studyDesc").textContent="Plan a time and place to meet.";$("#createGroup").hidden=true;$("#studySearch").hidden=true;$("#groupCards").hidden=false;$("#emptyGroups").hidden=true;$("#groupCards").innerHTML=state.sessions.length?state.sessions.map(s=>`<article class="study-card"><span class="pill blue-bg">Planned session</span><h3>${esc(s.title)}</h3><p>${esc(s.details)}</p><div class="study-meta">◷ ${esc(s.date)} · ${esc(s.time)} · ⌖ ${esc(s.place)}</div></article>`).join(""):`<p class="empty">No sessions yet. Use “Plan a study session” below.</p>`;}
}));
document.addEventListener("click",e=>{if(e.target.closest("[data-partner]"))open("Message a study partner","Private messaging will be available with accounts.",form("simpleForm",`<label>Message<textarea name="message" required placeholder="Would you like to study together?"></textarea></label>`,"Send demo message"))});
$("#year").textContent=new Date().getFullYear();renderGroups();

document.addEventListener("submit",e=>{
 if(e.target.id==="contactForm"){
  e.preventDefault();e.target.reset();
  const t=document.querySelector("#toast");
  if(t){t.textContent="Thank you for your feedback! This demo does not send messages yet.";t.classList.add("show");setTimeout(()=>t.classList.remove("show"),3200);}
 }
});
