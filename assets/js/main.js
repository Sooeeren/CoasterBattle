// --- CONFIGURATION & GLOBAL STATE ---

// Flags & Game State
let isPreloading = false;
let isGameOver = false;
let score = 0;
let bestScore = parseInt(localStorage.getItem('bestScore')) || 0;
let currentStat = "";
let lastStat = "";
let coasterLeft, coasterRight;
let preloadQueue = [];
let timerInterval;

// Game Data & Constants
const gameData = {};
const dataFiles = [
    'capacity', 'closed', 'cost', 'country', 'drop', 'duration',
    'height', 'inversions', 'length', 'name', 'park', 'speed',
    'verticalAngle', 'year', 'photographer-credits'
];

const whitelist = [1, 3, 5, 7, 10, 11, 12, 13, 17, 18, 22, 24, 25, 28, 29, 30, 31, 32, 35, 37, 40, 4173, 615, 130, 129, 470, 2169, 140, 3305, 12282, 16588, 19515, 750, 526, 15413, 291, 4089, 3704, 2536, 1574, 20275, 14683, 17030, 2079, 9819, 70, 2860, 6640, 73, 67, 4253, 66, 1037, 530, 14116, 11437, 92, 3302, 4079, 138, 90, 4520, 15028, 10891, 3570, 594, 15411, 13383, 20342, 582, 136, 12260, 3231, 741, 270, 460, 2722, 285, 552, 99, 281, 11662, 4042, 742, 16676, 7982, 172, 12941, 173, 9456, 12781, 16985, 94, 87, 95, 2662, 16607, 17420, 1904, 581, 12758, 4190, 20042, 197, 17035, 11579, 196, 3534, 2164, 198, 139, 104, 11450, 747, 9972, 14187, 16586, 535, 1977, 113, 10137, 16682, 4049, 468, 109, 10089, 108, 2498, 107, 20462, 3866, 15330, 557, 703, 6992, 278, 3635, 532, 17278, 14302, 76, 80, 10857, 77, 79, 15412, 16587, 357, 1143, 13422, 163, 617, 17660, 10139, 15410, 1862, 447, 4155, 178, 18691, 176, 550, 1659, 256, 255, 254, 586, 153, 4191, 155, 18398, 20336, 12896, 214, 16885, 212, 653, 469, 3244, 4296, 2572, 20340, 1455, 1903, 220, 15168, 720, 20328, 501, 16124, 6691, 13369, 3609, 534, 2451, 10148, 527, 81, 83, 16349, 4269, 12273, 85, 8588, 1897, 2514, 1478, 86, 2508, 101, 3727, 19332, 3183, 8932, 17658, 13421, 2832, 502, 1106, 131, 1976, 16793, 15594, 158, 408, 13346, 202, 200, 201, 732, 731, 273, 9720, 15286, 2389, 15504, 560, 13377, 602, 12897, 432, 143, 1549, 629, 9431, 14189, 3031, 429, 628, 182, 1981, 218, 537, 478, 4053, 219, 415, 264, 2214, 262, 431, 298, 9517, 123, 538, 120, 121, 8612, 16479, 122, 2657, 3917, 377, 1089, 10136, 544, 6765, 485, 699, 148, 277, 531, 7706, 3631, 8027, 110, 16812, 12277, 9463, 337, 14400, 421, 42, 9430, 556, 3290, 41, 1568, 15457, 542, 422, 209, 210, 19510, 161, 2667, 280, 18816, 21145, 21070, 21085, 21034, 21221, 3254, 1190, 9975, 3117, 15201, 12723, 1235, 1412, 1747, 4162, 3081, 9820, 1458, 777, 2787, 11062, 2472, 15029, 12959, 1845, 12272, 15561, 15515, 1178, 1173, 15562, 17412, 12362, 14462, 16184, 13637, 10154, 2999, 12083, 4526, 897, 770, 1565, 12315, 773, 16047, 769, 14717, 3589, 2747, 10333, 1028, 1414, 4074, 972, 971, 1891, 10018, 1043, 3245, 20266, 1042, 9863, 9040, 4224, 15502, 6764, 12413, 16308, 10077, 17725, 4181, 7645, 16138, 9206, 1073, 3916, 3613, 3938, 12771, 753, 9675, 752, 16327, 1038, 12032, 20019, 1368, 1365, 1369, 1366, 977, 6736, 10239, 762, 760, 3430, 759, 11615, 4075, 981, 982, 11034, 3849, 19160, 4485, 12772, 12575, 3573, 4308, 17570, 1258, 1290, 1218, 1183, 2424, 3621, 1208, 1259, 4038, 1463, 14084, 11058, 19376, 4090, 10902, 2482, 1562, 11048, 1061, 14301, 4147, 10393, 764, 765, 12027, 17866, 14312, 789, 775, 792, 3672, 788, 10698, 11057, 17715, 1011, 4065, 4225, 4150, 3799, 10748, 1227, 9647, 1054, 2054, 12050, 14011, 956, 957, 959, 1444, 15063, 4274, 3617, 11664, 2829, 639, 10972, 15460, 580, 10108, 2861, 64, 4005, 58, 57, 59, 2516, 65, 60, 12140, 16021, 320, 3385, 187, 8662, 186, 1567, 967, 966, 969, 13796, 988, 986, 984, 6667, 9097, 987, 11056, 18358, 1093, 2199, 15212, 4309, 9352, 1651, 11346, 6489, 16310, 16314, 16318, 10983, 10741, 11152, 11550, 11333, 8994, 9114, 18718, 13876, 843, 1413, 12364, 2721, 2749, 1525, 20890, 2956, 10523, 4154, 12098, 3657, 1155, 1322, 1321, 1154, 4149, 1152, 1150, 1168, 1169, 1481, 20652];
const stats = {
    length: "Length", height: "Height", drop: "Drop", speed: "Speed",
    inversions: "Inversions", verticalAngle: "Vertical Angle", duration: "Duration",
    capacity: "Capacity", year: "Year", cost: "Cost"
};
const statLabels = {
    default: { higher: 'Higher ▲', lower: 'Lower ▼' },
    length: { higher: 'Longer ▲', lower: 'Shorter ▼' },
    height: { higher: 'Taller ▲', lower: 'Shorter ▼' },
    drop: { higher: 'Bigger Drop ▲', lower: 'Smaller Drop ▼' },
    speed: { higher: 'Faster ▲', lower: 'Slower ▼' },
    inversions: { higher: 'More Inversions ▲', lower: 'Fewer Inversions ▼' },
    duration: { higher: 'Longer ▲', lower: 'Shorter ▼' },
    capacity: { higher: 'Higher Throughput ▲', lower: 'Lower Throughput ▼' },
    cost: { higher: 'More Expensive ▲', lower: 'Cheaper ▼' },
    year: { higher: 'Newer ▲', lower: 'Older ▼' },
    verticalAngle: { higher: 'Steeper ▲', lower: 'Less Steep ▼' }
};
const questionPhrases = {
    length: "is longer or shorter",
    height: "is taller or shorter",
    drop: "has a bigger or smaller drop",
    speed: "is faster or slower",
    inversions: "has more or fewer inversions",
    duration: "is longer or shorter",
    capacity: "has a higher or lower throughput",
    cost: "is more or less expensive",
    year: "is newer or older",
    verticalAngle: "has a steeper or less steep drop",
    default: "has a higher or lower value"
};
const currencyHelpersConfig = {
    get debug() {
        return window.gameSettings && window.gameSettings.debugMode;
    },
    countryMap: {
        "osaka": "Japan",
        "england": "united kingdom",
        "flemish region": "Belgium"
    }
};

