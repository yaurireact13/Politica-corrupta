// ──────────────────────────────
//  DATA
// ──────────────────────────────
const streamers = [
  { name: "CristoRata",     platform: "Kick / TikTok",   level: "Alto",  pay: 20000, followers: "18.5M", engagement: "12%", audience: "16-30 | 78%", icon: '<img src="crata.png" alt="CristoRata">' },
  { name: "Sasha Uzumaki",  platform: "TikTok / IG",     level: "Alto",  pay: 18000, followers: "16.2M", engagement: "9.5%", audience: "18-28 | 85%", icon: '<img src="sacha.webp" alt="Sasha Uzumaki">' },
  { name: "Neutro",         platform: "Kick / YouTube",  level: "Alto",  pay: 20000, followers: "23.1M", engagement: "14%", audience: "14-35 | 72%", icon: '<img src="neutro.jpg" alt="Neutro">' },
  { name: "Niño viejo",     platform: "TikTok",          level: "Medio", pay: 15000, followers: "8.7M", engagement: "7.2%", audience: "20-32 | 68%", icon: '<img src="niño.jpg" alt="Niño viejo">' },
  { name: "caradecristian", platform: "Instagram",       level: "Medio", pay: 12000, followers: "5.3M", engagement: "6.1%", audience: "18-40 | 82%", icon: '<img src="condor.webp" alt="caradecristian">' },
  { name: "Manolito",       platform: "Facebook / Kick",  level: "Medio", pay: 10000, followers: "3.8M", engagement: "5.8%", audience: "25-45 | 71%", icon: '<img src="manolito.jpg" alt="Manolito">' },
  { name: "Kong",           platform: "TikTok / Kick",    level: "Bajo",  pay: 8000,  followers: "2.1M", engagement: "3.2%", audience: "17-25 | 79%", icon: '<img src="kong.jpg" alt="Kong">' },
  { name: "Angel Ramirez",  platform: "YouTube",         level: "Bajo",  pay: 7000,  followers: "1.9M", engagement: "2.8%", audience: "19-28 | 76%", icon: '<img src="angel.jpg" alt="Angel Ramirez">' },
  { name: "Valentino",      platform: "Instagram",       level: "Bajo",  pay: 5000,  followers: "1.2M", engagement: "2.1%", audience: "21-35 | 74%", icon: '<img src="valentino.jpg" alt="Valentino">' },
  { name: "Diealis",        platform: "TikTok / Kick",   level: "Bajo",  pay: 5000,  followers: "0.9M", engagement: "1.8%", audience: "16-22 | 88%", icon: '<img src="dialis.png" alt="Diealis">' },
];

const maxPay = Math.max(...streamers.map(s => s.pay));
const totalPay = streamers.reduce((a,b) => a + b.pay, 0);

