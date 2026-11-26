/* ===== Biblioteca de exercícios + ilustrações animadas (SVG) ===== */

const C_BODY = "#cbd5e1", C_EQ = "#38bdf8", C_FLOOR = "#2a3a58";

const pose = (lines, head, t) => ({ lines, head, t });
const pathD = lines => lines.map(l => "M" + l.map(p => p.join(" ")).join(" L")).join(" ");

const STAND = [[58, 80], [58, 66], [58, 52], [58, 30]];
const BENCH_BG = '<rect x="26" y="58" width="74" height="5" rx="2"/><line x1="34" y1="63" x2="34" y2="83"/><line x1="92" y1="63" x2="92" y2="83"/>';
const LYING = [[24, 80], [26, 64], [42, 54], [78, 54]];

/* Cada padrão: s = posição inicial, e = posição final. t = ponto onde fica a carga. */
const PT = {
  press_flat: {
    bg: BENCH_BG,
    s: pose([LYING, [[78, 54], [78, 42], [78, 30]]], [89, 52], [78, 30]),
    e: pose([LYING, [[78, 54], [70, 50], [78, 45]]], [89, 52], [78, 45]),
    steps: ["Deite com os pés firmes no chão, escápulas juntas e peito aberto.", "Desça a carga até a linha do peito em ~2 s, cotovelos a cerca de 45° do tronco.", "Empurre para cima sem travar os cotovelos e sem tirar o quadril do banco."],
    err: "Abrir demais os cotovelos e rebater a carga no peito."
  },
  press_incline: {
    bg: '<line x1="33" y1="70" x2="57" y2="44" stroke-width="6"/><rect x="34" y="70" width="26" height="5" rx="2"/><line x1="40" y1="75" x2="40" y2="83"/><line x1="56" y1="75" x2="56" y2="83"/>',
    s: pose([[[64, 80], [62, 66], [44, 64], [62, 43]], [[62, 43], [66, 31], [68, 19]]], [68, 36], [68, 19]),
    e: pose([[[64, 80], [62, 66], [44, 64], [62, 43]], [[62, 43], [60, 52], [70, 46]]], [68, 36], [70, 46]),
    steps: ["Ajuste o banco entre 30° e 45° e mantenha as escápulas firmes no encosto.", "Desça até a parte alta do peito, controlando o movimento.", "Empurre para cima sem encolher os ombros."],
    err: "Inclinar demais o banco e transformar o exercício em ombro."
  },
  fly: {
    bg: BENCH_BG,
    s: pose([LYING, [[78, 54], [72, 47], [66, 51]]], [89, 52], [66, 51]),
    e: pose([LYING, [[78, 54], [78, 42], [78, 30]]], [89, 52], [78, 30]),
    steps: ["Mantenha uma leve flexão fixa nos cotovelos durante todo o movimento.", "Abra os braços em arco até sentir o peito alongar, sem passar da linha do tronco.", "Feche como se abraçasse uma árvore, contraindo o peito no final."],
    err: "Dobrar e esticar os cotovelos, transformando em supino."
  },
  pushup: {
    bg: "",
    s: pose([[[30, 52], [64, 64], [98, 78]], [[30, 52], [31, 66], [30, 78]]], [21, 50], null),
    e: pose([[[32, 68], [64, 72], [98, 78]], [[32, 68], [44, 70], [30, 78]]], [23, 67], null),
    steps: ["Mãos um pouco mais abertas que os ombros, corpo reto da cabeça aos calcanhares.", "Desça até o peito quase tocar o chão, cotovelos a ~45°.", "Empurre o chão mantendo abdômen e glúteos contraídos."],
    err: "Deixar o quadril cair ou empinar."
  },
  press_overhead: {
    bg: "",
    s: pose([STAND, [[58, 32], [55, 42], [63, 33]]], [58, 21], [63, 33]),
    e: pose([STAND, [[58, 32], [64, 20], [62, 8]]], [58, 21], [62, 8]),
    steps: ["Em pé, abdômen contraído e glúteos firmes; carga na altura dos ombros.", "Empurre para cima até estender os braços, passando a cabeça por dentro.", "Desça controlando até a linha dos ombros."],
    err: "Arquear a lombar para empurrar a carga."
  },
  lateral: {
    bg: "",
    s: pose([STAND, [[58, 32], [58, 44], [61, 56]]], [58, 21], [61, 57]),
    e: pose([STAND, [[58, 32], [71, 34], [84, 33]]], [58, 21], [84, 33]),
    steps: ["Em pé, leve flexão nos cotovelos e tronco firme.", "Eleve os braços até a altura dos ombros, como se despejasse uma jarra.", "Desça devagar, em ~3 segundos."],
    err: "Balançar o corpo e subir os ombros (o trapézio assume)."
  },
  row: {
    bg: "",
    s: pose([[[46, 80], [50, 66], [42, 52], [64, 42]], [[64, 42], [66, 54], [66, 66]]], [72, 38], [66, 67]),
    e: pose([[[46, 80], [50, 66], [42, 52], [64, 42]], [[64, 42], [52, 48], [60, 53]]], [72, 38], [60, 54]),
    steps: ["Joelhos levemente flexionados, tronco inclinado ~45° e coluna neutra.", "Puxe a carga em direção ao umbigo, juntando as escápulas.", "Desça com controle até estender os braços."],
    err: "Arredondar a lombar ou puxar com impulso."
  },
  pulldown: {
    bg: '<rect x="34" y="62" width="26" height="4" rx="2"/><line x1="34" y1="66" x2="34" y2="83"/><line x1="52" y1="52" x2="76" y2="52" stroke-width="4"/>',
    anchor: [66, 2],
    s: pose([[[70, 80], [68, 58], [46, 60], [46, 36]], [[46, 36], [56, 22], [64, 8]]], [47, 27], [64, 8]),
    e: pose([[[70, 80], [68, 58], [46, 60], [46, 36]], [[46, 36], [50, 48], [58, 38]]], [47, 27], [58, 38]),
    steps: ["Sente com as coxas presas e peito aberto, leve inclinação para trás.", "Puxe a barra até a parte alta do peito, levando os cotovelos para baixo e para trás.", "Suba devagar até alongar as costas, sem soltar o peso."],
    err: "Puxar atrás da nuca ou balançar o corpo."
  },
  seated_row: {
    bg: '<rect x="30" y="62" width="26" height="4" rx="2"/><line x1="30" y1="66" x2="30" y2="83"/><line x1="90" y1="50" x2="90" y2="78" stroke-width="3"/>',
    anchor: [106, 46],
    s: pose([[[86, 60], [66, 56], [44, 60], [44, 36]], [[44, 36], [60, 42], [76, 46]]], [46, 27], [76, 46]),
    e: pose([[[86, 60], [66, 56], [44, 60], [44, 36]], [[44, 36], [38, 46], [56, 46]]], [46, 27], [56, 46]),
    steps: ["Sente com a coluna ereta e joelhos levemente flexionados.", "Puxe o cabo até o abdômen, juntando as escápulas.", "Retorne alongando as costas sem arredondar a lombar."],
    err: "Jogar o tronco para trás para puxar."
  },
  pullup: {
    bg: '<line x1="38" y1="8" x2="86" y2="8" stroke-width="3"/>',
    s: pose([[[58, 78], [62, 66], [60, 54], [60, 32]], [[60, 32], [63, 20], [64, 8]]], [59, 23], null),
    e: pose([[[58, 62], [62, 52], [60, 40], [60, 18]], [[60, 18], [70, 17], [64, 8]]], [58, 10], null),
    steps: ["Pegada um pouco mais larga que os ombros, corpo firme e sem balançar.", "Suba levando o peito em direção à barra até o queixo passar dela.", "Desça controlando até estender os braços."],
    err: "Usar impulso das pernas e descer só pela metade."
  },
  shrug: {
    bg: "",
    s: pose([[[58, 80], [58, 66], [58, 52], [58, 32]], [[58, 32], [60, 44], [61, 56]]], [58, 23], [61, 58]),
    e: pose([[[58, 80], [58, 66], [58, 52], [58, 28]], [[58, 28], [60, 40], [61, 52]]], [58, 19], [61, 54]),
    steps: ["Em pé, braços estendidos e ombros relaxados com a carga ao lado do corpo.", "Eleve os ombros em direção às orelhas e segure 1 segundo.", "Desça devagar, sem girar os ombros."],
    err: "Girar os ombros ou flexionar os cotovelos."
  },
  curl: {
    bg: "",
    s: pose([STAND, [[58, 31], [58, 43], [60, 56]]], [58, 21], [60, 57]),
    e: pose([STAND, [[58, 31], [58, 43], [71, 36]]], [58, 21], [71, 36]),
    steps: ["Cotovelos colados ao tronco, punhos neutros.", "Flexione os cotovelos até a contração máxima do bíceps.", "Desça devagar (~3 s) até quase estender os braços."],
    err: "Balançar o tronco e levar os cotovelos para frente."
  },
  triceps_push: {
    bg: "",
    anchor: [72, 2],
    s: pose([STAND, [[58, 31], [58, 43], [71, 40]]], [58, 21], [71, 40]),
    e: pose([STAND, [[58, 31], [58, 43], [60, 56]]], [58, 21], [60, 57]),
    steps: ["Cotovelos colados ao tronco, leve inclinação do tronco.", "Estenda os cotovelos até os braços ficarem retos, contraindo o tríceps.", "Retorne devagar até os antebraços ficarem na altura do peito."],
    err: "Abrir os cotovelos ou usar o peso do corpo."
  },
  skull: {
    bg: BENCH_BG,
    s: pose([LYING, [[78, 54], [78, 40], [90, 40]]], [89, 52], [90, 40]),
    e: pose([LYING, [[78, 54], [78, 40], [78, 27]]], [89, 52], [78, 27]),
    steps: ["Cotovelos apontados para o teto e fixos, ombros firmes.", "Flexione só os cotovelos levando a carga em direção à testa.", "Estenda de volta sem mover os braços."],
    err: "Mover os ombros e abrir os cotovelos."
  },
  dip: {
    bg: '<rect x="16" y="56" width="26" height="5" rx="2"/><line x1="22" y1="61" x2="22" y2="83"/><line x1="38" y1="61" x2="38" y2="83"/>',
    s: pose([[[82, 78], [62, 66], [42, 60], [34, 38]], [[34, 38], [33, 47], [32, 55]]], [33, 29], null),
    e: pose([[[82, 78], [62, 70], [42, 70], [34, 48]], [[34, 48], [24, 51], [32, 55]]], [33, 39], null),
    steps: ["Mãos no banco, ombros afastados das orelhas e quadril próximo ao banco.", "Flexione os cotovelos até ~90°, apontando-os para trás.", "Estenda empurrando o banco, sem travar os cotovelos."],
    err: "Descer demais e sobrecarregar os ombros."
  },
  squat: {
    bg: "",
    s: pose([[[58, 80], [58, 66], [56, 50], [58, 30]], [[58, 32], [50, 36], [57, 29]]], [59, 21], [57, 29]),
    e: pose([[[58, 80], [62, 62], [44, 62], [58, 40]], [[58, 41], [50, 44], [57, 38]]], [63, 32], [57, 38]),
    steps: ["Pés na largura dos ombros, pontas levemente abertas, abdômen firme.", "Desça levando o quadril para trás e para baixo, joelhos na direção dos pés.", "Suba empurrando o chão com o corpo todo, sem deixar os joelhos entrarem."],
    err: "Joelhos desabando para dentro ou calcanhares saindo do chão."
  },
  leg_press: {
    bg: '<line x1="12" y1="50" x2="34" y2="74" stroke-width="5"/><line x1="48" y1="80" x2="98" y2="36" stroke-width="2" opacity=".5"/>',
    s: pose([[[60, 68], [50, 48], [36, 66], [20, 50]]], [13, 43], [60, 68]),
    e: pose([[[80, 46], [58, 56], [36, 66], [20, 50]]], [13, 43], [80, 46]),
    steps: ["Pés na largura dos ombros na plataforma, lombar colada no banco.", "Flexione os joelhos até ~90° controlando a descida.", "Empurre sem travar os joelhos no final."],
    err: "Tirar o quadril do banco ao descer demais."
  },
  lunge: {
    bg: "",
    s: pose([[[56, 30], [56, 52]], [[56, 52], [66, 66], [66, 80]], [[56, 52], [46, 68], [38, 80]], [[56, 32], [56, 44], [56, 56]]], [56, 21], [56, 57]),
    e: pose([[[56, 40], [56, 62]], [[56, 62], [72, 62], [72, 80]], [[56, 62], [48, 76], [36, 80]], [[56, 42], [56, 54], [56, 66]]], [56, 31], [56, 67]),
    steps: ["Passo amplo, tronco ereto e abdômen contraído.", "Desça até ambos os joelhos formarem ~90°, joelho da frente alinhado ao pé.", "Suba empurrando com o calcanhar da perna da frente."],
    err: "Passo curto demais ou joelho da frente passando muito dos pés."
  },
  leg_ext: {
    bg: '<rect x="28" y="58" width="22" height="4" rx="2"/><line x1="28" y1="62" x2="28" y2="83"/><line x1="28" y1="30" x2="28" y2="58" stroke-width="5"/>',
    s: pose([[[58, 76], [56, 58], [38, 58], [34, 32]], [[34, 34], [42, 46], [46, 56]]], [35, 23], [58, 76]),
    e: pose([[[74, 58], [56, 58], [38, 58], [34, 32]], [[34, 34], [42, 46], [46, 56]]], [35, 23], [74, 58]),
    steps: ["Ajuste o encosto para que o joelho alinhe com o eixo da máquina.", "Estenda os joelhos até contrair o quadríceps no topo.", "Desça devagar sem deixar a placa bater."],
    err: "Usar impulso e travar os joelhos com força."
  },
  leg_curl: {
    bg: '<rect x="14" y="58" width="72" height="5" rx="2"/><line x1="20" y1="63" x2="20" y2="83"/><line x1="80" y1="63" x2="80" y2="83"/>',
    s: pose([[[20, 53], [48, 54], [66, 54], [84, 54]]], [11, 51], [84, 54]),
    e: pose([[[20, 53], [48, 54], [66, 54], [64, 36]]], [11, 51], [64, 36]),
    steps: ["Quadril firme no apoio, joelhos alinhados com o eixo.", "Flexione os joelhos levando os calcanhares em direção ao glúteo.", "Retorne devagar até quase estender as pernas."],
    err: "Levantar o quadril do banco para ganhar impulso."
  },
  deadlift: {
    bg: "",
    s: pose([[[54, 80], [56, 66], [56, 52], [60, 30]], [[60, 32], [61, 44], [62, 56]]], [60, 21], [62, 58]),
    e: pose([[[54, 80], [50, 66], [42, 52], [62, 38]], [[62, 40], [63, 52], [63, 64]]], [70, 33], [63, 66]),
    steps: ["Pés na largura do quadril, coluna neutra e abdômen firme.", "Leve o quadril para trás deslizando a carga rente às pernas até sentir o posterior alongar.", "Volte estendendo o quadril e contraindo os glúteos no topo."],
    err: "Arredondar a lombar ou afastar a carga do corpo."
  },
  hip_thrust: {
    bg: '<rect x="12" y="56" width="22" height="5" rx="2"/><line x1="18" y1="61" x2="18" y2="83"/><line x1="30" y1="61" x2="30" y2="83"/>',
    s: pose([[[70, 80], [68, 58], [50, 70], [28, 56]]], [19, 53], [50, 68]),
    e: pose([[[72, 80], [72, 56], [52, 56], [28, 56]]], [19, 53], [52, 54]),
    steps: ["Parte alta das costas apoiada, pés firmes e joelhos a ~90° no topo.", "Suba o quadril contraindo os glúteos até alinhar tronco e coxas.", "Desça controlando, sem hiperestender a lombar."],
    err: "Arquear a lombar em vez de contrair o glúteo."
  },
  calf: {
    bg: "",
    s: pose([[[66, 80], [58, 78], [58, 64], [58, 50], [58, 30]]], [58, 21], null),
    e: pose([[[66, 80], [58, 72], [58, 58], [58, 44], [58, 24]]], [58, 15], null),
    steps: ["Apoie a ponta dos pés, joelhos estendidos e tronco firme.", "Suba o máximo possível e segure 1 segundo no topo.", "Desça alongando bem o calcanhar abaixo do apoio."],
    err: "Fazer movimentos curtos e rápidos."
  },
  crunch: {
    bg: "",
    s: pose([[[76, 78], [64, 62], [50, 76], [24, 76]], [[24, 76], [18, 70]]], [16, 74], null),
    e: pose([[[76, 78], [64, 62], [50, 76], [34, 58]], [[34, 58], [28, 52]]], [28, 50], null),
    steps: ["Deitado, joelhos flexionados e lombar apoiada no chão.", "Eleve apenas os ombros contraindo o abdômen, sem puxar o pescoço.", "Desça devagar sem relaxar totalmente."],
    err: "Puxar o pescoço com as mãos."
  },
  leg_raise: {
    bg: "",
    s: pose([[[20, 76], [48, 76]], [[48, 76], [68, 76], [88, 76]], [[22, 76], [36, 78]]], [11, 74], null),
    e: pose([[[20, 76], [48, 76]], [[48, 76], [48, 58], [48, 40]], [[22, 76], [36, 78]]], [11, 74], null),
    steps: ["Deitado, lombar colada ao chão e mãos ao lado do corpo.", "Eleve as pernas até 90° com os joelhos quase estendidos.", "Desça devagar sem deixar a lombar arquear."],
    err: "Deixar a lombar sair do chão."
  },
  plank: {
    bg: "",
    s: pose([[[30, 64], [63, 71], [96, 78]], [[30, 64], [32, 78], [44, 78]]], [22, 60], null),
    e: pose([[[30, 64], [63, 67], [96, 78]], [[30, 64], [32, 78], [44, 78]]], [22, 60], null),
    steps: ["Cotovelos sob os ombros, corpo reto da cabeça aos calcanhares.", "Contraia abdômen e glúteos e respire de forma contínua.", "Mantenha o tempo indicado sem deixar o quadril cair."],
    err: "Quadril caindo ou subindo demais."
  },
  run: {
    bg: "",
    s: pose([[[60, 28], [58, 50]], [[58, 50], [72, 58], [70, 72]], [[58, 50], [48, 64], [38, 72]], [[60, 30], [70, 36], [76, 28]], [[60, 30], [50, 36], [44, 44]]], [62, 20], null),
    e: pose([[[60, 28], [58, 50]], [[58, 50], [48, 64], [38, 72]], [[58, 50], [72, 58], [70, 72]], [[60, 30], [50, 36], [44, 44]], [[60, 30], [70, 36], [76, 28]]], [62, 20], null),
    steps: ["Postura ereta, olhar à frente e ombros relaxados.", "Passadas curtas e rápidas, aterrissando sob o centro do corpo.", "Respire de forma ritmada e mantenha o ritmo indicado na ficha."],
    err: "Começar rápido demais e perder o ritmo."
  },
  bike: {
    bg: '<circle cx="30" cy="64" r="14"/><circle cx="88" cy="64" r="14"/><path d="M30 64 L52 44 L80 44 L88 64 M52 44 L58 64 L30 64"/><rect x="42" y="38" width="12" height="3" rx="1"/>',
    s: pose([[[68, 25], [52, 40]], [[52, 40], [70, 50], [65, 62]], [[52, 40], [62, 54], [51, 64]], [[68, 25], [76, 32], [80, 40]]], [74, 17], null),
    e: pose([[[68, 25], [52, 40]], [[52, 40], [62, 54], [51, 64]], [[52, 40], [70, 50], [65, 62]], [[68, 25], [76, 32], [80, 40]]], [74, 17], null),
    steps: ["Ajuste o banco para que o joelho fique levemente flexionado no ponto mais baixo.", "Pedale de forma circular, com cadência constante.", "Mantenha as costas retas e os ombros relaxados."],
    err: "Banco baixo demais, sobrecarregando os joelhos."
  },
  jack: {
    bg: "",
    s: pose([[[60, 26], [60, 52]], [[60, 29], [53, 41], [52, 54]], [[60, 29], [67, 41], [68, 54]], [[60, 52], [56, 67], [56, 80]], [[60, 52], [64, 67], [64, 80]]], [60, 18], null),
    e: pose([[[60, 26], [60, 52]], [[60, 29], [46, 26], [38, 14]], [[60, 29], [74, 26], [82, 14]], [[60, 52], [48, 66], [40, 80]], [[60, 52], [72, 66], [80, 80]]], [60, 18], null),
    steps: ["Comece em pé, pés juntos e braços ao lado do corpo.", "Salte abrindo pernas e levando os braços acima da cabeça.", "Retorne ao início de forma fluida e mantenha o ritmo."],
    err: "Aterrissar com os joelhos travados."
  },
  fold: {
    bg: "",
    s: pose([[[54, 80], [56, 66], [56, 52], [60, 30]], [[60, 32], [70, 20], [72, 8]]], [60, 21], null),
    e: pose([[[54, 80], [54, 66], [48, 52], [66, 62]], [[66, 62], [64, 72], [58, 80]]], [74, 66], null),
    steps: ["Pés na largura do quadril, joelhos levemente flexionados.", "Incline o tronco a partir do quadril, deixando a cabeça pesada.", "Segure 20–30 s respirando fundo, sem forçar."],
    err: "Forçar o alongamento até doer."
  }
};

