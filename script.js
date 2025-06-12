// Variáveis globais para controlar o estado da galeria
let fotosAtuais = [];
let indiceAtual = 0;
let galeriaContainer = null; // A galeria será criada dinamicamente

document.addEventListener('DOMContentLoaded', () => {
  // --- INICIALIZAÇÃO DO MAPA ---
  const map = L.map('map').setView([-23.7608, -46.3336], 9);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

  // --- DADOS DOS LUGARES (COM FOTOS DE EXEMPLO) ---
  // Adicione as URLs das suas fotos aqui
  const lugares = [
    { nome: "Ilha do guaiuba", coords: [-24.025550, -46.293297], fotos: [
      'lugares/ilha (2).jpg',
      'lugares/ilha (4).jpg',
      'lugares/ilha (5).jpg',
      'lugares/ilha (6).jpg',
      'lugares/ilha (7).jpg',
      'lugares/ilha (8).jpg',
      'lugares/ilha.jpg'
    ]},
    { nome: "Casa antiga Richard", coords: [-23.994338, -46.280153], fotos: [
      'lugares/excasaguaru.jpg',
      'lugares/excasaguaru (2).jpg'
    ]},
    { nome: "Ape Amanda", coords: [-23.954460, -46.337709], fotos: [
      'lugares/casamanda (2).jpg',
      'lugares/casamanda.jpg',
      'lugares/amadnahosue3.jpg',
      'lugares/amandahouse2 (2).jpg',
      'lugares/amandahouse2.jpg',
      'lugares/amandahouse4.jpg',
      'lugares/casamanda.jpg',
      'lugares/casamanda (2).jpg',
    ] }, // Sem fotos
    { nome: "Burgman santos", coords: [-23.974548, -46.321470], fotos: [
      'lugares/burgmansantos (2).jpg',
      'lugares/burgmansantos (3).jpg',
      'lugares/burgmansantos.jpg'
    ]},
    // Deixei os outros em branco
    { nome: "Galhetas/Asturias", coords:[-24.010360, -46.267445], fotos: [
      'lugares/asturias.jpg',
      'lugares/galhetas (2).jpg',
      'lugares/galhetas (3).jpg',
      'lugares/galhetas (4).jpg',
      'lugares/galhetas (5).jpg',
      'lugares/galhetas (6).jpg',
      'lugares/galhetas (7).jpg',
      'lugares/galhetas (8).jpg',
      'lugares/galhetas.jpg'
    ]},
    { nome: "Casa abe", coords:[-23.551008, -46.649305], fotos: [
      'lugares/casaabe.jpg',
      'lugares/casaabe (2).jpg',
      'lugares/casaabe (3).jpg',
      'lugares/casaabe (4).jpg'
    ]},
    { nome: "Casa brawl", coords:[-23.642398, -46.527304], fotos:[
      'lugares/brawlhouse.jpg',
      'lugares/casabrawl.jpg',
      "lugares/casabrawl (2).jpg"
    ]},
    { nome: "Ape de santos", coords:[-23.954469, -46.337621], fotos: [
      'lugares/santoscasa.jpg',
      'lugares/santoscasa (2).jpg',
    ]},
    {nome:"Parque Celso Daniel", coords:[-23.647669, -46.534811], fotos: [
      "lugares/celsandiel.jpg",
      'lugares/celsodaniel.jpg',
      'lugares/celsodaniel (2).jpg'
    ]},
    {nome: "havas café", coords:[-23.561531, -46.670644], fotos: [
      "lugares/btec.jpg"
    ]},
    {nome: "Riviera", coords:[-23.555457, -46.662816], fotos: [
      "lugares/riviera.jpg",
      "lugares/riviera (2).jpg"
    ]},
    {nome: "up", coords:[-23.556131, -46.656515], fotos: [
      "lugares/up.jpg",
      "lugares/up2.jpg",
      "lugares/up (2).jpg"
    ]},
    {nome: "Tropical", coords:[-24.012634, -46.281118], fotos: [
      "lugares/tropcal.jpg",
      "lugares/tropical.jpg",
    ]},
    {nome: "Quebra mar", coords:[-23.971774, -46.350343], fotos: [
      "lugares/quebramar (2).jpg",
      "lugares/quebramar (3).jpg",
      "lugares/quebramar.jpg",
      "lugares/quebramar (4).jpg"
    ]},
    {nome: "Parque Paulista", coords:[-23.563722, -46.653549], fotos: [
      "lugares/parquepaulista (2).jpg",
      "lugares/parquepaulista.jpg",
      "lugares/parquepaulista (3).jpg"
    ]},
    {nome: "Date mexicano", coords:[-23.565041, -46.654201], fotos: [
      "lugares/mexicano.jpg",
      "lugares/mexicano (2).jpg",
      "lugares/mexicano2.jpg",
      "lugares/mexico.jpg"
    ]},
    {nome: "Ibirapuera ", coords:[-23.589759, -46.661424], fotos: [
      "lugares/ibira (6).jpg",
      "lugares/ibira.jpg",
      "lugares/ibira2.jpg",
      "lugares/ibira3.jpg",
      "lugares/ibira (2).jpg",
      "lugares/ibira (3).jpg",
      "lugares/ibira (4).jpg",
      "lugares/ibira (5).jpg"
    ]},
    {nome: "Parque Augusta", coords:[-23.550162, -46.648758], fotos: [
      "lugares/parqueaugusta (2).jpg",
      "lugares/parqueaugusta (3).jpg",
      "lugares/parqueaugusta (4).jpg"
    ]},
    {nome: "Guaiuba", coords:[-24.017421, -46.293057], fotos: [
      "lugares/guaiuba (2).jpg",
      "lugares/guaiuba (3).jpg",
      "lugares/guaiuba (4).jpg",
      "lugares/guaiuba (5).jpg",
      "lugares/guaiuba.jpg"
    ]},
    {nome: "Georgia café", coords:[-24.013881, -46.273212], fotos: [
      "lugares/georgia.jpg",
      "lugares/georgia2.jpg",
    ]},
    {nome: "Augusta", coords:[-23.555312, -46.657204], fotos: [
      "lugares/barcaipirinha.jpg",
      "lugares/barcapirina3.jpg",
      "lugares/barcapirinha2.jpg",
      "lugares/barcapirinha.jpg",
      "lugares/augustabeco.jpg",
    ]},
  ];
  // Adiciona os marcadores ao mapa
  lugares.forEach(lugar => {
    if (lugar.coords && lugar.coords.length === 2) {
      // Modifiquei o texto do botão para "Ver Fotos"
      const marker = L.marker(lugar.coords).addTo(map)
        .bindPopup(`<b>${lugar.nome}</b><br><button class="btn btn-sm btn-primary mt-1" onclick="abrirLugar('${lugar.nome}', window.lugares)">Ver momentos</button>`);
    }
  });

  // Disponibiliza a variável 'lugares' globalmente para que a função onclick possa acessá-la
  window.lugares = lugares;

  // --- CRIAÇÃO DINÂMICA DA GALERIA ---
  criarGaleria();
});

