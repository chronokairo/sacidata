// Initialize map as full screen
const map = L.map('mapaManaus', {
    zoomControl: false // Remove default zoom control
}).setView([-3.119, -60.021], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Add custom position for zoom control
L.control.zoom({
    position: 'bottomright'
}).addTo(map);

const bairros = {
    "Centro": [-3.1316, -60.0239],
    "Adrianópolis": [-3.1013, -60.0101],
    "Alvorada": [-3.0901, -60.0464],
    "Aparecida": [-3.1333, -60.0236],
    "Cidade Nova": [-3.0467, -59.9806],
    "Compensa": [-3.1061, -60.0658],
    "Dom Pedro": [-3.0961, -60.0326],
    "Japiim": [-3.1183, -59.9942],
    "Ponta Negra": [-3.0827, -60.1403],
    "Tarumã": [-3.0208, -60.1053]
};

const toxidades = {
    "Centro": 2,
    "Adrianópolis": 1,
    "Alvorada": 3,
    "Aparecida": 2,
    "Cidade Nova": 1,
    "Compensa": 4,
    "Dom Pedro": 3,
    "Japiim": 2,
    "Ponta Negra": 1,
    "Tarumã": 5
};

// Add markers for each neighborhood
for (const bairro in bairros) {
    const coords = bairros[bairro];
    const nivel = toxidades[bairro];
    const cor = ["#4caf50", "#ffeb3b", "#ff9800", "#f44336", "#b71c1c"][nivel - 1];
    L.circle(coords, {
        color: cor,
        fillColor: cor,
        fillOpacity: 0.5,
        radius: 500
    }).addTo(map).bindPopup(`${bairro}: Nível de toxidade ${nivel}`);
}

// Toggle side panel
function toggleSidebar() {
    document.getElementById('sidePanel').classList.toggle('closed');
}

// Expand sections to full panel
function expandSection(sectionId) {
    document.getElementById(sectionId).style.display = 'block';
}

// Close full panel sections
function closeSection(sectionId) {
    document.getElementById(sectionId).style.display = 'none';
}

// Open dashboard panel
function abrirDashboard() {
    document.getElementById('dashboard').classList.remove('escondido');
    atualizarListaMedicoes();
}

// Close dashboard panel
function fecharDashboard() {
    document.getElementById('dashboard').classList.add('escondido');
}

// Analyze neighborhood
function analisarBairro() {
    const bairro = document.getElementById("bairro").value;
    const nivel = toxidades[bairro];

    if (nivel) {
        document.getElementById("resultado").innerHTML =
            `<h3>Resultado</h3><p>O nível de toxidade em <strong>${bairro}</strong> é <strong>${nivel}</strong>.</p>`;

        // Move to the neighborhood on the map
        const coords = bairros[bairro];
        if (coords) {
            map.setView(coords, 14);
        }

        // Open sidebar if closed
        document.getElementById('sidePanel').classList.remove('closed');
    } else {
        document.getElementById("resultado").innerHTML =
            `<h3>Resultado</h3><p>Bairro não encontrado.</p>`;
    }
}

// Locate user
function localizarUsuario() {
    navigator.geolocation?.getCurrentPosition((pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        map.setView([lat, lon], 14);
        L.marker([lat, lon]).addTo(map).bindPopup("📍 Você está aqui!").openPopup();
    }, () => alert("Não foi possível localizar sua posição."));
}

// Authentication functions
function fazerLogin() {
    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;
    if (usuario === "admin" && senha === "1234") {
        document.getElementById("inicio").style.display = "none";
        document.getElementById("telaLogin").classList.add("escondido");
        document.getElementById("barraPerfil").classList.remove("escondido");
    } else {
        document.getElementById("erroLogin").textContent = "Usuário ou senha incorretos!";
    }
}

function realizarCadastro() {
    const senha = document.getElementById("senhaCadastro").value;
    const confirmar = document.getElementById("confirmarSenhaCadastro").value;
    const erro = document.getElementById("erroCadastro");
    if (senha !== confirmar) {
        erro.textContent = "As senhas não coincidem!";
    } else {
        alert("Cadastro realizado!");
        document.getElementById("modalCadastro").classList.add("escondido");
        document.getElementById("inicio").style.display = "none";
        document.getElementById("barraPerfil").classList.remove("escondido");
    }
}

function abrirLogin() {
    document.getElementById("inicio").style.display = "none";
    document.getElementById("telaLogin").classList.remove("escondido");
}

function abrirCadastro() {
    document.getElementById("inicio").style.display = "none";
    document.getElementById("modalCadastro").classList.remove("escondido");
}

function entrarComoVisitante() {
    document.getElementById("inicio").style.display = "none";
    document.getElementById("barraPerfil").classList.remove("escondido");
    // Show the sidebar by default for visitors
    document.getElementById('sidePanel').classList.remove('closed');
}

// Tab management
function mostrarTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    document.getElementById(tabId).classList.add('active');
    document.querySelector(`[onclick="mostrarTab('${tabId}')"]`).classList.add('active');
}