// Default Settings
let gameSettings = {
    units: 'metric',
    currency: 'EUR',
    timerDuration: 0,
    imageDarkness: 5,
    activeStats: Object.keys(stats),
    hardMode: false,
    similarMode: false,
    similarDifficulty: 5,
    preloadTarget: 5,
    debugMode: false
};
let activeStats = Object.keys(stats);

// --- DOM ELEMENT REFERENCES ---
const body = document.body;
const loader = document.getElementById("loader");
const settingsIcon = document.getElementById("settings-icon");
const settingsModal = document.getElementById("settings-modal");
const closeModalButton = document.querySelector(".close-button");
const unitsSelect = document.getElementById("units");
const currencySelect = document.getElementById("currency-select");
const timerSlider = document.getElementById("timer-slider");
const timerValue = document.getElementById("timer-value");
const darkenSlider = document.getElementById("darken-slider");
const darkenValue = document.getElementById("darken-value");
const hardModeToggle = document.getElementById("hard-mode");
const similarModeToggle = document.getElementById("similar-mode");
const similarDifficultySlider = document.getElementById("similar-difficulty-slider");
const similarDifficultyValue = document.getElementById("similar-difficulty-value");
const preloadSlider = document.getElementById("preload-slider");
const preloadValue = document.getElementById("preload-value");
const debugModeToggle = document.getElementById("debug-mode");
const gameOverModal = document.getElementById("game-over-modal");
const playAgainButton = document.getElementById("play-again-button");
const copyScoreButton = document.getElementById("copy-score-button");
const timerBarContainer = document.getElementById('timer-bar-container');
const timerBar = document.getElementById('timer-bar');
const leaderboardIcon = document.getElementById('leaderboard-icon');
const leaderboardModal = document.getElementById('leaderboard-modal');
const closeLeaderboardButton = document.querySelector('.close-leaderboard-button');
const statFiltersContainer = document.getElementById('stat-filters');


// --- CORE FUNCTIONS ---

