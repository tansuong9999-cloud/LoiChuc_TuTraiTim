// script.js
// LocalStorage key
const STORAGE_KEY = 'loichuc_data_v1';

// Elements
const nameEl = document.getElementById('name');
const msgEl = document.getElementById('message');
const sendBtn = document.getElementById('sendBtn');
const wishListEl = document.getElementById('wishList');
const clearBtn = document.getElementById('clearBtn');
const musicToggle = document.getElementById('musicToggle');
const bgmusic = document.getElementById('bgmusic');

// Load saved wishes
let wishes = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
renderWishes();

// Event listeners
sendBtn.addEventListener('click', addWish);
clearBtn.addEventListener('click', clearWishes);
musicToggle.addEventListener('change', e => bgmusic.muted = !e.target.checked);

// Add a wish
function addWish() {
  const name = nameEl.value.trim() || 'Bạn ẩn danh';
  const text = msgEl.value.trim();
  if (!text) { alert('Vui lòng nhập lời chúc!'); return; }

  const item = { id: Date.now(), name, text };
  wishes.unshift(item);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
  renderWishes();
  nameEl.value = ''; msgEl.value = '';
}

// Render list
function renderWishes() {
  wishListEl.innerHTML = '';
  for (const w of wishes) {
    const d = document.createElement('div');
    d.className = 'wish';
    d.innerHTML = `<div class="meta">${escapeHtml(w.name)}</div><div class="text">${escapeHtml(w.text)}</div>`;
    wishListEl.appendChild(d);
  }
}

// Clear local
function clearWishes() {
  if (!confirm('Xóa toàn bộ lời chúc trong trình duyệt?')) return;
  wishes = [];
  localStorage.removeItem(STORAGE_KEY);
  renderWishes();
}

// simple escape to avoid raw html injection
function escapeHtml(s){ return s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;'); }

// Bubbles generator
function createBubble() {
  const b = document.createElement('div');
  b.className = 'bubble';
  const size = Math.random()*60 + 20;
  b.style.width = size + 'px';
  b.style.height = size + 'px';
  b.style.left = Math.random()*100 + '%';
  b.style.background = `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(173,216,230,0.6), rgba(135,206,250,0.2))`;
  b.style.animationDuration = (6 + Math.random()*8) + 's';
  b.style.opacity = 0.9;
  document.querySelector('.bubbles').appendChild(b);
  setTimeout(()=> b.remove(), 14000);
}

// generate bubbles periodically
setInterval(createBubble, 800);
for(let i=0;i<6;i++) setTimeout(createBubble, i*400);

// allow pressing Enter in textarea with Ctrl+Enter to submit
msgEl.addEventListener('keydown', (e)=> {
  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { addWish(); }
});
