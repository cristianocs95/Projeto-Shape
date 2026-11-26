const KEY = "projetoShape_v4";

const TEMPLATES = {
  futsal: {
    name: "Híbrido Musculação + Futsal",
    days: [
      { day: "Segunda", title: "Peito, ombros e tríceps", tag: "Musculação", exercises: "• Supino reto: 4x10\n• Supino inclinado halteres: 3x12\n• Desenvolvimento militar: 3x10\n• Elevação lateral: 4x15\n• Tríceps pulley: 3x12" },
      { day: "Terça", title: "Futsal competitivo à noite", tag: "Esporte", exercises: "• Aquecimento articular + mobilidade 15min\n• Jogo de futsal (alta intensidade)" },
      { day: "Quarta", title: "Costas e bíceps", tag: "Musculação", exercises: "• Puxada frontal aberta: 4x10\n• Remada curvada: 4x10\n• Remada baixa triângulo: 3x12\n• Rosca direta barra: 3x10\n• Rosca alternada: 3x12" },
      { day: "Quinta", title: "Futsal competitivo à noite", tag: "Esporte", exercises: "• Aquecimento + agilidade\n• Jogo de futsal" },
      { day: "Sexta", title: "Recuperação ativa e abdômen", tag: "Leve", exercises: "• Prancha abdominal: 4x45s\n• Abdominal infra: 3x15\n• Alongamento e liberação miofascial" },
      { day: "Sábado", title: "Pernas completas (volume moderado)", tag: "Musculação", exercises: "• Agachamento livre: 4x10\n• Leg press 45°: 3x12\n• Cadeira extensora: 3x12\n• Mesa flexora: 3x12\n• Panturrilha em pé: 4x15" },
      { day: "Domingo", title: "Descanso e recuperação", tag: "Descanso", exercises: "• Descanso total e hidratação" }
    ]
  },
  abc: {
    name: "ABC Clássico (Push / Pull / Legs)",
    days: [
      { day: "Segunda", title: "Treino A — Empurrar (Peito/Ombro/Tríceps)", tag: "Musculação", exercises: "• Supino reto: 4x8-10\n• Supino inclinado: 3x10-12\n• Desenvolvimento: 4x10\n• Elevação lateral: 4x12-15\n• Tríceps francês: 3x12" },
      { day: "Terça", title: "Treino B — Puxar (Costas/Bíceps/Posterior)", tag: "Musculação", exercises: "• Barra fixa ou puxada: 4x10\n• Remada curvada: 4x10\n• Crucifixo inverso: 3x15\n• Rosca direta: 4x10\n• Rosca martelo: 3x12" },
      { day: "Quarta", title: "Treino C — Pernas Completas", tag: "Musculação", exercises: "• Agachamento: 4x8-10\n• Stiff: 4x10\n• Leg press: 3x12\n• Cadeira flexora: 3x12\n• Panturrilha: 4x15" },
      { day: "Quinta", title: "Treino A — Empurrar (Foco Hipertrofia)", tag: "Musculação", exercises: "• Supino inclinado halteres: 4x10\n• Crucifixo máquina: 3x12\n• Elevação lateral polia: 4x15\n• Tríceps corda: 4x12" },
      { day: "Sexta", title: "Treino B — Puxar (Foco Densidade)", tag: "Musculação", exercises: "• Remada unilateral: 4x10\n• Puxada triângulo: 3x12\n• Encolhimento: 3x12\n• Rosca Scott: 3x12" },
      { day: "Sábado", title: "Treino C — Pernas & Abdômen", tag: "Musculação", exercises: "• Agachamento hack: 4x10\n• Afundo: 3x12 cada perna\n• Extensora: 3x15\n• Abdominal supra + prancha: 4 séries" },
      { day: "Domingo", title: "Descanso total", tag: "Descanso", exercises: "• Recuperação muscular" }
    ]
  },
  ab: {
    name: "AB Superior / Inferior (4x Semana)",
    days: [
      { day: "Segunda", title: "Treino A — Superiores Completo", tag: "Musculação", exercises: "• Supino reto: 4x10\n• Remada curvada: 4x10\n• Desenvolvimento: 3x12\n• Puxada frontal: 3x12\n• Bíceps + Tríceps bi-set: 3x12" },
      { day: "Terça", title: "Treino B — Inferiores Completo", tag: "Musculação", exercises: "• Agachamento livre: 4x10\n• Stiff: 4x10\n• Leg press 45°: 3x12\n• Mesa flexora: 3x12\n• Panturrilhas: 4x15" },
      { day: "Quarta", title: "Descanso Ativo / Cardio Leve", tag: "Cardio", exercises: "• Caminhada inclinada ou bike 30min\n• Mobilidade" },
      { day: "Quinta", title: "Treino A2 — Superiores", tag: "Musculação", exercises: "• Supino inclinado: 4x10\n• Remada baixa: 4x10\n• Elevação lateral: 4x15\n• Rosca direta + Tríceps testa: 3x12" },
      { day: "Sexta", title: "Treino B2 — Inferiores & Core", tag: "Musculação", exercises: "• Levantamento terra ou RDL: 4x8\n• Cadeira extensora: 4x12\n• Cadeira flexora: 4x12\n• Prancha abdominal: 4x1min" },
      { day: "Sábado", title: "Esporte ou Cardio Livre", tag: "Cardio", exercises: "• Atividade recreativa ou corrida leve" },
      { day: "Domingo", title: "Descanso", tag: "Descanso", exercises: "• Descanso completo" }
    ]
  },
  fullbody: {
    name: "Full Body 3x (Iniciante / Condicionamento)",
    days: [
      { day: "Segunda", title: "Full Body A", tag: "Musculação", exercises: "• Agachamento globular ou livre: 3x12\n• Supino reto: 3x12\n• Puxada frontal: 3x12\n• Desenvolvimento halteres: 3x12\n• Prancha: 3x40s" },
      { day: "Terça", title: "Cardio Moderado", tag: "Cardio", exercises: "• 30 a 40 min de esteira, bike ou caminhada rápida" },
      { day: "Quarta", title: "Full Body B", tag: "Musculação", exercises: "• Leg press: 3x12\n• Remada baixa: 3x12\n• Supino inclinado: 3x12\n• Mesa flexora: 3x12\n• Rosca direta + Tríceps pulley: 2x15" },
      { day: "Quinta", title: "Cardio Moderado", tag: "Cardio", exercises: "• 30 a 40 min de atividade aeróbica" },
      { day: "Sexta", title: "Full Body C", tag: "Musculação", exercises: "• Stiff: 3x12\n• Puxada triângulo: 3x12\n• Crucifixo máquina: 3x12\n• Elevação lateral: 3x15\n• Abdominal supra: 3x15" },
      { day: "Sábado", title: "Alongamento / Livre", tag: "Leve", exercises: "• Mobilidade articular" },
      { day: "Domingo", title: "Descanso", tag: "Descanso", exercises: "• Recuperação" }
    ]
  },
  emagrecimento: {
    name: "Emagrecimento & Definição",
    days: [
      { day: "Segunda", title: "Superiores + HIIT 15min", tag: "Musculação", exercises: "• Supino reto: 3x15\n• Remada baixa: 3x15\n• Desenvolvimento: 3x15\n• HIIT: 10 tiros de 30s forte / 60s leve" },
      { day: "Terça", title: "Cardio Contínuo + Core", tag: "Cardio", exercises: "• 45min corrida leve ou caminhada inclinada\n• Circuito abdominal: 4 voltas" },
      { day: "Quarta", title: "Inferiores Metabólico", tag: "Musculação", exercises: "• Agachamento: 4x15\n• Afundo: 3x12 cada perna\n• Leg press: 3x15\n• Mesa flexora: 3x15" },
      { day: "Quinta", title: "Funcional / Condicionamento", tag: "Funcional", exercises: "• Polichinelos, burpees, corda naval, agachamento com salto (4 rounds)" },
      { day: "Sexta", title: "Full Body Queima Calórica", tag: "Musculação", exercises: "• Circuito sem descanso longo: Puxada + Flexão + Agachamento + Remada (4 séries de 15)" },
      { day: "Sábado", title: "Cardio Longo", tag: "Cardio", exercises: "• 50min bike, corrida ou esporte" },
      { day: "Domingo", title: "Descanso", tag: "Descanso", exercises: "• Recuperação e hidratação" }
    ]
  },
  blank: {
    name: "Ficha Personalizada",
    days: [
      { day: "Segunda", title: "Treino A", tag: "Musculação", exercises: "• Toque para adicionar exercícios..." },
      { day: "Terça", title: "Treino B", tag: "Musculação", exercises: "• Toque para adicionar exercícios..." },
      { day: "Quarta", title: "Treino C", tag: "Musculação", exercises: "• Toque para adicionar exercícios..." },
      { day: "Quinta", title: "Treino D", tag: "Musculação", exercises: "• Toque para adicionar exercícios..." },
      { day: "Sexta", title: "Treino E", tag: "Musculação", exercises: "• Toque para adicionar exercícios..." },
      { day: "Sábado", title: "Cardio / Livre", tag: "Cardio", exercises: "" },
      { day: "Domingo", title: "Descanso", tag: "Descanso", exercises: "" }
    ]
  }
};