async function loadAllGameData() {
    console.log("Pre-loading all local game data...");
    showLoader();
    try {
        const fetchPromises = dataFiles.map(file =>
            fetch(`./data/coaster-${file}.json`).then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch ${file}.json: ${response.statusText}`);
                }
                return response.json();
            })
        );

        const allData = await Promise.all(fetchPromises);

        dataFiles.forEach((file, index) => {
            gameData[file] = allData[index];
        });

        console.log("Local game data loaded successfully!");
        return true;
    } catch (error) {
        console.error("Fatal Error: Could not load local game data.", error);
        hideLoader();
        document.body.innerHTML = `<div style="color: white; text-align: center; padding-top: 20%;"><h1>Error: Could not load game data.</h1><p>Please check the console for details and refresh the page.</p></div>`;
        return false;
    }
}


// --- Settings Management ---
function updateSliderBackground(slider) {
    const min = slider.min;
    const max = slider.max;
    const val = slider.value;
    const percentage = ((val - min) * 100) / (max - min);
    const color = '#4da6ff';
    const bgColor = '#555';
    slider.style.background = `linear-gradient(to right, ${color} ${percentage}%, ${bgColor} ${percentage}%)`;
}

function saveSettings() {
    sessionStorage.setItem('coasterBattleSettings', JSON.stringify(gameSettings));
}

function loadSettings() {
    const savedSettings = sessionStorage.getItem('coasterBattleSettings');
    if (savedSettings) {
        const loaded = JSON.parse(savedSettings);
        gameSettings = { ...gameSettings, ...loaded };

        if (!gameSettings.activeStats || gameSettings.activeStats.length === 0) {
            gameSettings.activeStats = Object.keys(stats);
        }
        activeStats = [...gameSettings.activeStats];
    }

    unitsSelect.value = gameSettings.units;
    currencySelect.value = gameSettings.currency;
    timerSlider.value = gameSettings.timerDuration;
    timerValue.innerText = gameSettings.timerDuration > 0 ? `${gameSettings.timerDuration}s` : 'Off';

    darkenSlider.value = gameSettings.imageDarkness;
    darkenValue.innerText = `${gameSettings.imageDarkness}%`;
    document.documentElement.style.setProperty('--image-darken-amount', `rgba(0, 0, 0, ${gameSettings.imageDarkness / 100})`);
    if (gameSettings.imageDarkness === 0) {
        body.classList.add('no-vignette');
    } else {
        body.classList.remove('no-vignette');
    }

    hardModeToggle.checked = gameSettings.hardMode;
    similarModeToggle.checked = gameSettings.similarMode;
    debugModeToggle.checked = gameSettings.debugMode;

    similarDifficultySlider.value = gameSettings.similarDifficulty;
    similarDifficultyValue.innerText = gameSettings.similarDifficulty;

    preloadSlider.value = gameSettings.preloadTarget;
    preloadValue.innerText = gameSettings.preloadTarget;

    document.querySelectorAll('.stat-filter-checkbox').forEach(checkbox => {
        checkbox.checked = gameSettings.activeStats.includes(checkbox.dataset.stat);
    });
    checkFilterState();

    document.querySelectorAll('input[type="range"]').forEach(updateSliderBackground);
}

function populateStatFilters() {
    statFiltersContainer.innerHTML = '';
    for (const statKey in stats) {
        const option = document.createElement('div');
        option.className = 'filter-option';
        option.innerHTML = `
            <input type="checkbox" id="filter-${statKey}" data-stat="${statKey}" class="stat-filter-checkbox" ${activeStats.includes(statKey) ? 'checked' : ''}>
            <label for="filter-${statKey}">${stats[statKey]}</label>
        `;
        statFiltersContainer.appendChild(option);
    }
    document.querySelectorAll('.stat-filter-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', handleFilterChange);
    });
}

function handleFilterChange() {
    const checkedBoxes = Array.from(document.querySelectorAll('.stat-filter-checkbox:checked'));
    gameSettings.activeStats = checkedBoxes.map(cb => cb.dataset.stat);
    activeStats = [...gameSettings.activeStats];
    checkFilterState();
    saveSettings();
}

function checkFilterState() {
    const checkedBoxes = document.querySelectorAll('.stat-filter-checkbox:checked');
    if (checkedBoxes.length === 1) {
        checkedBoxes[0].disabled = true;
    } else {
        document.querySelectorAll('.stat-filter-checkbox').forEach(cb => {
            cb.disabled = false;
        });
    }
}

// --- Currency Detection & Conversion Helpers ---
const CACHE_TTL_MS = 1000 * 60 * 60;

function _loadCache(key) {
    try {
        const raw = sessionStorage.getItem(key);
        if (!raw) return {};
        const cache = JSON.parse(raw);
        return (typeof cache === 'object' && cache !== null) ? cache : {};
    } catch (e) {
        if (currencyHelpersConfig.debug) console.warn("Could not load cache:", e.message);
        return {};
    }
}

function _saveCache(key, obj) {
    try {
        sessionStorage.setItem(key, JSON.stringify(obj));
    } catch (e) {
        if (currencyHelpersConfig.debug) console.warn("Could not save cache:", e.message);
    }
}

function _getFromCache(cacheKey, itemKey) {
    const cache = _loadCache(cacheKey);
    const entry = cache[itemKey];
    if (entry && (Date.now() - entry.ts) < CACHE_TTL_MS) {
        return entry.data;
    }
    return null;
}

function _setToCache(cacheKey, itemKey, data) {
    const cache = _loadCache(cacheKey);
    cache[itemKey] = { data, ts: Date.now() };
    _saveCache(cacheKey, cache);
}

async function detectCurrencyByCountry(countryInput) {
    if (!countryInput) return null;
    let lookupTerm = countryInput.toString().toLowerCase();
    if (currencyHelpersConfig.countryMap[lookupTerm]) {
        lookupTerm = currencyHelpersConfig.countryMap[lookupTerm].toLowerCase();
    }
    const cacheKey = 'currencyCache_v2';
    const cachedCurrency = _getFromCache(cacheKey, lookupTerm);
    if (cachedCurrency) return cachedCurrency;
    const _parseCountryData = (data) => {
        const country = Array.isArray(data) ? data[0] : data;
        if (country && country.currencies) {
            const currencyCodes = Object.keys(country.currencies);
            return currencyCodes.length > 0 ? currencyCodes[0] : null;
        }
        return null;
    };
    try {
        let currency = null;
        if (/^[a-z]{2,3}$/i.test(lookupTerm)) {
            const res = await fetch(`https://restcountries.com/v3.1/alpha/${encodeURIComponent(lookupTerm)}`);
            if (res.ok) currency = _parseCountryData(await res.json());
        }
        if (!currency) {
            const res = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(lookupTerm)}?fullText=true`);
            if (res.ok) currency = _parseCountryData(await res.json());
        }
        if (currency) {
            _setToCache(cacheKey, lookupTerm, currency);
        } else if (currencyHelpersConfig.debug) {
            console.warn(`RestCountries API returned no currency for "${lookupTerm}"`);
        }
        return currency;
    } catch (err) {
        if (currencyHelpersConfig.debug) console.error('detectCurrencyByCountry error:', err);
        return null;
    }
}

async function getExchangeRate(fromCurrency, toCurrency = 'USD') {
    if (!fromCurrency) return null;
    const from = fromCurrency.toUpperCase();
    const to = toCurrency.toUpperCase();
    if (from === to) return 1;
    const cacheKey = 'fxRateCache_v2';
    const itemKey = `${from}_${to}`;
    const cachedRate = _getFromCache(cacheKey, itemKey);
    if (cachedRate) return cachedRate;
    try {
        const res = await fetch(`https://open.er-api.com/v6/latest/${from}`);
        if (!res.ok) return null;
        const json = await res.json();
        if (json.result !== "success" || !json.rates || isNaN(json.rates[to])) {
            if (currencyHelpersConfig.debug) console.warn(`Exchange rate API failed or did not provide a rate for ${from} -> ${to}`);
            return null;
        }
        const rate = Number(json.rates[to]);
        _setToCache(cacheKey, itemKey, rate);
        return rate;
    } catch (err) {
        if (currencyHelpersConfig.debug) console.error('getExchangeRate error:', err);
        return null;
    }
}

