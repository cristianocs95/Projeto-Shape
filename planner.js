/* ===== Treino inteligente: gera fichas por objetivo, com ciclos de 8 semanas ===== */

const WEEK = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];
const CYCLE_DAYS = 56; // 8 semanas = 2 meses
const LEVEL_LABEL = { iniciante: "Iniciante", intermediario: "Intermediário", avancado: "Avançado" };
const PREF_DAYS = {
  2: ["Segunda", "Quinta"],
  3: ["Segunda", "Quarta", "Sexta"],
  4: ["Segunda", "Terça", "Quinta", "Sexta"],
  5: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"],
  6: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]
};

/* Cada "slot" é um grupo de exercícios que se alternam a cada fase (g = academia, h = casa) */
const POOLS = {
  chest1: { g: ["supino_reto", "supino_halteres", "supino_inclinado", "supino_maquina"], h: ["flexao", "flexao_declinada", "flexao_diamante", "flexao_inclinada"] },
  chest2: { g: ["supino_inclinado_halteres", "crucifixo_maquina", "crucifixo_halteres", "crossover", "supino_inclinado"], h: ["flexao_inclinada", "flexao_declinada", "flexao_diamante", "flexao"] },
  back1: { g: ["puxada_frontal", "remada_curvada", "barra_fixa", "remada_unilateral"], h: ["remada_unilateral", "remada_curvada"] },
  back2: { g: ["remada_baixa", "remada_unilateral", "puxada_triangulo", "remada_maquina"], h: ["remada_curvada", "remada_unilateral"] },
  rear: { g: ["crucifixo_inverso"], h: ["crucifixo_inverso"] },
  shoulder1: { g: ["desenvolvimento_militar", "desenvolvimento_halteres", "desenvolvimento_maquina"], h: ["desenvolvimento_halteres", "elevacao_frontal"] },
  shoulder2: { g: ["elevacao_lateral", "elevacao_lateral_polia", "elevacao_frontal"], h: ["elevacao_lateral", "elevacao_frontal"] },
  trap: { g: ["encolhimento", "remada_alta"], h: ["encolhimento"] },
  biceps: { g: ["rosca_direta", "rosca_alternada", "rosca_martelo", "rosca_scott", "rosca_concentrada"], h: ["rosca_direta", "rosca_alternada", "rosca_martelo", "rosca_concentrada"] },
  triceps: { g: ["triceps_pulley", "triceps_frances", "triceps_testa", "triceps_corda", "mergulho_banco"], h: ["triceps_frances", "mergulho_banco", "flexao_diamante", "triceps_testa"] },
  quad1: { g: ["agachamento_livre", "leg_press", "agachamento_hack", "agachamento_smith"], h: ["agachamento_corpo", "agachamento_bulgaro", "afundo", "agachamento_salto"] },
  quad2: { g: ["cadeira_extensora", "afundo", "agachamento_bulgaro", "passada"], h: ["afundo", "agachamento_salto", "passada", "agachamento_bulgaro"] },
  ham: { g: ["stiff", "mesa_flexora", "cadeira_flexora", "rdl"], h: ["stiff_halteres", "ponte_gluteo"] },
  glute: { g: ["elevacao_pelvica", "agachamento_sumo", "passada", "ponte_gluteo"], h: ["ponte_gluteo", "agachamento_sumo"] },
  calf: { g: ["panturrilha_em_pe", "panturrilha_sentado", "panturrilha_leg_press"], h: ["panturrilha_em_pe"] },
  core: { g: ["abdominal_supra", "prancha", "abdominal_infra", "abdominal_bicicleta", "prancha_lateral"], h: ["abdominal_supra", "prancha", "abdominal_infra", "abdominal_bicicleta", "prancha_lateral"] }
};

