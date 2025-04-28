// Whitelist stolen from roller.coaster.images
let whitelist = [1, 3, 5, 7, 10, 11, 12, 13, 17, 18, 22, 24, 25, 28, 29, 30, 31, 32, 35, 37, 40, 4173, 615, 130, 129, 470, 2169, 140, 3305, 12282, 16588, 19515, 750, 526, 15413, 291, 4089, 3704, 2536, 1574, 20275, 14683, 17030, 2079, 9819, 70, 2860, 6640, 73, 67, 4253, 66, 1037, 530, 14116, 11437, 92, 3302, 4079, 138, 90, 4520, 15028, 10891, 3570, 594, 15411, 13383, 20342, 582, 136, 12260, 3231, 741, 270, 460, 2722, 285, 552, 99, 281, 11662, 4042, 742, 16676, 7982, 172, 12941, 173, 9456, 12781, 16985, 94, 87, 95, 2662, 16607, 17420, 1904, 581, 12758, 4190, 20042, 197, 17035, 11579, 196, 3534, 2164, 198, 139, 104, 11450, 747, 9972, 14187, 16586, 535, 1977, 113, 10137, 16682, 4049, 468, 109, 10089, 108, 2498, 107, 20462, 3866, 15330, 557, 703, 6992, 278, 3635, 532, 17278, 14302, 76, 80, 10857, 77, 79, 15412, 16587, 357, 1143, 13422, 163, 617, 17660, 10139, 15410, 1862, 447, 4155, 178, 18691, 176, 550, 1659, 256, 255, 254, 586, 153, 4191, 155, 18398, 20336, 12896, 214, 16885, 212, 653, 469, 3244, 4296, 2572, 20340, 1455, 1903, 220, 15168, 720, 20328, 501, 16124, 6691, 13369, 3609, 534, 2451, 10148, 527, 81, 83, 16349, 4269, 12273, 85, 8588, 1897, 2514, 1478, 86, 2508, 101, 3727, 19332, 3183, 8932, 17658, 13421, 2832, 502, 1106, 131, 1976, 16793, 15594, 158, 408, 13346, 202, 200, 201, 732, 731, 273, 9720, 15286, 2389, 15504, 560, 13377, 602, 12897, 432, 143, 1549, 629, 9431, 14189, 3031, 429, 628, 182, 1981, 218, 537, 478, 4053, 219, 415, 264, 2214, 262, 431, 298, 9517, 123, 538, 120, 121, 8612, 16479, 122, 2657, 3917, 377, 1089, 10136, 544, 6765, 485, 699, 148, 277, 531, 7706, 3631, 8027, 110, 16812, 12277, 9463, 337, 14400, 421, 42, 9430, 556, 3290, 41, 1568, 15457, 542, 422, 209, 210, 19510, 161, 2667, 280, 18816, 21145, 21070, 21085, 21034, 21221, 3254, 1190, 9795, 3117, 15201, 12723, 1235, 1412, 1747, 4162, 3081, 9820, 1458, 777, 2787, 11062, 2472, 15029, 12959, 1845, 12272, 15561, 15515, 1178, 1173, 15562, 17412, 12362, 14462, 16184, 13637, 10154, 2999, 12083, 4526, 897, 770, 1565, 12315, 773, 16047, 769, 14717, 3589, 2747, 10333, 1028, 1414, 4074, 972, 971, 1891, 10018, 1043, 3245, 20266, 1042, 9863, 9040, 4224, 15502, 6764, 12413, 16308, 10077, 17725, 4181, 7645, 16138, 9206, 1073, 3916, 3613, 3938, 12771, 753, 9675, 752, 16327, 1038, 12032, 20019, 1368, 1365, 1369, 1366, 977, 6736, 10239, 762, 760, 3430, 759, 11615, 4075, 981, 982, 11034, 3849, 19160, 4485, 12772, 12575, 3573, 4308, 17570, 1258, 1290, 1218, 1183, 2424, 3621, 1208, 1259, 4038, 1463, 14084, 11058, 19376, 4090, 10902, 2482, 1562, 11048, 1061, 14301, 4147, 10393, 764, 765, 12027, 17866, 14312, 789, 775, 792, 3672, 788, 10698, 11057, 17715, 1011, 4065, 4225, 4150, 3799, 10748, 1227, 9647, 1054, 2054, 12050, 14011, 956, 957, 959, 1444, 15063, 4274, 3617, 11664, 2829, 639, 10972, 15460, 580, 10108, 2861, 64, 4005, 58, 57, 59, 2516, 65, 60, 12140, 16021, 320, 3385, 187, 8662, 186, 1567, 967, 966, 969, 13796, 988, 986, 984, 6667, 9097, 987, 11056, 18358, 1093, 2199, 15212, 4309, 9352, 1651, 11346, 6489, 16310, 16314, 16318, 10983, 10741, 11152, 11550, 11333, 8994, 9114, 18718, 13876, 843, 1413, 12364, 2721, 2749, 1525, 20890, 2956, 10523, 4154, 12098, 3657, 1155, 1322, 1321, 1154, 4149, 1152, 1150, 1168, 1169, 1481, 20652];
let preloadQueue = [];
let stats = ["length", "height", "drop", "speed", "inversions", "verticalAngle", "duration", "capacity", "cost", "year"];
let currentStat = "";
let coasterLeft, coasterRight;
let score = 0;
let bestScore = parseInt(sessionStorage.getItem('bestScore')) || 0;
let lastStat = "";