async function convertCurrency(amount, fromCurrency, toCurrency = 'USD') {
    if (amount == null || isNaN(Number(amount))) return null;
    const rate = await getExchangeRate(fromCurrency, toCurrency);
    return rate !== null ? Number(amount) * rate : null;
}

async function detectCurrencyAndConvert(countryInput, amount, toCurrency = 'USD') {
    try {
        const currency = await detectCurrencyByCountry(countryInput);
        if (!currency) return { ok: false, reason: 'currency_not_found' };
        const converted = await convertCurrency(amount, currency, toCurrency);
        if (converted == null) return { ok: false, reason: 'conversion_failed' };
        return { ok: true, currency, amount, converted };
    } catch (err) {
        if (currencyHelpersConfig.debug) console.error('detectCurrencyAndConvert error:', err);
        return { ok: false, reason: 'exception', message: err.message };
    }
}

// --- Core Game Logic ---
function showLoader() { loader.style.display = 'flex'; }
function hideLoader() { loader.style.display = 'none'; }

async function ensurePreloadQueue() {
    if (isPreloading || preloadQueue.length >= gameSettings.preloadTarget) return;

    isPreloading = true;
    const needed = gameSettings.preloadTarget - preloadQueue.length;
    if (needed <= 0) {
        isPreloading = false;
        return;
    }

    if (gameSettings.debugMode) console.log(`Queue is low (${preloadQueue.length}/${gameSettings.preloadTarget}). Preloading ${needed} coasters in parallel...`);

    const preloadPromises = [];
    for (let i = 0; i < needed; i++) {
        preloadPromises.push(fetchValidCoaster());
    }

    try {
        const newCoasters = await Promise.all(preloadPromises);
        newCoasters.forEach(coaster => {
            if (coaster) {
                preloadQueue.push(coaster);
                let img = new Image();
                img.src = coaster.mainPicture.url;
            }
        });
        if (gameSettings.debugMode) console.log(`Preloading complete. Queue size: ${preloadQueue.length}`);
    } catch (error) {
        console.error("An error occurred during parallel preloading:", error);
    } finally {
        isPreloading = false;
    }
}

