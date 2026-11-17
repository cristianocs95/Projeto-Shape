const KEY = "projetoShape_v2";
const defaults = {
  name: "Cristiano",
  weight: 76.0,
  height: 173,
  goal: "Hipertrofia",
  foods: [],
  weights: [],
  workouts: [],
  photos: [],
  measures: []
};

let data = load();

function load() {
  try {
    const raw = localStorage.getItem(KEY) || localStorage.getItem("projetoShape_v1");
    if (!raw) return { ...defaults };
    const parsed = JSON.parse(raw);
    // Migração segura caso measures fosse objeto na v1
    if (parsed.measures && !Array.isArray(parsed.measures)) {
      parsed.measures = parsed.measures.date ? [parsed.measures] : [];
    }
    return { ...defaults, ...parsed };
  } catch (e) {
    return { ...defaults };
  }
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

const plan = [
  ["Segunda", "Peito, ombros e tríceps", "Musculação"],
  ["Terça", "Futsal competitivo à noite", "Futsal"],
  ["Quarta", "Costas e bíceps", "Musculação"],
  ["Quinta", "Futsal competitivo à noite", "Futsal"],
  ["Sexta", "Recuperação ativa e abdômen", "Leve"],
  ["Sábado", "Pernas completas (volume moderado)", "Musculação"],
  ["Domingo", "Descanso e recuperação", "Descanso"]
];

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

function render() {
  const currentDay = dayName();
  const todayStr = today();

  // Perfil e Dashboard
  document.getElementById("dashName").textContent = data.name || "Atleta";
  document.getElementById("dashWeight").innerHTML = `${Number(data.weight).toFixed(1).replace(".", ",")} <i>kg</i>`;
  const hMeters = (Number(data.height || 173) / 100).toFixed(2).replace(".", ",");
  document.getElementById("dashHeight").innerHTML = `${hMeters} <i>m</i>`;
  document.getElementById("dashGoal").textContent = data.goal || "Hipertrofia";

  // Nutrição
  const foodsToday = data.foods.filter(x => x.date === todayStr);
  const cal = foodsToday.reduce((a, x) => a + Number(x.cal || 0), 0);
  const pro = foodsToday.reduce((a, x) => a + Number(x.pro || 0), 0);
  document.getElementById("calToday").textContent = Math.round(cal);
  document.getElementById("proteinToday").textContent = `${pro.toFixed(0)}g`;
  document.getElementById("calTotal").innerHTML = `${Math.round(cal)} <i>kcal</i>`;
  document.getElementById("proteinTotal").innerHTML = `${pro.toFixed(1).replace(".0", "")} <i>g</i>`;

  // Treino do dia
  document.getElementById("todayLabel").textContent = currentDay;
  const p = plan.find(x => x[0] === currentDay);
  document.getElementById("todayWorkout").textContent = p ? p[1] : "Consulte sua agenda";
  document.getElementById("todayDesc").textContent = p && p[2] === "Futsal"
    ? "Dia de jogo! Priorize hidratação, carboidratos e evite musculação pesada."
    : "Confira os exercícios da ficha e respeite os intervalos de descanso.";

  // Lista semanal
  document.getElementById("weekPlan").innerHTML = plan.map(x => {
    const isToday = x[0] === currentDay;
    const tagClass = x[2] === "Futsal" ? "sport" : (x[2] === "Descanso" ? "rest" : "");
    return `
      <div class="day ${isToday ? "today-highlight" : ""}">
        <div>
          <b>${x[0]} ${isToday ? "• Hoje" : ""}</b>
          <small>${x[1]}</small>
        </div>
        <span class="tag ${tagClass}">${x[2]}</span>
      </div>`;
  }).join("");

  const selectEl = document.getElementById("workoutSelect");
  if (!selectEl.options.length) {
    selectEl.innerHTML = plan.map(x => `<option>${x[0]} — ${x[1]}</option>`).join("");
    const todayIdx = plan.findIndex(x => x[0] === currentDay);
    if (todayIdx >= 0) selectEl.selectedIndex = todayIdx;
  }

  // Lista de alimentos de hoje
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

  // Histórico de treinos
  document.getElementById("workoutHistory").innerHTML = data.workouts.length
    ? data.workouts.slice().reverse().slice(0, 12).map((x, idx) => {
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

  // Histórico de peso
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

  // Histórico de medidas
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

  // Fotos
  document.getElementById("photoGrid").innerHTML = data.photos.map((x, i) => `
    <div class="photoitem">
      <img src="${x.src}" alt="Progresso">
      <small>
        <span>${formatDateBR(x.date)}</span>
        <button class="textbtn danger-text" onclick="deletePhoto(${i})">Excluir</button>
      </small>
    </div>`).join("");

  // Inputs de perfil
  document.getElementById("profileName").value = data.name || "Cristiano";
  document.getElementById("profileHeight").value = data.height || 173;
  document.getElementById("profileGoal").value = data.goal || "Hipertrofia";
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
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
  data.weight = v;
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
    } catch (e) {
      notify("Arquivo de backup inválido.", true);
    }
  };
  r.readAsText(f);
}

function resetData() {
  if (confirm("ATENÇÃO: Isso apagará todos os seus treinos, pesos, refeições e fotos deste dispositivo. Continuar?")) {
    localStorage.removeItem(KEY);
    localStorage.removeItem("projetoShape_v1");
    data = { ...defaults };
    persist();
    notify("Todos os dados foram apagados.");
  }
}

document.getElementById("weightDate").value = today();
document.getElementById("photoDate").value = today();
render();

if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  navigator.serviceWorker.register("./sw.js").catch(() => {});
}