function getRandomStat() {
  return stats[Math.floor(Math.random() * stats.length)];
}

async function preloadCoasters(n) {
  while (preloadQueue.length < n) {
    let coaster = await fetchCoaster();
    preloadQueue.push(coaster);
    let img = new Image();
    img.src = coaster.mainPicture.url;
  }
}

async function fetchCoaster() {
  let id = whitelist[Math.floor(Math.random() * whitelist.length)];
  let response = await fetch(`https://rcdb-api.vercel.app/api/coasters/${id}`);
  let data = await response.json();
  if (!data.mainPicture || !data.name || data.name === "Unknown") return fetchCoaster();
  return data;
}

function hasStat(coaster, stat) {
  let value = getCoasterStat(coaster, stat);
  return value !== null && value !== undefined && !isNaN(value);
}

function startBattle(first = false) {
  if (first) {
    coasterLeft = preloadQueue.shift();
  } else {
    coasterLeft = coasterRight;
  }

  let availableStats = stats.filter(stat => stat !== lastStat && hasStat(coasterLeft, stat));
  if (availableStats.length === 0) availableStats = stats.filter(stat => hasStat(coasterLeft, stat));

  currentStat = availableStats[Math.floor(Math.random() * availableStats.length)];
  lastStat = currentStat;

  do {
    coasterRight = preloadQueue.shift();
  } while (!hasStat(coasterRight, currentStat) || getCoasterStat(coasterRight, currentStat) === getCoasterStat(coasterLeft, currentStat));

  preloadCoasters(4);
  showCoasters();
}

function showCoasters() {
  document.getElementById("stat-name").innerText = "Compare " + formatStatName(currentStat);
  document.getElementById("coaster-left").style.backgroundImage = `url(${coasterLeft.mainPicture.url})`;
  document.getElementById("left-stat").innerText = formatStatValue(currentStat, getCoasterStat(coasterLeft, currentStat));
  document.getElementById("left-name").innerText = coasterLeft.name;
  document.getElementById("left-creator").innerText = "Photo by " + (coasterLeft.mainPicture.copyName || "Unknown");

  document.getElementById("coaster-right").style.backgroundImage = `url(${coasterRight.mainPicture.url})`;
  document.getElementById("right-stat").innerText = "?";
  document.getElementById("right-name").innerText = coasterRight.name;
  document.getElementById("right-creator").innerText = "Photo by " + (coasterRight.mainPicture.copyName || "Unknown");

  animateFade();
}

function getCoasterStat(coaster, stat) {
  if (stat === "year") {
    return coaster.status?.date?.opened ? parseInt(coaster.status.date.opened.split("-")[0]) : null;
  }
  let value = coaster.stats ? coaster.stats[stat] : null;
  if (stat === "duration" && value) return value;
  return value;
}

function formatStatName(stat) {
  switch (stat) {
    case "length": return "Length";
    case "height": return "Height";
    case "drop": return "Drop";
    case "speed": return "Speed";
    case "inversions": return "Inversions";
    case "verticalAngle": return "Vertical Angle";
    case "duration": return "Duration";
    case "capacity": return "Capacity";
    case "cost": return "Cost";
    case "year": return "Opening Year";
    default: return stat;
  }
}

function formatStatValue(stat, value) {
  if (value == null) return "Unknown";
  switch (stat) {
    case "length": return value + " m";
    case "height": return value + " m";
    case "drop": return value + " m";
    case "speed": return value + " mp/h";
    case "inversions": return value + "x";
    case "verticalAngle": return value + "°";
    case "duration": return (value / 60).toFixed(2) + " min";
    case "capacity": return value + " riders/h";
    case "cost": return "$" + Number(value * 1000).toLocaleString();
    case "year": return value;
    default: return value;
  }
}

function animateFade() {
  document.getElementById("coaster-left").classList.add("fade-in");
  document.getElementById("coaster-right").classList.add("fade-in");
  setTimeout(() => {
    document.getElementById("coaster-left").classList.remove("fade-in");
    document.getElementById("coaster-right").classList.remove("fade-in");
  }, 500);
}

document.getElementById("higher").onclick = () => checkAnswer(true);
document.getElementById("lower").onclick = () => checkAnswer(false);

function checkAnswer(guessHigher) {
  let left = parseFloat(getCoasterStat(coasterLeft, currentStat));
  let right = parseFloat(getCoasterStat(coasterRight, currentStat));
  if (isNaN(left) || isNaN(right)) {
    startBattle();
    return;
  }
  document.getElementById("right-stat").innerText = formatStatValue(currentStat, right);
  if ((guessHigher && right > left) || (!guessHigher && right < left)) {
    score++;
    bestScore = Math.max(score, bestScore);
    sessionStorage.setItem('bestScore', bestScore);
    showNotification("Correct!", "lime");
  } else {
    score = 0;
    showNotification("Wrong!", "red");
  }
  updateScores();
  setTimeout(() => startBattle(false), 1000);
}

function updateScores() {
  document.getElementById("score").innerText = score;
  document.getElementById("bestScore").innerText = bestScore;
}

function showNotification(text, color) {
  let notif = document.getElementById("notification");
  notif.innerText = text;
  notif.style.color = color;
  notif.style.opacity = 1;
  setTimeout(() => {
    notif.style.opacity = 0;
  }, 800);
}

preloadCoasters(4).then(() => startBattle(true));