function cloneRoutine(templateKey, customName) {
  const tpl = TEMPLATES[templateKey] || TEMPLATES.futsal;
  return {
    id: "rt_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 5),
    name: customName || tpl.name,
    days: JSON.parse(JSON.stringify(tpl.days))
  };
}

const initialRoutine = cloneRoutine("futsal", "Híbrido Musculação + Futsal");

const defaults =const defaults = {
  isActivated: false,

  name: "Cristiano",
  age: 30,
  gender: "Masculino",

  weight: 76,
  height: 173,

  bodyFat: 15,

  activityLevel: "Moderado",
  experience: "Intermediário",
  daysPerWeek: 5,

  goal: "Hipertrofia",

  targetWeight: 82,
  targetBodyFat: 12,

  goals: [],
  achievements: [],
  exerciseHistory: [],

  routines: [initialRoutine],
  activeRoutineId: initialRoutine.id,

  foods: [],
  weights: [],
  workouts: [],
  photos: [],
  measures: []
};

let data = load();
let editingDayIndex = null;

function load() {
  try {
    const raw = localStorage.getItem(KEY) || localStorage.getItem("projetoShape_v3") || localStorage.getItem("projetoShape_v2") || localStorage.getItem("projetoShape_v1");
    if (!raw) return { ...defaults };
    const parsed = JSON.parse(raw);

    if (parsed.measures && !Array.isArray(parsed.measures)) {
      parsed.measures = parsed.measures.date ? [parsed.measures] : [];
    }
    if (!parsed.routines || !Array.isArray(parsed.routines) || !parsed.routines.length) {
      const defRt = cloneRoutine("futsal", "Híbrido Musculação + Futsal");
      parsed.routines = [defRt];
      parsed.activeRoutineId = defRt.id;
    }
    return { ...defaults, ...parsed };
  } catch (e) {
    return { ...defaults };
  }
}