/* ===== Biblioteca =====  id, nome, apelidos (p/ reconhecer nas fichas), músculo, padrão, equipamento, serve p/ casa */
const EX_LIST = [
  ["supino_reto", "Supino reto", ["supino reto", "supino com barra"], "Peito", "press_flat", "bar", 0],
  ["supino_halteres", "Supino com halteres", ["supino halteres"], "Peito", "press_flat", "db", 0],
  ["supino_maquina", "Supino na máquina", ["supino maquina", "chest press"], "Peito", "press_flat", "pad", 0],
  ["supino_inclinado", "Supino inclinado", ["supino inclinado"], "Peito", "press_incline", "bar", 0],
  ["supino_inclinado_halteres", "Supino inclinado com halteres", ["supino inclinado halteres"], "Peito", "press_incline", "db", 0],
  ["crucifixo_halteres", "Crucifixo com halteres", ["crucifixo halteres", "crucifixo reto", "crucifixo"], "Peito", "fly", "db", 0],
  ["crucifixo_maquina", "Crucifixo na máquina", ["crucifixo maquina", "peck deck", "voador"], "Peito", "fly", "pad", 0],
  ["crossover", "Crossover (polia)", ["crossover", "cross over"], "Peito", "fly", "db", 0],
  ["flexao", "Flexão de braço", ["flexao de braco", "flexao"], "Peito", "pushup", "none", 1],
  ["flexao_inclinada", "Flexão inclinada (mãos elevadas)", ["flexao inclinada"], "Peito", "pushup", "none", 1],
  ["flexao_declinada", "Flexão com pés elevados", ["flexao declinada", "flexao pes elevados"], "Peito", "pushup", "none", 1],
  ["flexao_diamante", "Flexão diamante", ["flexao diamante"], "Tríceps", "pushup", "none", 1],

  ["desenvolvimento_militar", "Desenvolvimento militar", ["desenvolvimento militar", "desenvolvimento com barra"], "Ombros", "press_overhead", "bar", 0],
  ["desenvolvimento_halteres", "Desenvolvimento com halteres", ["desenvolvimento halteres", "desenvolvimento"], "Ombros", "press_overhead", "db", 1],
  ["desenvolvimento_maquina", "Desenvolvimento na máquina", ["desenvolvimento maquina"], "Ombros", "press_overhead", "pad", 0],
  ["elevacao_lateral", "Elevação lateral", ["elevacao lateral"], "Ombros", "lateral", "db", 1],
  ["elevacao_lateral_polia", "Elevação lateral na polia", ["elevacao lateral polia"], "Ombros", "lateral", "db", 0],
  ["elevacao_frontal", "Elevação frontal", ["elevacao frontal"], "Ombros", "lateral", "db", 1],
  ["crucifixo_inverso", "Crucifixo inverso", ["crucifixo inverso", "voador inverso", "face pull"], "Ombros", "row", "db", 1],
  ["encolhimento", "Encolhimento", ["encolhimento"], "Trapézio", "shrug", "db", 1],
  ["remada_alta", "Remada alta", ["remada alta"], "Trapézio", "shrug", "bar", 0],

  ["puxada_frontal", "Puxada frontal", ["puxada frontal", "puxada aberta", "puxada"], "Costas", "pulldown", "cable", 0],
  ["puxada_triangulo", "Puxada triângulo", ["puxada triangulo"], "Costas", "pulldown", "cable", 0],
  ["barra_fixa", "Barra fixa", ["barra fixa"], "Costas", "pullup", "none", 0],
  ["remada_curvada", "Remada curvada", ["remada curvada"], "Costas", "row", "bar", 1],
  ["remada_unilateral", "Remada unilateral (serrote)", ["remada unilateral", "serrote"], "Costas", "row", "db", 1],
  ["remada_baixa", "Remada baixa", ["remada baixa", "remada sentada"], "Costas", "seated_row", "cable", 0],
  ["remada_maquina", "Remada na máquina", ["remada maquina"], "Costas", "seated_row", "cable", 0],

  ["rosca_direta", "Rosca direta", ["rosca direta"], "Bíceps", "curl", "bar", 1],
  ["rosca_alternada", "Rosca alternada", ["rosca alternada"], "Bíceps", "curl", "db", 1],
  ["rosca_martelo", "Rosca martelo", ["rosca martelo"], "Bíceps", "curl", "db", 1],
  ["rosca_scott", "Rosca Scott", ["rosca scott"], "Bíceps", "curl", "bar", 0],
  ["rosca_concentrada", "Rosca concentrada", ["rosca concentrada"], "Bíceps", "curl", "db", 1],

  ["triceps_pulley", "Tríceps pulley", ["triceps pulley", "triceps na polia", "pulley"], "Tríceps", "triceps_push", "cable", 0],
  ["triceps_corda", "Tríceps corda", ["triceps corda"], "Tríceps", "triceps_push", "cable", 0],
  ["triceps_frances", "Tríceps francês", ["triceps frances"], "Tríceps", "skull", "db", 1],
  ["triceps_testa", "Tríceps testa", ["triceps testa"], "Tríceps", "skull", "bar", 1],
  ["mergulho_banco", "Mergulho no banco", ["mergulho", "triceps banco"], "Tríceps", "dip", "none", 1],

  ["agachamento_livre", "Agachamento livre", ["agachamento livre", "agachamento globular", "agachamento"], "Quadríceps", "squat", "bar", 0],
  ["agachamento_corpo", "Agachamento com peso do corpo", ["agachamento com peso do corpo"], "Quadríceps", "squat", "none", 1],
  ["agachamento_hack", "Agachamento hack", ["agachamento hack", "hack"], "Quadríceps", "squat", "pad", 0],
  ["agachamento_smith", "Agachamento no Smith", ["agachamento smith", "smith"], "Quadríceps", "squat", "bar", 0],
  ["agachamento_salto", "Agachamento com salto", ["agachamento com salto"], "Quadríceps", "squat", "none", 1],
  ["agachamento_sumo", "Agachamento sumô", ["agachamento sumo"], "Glúteos", "squat", "db", 1],
  ["leg_press", "Leg press 45°", ["leg press"], "Quadríceps", "leg_press", "pad", 0],
  ["afundo", "Afundo", ["afundo"], "Quadríceps", "lunge", "db", 1],
  ["passada", "Passada (avanço)", ["passada", "avanco"], "Quadríceps", "lunge", "db", 1],
  ["agachamento_bulgaro", "Agachamento búlgaro", ["agachamento bulgaro", "bulgaro"], "Quadríceps", "lunge", "db", 1],
  ["cadeira_extensora", "Cadeira extensora", ["cadeira extensora", "extensora"], "Quadríceps", "leg_ext", "pad", 0],
  ["mesa_flexora", "Mesa flexora", ["mesa flexora"], "Posterior de coxa", "leg_curl", "pad", 0],
  ["cadeira_flexora", "Cadeira flexora", ["cadeira flexora", "flexora"], "Posterior de coxa", "leg_curl", "pad", 0],
  ["stiff", "Stiff", ["stiff"], "Posterior de coxa", "deadlift", "bar", 0],
  ["stiff_halteres", "Stiff com halteres", ["stiff com halteres"], "Posterior de coxa", "deadlift", "db", 1],
  ["rdl", "Levantamento terra romeno (RDL)", ["levantamento terra ou rdl", "levantamento terra romeno", "levantamento terra", "rdl"], "Posterior de coxa", "deadlift", "bar", 0],
  ["elevacao_pelvica", "Elevação pélvica", ["elevacao pelvica", "hip thrust"], "Glúteos", "hip_thrust", "bar", 0],
  ["ponte_gluteo", "Ponte de glúteos", ["ponte de gluteos", "ponte"], "Glúteos", "hip_thrust", "none", 1],
  ["panturrilha_em_pe", "Panturrilha em pé", ["panturrilha em pe", "panturrilha"], "Panturrilha", "calf", "none", 1],
  ["panturrilha_sentado", "Panturrilha sentado", ["panturrilha sentado", "panturrilha sentada"], "Panturrilha", "calf", "none", 0],
  ["panturrilha_leg_press", "Panturrilha no leg press", ["panturrilha no leg press"], "Panturrilha", "calf", "none", 0],

  ["prancha", "Prancha abdominal", ["prancha abdominal", "prancha"], "Core", "plank", "none", 1],
  ["prancha_lateral", "Prancha lateral", ["prancha lateral"], "Core", "plank", "none", 1],
  ["abdominal_supra", "Abdominal supra", ["abdominal supra", "abdominal"], "Core", "crunch", "none", 1],
  ["abdominal_infra", "Abdominal infra", ["abdominal infra", "elevacao de pernas"], "Core", "leg_raise", "none", 1],
  ["abdominal_bicicleta", "Abdominal bicicleta", ["abdominal bicicleta"], "Core", "crunch", "none", 1],

  ["esteira", "Esteira", ["esteira"], "Cardio", "run", "none", 0],
  ["corrida", "Corrida", ["corrida", "correr"], "Cardio", "run", "none", 1],
  ["caminhada", "Caminhada inclinada", ["caminhada inclinada", "caminhada"], "Cardio", "run", "none", 1],
  ["hiit", "HIIT (tiros)", ["hiit", "tiros"], "Cardio", "run", "none", 1],
  ["bike", "Bicicleta", ["bike", "bicicleta ergometrica"], "Cardio", "bike", "none", 0],
  ["polichinelo", "Polichinelo", ["polichinelo"], "Cardio", "jack", "none", 1],
  ["burpee", "Burpee", ["burpee"], "Cardio", "jack", "none", 1],
  ["corda", "Corda naval / pular corda", ["corda naval", "pular corda", "corda"], "Cardio", "jack", "none", 1],
  ["alongamento", "Alongamento e mobilidade", ["alongamento", "mobilidade", "liberacao miofascial"], "Mobilidade", "fold", "none", 1]
];