function criarGaleria() {
    // Cria o container principal da galeria
    galeriaContainer = document.createElement('div');
    galeriaContainer.id = 'galeria-container-dinamica';

    // Cria os elementos internos
    galeriaContainer.innerHTML = `
        <span class="galeria-fechar">&times;</span>
        <div class="galeria-conteudo">
            <button class="galeria-nav" id="galeria-anterior">&#10094;</button>
            <img id="galeria-imagem" src="" alt="Foto do Lugar">
            <button class="galeria-nav" id="galeria-proxima">&#10095;</button>
        </div>
        <div id="galeria-contador"></div>
    `;

    // Anexa a galeria ao corpo do documento (ela começa oculta via CSS)
    document.body.appendChild(galeriaContainer);

    // Adiciona os eventos aos botões
    galeriaContainer.querySelector('.galeria-fechar').addEventListener('click', fecharGaleria);
    galeriaContainer.querySelector('#galeria-anterior').addEventListener('click', () => mudarFoto(-1));
    galeriaContainer.querySelector('#galeria-proxima').addEventListener('click', () => mudarFoto(1));
    
    // Fecha a galeria ao pressionar a tecla 'Escape'
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && galeriaContainer.classList.contains('visivel')) {
            fecharGaleria();
        }
    });
}

// Função chamada pelo botão no mapa
function abrirLugar(nome, lugares) {
  const lugar = lugares.find(l => l.nome === nome);

  if (lugar && lugar.fotos.length > 0) {
    fotosAtuais = lugar.fotos;
    indiceAtual = 0;
    galeriaContainer.classList.add('visivel'); // Torna a galeria visível
    atualizarVisualizacaoGaleria();
  } else {
    alert('Este lugar ainda não tem fotos cadastradas.');
  }
}

function fecharGaleria() {
    galeriaContainer.classList.remove('visivel');
}

function mudarFoto(direcao) {
  const totalFotos = fotosAtuais.length;
  // A mágica para navegar de forma circular (ex: do último item volta para o primeiro)
  indiceAtual = (indiceAtual + direcao + totalFotos) % totalFotos;
  atualizarVisualizacaoGaleria();
}

function atualizarVisualizacaoGaleria() {
  const imgElement = document.getElementById('galeria-imagem');
  const contadorElement = document.getElementById('galeria-contador');

  if (!imgElement || !contadorElement || fotosAtuais.length === 0) return;

  // Atualiza a imagem
  imgElement.src = fotosAtuais[indiceAtual];

  // Atualiza o contador (ex: 3 / 10)
  contadorElement.textContent = `${indiceAtual + 1} / ${fotosAtuais.length}`;
}


// Função flipCard (mantida do seu script original)
function flipCard(button) {
    const cardContainer = button.closest('.card-container');
    cardContainer.classList.toggle('flipped');
}