function getActiveRoutine() {
  return data.routines.find(r => r.id === data.activeRoutineId) || data.routines[0];
}

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
    render();
  } catch (e) {
    notify("Armazenamento cheio! Exporte um backup e apague fotos antigas.", true);
  }
}

function today() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatDateBR(iso) {
  if (!iso || !iso.includes("-")) return iso || "";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

function dayName() {
  return ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"][new Date().getDay()];
}

function notify(msg, isError = false) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.style.borderColor = isError ? "#ef4444" : "#3b82f6";
  el.classList.add("show");
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => el.classList.remove("show"), 2800);
}

function showPage(id) {
  document.querySelectorAll(".page").forEach(x => x.classList.toggle("active", x.id === id));
  document.querySelectorAll(".nav").forEach(x => x.classList.toggle("active", x.dataset.page === id));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openPixModal() {
  document.getElementById("pixModal").style.display = "flex";
}

function closePixModal() {
  document.getElementById("pixModal").style.display = "none";
}

function copyPixKey() {
  navigator.clipboard.writeText("11994074416").then(() => {
    notify("Chave PIX copiada com sucesso!");
  }).catch(() => {
    notify("Erro ao copiar chave.", true);
  });
}

function simulateActivation() {
  data.isActivated = true;
  persist();
  closePixModal();
  notify("Aplicativo ativado com sucesso!");
  checkAuth();
}

function lockApp() {
  if (confirm("Deseja bloquear o aplicativo e retornar à tela de vendas?")) {
    data.isActivated = false;
    persist();
    checkAuth();
    notify("Aplicativo bloqueado.");
  }
}

function checkAuth() {
  const authScreen = document.getElementById("authScreen");
  const appMain = document.getElementById("appMainContent");
  if (data.isActivated) {
    authScreen.style.display = "none";
    appMain.style.display = "block";
    render();
  } else {
    authScreen.style.display = "flex";
    appMain.style.display = "none";
  }
}

function render() {
  if (!data.isActivated) return;

  const currentDay = dayName();
  const todayStr = today();
  const routine = getActiveRoutine();

  document.getElementById("dashName").textContent = data.name || "Atleta";
  document.getElementById("dashWeight").innerHTML = `${Number(data.weight).toFixed(1).replace(".", ",")} <i>kg</i>`;
  const hMeters = (Number(data.height || 173) / 100).toFixed(2).replace(".", ",");
  document.getElementById("dashHeight").innerHTML = `${hMeters} <i>m</i>`;
  document.getElementById("dashGoal").textContent = data.goal || "Hipertrofia";

  const foodsToday = data.foods.filter(x => x.date === todayStr);
  const cal = foodsToday.reduce((a, x) => a + Number(x.cal || 0), 0);
  const pro = foodsToday.reduce((a, x) => a + Number(x.pro || 0), 0);
  document.getElementById("calToday").textContent = Math.round(cal);
  document.getElementById("proteinToday").textContent = `${pro.toFixed(0)}g`;
  document.getElementById("calTotal").innerHTML = `${Math.round(cal)} <i>kcal</i>`;
  document.getElementById("proteinTotal").innerHTML = `${pro.toFixed(1).replace(".0", "")} <i>g</i>`;

  document.getElementById("todayLabel").textContent = currentDay;
  const todayObj = routine.days.find(x => x.day === currentDay);
  document.getElementById("todayWorkout").textContent = todayObj ? todayObj.title : "Consulte sua agenda";
  document.getElementById("todayDesc").textContent = todayObj && todayObj.exercises
    ? todayObj.exercises.split("\n").slice(0, 2).join(" • ")
    : "Confira os exercícios da sua ficha ativa.";

  const rtSelect = document.getElementById("activeRoutineSelect");
  rtSelect.innerHTML = data.routines.map(r =>
    `<option value="${r.id}" ${r.id === routine.id ? "selected" : ""}>${esc(r.name)}</option>`
  ).join("");

  document.getElementById("weekPlan").innerHTML = routine.days.map((x, idx) => {
    const isToday = x.day === currentDay;
    const tagClass = (x.tag === "Esporte" || x.tag === "Futsal") ? "sport" : (x.tag === "Descanso" ? "rest" : "");
    return `
      <div class="day ${isToday ? "today-highlight" : ""}" onclick="openDayEditor(${idx})">
        <div class="day-top">
          <div>
            <b>${esc(x.day)} ${isToday ? "• Hoje" : ""}</b>
            <small>${esc(x.title)}</small>
          </div>
          <span class="tag ${tagClass}">${esc(x.tag)}</span>
        </div>
        ${x.exercises ? `<div class="day-exercises">${esc(x.exercises)}</div>` : ""}
        <span class="edit-hint">✎ Toque para editar dia e exercícios</span>
      </div>`;
  }).join("");

  const selectEl = document.getElementById("workoutSelect");
  selectEl.innerHTML = routine.days.map(x => `<option>${esc(x.day)} — ${esc(x.title)}</option>`).join("");
  const todayIdx = routine.days.findIndex(x => x.day === currentDay);
  if (todayIdx >= 0) selectEl.selectedIndex = todayIdx;

  document.getElementById("foodList").innerHTML = foodsToday.length
    ? foodsToday.map(x => `
      <div class="entry">
        <div>
          <b>${esc(x.name)}</b><br>
          <small>${x.cal} kcal · ${x.pro} g proteína</small>
        </div>
        <button class="del-item" onclick="deleteFood('${x.id}')">Excluir</button>
      </div>`).join("")
    : "Nenhum registro alimentar hoje.";

  document.getElementById("workoutHistory").innerHTML = data.workouts.length
    ? data.workouts.slice().reverse().slice(0, 15).map((x, idx) => {
      const realIndex = data.workouts.length - 1 - idx;
      return `
        <div class="entry">
          <div>
            <b>${formatDateBR(x.date)}</b> · ${esc(x.name)}<br>
            <small>${esc(x.note || "Treino concluído")}</small>
          </div>
          <button class="del-item" onclick="deleteWorkout(${realIndex})">Excluir</button>
        </div>`;
    }).join("")
    : "Nenhum treino registrado ainda.";

  document.getElementById("weightHistory").innerHTML = data.weights.length
    ? data.weights.slice().reverse().map((x, idx) => {
      const realIndex = data.weights.length - 1 - idx;
      return `
        <div class="entry">
          <div><b>${formatDateBR(x.date)}</b> · ${Number(x.value).toFixed(1).replace(".", ",")} kg</div>
          <button class="del-item" onclick="deleteWeight(${realIndex})">Excluir</button>
        </div>`;
    }).join("")
    : "Ainda sem registros de peso.";

  document.getElementById("measureHistory").innerHTML = data.measures.length
    ? data.measures.slice().reverse().map((m, idx) => {
      const realIndex = data.measures.length - 1 - idx;
      const parts = [];
      if (m.waist) parts.push(`Cintura: ${m.waist}cm`);
      if (m.chest) parts.push(`Peito: ${m.chest}cm`);
      if (m.arm) parts.push(`Braço: ${m.arm}cm`);
      if (m.thigh) parts.push(`Coxa: ${m.thigh}cm`);
      return `
        <div class="entry">
          <div>
            <b>${formatDateBR(m.date)}</b><br>
            <small>${parts.join(" · ") || "Sem valores"}</small>
          </div>
          <button class="del-item" onclick="deleteMeasure(${realIndex})">Excluir</button>
        </div>`;
    }).join("")
    : "<small>Nenhuma medida salva ainda.</small>";

  document.getElementById("photoGrid").innerHTML = data.photos.map((x, i) => `
    <div class="photoitem">
      <img src="${x.src}" alt="Progresso">
      <small>
        <span>${formatDateBR(x.date)}</span>
        <button class="textbtn danger-text" onclick="deletePhoto(${i})">Excluir</button>
      </small>
    </div>`).join("");

  document.getElementById("profileName").value = data.name || "Cristiano";
  document.getElementById("profileHeight").value = data.height || 173;
  document.getElementById("profileGoal").value = data.goal || "Hipertrofia";
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

function toggleRoutineModal(show) {
  document.getElementById("routineModal").style.display = show ? "flex" : "none";
  if (show) document.getElementById("newRoutineName").value = "";
}

function createNewRoutine() {
  const tplKey = document.getElementById("routineTemplate").value;
  const customName = document.getElementById("newRoutineName").value.trim();
  const newRt = cloneRoutine(tplKey, customName || undefined);
  data.routines.push(newRt);
  data.activeRoutineId = newRt.id;
  closeDayEditor();
  toggleRoutineModal(false);
  persist();
  notify(`Ficha "${newRt.name}" criada!`);
}

function switchRoutine(id) {
  data.activeRoutineId = id;
  closeDayEditor();
  persist();
  notify("Ficha alterada!");
}

function deleteCurrentRoutine() {
  if (data.routines.length <= 1) {
    notify("Você precisa manter pelo menos uma ficha ativa.", true);
    return;
  }
  const current = getActiveRoutine();
  if (confirm(`Excluir a ficha "${current.name}"?`)) {
    data.routines = data.routines.filter(r => r.id !== current.id);
    data.activeRoutineId = data.routines[0].id;
    closeDayEditor();
    persist();
    notify("Ficha excluída.");
  }
}

function openDayEditor(idx) {
  editingDayIndex = idx;
  const routine = getActiveRoutine();
  const item = routine.days[idx];
  document.getElementById("editorDayTitle").textContent = `Editar ${item.day}`;
  document.getElementById("editDayTitle").value = item.title;
  document.getElementById("editDayTag").value = item.tag;
  document.getElementById("editDayExercises").value = item.exercises || "";
  const card = document.getElementById("dayEditorCard");
  card.style.display = "block";
  card.scrollIntoView({ behavior: "smooth", block: "center" });
}

function closeDayEditor() {
  editingDayIndex = null;
  document.getElementById("dayEditorCard").style.display = "none";
}

function saveDayEdit() {
  if (editingDayIndex === null) return;
  const routine = getActiveRoutine();
  const title = document.getElementById("editDayTitle").value.trim() || "Treino";
  const tag = document.getElementById("editDayTag").value;
  const exercises = document.getElementById("editDayExercises").value.trim();

  routine.days[editingDayIndex].title = title;
  routine.days[editingDayIndex].tag = tag;
  routine.days[editingDayIndex].exercises = exercises;

  closeDayEditor();
  persist();
  notify("Dia atualizado na ficha!");
}

function addFood() {
  const name = document.getElementById("foodName").value.trim();
  const cal = Number(document.getElementById("foodCal").value);
  const pro = Number(document.getElementById("foodProtein").value);

  if (!name || cal < 0 || pro < 0 || !Number.isFinite(cal) || !Number.isFinite(pro)) {
    notify("Preencha descrição, calorias e proteína corretamente.", true);
    return;
  }

  data.foods.push({
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    name,
    cal,
    pro,
    date: today()
  });

  ["foodName", "foodCal", "foodProtein"].forEach(id => document.getElementById(id).value = "");
  persist();
  notify("Refeição adicionada!");
}

function deleteFood(id) {
  data.foods = data.foods.filter(x => x.id !== id);
  persist();
  notify("Registro removido.");
}

function clearFood() {
  if (confirm("Apagar todos os registros alimentares de hoje?")) {
    data.foods = data.foods.filter(x => x.date !== today());
    persist();
    notify("Diário de hoje limpo.");
  }
}

function saveWorkout() {
  const name = document.getElementById("workoutSelect").value;
  const note = document.getElementById("workoutNote").value.trim();
  data.workouts.push({ date: today(), name, note });
  document.getElementById("workoutNote").value = "";
  persist();
  notify("Treino registrado com sucesso!");
}

function deleteWorkout(index) {
  if (confirm("Remover este registro de treino?")) {
    data.workouts.splice(index, 1);
    persist();
  }
}

function addWeight() {
  const v = Number(document.getElementById("weightInput").value);
  const d = document.getElementById("weightDate").value || today();
  if (!v || v < 25 || v > 350) {
    notify("Informe um peso válido entre 25 kg e 350 kg.", true);
    return;
  }
  data.weights.push({ value: v, date: d });
  data.weights.sort((a, b) => a.date.localeCompare(b.date));
  data.weight = data.weights[data.weights.length - 1].value;
  document.getElementById("weightInput").value = "";
  persist();
  notify("Peso registrado!");
}

function deleteWeight(index) {
  if (confirm("Excluir este registro de peso?")) {
    data.weights.splice(index, 1);
    if (data.weights.length) {
      data.weight = data.weights[data.weights.length - 1].value;
    }
    persist();
  }
}

function saveMeasures() {
  const waist = document.getElementById("waist").value;
  const chest = document.getElementById("chest").value;
  const arm = document.getElementById("arm").value;
  const thigh = document.getElementById("thigh").value;

  if (!waist && !chest && !arm && !thigh) {
    notify("Preencha pelo menos uma medida.", true);
    return;
  }

  data.measures.push({ waist, chest, arm, thigh, date: today() });
  ["waist", "chest", "arm", "thigh"].forEach(id => document.getElementById(id).value = "");
  persist();
  notify("Medidas corporais salvas!");
}

function deleteMeasure(index) {
  if (confirm("Excluir este registro de medidas?")) {
    data.measures.splice(index, 1);
    persist();
  }
}

function compressImage(file, maxWidth = 900, quality = 0.78) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let w = img.width;
        let h = img.height;
        if (w > maxWidth) {
          h = Math.round((h * maxWidth) / w);
          w = maxWidth;
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function addPhoto() {
  const input = document.getElementById("photoInput");
  const f = input.files[0];
  const d = document.getElementById("photoDate").value || today();

  if (!f) {
    notify("Selecione uma foto primeiro.", true);
    return;
  }

  try {
    notify("Otimizando foto...");
    const compressed = await compressImage(f);
    data.photos.push({ src: compressed, date: d });
    input.value = "";
    persist();
    notify("Foto salva na galeria!");
  } catch (e) {
    notify("Erro ao processar imagem.", true);
  }
}

function deletePhoto(i) {
  if (confirm("Excluir esta foto permanentemente?")) {
    data.photos.splice(i, 1);
    persist();
    notify("Foto excluída.");
  }
}

function saveProfile() {
  data.name = document.getElementById("profileName").value.trim() || "Cristiano";
  data.height = Number(document.getElementById("profileHeight").value) || 173;
  data.goal = document.getElementById("profileGoal").value;
  persist();
  notify("Perfil atualizado!");
}

function exportData() {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const u = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = u;
  a.download = `projeto-shape-backup-${today()}.json`;
  a.click();
  URL.revokeObjectURL(u);
  notify("Backup exportado!");
}

function importData() {
  const f = document.getElementById("importFile").files[0];
  if (!f) {
    notify("Escolha um arquivo .json primeiro.", true);
    return;
  }
  const r = new FileReader();
  r.onload = () => {
    try {
      const parsed = JSON.parse(r.result);
      data = { ...defaults, ...parsed };
      persist();
      notify("Dados restaurados com sucesso!");
      checkAuth();
    } catch (e) {
      notify("Arquivo de backup inválido.", true);
    }
  };
  r.readAsText(f);
}

function resetData() {
  if (confirm("ATENÇÃO: Isso apagará todos os seus treinos, fichas, pesos, refeições e fotos deste dispositivo. Continuar?")) {
    localStorage.clear();
    data = { ...defaults };
    persist();
    checkAuth();
    notify("Dados apagados.");
  }
}

document.getElementById("weightDate").value = today();
document.getElementById("photoDate").value = today();

// Iniciar verificando autenticação/ativação
checkAuth();

if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  navigator.serviceWorker.register("./sw.js").catch(() => {});
}