async function fetchValidCoaster() {
    try {
        let id;
        if (gameSettings.hardMode) {
            const idSets = activeStats.map(stat => new Set(Object.keys(gameData[stat])));
            const intersection = idSets.reduce((a, b) => new Set([...a].filter(x => b.has(x))));
            const validIds = Array.from(intersection);

            if (validIds.length === 0) {
                console.warn("No coasters found that have all active stats. Falling back to all coasters.");
                const allIds = Object.keys(gameData.name);
                id = allIds[Math.floor(Math.random() * allIds.length)];
            } else {
                id = validIds[Math.floor(Math.random() * validIds.length)];
            }
        } else {
            id = whitelist[Math.floor(Math.random() * whitelist.length)];
        }

        if (!gameData.name[id] || !gameData.park[id]) {
            if (gameSettings.debugMode) console.log(`Coaster ID ${id} is invalid in local data, skipping.`);
            return fetchValidCoaster();
        }

        const response = await fetch(`https://rcdb-api.vercel.app/api/coasters/${id}`);
        if (!response.ok) {
            if (gameSettings.debugMode) console.log(`API picture for Coaster ID ${id} not found, trying again.`);
            return fetchValidCoaster();
        }
        const apiData = await response.json();

        if (!apiData.mainPicture || !apiData.mainPicture.url) {
            if (gameSettings.debugMode) console.log(`Coaster ID ${id} has no picture on API, skipping.`);
            return fetchValidCoaster();
        }

        const coasterData = {
            id: id,
            name: gameData.name[id],
            park: { name: gameData.park[id] },
            country: gameData.country[id],
            status: { date: { opened: gameData.year[id] } },
            mainPicture: {
                url: apiData.mainPicture.url,
                copyName: apiData.mainPicture.copyName
            },
            stats: {
                length: gameData.length[id],
                height: gameData.height[id],
                drop: gameData.drop[id],
                speed: gameData.speed[id],
                inversions: gameData.inversions[id],
                verticalAngle: gameData.verticalAngle[id],
                duration: gameData.duration[id],
                capacity: gameData.capacity[id],
                cost: gameData.cost[id]
            }
        };

        const hasAnyStat = activeStats.some(stat => hasStat(coasterData, stat));
        if (!hasAnyStat) {
            if (gameSettings.debugMode) console.log(`Coaster ID ${id} (${coasterData.name}) has no valid active stats, skipping.`);
            return fetchValidCoaster();
        }

        if (activeStats.includes('cost') && coasterData.stats.cost && coasterData.country) {
            const conversion = await detectCurrencyAndConvert(coasterData.country, coasterData.stats.cost, gameSettings.currency);
            coasterData.convertedCost = conversion?.ok ? conversion.converted : coasterData.stats.cost;
            if (gameSettings.debugMode) console.log(`Converted cost for ${coasterData.name}: ${coasterData.stats.cost} -> ${coasterData.convertedCost} ${gameSettings.currency}`);
        }

        return coasterData;

    } catch (error) {
        console.error("Failed to fetch and assemble coaster data:", error);
        return null;
    }
}

function hasStat(coaster, stat) {
    if (!coaster) return false;
    let value = getCoasterStat(coaster, stat);
    if (stat === "inversions") {
        return value !== null && !isNaN(value) && value > 0;
    }
    return value !== null && !isNaN(value);
}

