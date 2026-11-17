const KEY="projetoShape_v1";
const defaults={weight:76,height:173,goal:"Hipertrofia e definição",foods:[],weights:[],workouts:[],photos:[],measures:{}};
let data=load();
function load(){try{return {...defaults,...JSON.parse(localStorage.getItem(KEY)||"{}")}}catch(e){return {...defaults}}}
function persist(){localStorage.setItem(KEY,JSON.stringify(data));render()}
function today(){return new Date().toISOString().slice(0,10)}
function dayName(){return ["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"][new Date().getDay()]}
const plan=[["Segunda","Peito, ombros e tríceps","Musculação"],["Terça","Futsal competitivo à noite","Futsal"],["Quarta","Costas e bíceps","Musculação"],["Quinta","Futsal competitivo à noite","Futsal"],["Sexta","Recuperação ativa e abdômen","Leve"],["Sábado","Pernas completas (volume moderado)","Musculação"],["Domingo","Descanso e recuperação","Descanso"]];
function showPage(id){document.querySelectorAll(".page").forEach(x=>x.classList.toggle("active",x.id===id));document.querySelectorAll(".nav").forEach(x=>x.classList.toggle("active",x.dataset.page===id));window.scrollTo(0,0)}
function render(){
 const foods=data.foods.filter(x=>x.date===today()),cal=foods.reduce((a,x)=>a+x.cal,0),pro=foods.reduce((a,x)=>a+x.pro,0);
 document.getElementById("dashWeight").innerHTML=`${Number(data.weight).toFixed(1).replace(".",",")} <i>kg</i>`;
 document.getElementById("calToday").textContent=cal;document.getElementById("proteinToday").textContent=pro+"g";
 document.getElementById("calTotal").innerHTML=`${cal} <i>kcal</i>`;document.getElementById("proteinTotal").innerHTML=`${pro} <i>g</i>`;
 document.getElementById("todayLabel").textContent=dayName();
 let p=plan.find(x=>x[0]===dayName());document.getElementById("todayWorkout").textContent=p?p[1]:"Consulte sua agenda";document.getElementById("todayDesc").textContent=p&&p[2]==="Futsal"?"Jogo competitivo. Evite musculação pesada hoje.":"Confira os exercícios e respeite sua recuperação.";
 document.getElementById("weekPlan").innerHTML=plan.map(x=>`<div class="day"><div><b>${x[0]}</b><small>${x[1]}</small></div><span class="tag ${x[2]==="Futsal"?"sport":""}">${x[2]}</span></div>`).join("");
 document.getElementById("workoutSelect").innerHTML=plan.map(x=>`<option>${x[0]} — ${x[1]}</option>`).join("");
 document.getElementById("foodList").innerHTML=foods.length?foods.map(x=>`<div class="entry"><b>${esc(x.name)}</b><br>${x.cal} kcal · ${x.pro} g proteína</div>`).join(""):"Nenhum registro ainda.";
 document.getElementById("workoutHistory").innerHTML=data.workouts.slice().reverse().slice(0,8).map(x=>`<div class="entry"><b>${x.date}</b> · ${esc(x.name)}<br>${esc(x.note||"Treino registrado")}</div>`).join("")||"Nenhum treino registrado ainda.";
 document.getElementById("weightHistory").innerHTML=data.weights.slice().reverse().map(x=>`<div class="entry"><b>${x.date}</b> · ${x.value} kg</div>`).join("")||"Ainda sem registros.";
 document.getElementById("photoGrid").innerHTML=data.photos.map((x,i)=>`<div class="photoitem"><img src="${x.src}" alt="Foto de progresso"><small>${x.date} <button class="textbtn" onclick="deletePhoto(${i})">Excluir</button></small></div>`).join("");
 document.getElementById("profileName").value=data.name||"Cristiano";document.getElementById("profileHeight").value=data.height;document.getElementById("profileGoal").value=data.goal;
}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function addFood(){let name=document.getElementById("foodName").value.trim(),cal=Number(document.getElementById("foodCal").value),pro=Number(document.getElementById("foodProtein").value);if(!name||cal<0||pro<0||!Number.isFinite(cal)||!Number.isFinite(pro)){alert("Preencha descrição, calorias e proteína.");return}data.foods.push({name,cal,pro,date:today()});["foodName","foodCal","foodProtein"].forEach(id=>document.getElementById(id).value="");persist()}
function clearFood(){if(confirm("Apagar os registros de alimentação de hoje?")){data.foods=data.foods.filter(x=>x.date!==today());persist()}}
function saveWorkout(){data.workouts.push({date:today(),name:document.getElementById("workoutSelect").value,note:document.getElementById("workoutNote").value});document.getElementById("workoutNote").value="";persist();alert("Treino registrado!")}
function addWeight(){let v=Number(document.getElementById("weightInput").value),d=document.getElementById("weightDate").value||today();if(!v||v<20||v>350){alert("Informe um peso válido.");return}data.weight=v;data.weights.push({value:v,date:d});document.getElementById("weightInput").value="";persist()}
function saveMeasures(){data.measures={waist:document.getElementById("waist").value,chest:document.getElementById("chest").value,arm:document.getElementById("arm").value,thigh:document.getElementById("thigh").value,date:today()};document.getElementById("measureStatus").textContent="Medidas salvas neste aparelho.";persist()}
function addPhoto(){let f=document.getElementById("photoInput").files[0],d=document.getElementById("photoDate").value||today();if(!f){alert("Escolha uma foto.");return}if(f.size>5*1024*1024){alert("Escolha uma foto de até 5 MB.");return}let r=new FileReader();r.onload=()=>{data.photos.push({src:r.result,date:d});persist();document.getElementById("photoInput").value=""};r.readAsDataURL(f)}
function deletePhoto(i){if(confirm("Excluir esta foto?")){data.photos.splice(i,1);persist()}}
function saveProfile(){data.name=document.getElementById("profileName").value;data.height=Number(document.getElementById("profileHeight").value)||173;data.goal=document.getElementById("profileGoal").value;persist();alert("Perfil salvo.")}
function exportData(){let a=document.createElement("a"),u=URL.createObjectURL(new Blob([JSON.stringify(data)],{type:"application/json"}));a.href=u;a.download="projeto-shape-backup.json";a.click();URL.revokeObjectURL(u)}
function importData(){let f=document.getElementById("importFile").files[0];if(!f)return alert("Escolha um arquivo JSON.");let r=new FileReader();r.onload=()=>{try{data={...defaults,...JSON.parse(r.result)};persist();alert("Dados importados.")}catch(e){alert("Arquivo inválido.")}};r.readAsText(f)}
function resetData(){if(confirm("Isso apagará os dados salvos neste navegador. Deseja continuar?")){localStorage.removeItem(KEY);data={...defaults};persist()}}
document.getElementById("weightDate").value=today();document.getElementById("photoDate").value=today();render();
if("serviceWorker" in navigator && location.protocol.startsWith("http"))navigator.serviceWorker.register("./sw.js").catch(()=>{});