const EXMAP = {};
function norm(s) {
  return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
}
const EX_ALIAS = [];
EX_LIST.forEach(r => {
  EXMAP[r[0]] = { id: r[0], name: r[1], aliases: r[2], muscle: r[3], pattern: r[4], tool: r[5], home: !!r[6] };
  [r[1], ...r[2]].forEach(a => EX_ALIAS.push({ alias: norm(a), id: r[0] }));
});

const _matchCache = {};
function matchExercise(line) {
  if (_matchCache[line] !== undefined) return _matchCache[line];
  const n = " " + norm(line) + " ";
  let best = null;
  for (const a of EX_ALIAS) {
    const i = n.indexOf(" " + a.alias + " ");
    if (i < 0) continue;
    if (!best || i < best.i || (i === best.i && a.alias.length > best.len)) best = { i, len: a.alias.length, id: a.id };
  }
  return (_matchCache[line] = best ? best.id : null);
}

/* ===== Desenho SVG ===== */
function figure(patternKey, mode, toolType) {
  const p = PT[patternKey];
  if (!p) return "";
  const anim = mode === "anim";
  const cur = mode === "e" ? p.e : p.s;
  const av = (attr, a, b) => anim
    ? `<animate attributeName="${attr}" dur="2.6s" repeatCount="indefinite" values="${a};${b};${a}" calcMode="spline" keyTimes="0;0.5;1" keySplines=".45 0 .55 1;.45 0 .55 1"/>`
    : "";
  const dS = pathD(p.s.lines), dE = pathD(p.e.lines);
  let o = `<svg viewBox="0 0 120 90" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">`;
  o += `<line x1="6" y1="83" x2="114" y2="83" stroke="${C_FLOOR}" stroke-width="2" stroke-linecap="round"/>`;
  if (p.bg) o += `<g fill="none" stroke="${C_FLOOR}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${p.bg}</g>`;

  const hasTool = toolType && toolType !== "none" && p.s.t;
  if (hasTool && toolType === "cable" && p.anchor) {
    const c = pt => `M${p.anchor.join(" ")} L${pt.join(" ")}`;
    o += `<path d="${c(cur.t)}" fill="none" stroke="${C_EQ}" stroke-width="1.5" opacity=".8">${av("d", c(p.s.t), c(p.e.t))}</path>`;
  }
  o += `<path d="${pathD(cur.lines)}" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round">${av("d", dS, dE)}</path>`;
  o += `<circle cx="${cur.head[0]}" cy="${cur.head[1]}" r="6" fill="${C_BODY}">${av("cx", p.s.head[0], p.e.head[0])}${av("cy", p.s.head[1], p.e.head[1])}</circle>`;
  if (hasTool) {
    const r = toolType === "db" ? 4.5 : toolType === "bar" ? 6 : toolType === "cable" ? 3 : 5;
    const fill = toolType === "bar" ? "none" : C_EQ;
    const sw = toolType === "bar" ? 3 : 0;
    o += `<circle cx="${cur.t[0]}" cy="${cur.t[1]}" r="${r}" fill="${fill}" stroke="${C_EQ}" stroke-width="${sw}">${av("cx", p.s.t[0], p.e.t[0])}${av("cy", p.s.t[1], p.e.t[1])}</circle>`;
  }
  return o + "</svg>";
}

