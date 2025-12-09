
function placeholder(w,h,text){ const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'><rect width='100%' height='100%' fill='%230b0b0b'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23ffcc00' font-size='28' font-family='Arial'>${text}</text></svg>`; return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg); }
const PROJECTS = [
  {
    "id": 1,
    "title": "E-Learning Dashboard",
    "cat": "Web",
    "img": "assets/dashboard.jpg",
    "desc": "Interactive e-learning dashboard with analytics.",
    "github": "https://github.com/Riyaf13"
  },
  {
    "id": 2,
    "title": "Face Recognition Attendance",
    "cat": "App",
    "img": "assets/eyebot.jpg",
    "desc": "Realtime face detection & attendance.",
    "github": "https://github.com/Riyaf13"
  },
  {
    "id": 3,
    "title": "Lung Cancer Detector",
    "cat": "ML",
    "img": "assets/lung_cancer.jpg",
    "desc": "CNN model for CT scan classification.",
    "github": "https://github.com/Riyaf13"
  },
  {
    "id": 4,
    "title": "Chatbot for Old Age People",
    "cat": "AI",
    "img": "assets/robot.jpg",
    "desc": "Conversational chatbot tailored for elderly users \u2014 simple UI, voice/text support.",
    "github": "https://github.com/Riyaf13"
  },
  {
    "id": 5,
    "title": "Music Recommender",
    "cat": "App",
    "img": "assets/spotify.jpg",
    "desc": "Emotion-driven music recommender.",
    "github": "https://github.com/Riyaf13"
  },
  {
    "id": 6,
    "title": "AI-Powered-Medical-Assistant-using-Gemma-LoRA-Fine-Tuning ",
    "cat": "Web",
    "img": "assets/medical.jpeg",
    "desc": " to create an AI-powered medical assistant capable of providing educational responses to basic health-related queries",
    "github": "https://github.com/Riyaf13"
  }
];


function el(q,ctx=document){return ctx.querySelector(q)}
function elAll(q,ctx=document){return [...ctx.querySelectorAll(q)]}
elAll('.nav-link').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();document.querySelector(a.getAttribute('href')).scrollIntoView({behavior:'smooth'});elAll('.nav-link').forEach(x=>x.classList.remove('active'));a.classList.add('active')}));
function renderPreviews(){ const previewWrap = el('.projects-preview'); previewWrap.innerHTML=''; PROJECTS.slice(0,4).forEach((p,i)=>{ const card = document.createElement('div'); card.className='project-card'; card.innerHTML = `<img src="${p.img}" alt="${p.title}"><strong>${p.title}</strong><div class="small">${p.cat}</div><div style="display:flex;gap:8px;margin-top:auto"><button class="btn view-code small">View Code</button><button class="btn" onclick="openProjectModal(${p.id})">Details</button></div>`; card.addEventListener('click',()=>openProjectPopup(p)); card.addEventListener('dblclick',()=>window.open(p.github,'_blank')); card.querySelector('.view-code').addEventListener('click',(e)=>{ e.stopPropagation(); window.open(p.github,'_blank'); }); previewWrap.appendChild(card); }); }
const categories = ['All',...new Set(PROJECTS.map(p=>p.cat))];
function setupFilters(){ const filtersWrap = el('.filters'); filtersWrap.innerHTML=''; categories.forEach(cat=>{ const btn=document.createElement('button'); btn.textContent=cat; if(cat==='All') btn.classList.add('active'); btn.addEventListener('click',()=>{ elAll('.filters button').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); renderGallery(); }); filtersWrap.appendChild(btn); }); }
function renderGallery(){ const gallery = el('#gallery'); gallery.innerHTML=''; const q = el('#projectSearch').value.toLowerCase(); const active = el('.filters button.active').textContent; const items = PROJECTS.filter(p=> (active==='All' || p.cat===active) && (p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)) ); items.forEach((p,i)=>{ const tile = document.createElement('div'); tile.className='tile'; tile.innerHTML = `<img src="${p.img}" alt="${p.title}" loading="lazy"><div class="meta"><div class="info"><strong>${p.title}</strong><div class="small">${p.cat}</div></div><div class="actions"><button class="btn view-code small">View Code</button></div></div>`; tile.addEventListener('click',()=>openLightbox(i,items)); tile.addEventListener('dblclick',()=>window.open(p.github,'_blank')); tile.querySelector('.view-code').addEventListener('click',(e)=>{ e.stopPropagation(); window.open(p.github,'_blank'); }); gallery.appendChild(tile); }); }
const LB = el('#lightbox'); const lbImg = el('#lbImage img'); const lbTitle = el('#lbTitle'); const lbCat = el('#lbCat'); let lbItems = []; let lbIndex = 0;
function openLightbox(index, items){ lbItems = items; lbIndex = index; showLB(); }
function showLB(){ const p = lbItems[lbIndex]; lbImg.src = p.img; lbTitle.textContent = p.title; lbCat.textContent = p.cat; LB.classList.add('open'); LB.setAttribute('aria-hidden','false'); el('#lbViewCode').onclick = ()=> window.open(p.github,'_blank'); }
function closeLB(){ LB.classList.remove('open'); LB.setAttribute('aria-hidden','true'); }
document.addEventListener('keydown', (e)=>{ if(LB && LB.classList && LB.classList.contains('open')){ if(e.key==='Escape') closeLB(); if(e.key==='ArrowLeft') el('#lbPrev').click(); if(e.key==='ArrowRight') el('#lbNext').click(); } });
el('#lbPrev').addEventListener('click',()=>{ lbIndex = (lbIndex-1+lbItems.length)%lbItems.length; showLB(); }); el('#lbNext').addEventListener('click',()=>{ lbIndex = (lbIndex+1)%lbItems.length; showLB(); }); el('#lbClose').addEventListener('click', closeLB);
function openProjectModal(id){ const p = PROJECTS.find(x=>x.id===id); if(!p) return; const html = `<img src="${p.img}" alt="${p.title}" style="width:100%;height:260px;object-fit:cover;border-radius:8px;margin-bottom:10px"><p>${p.desc}</p><div class="small">Category: ${p.cat}</div>`; showModal({title:p.title, html, okText:'Close', extraButton:{text:'View Code',action:()=>window.open(p.github,'_blank')}}); }
function showModal({title='',html='',okText='OK',onOk, extraButton}){ const modalWrap = document.createElement('div'); modalWrap.className='lightbox open'; modalWrap.style.zIndex=2200; modalWrap.innerHTML = `<div class="lb-inner" role="dialog" aria-modal="true" style="max-width:760px"><h3>${title}</h3><div style="margin:12px 0">${html}</div><div style="display:flex;justify-content:flex-end;gap:8px"></div></div>`; const footer = modalWrap.querySelector('div[style*="justify-content"]'); const ok = document.createElement('button'); ok.className='btn'; ok.textContent = okText; ok.addEventListener('click', ()=>{ onOk && onOk(); modalWrap.remove(); }); footer.appendChild(ok); if(extraButton){ const eb = document.createElement('button'); eb.className='btn'; eb.textContent = extraButton.text; eb.addEventListener('click', extraButton.action); footer.appendChild(eb); } document.body.appendChild(modalWrap); modalWrap.addEventListener('click', (e)=>{ if(e.target===modalWrap) modalWrap.remove(); }); }
function openProjectPopup(project){ openProjectModal(project.id); }
function toast(msg,ttl=3000){ const wrap = el('#toastWrap'); const t = document.createElement('div'); t.className='toast'; t.innerText = msg; wrap.appendChild(t); setTimeout(()=>{ t.style.opacity=0; setTimeout(()=>t.remove(),300); }, ttl); }
function setupContact(){ const form = el('#contactForm'); el('#role').addEventListener('change', e=>{ el('#companyRow').style.display = e.target.value==='yes'?'block':'none'; }); el('#file').addEventListener('change', e=>{ const f = e.target.files[0]; if(!f) return; const reader = new FileReader(); reader.onload = ()=>{ localStorage.setItem('portfolio_file', reader.result); renderFilePreview(reader.result,f.name); saveFormState(); }; reader.readAsDataURL(f); }); function renderFilePreview(data,name){ const p = el('#filePreview'); p.innerHTML=''; if(data.startsWith('data:application/pdf')){ p.innerHTML=`<div style="background:#000;padding:8px;border-radius:8px"><strong style="color:var(--accent)">${name}</strong><div class="small">PDF attached</div></div>`; } else { const img = document.createElement('img'); img.src=data; img.alt=name; img.style.width='64px'; img.style.height='64px'; img.style.borderRadius='8px'; p.appendChild(img); } } form.addEventListener('submit', e=>{ e.preventDefault(); if(!form.reportValidity()) return; if(confirm('Send message?')){ form.reset(); localStorage.removeItem('portfolio_form'); localStorage.removeItem('portfolio_file'); toast('Message sent — thank you!'); } }); el('#clearForm').addEventListener('click', ()=>{ if(confirm('Clear all fields?')){ form.reset(); el('#filePreview').innerHTML=''; localStorage.removeItem('portfolio_form'); localStorage.removeItem('portfolio_file'); toast('Form cleared'); } }); ['input','change'].forEach(ev=>form.addEventListener(ev, debounce(saveFormState, 600))); function saveFormState(){ const data = { name:el('#name').value, email:el('#email').value, phone:el('#phone').value, role:el('#role').value, company:el('#company').value, message:el('#message').value, timestamp:new Date().toISOString() }; localStorage.setItem('portfolio_form', JSON.stringify(data)); el('#autosaveStatus').textContent='Saved '+new Date().toLocaleTimeString(); } function debounce(fn,wait){ let t; return function(...a){ clearTimeout(t); t=setTimeout(()=>fn.apply(this,a),wait); }; } const fileData = localStorage.getItem('portfolio_file'); if(fileData) renderFilePreview(fileData,'Saved file'); const saved = localStorage.getItem('portfolio_form'); if(saved){ try{ const obj = JSON.parse(saved); el('#name').value=obj.name||''; el('#email').value=obj.email||''; el('#phone').value=obj.phone||''; el('#role').value=obj.role||'no'; el('#company').value=obj.company||''; el('#message').value=obj.message||''; el('#autosaveStatus').textContent='Restored '+new Date(obj.timestamp).toLocaleTimeString(); if(el('#role').value==='yes') el('#companyRow').style.display='block'; }catch(e){} } }
document.addEventListener('DOMContentLoaded', ()=>{ setupFilters(); renderPreviews(); renderGallery(); setupContact(); el('#contactMe').addEventListener('click', ()=>{ document.querySelector('#contact').scrollIntoView({behavior:'smooth'}); }); el('#projectSearch').addEventListener('input', ()=> renderGallery()); });
