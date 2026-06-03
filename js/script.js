/* =========================================================
   HidroAqua — script.js
   Manipulação DOM, tema, quiz, simulador, modal, scroll
   ========================================================= */
(function () {
  'use strict';

  /* ---------- Feed de Notícias reais ---------- */
  const noticias = [
    {
      tag: "Mercado",
      titulo: "Hidroponia já ocupa até 3.000 ha no Brasil com crescimento de 12,4% ao ano",
      resumo: "Estimativas da Embrapa indicam entre 1.500 e 3.000 hectares com hidroponia no Brasil. O mercado global cresce 12,4% ao ano (Grand View Research), impulsionado pela demanda por alimentos frescos e sustentáveis.",
      data: "Jul. 2025",
      icone: "📈",
      fonte: "Notícias Agrícolas / Embrapa",
      link: "https://www.noticiasagricolas.com.br/noticias/hortifruti/404499-producao-hidroponica-ganha-espaco-e-ja-ocupa-ate-tres-mil-hectares-no-brasil.html"
    },
    {
      tag: "Certificação",
      titulo: "Associação Brasileira de Aquaponia lança Selo 'Aquapônicos do Brasil'",
      resumo: "Na Agrishow 2024, a ABA lançou a certificação oficial para produtos aquapônicos. O curso de aquaponia do SENAR-SP é um dos mais requisitados atualmente, indicando crescimento do setor.",
      data: "Mai. 2024",
      icone: "🏅",
      fonte: "FAESP / SENAR-SP",
      link: "https://faespsenar.com.br/agrishow-2024-certificacao-para-produtos-de-aquaponia-e-lancada-no-estande-da-faesp-senar-sp/"
    },
    {
      tag: "Pesquisa",
      titulo: "UFPB desenvolve aquaponia automatizada com IoT para o Sertão nordestino",
      resumo: "Pesquisadores da UFPB criaram sistema integrado e automatizado de aquaponia com monitoramento remoto via IoT, usando bambu como bioestrutura — voltado a regiões com escassez hídrica.",
      data: "2024",
      icone: "🔬",
      fonte: "UFPB",
      link: "https://www.ufpb.br/ciencia/sistema-automatizado-de-aquaponia-combina-aquicultura-e-hidroponia-na-producao-de-alimentos/"
    },
    {
      tag: "Embrapa",
      titulo: "Embrapa destaca aquaponia como solução para regiões com seca",
      resumo: "Pesquisador da Embrapa Agropecuária Oeste aponta que a aquaponia economiza até 90% de água em relação à agricultura convencional e elimina completamente a liberação de efluentes, por ser um sistema fechado.",
      data: "2024",
      icone: "💧",
      fonte: "Embrapa Agropecuária Oeste",
      link: "https://www.embrapa.br/en/busca-de-noticias/-/noticia/38956116/agricultura-e-uma-aliada-no-uso-e-conservacao-dagua"
    },
    {
      tag: "Aquicultura",
      titulo: "Aquaponia se consolida entre as tecnologias sustentáveis da aquicultura em 2025",
      resumo: "Relatório da BRF Ingredients aponta a aquaponia como uma das soluções mais relevantes para a aquicultura sustentável em 2025, reduzindo fertilizantes sintéticos e melhorando a qualidade da água.",
      data: "Mar. 2025",
      icone: "🐟",
      fonte: "BRF Ingredients",
      link: "https://www.brfingredients.com/pt-br/blog/posts/aquicultura-em-2025-novas-tecnologias-sustentabilidade-e-os-rumos-do-setor/"
    },
    {
      tag: "Investimento",
      titulo: "Startup Pink Farms capta R$ 15 milhões e produz 2,5 t/mês em São Paulo",
      resumo: "A fazenda vertical urbana Pink Farms levantou R$ 15 milhões em Série A em agosto de 2025, produzindo 2,5 toneladas de folhosas/mês em 750 m² no centro de São Paulo — modelo de hidroponia urbana escalável.",
      data: "Ago. 2025",
      icone: "🏙️",
      fonte: "Blog Cultivee",
      link: "https://cultivee.com.br/blog/o-que-e-hidroponia-guia-definitivo-vantagens-tipos-e-como-co"
    },
    {
      tag: "Educação",
      titulo: "Instituto Federal de Brasília implanta projeto de aquaponia sustentável",
      resumo: "O IFB desenvolveu sistema aquapônico com monitoramento remoto para estudar a aplicabilidade da técnica na agricultura familiar do Distrito Federal, demonstrando o potencial educativo e produtivo da tecnologia.",
      data: "2024",
      icone: "🎓",
      fonte: "IFB",
      link: "https://www.ifb.edu.br/reitori/27011-aquaponia-como-projeto-sustentavel-no-ifb"
    }
  ];

  const newsGrid = document.getElementById('newsGrid');
  if (newsGrid) {
    noticias.forEach(n => {
      const card = document.createElement('article');
      card.className = 'news-card reveal';
      card.innerHTML = `
        <div class="news-card__icon" aria-hidden="true">${n.icone}</div>
        <div class="news-card__body">
          <span class="news-card__tag">${n.tag}</span>
          <h3>${n.titulo}</h3>
          <p>${n.resumo}</p>
          <div class="news-card__footer">
            <span class="news-card__date">${n.data} · ${n.fonte}</span>
            <a href="${n.link}" class="news-card__link" target="_blank" rel="noopener noreferrer">Ler fonte →</a>
          </div>
        </div>
      `;
      newsGrid.appendChild(card);
      card.dataset.pendingReveal = 'true';
    });
  }

  /* ---------- Tema (Dark/Light) com persistência ---------- */
  const themeToggle = document.getElementById('themeToggle');
  const stored = localStorage.getItem('hidroaqua-theme');
  if (stored === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
  updateThemeIcon();

  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('hidroaqua-theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('hidroaqua-theme', 'dark');
    }
    updateThemeIcon();
  });

  function updateThemeIcon() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    themeToggle.querySelector('.theme-toggle__icon').textContent = isDark ? '☀️' : '🌙';
  }

  /* ---------- Menu mobile ---------- */
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    menuToggle.classList.toggle('active');
    const exp = menuToggle.classList.contains('active');
    menuToggle.setAttribute('aria-expanded', exp);
  });
  // Fecha menu ao clicar em um link
  nav.querySelectorAll('.nav__link').forEach(l => {
    l.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.classList.remove('active');
    });
  });

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => revealObs.observe(el));
  document.querySelectorAll('.news-card[data-pending-reveal]').forEach(card => {
    card.removeAttribute('data-pending-reveal');
    revealObs.observe(card);
  });

  /* ---------- Contadores animados ---------- */
  const counters = document.querySelectorAll('.stat__num');
  const countObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCount(e.target);
        countObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => countObs.observe(c));

  function animateCount(el) {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1600;
    const start = performance.now();
    function step(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ---------- Simulador de economia de água ---------- */
  const calcBtn = document.getElementById('calcular');
  calcBtn.addEventListener('click', () => {
    const area = parseFloat(document.getElementById('area').value) || 0;
    const econ = parseFloat(document.getElementById('sistema').value);
    // Base: ~300 L/m²/mês — estimativa média para hortaliças (alface) em irrigação convencional
    // Fonte: HidroGood / Grupo de pesquisa UNESP (varia por cultura, clima e sistema de irrigação)
    const tradicional = area * 300;
    const novo = tradicional * (1 - econ);
    const economia = tradicional - novo;
    document.getElementById('rTrad').textContent = formatNum(tradicional);
    document.getElementById('rNovo').textContent = formatNum(novo);
    document.getElementById('rEcon').textContent = formatNum(economia);
  });
  function formatNum(n) {
    return Math.round(n).toLocaleString('pt-BR');
  }

  /* ---------- Galeria com Modal ---------- */
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modalImg');
  const modalClose = document.getElementById('modalClose');
  document.querySelectorAll('.gallery__item').forEach(item => {
    item.addEventListener('click', () => {
      modalImg.src = item.dataset.src;
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
    });
  });
  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  }
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  /* ---------- Botão Voltar ao Topo ---------- */
  const toTop = document.getElementById('toTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) toTop.classList.add('visible');
    else toTop.classList.remove('visible');
  });
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------- Quiz ---------- */
  const questions = [
    {
      q: 'O que caracteriza o cultivo hidropônico?',
      o: ['Cultivo com agrotóxicos pesados', 'Cultivo sem solo, com solução nutritiva', 'Cultivo em florestas tropicais', 'Cultivo somente em desertos'],
      c: 1
    },
    {
      q: 'A aquaponia combina hidroponia com qual outra técnica?',
      o: ['Apicultura', 'Aquicultura (criação de peixes)', 'Avicultura', 'Silvicultura'],
      c: 1
    },
    {
      q: 'Quanto de água a hidroponia pode economizar em relação ao solo?',
      o: ['Cerca de 10%', 'Cerca de 30%', 'Até 70%', 'Não economiza água'],
      c: 2
    },
    {
      q: 'Qual é a economia de água típica da aquaponia?',
      o: ['Até 20%', 'Até 50%', 'Até 90%', 'Até 5%'],
      c: 2
    },
    {
      q: 'Na aquaponia, quem transforma os dejetos dos peixes em nutrientes?',
      o: ['Algas', 'Bactérias nitrificantes', 'Os próprios peixes', 'O sol'],
      c: 1
    },
    {
      q: 'Qual é uma desvantagem da hidroponia?',
      o: ['Custo inicial muito baixo', 'Independência total de energia', 'Dependência de eletricidade e monitoramento', 'Não exige nenhum cuidado'],
      c: 2
    },
    {
      q: 'Na aquaponia, por que NÃO se pode usar agrotóxicos nas plantas?',
      o: ['Porque mudam a cor', 'Porque envenenam os peixes', 'Porque encarecem', 'Porque atraem pragas'],
      c: 1
    },
    {
      q: 'Qual é a principal mensagem dessas tecnologias?',
      o: ['Voltar à agricultura primitiva', 'Tecnologia + sustentabilidade = futuro da agricultura', 'Eliminar a agricultura', 'Usar apenas estufas tradicionais'],
      c: 1
    }
  ];

  let qIndex = 0, score = 0;
  const quizBody = document.getElementById('quizBody');
  const quizBar = document.getElementById('quizBar');
  const quizCount = document.getElementById('quizCount');
  const quizScore = document.getElementById('quizScore');

  function renderQuiz() {
    if (qIndex >= questions.length) return renderFinal();
    const cur = questions[qIndex];
    quizBody.innerHTML = `
      <h3 class="quiz__question">${qIndex + 1}. ${cur.q}</h3>
      <div class="quiz__options">
        ${cur.o.map((opt, i) => `<button class="quiz__opt" data-i="${i}">${opt}</button>`).join('')}
      </div>
    `;
    quizCount.textContent = `${qIndex + 1} / ${questions.length}`;
    quizScore.textContent = `Pontos: ${score}`;
    quizBar.style.width = `${(qIndex / questions.length) * 100}%`;
    quizBody.querySelectorAll('.quiz__opt').forEach(btn => {
      btn.addEventListener('click', () => handleAnswer(btn, cur.c));
    });
  }

  function handleAnswer(btn, correct) {
    const chosen = parseInt(btn.dataset.i, 10);
    const opts = quizBody.querySelectorAll('.quiz__opt');
    opts.forEach(o => o.disabled = true);
    opts[correct].classList.add('correct');
    if (chosen === correct) { score++; }
    else { btn.classList.add('wrong'); }
    quizScore.textContent = `Pontos: ${score}`;
    setTimeout(() => { qIndex++; renderQuiz(); }, 1100);
  }

  function renderFinal() {
    quizBar.style.width = '100%';
    quizCount.textContent = `${questions.length} / ${questions.length}`;
    let msg = '';
    if (score === questions.length) msg = 'Perfeito! Você é um especialista em cultivo sustentável! 🌱';
    else if (score >= 6) msg = 'Excelente! Você domina o tema! 💧';
    else if (score >= 4) msg = 'Bom trabalho! Vale revisar alguns pontos.';
    else msg = 'Que tal reler o conteúdo e tentar de novo?';
    quizBody.innerHTML = `
      <div class="quiz__final">
        <h3>Quiz finalizado!</h3>
        <p>Sua pontuação:</p>
        <div class="score">${score} / ${questions.length}</div>
        <p>${msg}</p>
        <button class="btn btn--primary" id="restart" style="margin-top:20px">Tentar Novamente</button>
      </div>
    `;
    document.getElementById('restart').addEventListener('click', () => {
      qIndex = 0; score = 0; renderQuiz();
    });
  }
  renderQuiz();

  /* ---------- Header shrink on scroll ---------- */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) header.style.boxShadow = 'var(--shadow-md)';
    else header.style.boxShadow = 'none';
  });

  console.log('%c🌱 HidroAqua carregado', 'color:#2bb7a8;font-weight:bold;font-size:14px');
})();