// ──────────────────────────────
//  PARTICLES
// ──────────────────────────────
(function(){
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let W, H, dots = [];

  function resize(){
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  for(let i=0;i<70;i++){
    dots.push({
      x: Math.random()*1920, y: Math.random()*1080,
      vx: (Math.random()-0.5)*0.3, vy: (Math.random()-0.5)*0.3,
      r: Math.random()*1.5+0.5,
      o: Math.random()*0.5+0.2
    });
  }

  function draw(){
    ctx.clearRect(0,0,W,H);
    dots.forEach(d=>{
      d.x += d.vx; d.y += d.vy;
      if(d.x<0) d.x=W; if(d.x>W) d.x=0;
      if(d.y<0) d.y=H; if(d.y>H) d.y=0;
      ctx.beginPath();
      ctx.arc(d.x%W, d.y%H, d.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(240,192,64,${d.o})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

// ──────────────────────────────
//  RENDER CARDS
// ──────────────────────────────
function renderCards(filter){
  const grid = document.getElementById('streamers-grid');
  grid.innerHTML = '';
  streamers
    .filter(s => filter === 'Todos' || s.level === filter)
    .forEach((s, i) => {
      const pct = Math.round((s.pay / maxPay) * 100);
      const card = document.createElement('div');
      card.className = 'streamer-card';
      card.dataset.level = s.level;
      card.style.animationDelay = (i * 0.07) + 's';
      card.innerHTML = `
        <div class="card-accent"></div>
        <div class="card-body">
          <div class="card-header-row">
            <div class="avatar">${s.icon}</div>
            <div class="card-meta">
              <div class="card-name">${s.name}</div>
              <div class="badge-row">
                <span class="badge badge-platform"><i class="fas fa-satellite-dish"></i> ${s.platform}</span>
                <span class="badge badge-level-${s.level}">${s.level.toUpperCase()}</span>
              </div>
            </div>
          </div>
          <hr class="card-divider">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px; font-size: 12px;">
            <div>
              <div class="payment-label">FOLLOWERS</div>
              <div style="color: var(--text); font-weight: 700; margin-top: 4px;">${s.followers}</div>
            </div>
            <div>
              <div class="payment-label">ENGAGEMENT</div>
              <div style="color: var(--gold); font-weight: 700; margin-top: 4px;">${s.engagement}</div>
            </div>
          </div>
          <div style="margin-bottom: 16px; padding: 10px; background: rgba(240,192,64,0.04); border-left: 2px solid var(--gold); font-size: 12px; color: var(--muted);">
            <strong style="color: var(--text);">Audiencia:</strong> ${s.audience}
          </div>
          <div class="card-payment">
            <div>
              <div class="payment-label">PAGO ESTIMADO</div>
              <div class="payment-val">$${s.pay.toLocaleString()}</div>
            </div>
          </div>
          <div class="card-bar-wrap">
            <div class="card-bar" data-pct="${pct}"></div>
          </div>
        </div>`;
      grid.appendChild(card);

      // observe for animation
      observer.observe(card);
    });
}

// ──────────────────────────────
//  RENDER CHART
// ──────────────────────────────
function renderChart(){
  const area = document.getElementById('chart-area');
  area.innerHTML = '<div class="section-tag" style="margin-bottom:24px">DESGLOSE POR STREAMER</div>';

  streamers.forEach((s,i) => {
    const pct = Math.round((s.pay / maxPay) * 100);
    const cls = s.level === 'Alto' ? 'bar-high' : s.level === 'Medio' ? 'bar-mid' : 'bar-low';
    const row = document.createElement('div');
    row.className = 'chart-row';
    row.style.animationDelay = (i*0.08)+'s';
    row.innerHTML = `
      <div class="chart-name">${s.name}</div>
      <div class="chart-track">
        <div class="chart-fill ${cls}" data-pct="${pct}" style="width:0">
          <span>$${s.pay.toLocaleString()}</span>
        </div>
      </div>`;
    area.appendChild(row);
    observer.observe(row);
  });
}

// ──────────────────────────────
//  INTERSECTION OBSERVER
// ──────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      // animate bar fills
      const bars = entry.target.querySelectorAll('[data-pct]');
      bars.forEach(b => {
        setTimeout(() => { b.style.width = b.dataset.pct + '%'; }, 200);
      });
      // trigger counter if it's the economy section
      if(entry.target.id === 'counter-total') animateCounter();
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

// Observe static elements
document.querySelectorAll('.ctx-card, .tl-item, .analysis-card, .method-card, .comp-card').forEach(el => observer.observe(el));

// ──────────────────────────────
//  COUNTER ANIMATION
// ──────────────────────────────
let counterDone = false;
function animateCounter(){
  if(counterDone) return;
  counterDone = true;
  const target = totalPay;
  const el = document.getElementById('big-counter');
  const el2 = document.getElementById('counter-total');
  let start = 0;
  const duration = 2000;
  const step = timestamp => {
    if(!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const ease = progress < 0.5 ? 2*progress*progress : -1+(4-2*progress)*progress;
    const val = Math.round(ease * target);
    const fmt = '$' + val.toLocaleString();
    el.textContent = fmt;
    if(el2) el2.textContent = fmt;
    if(progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// Observe counter trigger
const econEl = document.getElementById('counter-total');
if(econEl) observer.observe(econEl);

// ──────────────────────────────
//  FILTERS
// ──────────────────────────────
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderCards(btn.dataset.filter);
  });
});

// ──────────────────────────────
//  HAMBURGER MENU
// ──────────────────────────────
document.getElementById('hamburger').addEventListener('click', function() {
  const menu = document.getElementById('nav-menu');
  menu.classList.toggle('active');
  this.classList.toggle('active');
});

// ──────────────────────────────
//  COMMENTS SYSTEM
// ──────────────────────────────
let comments = JSON.parse(localStorage.getItem('investigationComments')) || [];
let currentCommentPage = 1;
const COMMENTS_PAGE_SIZE = 6;
let currentCommentOrder = 'newest'; // newest | oldest

function saveComments() {
  localStorage.setItem('investigationComments', JSON.stringify(comments));
}

function getSortedComments() {
  const sorted = [...comments].sort((a, b) => new Date(b.date) - new Date(a.date));
  if (currentCommentOrder === 'oldest') {
    sorted.reverse();
  }
  return sorted;
}

function getCommentPageCount() {
  const total = getSortedComments().length;
  return Math.max(1, Math.ceil(total / COMMENTS_PAGE_SIZE));
}

function renderCommentPagination() {
  const pageInfo = document.getElementById('page-info');
  const prevBtn = document.getElementById('prev-page');
  const nextBtn = document.getElementById('next-page');
  const total = getCommentPageCount();
  if (pageInfo) pageInfo.textContent = `Página ${currentCommentPage} de ${total}`;
  if (prevBtn) prevBtn.disabled = currentCommentPage <= 1;
  if (nextBtn) nextBtn.disabled = currentCommentPage >= total;
}

function loadComments() {
  const list = document.getElementById('comments-list');
  list.innerHTML = '';
  const sortedComments = getSortedComments();
  const total = sortedComments.length;
  const start = (currentCommentPage - 1) * COMMENTS_PAGE_SIZE;
  const end = Math.min(total, start + COMMENTS_PAGE_SIZE);
  const pageComments = sortedComments.slice(start, end);

  if (pageComments.length === 0) {
    list.innerHTML = '<div class="comment-item" style="grid-column:1/-1; text-align:center; color:var(--muted)">No hay comentarios. ¡Sé el primero en dejar tu opinión!</div>';
  } else {
    pageComments.forEach(comment => {
      const item = document.createElement('div');
      item.className = 'comment-item';
      item.innerHTML = `
        <div class="comment-author">${comment.name || 'Anónimo'}</div>
        <div class="comment-date">${new Date(comment.date).toLocaleString()}</div>
        <div class="comment-text">${comment.text}</div>
      `;
      list.appendChild(item);
    });
  }

  renderCommentPagination();
}

function configureCommentOrderSelector() {
  const orderSelect = document.getElementById('comment-order');
  if (!orderSelect) return;
  orderSelect.value = currentCommentOrder;
  orderSelect.addEventListener('change', () => {
    currentCommentOrder = orderSelect.value;
    currentCommentPage = 1;
    loadComments();
  });
}

document.getElementById('prev-page').addEventListener('click', () => {
  if (currentCommentPage > 1) {
    currentCommentPage -= 1;
    loadComments();
  }
});

document.getElementById('next-page').addEventListener('click', () => {
  if (currentCommentPage < getCommentPageCount()) {
    currentCommentPage += 1;
    loadComments();
  }
});

document.getElementById('comment-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('comment-name').value.trim();
  const text = document.getElementById('comment-text').value.trim();
  if (text) {
    comments.push({
      name: name,
      text: text,
      date: new Date().toISOString()
    });
    saveComments();
    currentCommentPage = getCommentPageCount();
    loadComments();
    this.reset();
  }
});

// ──────────────────────────────
//  INIT
// ──────────────────────────────
renderCards('Todos');
renderChart();
configureCommentOrderSelector();
loadComments();