const TOOL_LABEL = { bar: "Barra", db: "Halteres", cable: "Polia / cabo", pad: "Máquina", none: "Peso do corpo" };

function exFigure(id, mode) {
  const e = EXMAP[id];
  return e ? figure(e.pattern, mode, e.tool) : "";
}

/* Lista de exercícios de um dia, com miniaturas clicáveis */
function renderExerciseList(text) {
  return text.split("\n").filter(l => l.trim()).map(line => {
    const id = matchExercise(line);
    const clean = esc(line.replace(/^[•\-\*]\s*/, ""));
    if (!id) return `<div class="ex-row plain"><span class="ex-text">• ${clean}</span></div>`;
    return `<div class="ex-row" onclick="event.stopPropagation();openExercise('${id}')">
      <span class="ex-thumb">${exFigure(id, "s")}</span>
      <span class="ex-text">${clean}</span>
      <span class="ex-info">ver ›</span>
    </div>`;
  }).join("");
}

function openExercise(id) {
  const e = EXMAP[id];
  if (!e) return;
  const p = PT[e.pattern];
  document.getElementById("exerciseBody").innerHTML = `
    <div class="cardhead">
      <h2>${esc(e.name)}</h2>
      <button class="textbtn" onclick="closeExerciseModal()">✕</button>
    </div>
    <div class="ex-tags"><span class="tag sport">${esc(e.muscle)}</span><span class="tag rest">${TOOL_LABEL[e.tool] || ""}</span></div>
    <div class="ex-figure">${figure(e.pattern, "anim", e.tool)}</div>
    <div class="ex-frames">
      <div>${figure(e.pattern, "s", e.tool)}<small>1 · Posição inicial</small></div>
      <div>${figure(e.pattern, "e", e.tool)}<small>2 · Posição final</small></div>
    </div>
    <h3>Como executar</h3>
    <ol class="ex-steps">${p.steps.map(s => `<li>${esc(s)}</li>`).join("")}</ol>
    <p class="ex-mistake"><b>Erro comum:</b> ${esc(p.err)}</p>
    <p class="footnote" style="margin:10px 0 0">Ilustração esquemática do movimento. Se tiver dúvida na técnica, peça orientação a um profissional de educação física.</p>`;
  document.getElementById("exerciseModal").style.display = "flex";
}
function closeExerciseModal() {
  document.getElementById("exerciseModal").style.display = "none";
  document.getElementById("exerciseBody").innerHTML = "";
}