// Dark mode toggle
function alternarModo() {
    const body = document.body;
    const isDark = body.classList.toggle("dark-mode");
    body.classList.toggle("light-mode", !isDark);
    localStorage.setItem("modoEscuro", isDark ? "true" : "false");

    const btn = document.getElementById("modoEscuroBtn");
    btn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

// Data entry functions
function enviarDadosIgarape() {
    const bairro = document.getElementById("bairroInput").value;
    const data = document.getElementById("dataColeta").value;
    const ph = document.getElementById("phInput").value;
    const oxigenio = document.getElementById("oxigenioInput").value;
    const temperatura = document.getElementById("temperaturaInput").value;

    if (!bairro || !data || !ph || !oxigenio || !temperatura) {
        alert("Por favor, preencha todos os campos obrigatórios");
        return;
    }

    const dadosAnteriores = JSON.parse(localStorage.getItem('medicoes') || '[]');
    const novaMedicao = {
        id: Date.now(),
        bairro,
        data,
        ph: parseFloat(ph),
        oxigenio: parseFloat(oxigenio),
        temperatura: parseFloat(temperatura),
        dataEnvio: new Date().toISOString()
    };

    dadosAnteriores.push(novaMedicao);
    localStorage.setItem('medicoes', JSON.stringify(dadosAnteriores));

    atualizarListaMedicoes();
    document.getElementById('formMedicao').reset();

    // Add a temporary marker to the map
    if (bairros[bairro]) {
        const coords = bairros[bairro];
        L.marker(coords)
            .addTo(map)
            .bindPopup(`<b>${bairro}</b><br>Nova medição adicionada!`)
            .openPopup();
    }

    alert("Dados enviados com sucesso!");
}

function atualizarListaMedicoes() {
    const listaMedicoes = document.getElementById("listaMedicoes");
    if (!listaMedicoes) return;

    const medicoes = JSON.parse(localStorage.getItem('medicoes') || '[]');

    listaMedicoes.innerHTML = '';
    medicoes.forEach(med => {
        const item = document.createElement('div');
        item.className = 'medicao-item';
        item.innerHTML = `
            <strong>${med.bairro}</strong> - ${new Date(med.data).toLocaleDateString('pt-BR')}
            <br>pH: ${med.ph}, Oxigênio: ${med.oxigenio}mg/L, Temp: ${med.temperatura}°C
        `;
        listaMedicoes.appendChild(item);
    });
}

// Initialize on load
window.addEventListener("DOMContentLoaded", () => {
    // Set dark mode if previously selected
    const preferencia = localStorage.getItem("modoEscuro");
    if (preferencia === "true") {
        document.body.classList.add("dark-mode");
        document.body.classList.remove("light-mode");
        document.getElementById("modoEscuroBtn").innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Start with sidebar closed
    document.getElementById('sidePanel').classList.add('closed');
});
