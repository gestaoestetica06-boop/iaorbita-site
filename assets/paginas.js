// ÓRBITA · páginas de conteúdo: topo que acompanha o tema da seção, menu no celular e sumário que marca a leitura.
(function () {
  'use strict';
  var raiz = document.documentElement;
  var topo = document.getElementById('topo');
  var botao = document.querySelector('.topo__menu');
  var menu = document.getElementById('menu-movel');
  var fixo = document.querySelector('.whats-fixo');
  var temas = Array.prototype.slice.call(document.querySelectorAll('[data-tema]'));
  var aberto = false;
  var ultimoY = window.scrollY;
  var desceu = 0;
  var subiu = 0;
  var pedido = 0;

  function atualizar() {
    pedido = 0;
    if (!topo) return;
    var y = window.scrollY;
    if (y < 120 || aberto || topo.contains(document.activeElement)) { topo.classList.remove('is-escondido'); desceu = subiu = 0; }
    else if (y > ultimoY + 0.5) { desceu += y - ultimoY; subiu = 0; if (desceu > 90) topo.classList.add('is-escondido'); }
    else if (y < ultimoY - 0.5) { subiu += ultimoY - y; desceu = 0; if (subiu > 36) topo.classList.remove('is-escondido'); }
    ultimoY = y;
    var meio = topo.offsetHeight / 2;
    var claro = false;
    for (var i = 0; i < temas.length; i++) {
      var r = temas[i].getBoundingClientRect();
      if (r.top <= meio && r.bottom > meio) claro = temas[i].getAttribute('data-tema') === 'claro';
    }
    topo.classList.toggle('is-claro', claro && !aberto);
    topo.classList.toggle('is-solido', y > 24 || aberto);
  }
  function pedir() { if (!pedido) pedido = window.requestAnimationFrame(atualizar); }
  window.addEventListener('scroll', pedir, { passive: true });
  window.addEventListener('resize', pedir);
  atualizar();

  // menu no celular
  function alternar(abrir) {
    aberto = abrir;
    botao.setAttribute('aria-expanded', String(abrir));
    var txt = botao.querySelector('.topo__menu-txt');
    if (txt) txt.textContent = abrir ? 'Fechar' : 'Menu';
    if (abrir) {
      menu.hidden = false;
      window.requestAnimationFrame(function () { window.requestAnimationFrame(function () { menu.classList.add('is-aberto'); }); });
    } else {
      menu.classList.remove('is-aberto');
      menu.hidden = true;
    }
    raiz.style.overflow = abrir ? 'hidden' : '';
    if (fixo) fixo.classList.toggle('is-oculto', abrir);
    atualizar();
  }
  if (botao && menu) {
    Array.prototype.forEach.call(menu.querySelectorAll('a'), function (a, i) {
      a.style.setProperty('--i', i);
      a.addEventListener('click', function () { if (aberto) alternar(false); });
    });
    botao.addEventListener('click', function () { alternar(botao.getAttribute('aria-expanded') !== 'true'); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && aberto) { alternar(false); botao.focus(); } });
    window.addEventListener('resize', function () { if (aberto && window.innerWidth > 1080) alternar(false); });
  }

  // sumário: marca a seção que está sendo lida
  var links = Array.prototype.slice.call(document.querySelectorAll('.sumario a'));
  if (links.length && 'IntersectionObserver' in window) {
    var secoes = links.map(function (a) {
      var titulo = document.getElementById(a.getAttribute('href').slice(1));
      return titulo ? (titulo.closest('section') || titulo) : null;
    });
    var visiveis = [];
    var io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        var i = secoes.indexOf(en.target);
        visiveis[i] = en.isIntersecting;
      });
      var atual = visiveis.indexOf(true);
      if (atual >= 0) links.forEach(function (a, i) { a.classList.toggle('is-atual', i === atual); });
    }, { rootMargin: '-25% 0px -60% 0px' });
    secoes.forEach(function (s) { if (s) io.observe(s); });
  }
})();