/* [slot, 1 = exercício principal / 0 = complementar] */
const DAY_TYPES = {
  push: { label: "Peito, ombros e tríceps", off: 0, slots: [["chest1", 1], ["shoulder1", 1], ["chest2", 0], ["shoulder2", 0], ["triceps", 0]] },
  pull: { label: "Costas, bíceps e ombro posterior", off: 0, slots: [["back1", 1], ["back2", 1], ["rear", 0], ["biceps", 0], ["trap", 0]] },
  legs: { label: "Pernas e glúteos", off: 0, slots: [["quad1", 1], ["ham", 1], ["quad2", 0], ["glute", 0], ["calf", 0], ["core", 0]] },
  upper: { label: "Superiores completo", off: 1, slots: [["chest1", 1], ["back1", 1], ["shoulder1", 1], ["back2", 0], ["biceps", 0], ["triceps", 0]] },
  lower: { label: "Inferiores e core", off: 1, slots: [["quad1", 1], ["ham", 1], ["glute", 0], ["quad2", 0], ["calf", 0], ["core", 0]] },
  fullbody: { label: "Corpo inteiro", off: 0, slots: [["quad1", 1], ["chest1", 1], ["back1", 1], ["shoulder2", 0], ["ham", 0], ["core", 0]] }
};

/* [séries principais, reps principais, séries complementares, reps complementares] — um por estilo de fase */
const SCHEMES = {
  Hipertrofia: [[4, "8-10", 3, "12"], [4, "6-8", 3, "10-12"], [3, "12-15", 3, "15"]],
  "Força": [[5, "5", 3, "8"], [5, "3-5", 3, "6-8"], [4, "6-8", 3, "10"]],
  Emagrecimento: [[3, "15", 3, "15"], [4, "12", 3, "15-20"], [3, "12-15", 3, "15"]],
  Condicionamento: [[3, "12-15", 3, "15"], [3, "15", 2, "20"], [4, "12", 3, "15"]],
  "Manutenção": [[3, "10", 3, "12"], [3, "8-10", 3, "12"], [3, "12", 2, "15"]]
};
const PHASE_STYLES = {
  Hipertrofia: ["Base", "Carga", "Volume"],
  "Força": ["Base", "Força máxima", "Volume"],
  Emagrecimento: ["Base", "Intensidade", "Resistência"],
  Condicionamento: ["Base", "Intensidade", "Resistência"],
  "Manutenção": ["Base", "Intensidade", "Resistência"]
};
const CARDIO_FIN = ["Esteira: 15 min em ritmo moderado", "Bike: 15-20 min em ritmo moderado", "Caminhada inclinada: 20 min"];

/* ---------- utilidades ---------- */
const clamp = (n, a, b) => Math.min(b, Math.max(a, n));
const r1 = n => Math.round(n * 10) / 10;
const fmtKg = n => Number(n).toFixed(1).replace(".", ",");