// REFINED: Heavily optimized for faster startup and robust pair finding.
async function startBattle(first = false) {
    if (isGameOver) return;
    showLoader();
    resetTimer();

    if (first) {
        let foundPair = false;
        while (!foundPair) {
            if (gameSettings.debugMode) console.log("Fetching initial pair in parallel...");
            const [c1, c2] = await Promise.all([fetchValidCoaster(), fetchValidCoaster()]);
            if (!c1 || !c2) continue; // A fetch failed, try again.

            // Find stats where both coasters have a value and the values are different
            let availableStats = activeStats.filter(stat =>
                hasStat(c1, stat) &&
                hasStat(c2, stat) &&
                getCoasterStat(c1, stat) !== getCoasterStat(c2, stat)
            );

            if (availableStats.length > 0) {
                coasterLeft = c1;
                coasterRight = c2;
                currentStat = availableStats[Math.floor(Math.random() * availableStats.length)];
                lastStat = currentStat;
                foundPair = true;
            }
        }
    } else {
        coasterLeft = coasterRight;

        await ensurePreloadQueue(); // Make sure queue has items before proceeding
        while (preloadQueue.length < 1) {
            await new Promise(resolve => setTimeout(resolve, 100)); // Wait if queue is still filling
        }

        let foundMatch = false;
        let retries = 0;
        const maxRetries = preloadQueue.length + 5;

        while(!foundMatch && retries < maxRetries) {
            if (preloadQueue.length === 0) {
                 if (gameSettings.debugMode) console.log("Queue empty, fetching fresh coaster for the right side...");
                 coasterRight = await fetchValidCoaster();
                 if(!coasterRight) continue; // Fetch failed, retry loop
            } else {
                 coasterRight = preloadQueue.shift();
            }
            ensurePreloadQueue(); // Immediately start refilling the queue
            
            let availableStats = activeStats.filter(stat =>
                stat !== lastStat &&
                hasStat(coasterLeft, stat) &&
                hasStat(coasterRight, stat) &&
                getCoasterStat(coasterLeft, stat) !== getCoasterStat(coasterRight, stat)
            );

            if (availableStats.length === 0) {
                 retries++;
                 continue; // This pair doesn't work, try next coaster from queue
            }
            
            currentStat = availableStats[Math.floor(Math.random() * availableStats.length)];
            lastStat = currentStat;

            // Similar mode check
            if (gameSettings.similarMode) {
                const leftStatVal = getCoasterStat(coasterLeft, currentStat);
                const rightStatVal = getCoasterStat(coasterRight, currentStat);
                const difference = Math.abs(leftStatVal - rightStatVal);
                let isSimilar = false;
                const difficulty = gameSettings.similarDifficulty;
                switch (currentStat) {
                    case 'year': isSimilar = difference <= difficulty; break;
                    case 'inversions': isSimilar = difference <= Math.ceil(difficulty / 2.5); break;
                    default:
                        const percentThreshold = difficulty * 2;
                        const thresholdValue = leftStatVal * (percentThreshold / 100);
                        isSimilar = difference <= thresholdValue;
                        break;
                }
                if (!isSimilar) {
                    retries++;
                    continue; // Not similar enough, try next coaster from queue
                }
            }
            foundMatch = true;
        }

        if (!foundMatch) {
            console.error("Could not find a suitable coaster pair from queue. Restarting with a fresh pair.");
            startBattle(true);
            return;
        }
    }

    if (gameSettings.debugMode) {
        console.log(`--- NEW ROUND (Score: ${score}) ---`);
        console.log(`Coaster Left: ${coasterLeft.name} (ID: ${coasterLeft.id})`);
        console.log(`Coaster Right: ${coasterRight.name} (ID: ${coasterRight.id})`);
        console.log(`Selected Stat: ${currentStat.toUpperCase()}`);
    }

    ensurePreloadQueue();

    showCoasters();
    hideLoader();
    if (gameSettings.timerDuration > 0) startTimer();
}


function showCoasters() {
    const labels = statLabels[currentStat] || statLabels.default;
    document.getElementById('higher').innerText = labels.higher;
    document.getElementById('lower').innerText = labels.lower;
    const phrase = questionPhrases[currentStat] || questionPhrases.default;
    document.getElementById("stat-name").innerText = `${coasterRight.name} ${phrase}?`;
    document.getElementById("coaster-left").style.backgroundImage = `url(${coasterLeft.mainPicture.url})`;
    document.getElementById("left-stat").innerText = formatStatValue(currentStat, getCoasterStat(coasterLeft, currentStat));
    document.getElementById("left-name").innerText = coasterLeft.name;
    document.getElementById("left-park").innerText = coasterLeft.park.name;
    document.getElementById("left-creator").innerText = "Photo by " + (coasterLeft.mainPicture.copyName || "Unknown");
    document.getElementById("coaster-right").style.backgroundImage = `url(${coasterRight.mainPicture.url})`;
    document.getElementById("right-stat").innerText = "?";
    document.getElementById("right-name").innerText = coasterRight.name;
    document.getElementById("right-park").innerText = coasterRight.park.name;
    document.getElementById("right-creator").innerText = "Photo by " + (coasterRight.mainPicture.copyName || "Unknown");
    animateFade();
}

function getCoasterStat(coaster, stat) {
    if (stat === "year") {
        return coaster.status?.date?.opened ? parseInt(coaster.status.date.opened) : null;
    }
    if (stat === "cost") {
        return coaster.convertedCost ?? coaster.stats?.[stat] ?? null;
    }
    return coaster.stats ? coaster.stats[stat] : null;
}