function addDaysISO(iso, n) {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, m - 1, d + n);
  return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`;
}
function diffDays(a, b) {
  const f = s => { const [y, m, d] = s.split("-").map(Number); return Date.UTC(y, m - 1, d); };
  return Math.round((f(b) - f(a)) / 864e5);
}

/* ---------- geração ---------- */
function pickEx(slot, place, phaseIdx, variant, used) {
  const pool = POOLS[slot][place === "casa" ? "h" : "g"];
  for (let i = 0; i < pool.length; i++) {
    const id = pool[(phaseIdx + variant + i) % pool.length];
    if (!used.has(id)) { used.add(id); return id; }
  }
  return null;
}

function splitFor(d, lvl) {
  if (d === 2) return ["fullbody", "fullbody"];
  if (d === 3) return lvl === "iniciante" ? ["fullbody", "fullbody", "fullbody"] : ["push", "pull", "legs"];
  if (d === 4) return ["upper", "lower", "upper", "lower"];
  if (d === 5) return ["push", "pull", "legs", "upper", "lower"];
  return ["push", "pull", "legs", "push", "pull", "legs"];
}

function repsFor(o, id, comp, ph) {
  const e = EXMAP[id];
  if (id.startsWith("prancha")) {
    const base = { iniciante: 30, intermediario: 45, avancado: 60 }[o.level] || 40;
    return `3x${base + (ph % 3) * 5}s`;
  }
  if (e.muscle === "Core") return o.level === "iniciante" ? "3x12" : "3x15";
  if (e.muscle === "Panturrilha") return "4x15";
  const row = (SCHEMES[o.goal] || SCHEMES.Hipertrofia)[ph % 3];
  let sets = comp ? row[0] : row[2];
  const reps = comp ? row[1] : row[3];
  if (o.level === "iniciante" && sets > 3) sets--;
  if (o.level === "avancado" && comp && sets >= 4 && (o.goal === "Hipertrofia" || o.goal === "Força")) sets++;
  return `${sets}x${reps}`;
}

function cardioDay(k, ph) {
  if (k === 0) {
    const t = ["• Esteira: 35-40 min em ritmo moderado", "• Bike: 35 min em ritmo moderado", "• Corrida leve: 30-35 min"][ph % 3];
    return { title: "Cardio contínuo", tag: "Cardio", exercises: t + "\n• Alongamento e mobilidade: 5 min" };
  }
  const t = ["• HIIT: 10 tiros de 30s forte / 60s leve", "• Corda naval: 8 rounds de 30s / 30s descanso", "• Bike: 8 tiros de 40s forte / 80s leve"][ph % 3];
  return { title: "Cardio intervalado (HIIT)", tag: "Cardio", exercises: t + "\n• Alongamento e mobilidade: 5 min" };
}

function computeGoals(o, weight) {
  const lvl = o.level;
  const rate = {
    Hipertrofia: { iniciante: 0.025, intermediario: 0.015, avancado: 0.008 }[lvl] || 0.015,
    Emagrecimento: lvl === "iniciante" ? -0.05 : -0.04,
    "Força": 0.005, Condicionamento: 0, "Manutenção": 0
  }[o.goal] || 0;
  const protFactor = { Hipertrofia: 1.9, Emagrecimento: 2.0, "Força": 1.8 }[o.goal] || 1.6;
  const goals = {
    startWeight: weight,
    targetWeight: r1(weight * (1 + rate)),
    protein: Math.round(weight * protFactor),
    kcal: null
  };
  const age = Number(o.age), h = Number(o.height);
  if (age >= 12 && age <= 90 && h > 0) {
    const bmr = 10 * weight + 6.25 * h - 5 * age + (o.sex === "F" ? -161 : 5);
    const sessions = clamp((o.days || 3) + (o.sportDays || 0), 1, 6);
    const act = { 1: 1.3, 2: 1.4, 3: 1.5, 4: 1.55, 5: 1.65, 6: 1.7 }[sessions];
    const adj = { Hipertrofia: 0.10, Emagrecimento: -0.18, "Força": 0.05 }[o.goal] || 0;
    goals.kcal = Math.round(Math.max(bmr * 1.1, bmr * act * (1 + adj)) / 10) * 10;
  }
  return goals;
}

function buildProgram(o, phase) {
  phase = phase || 1;
  const ph = phase - 1;
  const notes = [];
  let d = clamp(Number(o.days) || 3, 2, 6);
  if (o.level === "iniciante" && d > 4) {
    d = 4;
    notes.push("Para iniciantes, limitamos a 4 dias de musculação por semana para garantir a recuperação.");
  }
  const s = clamp(Number(o.sportDays) || 0, 0, 2);
  if (d + s > 6) {
    d = 6 - s;
    notes.push("Ajustamos os dias de musculação para sobrar pelo menos 1 dia de descanso por semana.");
  }
  const sportName = (o.sportName || "").trim() || "Esporte";
  const sportDays = ["Terça", "Quinta"].slice(0, s);

  let train = PREF_DAYS[d].filter(x => !sportDays.includes(x));
  ["Sábado", "Sexta", "Quarta", "Segunda", "Terça", "Quinta"].forEach(x => {
    if (train.length < d && !train.includes(x) && !sportDays.includes(x)) train.push(x);
  });
  train.sort((a, b) => WEEK.indexOf(a) - WEEK.indexOf(b));

  const types = splitFor(d, o.level);
  const nEx = { iniciante: 5, intermediario: 6, avancado: 7 }[o.level] || 6;
  const occ = {};
  const plan = {};

  train.forEach((day, i) => {
    const t = types[i], dt = DAY_TYPES[t];
    const k = occ[t] || 0; occ[t] = k + 1;
    const used = new Set(), lines = [];
    dt.slots.slice(0, nEx).forEach(([slot, comp]) => {
      const id = pickEx(slot, o.place, ph, dt.off + k, used);
      if (id) lines.push(`• ${EXMAP[id].name}: ${repsFor(o, id, comp, ph)}`);
    });
    if (o.goal === "Emagrecimento" || o.goal === "Condicionamento") lines.push("• " + CARDIO_FIN[ph % 3]);
    plan[day] = { day, title: `Treino ${"ABCDEF"[i]} — ${dt.label}`, tag: "Musculação", exercises: lines.join("\n") };
  });

  sportDays.forEach(day => {
    plan[day] = {
      day, title: `${sportName} — treino esportivo`, tag: "Esporte",
      exercises: "• Aquecimento e mobilidade: 10 min\n• Prática de " + sportName.toLowerCase() + ": 60-90 min"
    };
  });

  const cardioGoal = o.goal === "Emagrecimento" || o.goal === "Condicionamento";
  let cardioN = 0, leveUsed = false;
  WEEK.slice(0, 6).filter(x => !plan[x]).forEach(day => {
    if (cardioGoal && cardioN < 2) {
      plan[day] = { day, ...cardioDay(cardioN, ph) }; cardioN++;
    } else if (!leveUsed) {
      plan[day] = { day, title: "Descanso ativo", tag: "Leve", exercises: "• Caminhada leve: 20-30 min\n• Alongamento e mobilidade: 10 min" };
      leveUsed = true;
    } else {
      plan[day] = { day, title: "Descanso", tag: "Descanso", exercises: "• Descanso total, hidratação e sono de 7 a 9 horas" };
    }
  });
  plan.Domingo = { day: "Domingo", title: "Descanso e recuperação", tag: "Descanso", exercises: "• Descanso total, hidratação e sono de 7 a 9 horas" };

  const weight = Number(o.weight) || 70;
  const goals = computeGoals({ ...o, days: d, sportDays: s }, weight);
  const startDate = today();
  const style = (PHASE_STYLES[o.goal] || PHASE_STYLES.Hipertrofia)[ph % 3];

  return {
    id: "rt_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 5),
    name: `Programa ${o.goal} — Fase ${phase}`,
    auto: true,
    plan: {
      goal: o.goal, level: o.level, days: d, place: o.place, sportDays: s, sportName: o.sportName || "",
      age: o.age || "", sex: o.sex || "M", height: o.height,
      phase, style, startDate, endDate: addDaysISO(startDate, CYCLE_DAYS),
      startWeight: goals.startWeight, targetWeight: goals.targetWeight, protein: goals.protein, kcal: goals.kcal,
      notes
    },
    days: WEEK.map(x => plan[x])
  };
}

/* ---------- acompanhamento do ciclo ---------- */
function weekGuide(w) {
  if (w <= 2) return { name: "Adaptação", text: "Use cargas moderadas (sobrando 3-4 repetições) e foque na técnica e na amplitude do movimento." };
  if (w <= 5) return { name: "Progressão", text: "Aumente a carga em 2-5% quando completar todas as séries com boa técnica. Se estiver recuperando bem, adicione 1 série nos 2 primeiros exercícios do dia." };
  if (w <= 7) return { name: "Intensidade", text: "Trabalhe perto do limite nos exercícios principais (sobrando 1-2 repetições). Priorize sono e alimentação." };
  return { name: "Recuperação", text: "Semana leve: reduza ~40% das séries e ~10% da carga. Ao fim dela, sua ficha será renovada com novos exercícios." };
}

function programStatus(r) {
  const p = r.plan, t = today();
  const elapsed = Math.max(0, diffDays(p.startDate, t));
  const week = Math.min(8, Math.floor(elapsed / 7) + 1);
  const done = data.workouts.filter(w => w.date >= p.startDate && w.date < p.endDate).length;
  const planned = p.days * 8;
  const now = Number(data.weight) || p.startWeight;
  const span = p.targetWeight - p.startWeight;
  return {
    elapsed, week, expired: elapsed >= CYCLE_DAYS, daysLeft: Math.max(0, CYCLE_DAYS - elapsed),
    done, planned, pctSessions: clamp(Math.round(done / planned * 100), 0, 100),
    weightNow: now,
    pctWeight: Math.abs(span) < 0.05 ? null : clamp(Math.round((now - p.startWeight) / span * 100), 0, 100),
    pctCycle: clamp(Math.round(elapsed / CYCLE_DAYS * 100), 0, 100)
  };
}

function goalText(p) {
  switch (p.goal) {
    case "Hipertrofia": return "Aumentar a carga dos exercícios principais em 5-10% até o fim do ciclo.";
    case "Força": return "Aumentar a carga dos exercícios principais em 5-10% mantendo a técnica.";
    case "Emagrecimento": return "Manter a força nos exercícios principais enquanto reduz o peso gradualmente.";
    case "Condicionamento": return "Aumentar o tempo ou o ritmo do cardio em 10-15% ao longo do ciclo.";
    default: return "Manter cargas e consistência, treinando em pelo menos 90% dos dias planejados.";
  }
}

const bar = pct => `<div class="progress"><i style="width:${pct}%"></i></div>`;

function renderProgramCards() {
  const r = getActiveRoutine();
  const home = document.getElementById("homeProgram");
  const card = document.getElementById("programCard");
  const goalLines = [document.getElementById("proteinGoal"), document.getElementById("foodGoal")];

  if (!r || !r.plan) {
    card.innerHTML = "";
    goalLines.forEach(el => el && (el.textContent = ""));
    home.innerHTML = `
      <div class="card">
        <div class="cardhead"><h2>✨ Treino inteligente</h2><span class="pill">Novo</span></div>
        <p class="muted" style="font-size:13px;margin:6px 0 0">Monte sua ficha com base no seu objetivo, nível e rotina. A cada 2 meses o app define novas metas e troca os exercícios para o treino não ficar monótono.</p>
        <button class="primary" onclick="openProgramModal()">Montar meu programa</button>
      </div>`;
    return;
  }

  const p = r.plan, st = programStatus(r), g = weekGuide(st.week);
  const endBR = formatDateBR(p.endDate);
  const kcalTxt = p.kcal ? ` · ~${p.kcal.toLocaleString("pt-BR")} kcal` : "";
  goalLines.forEach(el => el && (el.textContent = `Meta diária: ${p.protein} g de proteína${kcalTxt}`));

  const protToday = data.foods.filter(x => x.date === today()).reduce((a, x) => a + Number(x.pro || 0), 0);
  const protPct = clamp(Math.round(protToday / p.protein * 100), 0, 100);

  const renewBtn = st.expired
    ? `<button class="primary" onclick="renewProgram()">🔄 Ciclo concluído — gerar Fase ${p.phase + 1}</button>`
    : `<button class="secondary" onclick="renewProgram()">Avançar para a Fase ${p.phase + 1} agora</button>`;

  home.innerHTML = `
    <div class="card ${st.expired ? "editor-highlight" : ""}">
      <div class="cardhead"><h2>Programa • Fase ${p.phase}</h2><span class="pill">Semana ${st.week}/8</span></div>
      ${bar(st.pctCycle)}
      <p class="muted" style="font-size:12px;margin:8px 0 0">${st.expired ? "Seu ciclo de 2 meses terminou! Hora de renovar os exercícios." : `Foco: <b style="color:#fff">${g.name}</b> · renova em ${st.daysLeft} dias (${endBR})`}</p>
      <button class="secondary" onclick="showPage('treinos')">Ver metas e ficha →</button>
    </div>`;

  card.innerHTML = `
    <div class="card ${st.expired ? "editor-highlight" : ""}">
      <div class="cardhead"><h2>Programa • Fase ${p.phase} · ${esc(p.style)}</h2><span class="pill">Semana ${st.week}/8</span></div>
      ${bar(st.pctCycle)}
      <p class="muted" style="font-size:12px;margin:8px 0 0">${formatDateBR(p.startDate)} → ${endBR} · ${LEVEL_LABEL[p.level] || ""} · ${p.days}x/semana · ${p.place === "casa" ? "em casa" : "academia"}</p>

      <div class="phase-box"><b>Foco da semana: ${g.name}</b><p>${g.text}</p></div>

      <h3>Metas deste ciclo</h3>
      <div class="goal-row"><span>⚖️ Peso: ${fmtKg(p.startWeight)} → <b>${fmtKg(p.targetWeight)} kg</b> <i>(agora ${fmtKg(st.weightNow)})</i></span>${st.pctWeight === null ? "" : bar(st.pctWeight)}</div>
      <div class="goal-row"><span>🏋️ Treinos: <b>${st.done}</b> de ${st.planned}</span>${bar(st.pctSessions)}</div>
      <div class="goal-row"><span>🥩 Proteína hoje: <b>${Math.round(protToday)}</b> de ${p.protein} g</span>${bar(protPct)}</div>
      ${p.kcal ? `<div class="goal-row"><span>🔥 Calorias (estimativa): <b>~${p.kcal.toLocaleString("pt-BR")} kcal/dia</b></span></div>` : ""}
      <div class="goal-row"><span>📈 ${goalText(p)}</span></div>

      <p class="muted" style="font-size:12px;margin:12px 0 0">🔄 A cada 2 meses os exercícios são trocados por variações para os mesmos músculos, evitando a monotonia e estimulando novas adaptações.</p>
      ${(p.notes || []).map(n => `<p class="muted" style="font-size:12px;margin:6px 0 0">ℹ️ ${esc(n)}</p>`).join("")}
      ${renewBtn}
      <p class="footnote" style="margin:10px 0 0">Metas e calorias são estimativas gerais e não substituem a orientação de um profissional de saúde.</p>
    </div>`;
}

/* ---------- modal e ações ---------- */
function openProgramModal() {
  const set = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
  set("pgGoal", data.goal || "Hipertrofia");
  set("pgLevel", data.level || "intermediario");
  set("pgDays", data.trainDays || 4);
  set("pgPlace", data.place || "academia");
  set("pgSportDays", data.sportDays || 0);
  set("pgSportName", data.sportName || "");
  set("pgWeight", Number(data.weight).toFixed(1));
  set("pgHeight", data.height || 173);
  set("pgAge", data.age || "");
  set("pgSex", data.sex || "M");
  document.getElementById("programModal").style.display = "flex";
}
function closeProgramModal() {
  document.getElementById("programModal").style.display = "none";
}

function generateProgramFromModal() {
  const v = id => document.getElementById(id).value;
  const weight = Number(v("pgWeight")), height = Number(v("pgHeight")), age = Number(v("pgAge"));
  if (!weight || weight < 25 || weight > 350) { notify("Informe um peso válido.", true); return; }
  if (!height || height < 120 || height > 230) { notify("Informe uma altura válida (cm).", true); return; }
  const o = {
    goal: v("pgGoal"), level: v("pgLevel"), days: Number(v("pgDays")), place: v("pgPlace"),
    sportDays: Number(v("pgSportDays")), sportName: v("pgSportName"),
    weight, height, age: age || "", sex: v("pgSex")
  };

  data.goal = o.goal; data.level = o.level; data.trainDays = o.days; data.place = o.place;
  data.sportDays = o.sportDays; data.sportName = o.sportName; data.height = height; data.age = o.age; data.sex = o.sex;
  if (Number(data.weight) !== weight) {
    const t = today();
    data.weights = data.weights.filter(x => x.date !== t);
    data.weights.push({ value: weight, date: t });
    data.weights.sort((a, b) => a.date.localeCompare(b.date));
  }
  data.weight = weight;

  const rt = buildProgram(o, 1);
  data.routines.push(rt);
  data.activeRoutineId = rt.id;
  closeDayEditor();
  closeProgramModal();
  persist();
  showPage("treinos");
  notify("Programa criado! Confira suas metas.");
}

function renewProgram() {
  const r = getActiveRoutine();
  if (!r || !r.plan) return;
  const st = programStatus(r), p = r.plan;
  const msg = `Resumo da Fase ${p.phase}\n\nTreinos feitos: ${st.done} de ${st.planned}\nPeso: ${fmtKg(p.startWeight)} → ${fmtKg(st.weightNow)} kg (meta ${fmtKg(p.targetWeight)} kg)\n\nGerar a Fase ${p.phase + 1} com novos exercícios e novas metas?`;
  if (!confirm(msg)) return;
  const nr = buildProgram({ ...p, weight: st.weightNow, height: data.height }, p.phase + 1);
  nr.id = r.id;
  data.routines = data.routines.map(x => (x.id === r.id ? nr : x));
  closeDayEditor();
  persist();
  notify(`Fase ${p.phase + 1} pronta! Exercícios renovados.`);
}