function formatCurrency(value) {
    if (!value || value <= 0) return "Unknown";
    const symbol = gameSettings.currency === 'EUR' ? '€' : '$';
    const totalValue = value;
    if (totalValue >= 1000000) {
        const millions = totalValue / 1000000;
        return `${symbol}${millions.toFixed(1)}M`;
    }
    return `${symbol}${totalValue.toLocaleString('en-US')}`;
}

function formatStatValue(stat, value) {
    if (value == null) return "Unknown";
    const units = gameSettings.units;
    switch (stat) {
        case "length": return units === 'metric' ? `${value} m` : `${(value * 3.28084).toFixed(0)} ft`;
        case "height": return units === 'metric' ? `${value} m` : `${(value * 3.28084).toFixed(0)} ft`;
        case "drop": return units === 'metric' ? `${value} m` : `${(value * 3.28084).toFixed(0)} ft`;
        case "speed": return units === 'metric' ? `${value} km/h` : `${(value * 0.621371).toFixed(0)} mph`;
        case "inversions": return `${value}x`;
        case "verticalAngle": return `${value}°`;
        case "duration": return `${Math.floor(value / 60)}m ${value % 60}s`;
        case "capacity": return `${value.toLocaleString()} pph`;
        case "cost": return formatCurrency(value);
        case "year": return value;
        default: return value;
    }
}

function animateFade() {
    const left = document.getElementById("coaster-left");
    const right = document.getElementById("coaster-right");
    left.classList.remove("fade-in");
    right.classList.remove("fade-in");
    setTimeout(() => {
        left.classList.add("fade-in");
        right.classList.add("fade-in");
    }, 10);
}

function checkAnswer(guessHigher) {
    if (isGameOver) return;

    resetTimer();
    let left = parseFloat(getCoasterStat(coasterLeft, currentStat));
    let right = parseFloat(getCoasterStat(coasterRight, currentStat));
    if (gameSettings.debugMode) console.log(`Left value: ${left}, Right value: ${right}. Player guessed ${guessHigher ? 'Higher' : 'Lower'}.`);

    if (isNaN(left) || isNaN(right)) {
        startBattle();
        return;
    }

    document.getElementById("right-stat").innerText = formatStatValue(currentStat, right);

    if ((guessHigher && right > left) || (!guessHigher && right < left)) {
        score++;
        bestScore = Math.max(score, bestScore);
        localStorage.setItem('bestScore', bestScore);
        showNotification("Correct!", "lime");
        if (gameSettings.debugMode) console.log(`Correct! New score: ${score}`);
        
        ensurePreloadQueue(); 
        
        setTimeout(() => startBattle(false), 1200);
    } else {
        showNotification("Wrong!", "red");
        if (gameSettings.debugMode) console.log(`Wrong! Game over.`);
        gameOver();
    }
    updateScores();
}

function gameOver() {
    isGameOver = true;
    document.getElementById("final-score").innerText = score;
    document.getElementById("go-left-name").innerText = coasterLeft.name;
    document.getElementById("go-left-stat").innerText = `${stats[currentStat]}: ${formatStatValue(currentStat, getCoasterStat(coasterLeft, currentStat))}`;
    document.getElementById("go-left-link").href = `https://rcdb.com/${coasterLeft.id}.htm`;
    document.getElementById("go-right-name").innerText = coasterRight.name;
    document.getElementById("go-right-stat").innerText = `${stats[currentStat]}: ${formatStatValue(currentStat, getCoasterStat(coasterRight, currentStat))}`;
    document.getElementById("go-right-link").href = `https://rcdb.com/${coasterRight.id}.htm`;

    if (score > 5) copyScoreButton.style.display = 'inline-block';

    setTimeout(() => {
        gameOverModal.style.display = "flex";
    }, 800);
}

function updateScores() {
    document.getElementById("score").innerText = score;
    document.getElementById("bestScore").innerText = bestScore;
}

function showNotification(text, color) {
    let notif = document.getElementById("notification");
    notif.innerText = text;
    notif.style.color = color;
    notif.classList.add("show");
    setTimeout(() => {
        notif.classList.remove("show");
    }, 1000);
}

function startTimer() {
    const duration = gameSettings.timerDuration;
    if (duration <= 0) return;
    timerBarContainer.style.display = 'block';
    timerBar.style.transition = 'none';
    timerBar.style.width = '100%';
    setTimeout(() => {
        timerBar.style.transition = `width ${duration}s linear`;
        timerBar.style.width = '0%';
    }, 50);
    timerInterval = setTimeout(() => {
        showNotification("Time's up!", "red");
        gameOver();
    }, duration * 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    timerBarContainer.style.display = 'none';
    timerBar.style.transition = 'none';
}

async function init() {
    const dataLoaded = await loadAllGameData();
    
    if (!dataLoaded) return;

    updateScores();
    populateStatFilters();
    loadSettings();
    startBattle(true);
}


// --- EVENT LISTENERS ---
settingsIcon.onclick = () => settingsModal.style.display = "flex";
closeModalButton.onclick = () => settingsModal.style.display = "none";

unitsSelect.onchange = (e) => {
    gameSettings.units = e.target.value;
    saveSettings();
    if (coasterLeft) {
        document.getElementById("left-stat").innerText = formatStatValue(currentStat, getCoasterStat(coasterLeft, currentStat));
    }
};

currencySelect.onchange = (e) => {
    gameSettings.currency = e.target.value;
    saveSettings();
    preloadQueue = []; 
    playAgainButton.onclick();
};

timerSlider.oninput = (e) => {
    let value = e.target.value;
    gameSettings.timerDuration = parseInt(value);
    timerValue.innerText = value > 0 ? `${value}s` : 'Off';
    updateSliderBackground(timerSlider);
    saveSettings();
};

darkenSlider.oninput = (e) => {
    let value = parseInt(e.target.value);
    gameSettings.imageDarkness = value;
    darkenValue.innerText = `${value}%`;
    document.documentElement.style.setProperty('--image-darken-amount', `rgba(0, 0, 0, ${value / 100})`);

    if (value === 0) {
        body.classList.add('no-vignette');
    } else {
        body.classList.remove('no-vignette');
    }

    updateSliderBackground(darkenSlider);
    saveSettings();
};

hardModeToggle.onchange = (e) => {
    gameSettings.hardMode = e.target.checked;
    preloadQueue = [];
    saveSettings();
    ensurePreloadQueue();
};

similarModeToggle.onchange = (e) => {
    gameSettings.similarMode = e.target.checked;
    saveSettings();
};

similarDifficultySlider.oninput = (e) => {
    let value = parseInt(e.target.value);
    gameSettings.similarDifficulty = value;
    similarDifficultyValue.innerText = value;
    updateSliderBackground(similarDifficultySlider);
    saveSettings();
};

debugModeToggle.onchange = (e) => {
    gameSettings.debugMode = e.target.checked;
    saveSettings();
};

preloadSlider.oninput = (e) => {
    let value = parseInt(e.target.value);
    gameSettings.preloadTarget = value;
    preloadValue.innerText = value;
    updateSliderBackground(preloadSlider);
    saveSettings();
    ensurePreloadQueue();
};

playAgainButton.onclick = () => {
    score = 0;
    isGameOver = false;
    gameOverModal.style.display = "none";
    copyScoreButton.style.display = 'none';
    copyScoreButton.innerHTML = '<i class="fab fa-discord"></i> Copy Score for Discord';
    updateScores();
    startBattle(true);
};

copyScoreButton.onclick = () => {
    const message = `I just scored ${score} points in Coaster-Battle! 🎢 Can you beat my score?\nPlay here: ${window.location.href}`;
    navigator.clipboard.writeText(message).then(() => {
        copyScoreButton.innerText = 'Copied to Clipboard!';
    }).catch(err => {
        console.error('Failed to copy: ', err);
        copyScoreButton.innerText = 'Failed to Copy';
    });
};

leaderboardIcon.onclick = () => leaderboardModal.style.display = 'flex';
closeLeaderboardButton.onclick = () => leaderboardModal.style.display = 'none';

document.getElementById("higher").onclick = () => checkAnswer(true);
document.getElementById("lower").onclick = () => checkAnswer(false);

window.addEventListener('click', (event) => {
    if (event.target == settingsModal || event.target == leaderboardModal) {
        settingsModal.style.display = "none";
        leaderboardModal.style.display = 'none';
    }
});


// --- GLOBAL HELPERS & INITIALIZATION ---
window.currencyHelpers = {
    detectCurrencyByCountry,
    getExchangeRate,
    convertCurrency,
    detectCurrencyAndConvert
};

window.logConversion = function(countryInput, amount) {
    if (!currencyHelpersConfig.debug) {
        console.log("Enable debug mode in game settings to see conversion logs.");
        return;
    }

    console.log(`Attempting to convert ${amount} from currency of "${countryInput}"...`);
    detectCurrencyAndConvert(countryInput, amount, gameSettings.currency).then(result => {
        if (!result) {
            console.error('Conversion returned a null result.');
            return;
        }
        if (result.ok) {
            console.log(`✅ Success: ${amount} ${result.currency} ≈ ${result.converted.toFixed(2)} ${gameSettings.currency}`);
        } else {
            console.warn(`❌ Failed: Could not convert. Reason: ${result.reason}`);
        }
    }).catch(err => console.error('logConversion uncaught error:', err));
};

init();