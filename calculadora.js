/*
 * Calculadora — arquivo único (HTML + CSS + JavaScript)
 * Uso: <script src="calculadora.js"></script> em qualquer página HTML.
 * Tema claro/escuro, histórico de contas e comando de voz (pt-BR).
 */
(function () {
  const CSS = `:root{--page:#d9dbe2;--c1:#fbfbfc;--c2:#e9ebf0;--ink:#2b2e38;--sub:#9a9eab;--k1:#f8f9fb;--k2:#e8eaef;--ks:0 8px 16px -4px rgba(110,116,135,.38),inset 0 2px 3px rgba(255,255,255,.95),inset 0 -3px 6px rgba(150,156,175,.2);--f1:#d6d9e1;--f2:#bfc3cf;--o1:#f8a51e;--o2:#e0700b;--panel:rgba(248,249,251,.95);--line:rgba(60,64,80,.12);--shadow:0 30px 60px -20px rgba(90,96,115,.5);
box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px);color-scheme:light}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--page:#16171b;--c1:#3a3d45;--c2:#23252b;--ink:#f3f4f7;--sub:#7d8190;--k1:#454851;--k2:#30323a;--ks:0 8px 16px -4px rgba(0,0,0,.6),inset 0 1px 1px rgba(255,255,255,.13),inset 0 -3px 6px rgba(0,0,0,.28);--f1:#7d8292;--f2:#60647388;--panel:rgba(35,37,43,.96);--line:rgba(255,255,255,.1);--shadow:0 30px 60px -20px rgba(0,0,0,.8);color-scheme:dark}}
:root[data-theme="dark"]{--page:#16171b;--c1:#3a3d45;--c2:#23252b;--ink:#f3f4f7;--sub:#7d8190;--k1:#454851;--k2:#30323a;--ks:0 8px 16px -4px rgba(0,0,0,.6),inset 0 1px 1px rgba(255,255,255,.13),inset 0 -3px 6px rgba(0,0,0,.28);--f1:#7d8292;--f2:#60647388;--panel:rgba(35,37,43,.96);--line:rgba(255,255,255,.1);--shadow:0 30px 60px -20px rgba(0,0,0,.8);color-scheme:dark}
html{scroll-padding-top:env(safe-area-inset-top,0px);height:100%;overflow-x:hidden;overflow-y:auto}
body{margin:0;min-height:100%;display:flex;align-items:center;justify-content:center;padding:16px;box-sizing:border-box;overflow-x:hidden;overflow-y:auto;background:var(--page);color:var(--ink);font-family:Inter,system-ui,"Helvetica Neue",Arial,sans-serif;transition:background .3s}
.ring{position:fixed;border:14px solid #f77f12;border-radius:50%;width:300px;height:300px;z-index:0;pointer-events:none}
.r1{top:-190px;right:-150px}.r2{bottom:-190px;left:-170px}
.phone{position:relative;z-index:1;width:min(380px,100%);box-sizing:border-box;padding:18px 18px 22px;border-radius:38px;overflow:hidden;box-shadow:var(--shadow);background:radial-gradient(circle at 100% 100%,rgba(248,165,30,.28),transparent 55%),linear-gradient(160deg,var(--c1),var(--c2));transition:background .3s}
.bar{display:flex;justify-content:space-between;align-items:center}
.tools{display:flex;gap:8px}
button{font:inherit;color:inherit;border:0;cursor:pointer;-webkit-tap-highlight-color:transparent}
button:focus-visible{outline:2px solid #f77f12;outline-offset:3px}
svg{width:22px;height:22px;display:block}
.mic{width:76px;height:54px;border-radius:27px 27px 27px 8px;background:var(--f1);opacity:.85;display:grid;place-items:center;position:relative}
.mic.on{background:linear-gradient(145deg,var(--o1),var(--o2));color:#fff;opacity:1;animation:pulse 1.2s infinite}
@keyframes pulse{0%{box-shadow:0 0 0 0 rgba(247,127,18,.55)}100%{box-shadow:0 0 0 16px rgba(247,127,18,0)}}
.icon{width:46px;height:46px;border-radius:50%;background:transparent;display:grid;place-items:center;color:var(--sub)}
.icon:hover,.icon[aria-pressed="true"]{color:var(--ink);background:var(--line)}
#say{margin:10px 0 0;min-height:34px;font-size:12.5px;line-height:1.35;color:var(--sub);font-weight:400}
.disp{text-align:right;padding:2px 6px 18px;overflow:hidden}
#expr{font-size:17px;font-weight:300;color:var(--sub);min-height:24px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;direction:rtl}
#res{font-size:64px;font-weight:200;letter-spacing:-.02em;line-height:1.15;font-variant-numeric:tabular-nums;white-space:nowrap;margin-top:6px}
.keys{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.k{aspect-ratio:1;border-radius:24px;font-size:26px;font-weight:300;background:linear-gradient(160deg,var(--k1),var(--k2));box-shadow:var(--ks);transition:transform .08s,filter .15s;display:grid;place-items:center}
.k:active{transform:scale(.95);filter:brightness(.94)}
.k0{grid-column:span 2;aspect-ratio:auto;place-items:center start;padding-left:34px;border-radius:26px}
.fn{background:linear-gradient(160deg,var(--f1),var(--f2));font-size:22px}
.op{background:linear-gradient(160deg,var(--o1),var(--o2));color:#fff;font-size:30px;box-shadow:0 8px 16px -4px rgba(224,112,11,.55),inset 0 2px 3px rgba(255,255,255,.4),inset 0 -3px 6px rgba(150,60,0,.25)}
.hist{position:absolute;left:0;right:0;bottom:0;top:84px;background:var(--panel);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);border-radius:28px 28px 0 0;padding:18px 20px;display:flex;flex-direction:column;transform:translateY(105%);visibility:hidden;transition:transform .3s,visibility .3s;border-top:1px solid var(--line)}
.hist.open{transform:none;visibility:visible}
.hh{display:flex;justify-content:space-between;align-items:center;font-size:17px;font-weight:400;margin-bottom:6px}
.clr{background:none;font-size:14px;color:#f77f12;padding:8px 4px}
.clr[disabled]{opacity:.35;cursor:default}
#list{overflow:auto;flex:1;margin:0;padding:0;list-style:none}
#list li button{display:block;width:100%;text-align:right;background:none;padding:12px 4px;border-bottom:1px solid var(--line);border-radius:6px}
#list li button:hover{background:var(--line)}
.he{display:block;font-size:14px;font-weight:300;color:var(--sub)}
.hr{display:block;font-size:28px;font-weight:300;font-variant-numeric:tabular-nums}
.empty{color:var(--sub);font-size:14px;line-height:1.5;padding:24px 4px;text-align:center}
@media (max-width:380px){#res{font-size:54px}.k{font-size:23px;border-radius:20px}.keys{gap:10px}}
@media (max-width:1024px){
:root{padding:0}
html,body{width:100%;height:100%;overflow:hidden}
body{min-height:0;padding:0}
.phone{width:100%;height:100%;min-height:0;display:flex;flex-direction:column;padding:max(12px,env(safe-area-inset-top,0px)) max(18px,env(safe-area-inset-right,0px)) max(14px,env(safe-area-inset-bottom,0px)) max(18px,env(safe-area-inset-left,0px));border-radius:0}
.bar,#say,.disp{flex-shrink:0}
.keys{flex:1;min-height:0;grid-template-rows:repeat(5,minmax(0,1fr));gap:clamp(6px,1.8vmin,12px);width:100%;max-width:560px;align-self:center}
.k{min-height:0;aspect-ratio:auto}
}
@media (max-width:1024px) and (max-height:520px){
.phone{padding-top:max(8px,env(safe-area-inset-top,0px));padding-bottom:max(8px,env(safe-area-inset-bottom,0px))}
.mic{width:62px;height:42px}
#say{margin-top:4px;min-height:0;font-size:11px}
.disp{padding:0 6px 8px}
#expr{min-height:20px;font-size:14px}
#res{font-size:clamp(38px,12vh,54px);line-height:1.05;margin-top:0}
.keys{gap:6px}
.k{font-size:clamp(18px,5vh,23px);border-radius:16px}
.fn{font-size:19px}
.op{font-size:24px}
}
@media (min-width:1025px) and (max-height:720px){body{align-items:flex-start}}
@media (prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}
`;

  const HTML = `<div class="ring r1"></div><div class="ring r2"></div>
<main class="phone">
  <header class="bar">
    <button class="mic" id="mic" aria-label="Falar a conta"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg></button>
    <div class="tools">
      <button class="icon" id="hbtn" aria-label="Histórico" aria-pressed="false"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg></button>
      <button class="icon" id="tbtn" aria-label="Alternar tema claro e escuro"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor"/></svg></button>
    </div>
  </header>
  <p id="say" aria-live="polite">Toque no microfone e diga a conta.</p>
  <section class="disp"><div id="expr">&nbsp;</div><div id="res">0</div></section>
  <div class="keys" id="keys">
    <button class="k fn" data-k="C">C</button><button class="k fn" data-k="neg">+/−</button><button class="k fn" data-k="pct">%</button><button class="k op" data-k="/">÷</button>
    <button class="k" data-k="7">7</button><button class="k" data-k="8">8</button><button class="k" data-k="9">9</button><button class="k op" data-k="*">×</button>
    <button class="k" data-k="4">4</button><button class="k" data-k="5">5</button><button class="k" data-k="6">6</button><button class="k op" data-k="-">−</button>
    <button class="k" data-k="1">1</button><button class="k" data-k="2">2</button><button class="k" data-k="3">3</button><button class="k op" data-k="+">+</button>
    <button class="k k0" data-k="0">0</button><button class="k" data-k="dot">,</button><button class="k op" data-k="=">=</button>
  </div>
  <aside class="hist" id="hist" aria-label="Histórico de contas">
    <div class="hh"><span>Histórico</span><button class="clr" id="clr">Limpar tudo</button></div>
    <ul id="list"></ul>
  </aside>
</main>`;

  function montar() {
    document.documentElement.lang = 'pt-BR';
    document.title = 'Calculadora';
    if (!document.querySelector('meta[name="viewport"]')) {
      const m = document.createElement('meta');
      m.name = 'viewport';
      m.content = 'width=device-width, initial-scale=1, viewport-fit=cover';
      document.head.appendChild(m);
    }
    const font = document.createElement('link');
    font.rel = 'stylesheet';
    font.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400&display=swap';
    document.head.appendChild(font);
    const style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);
    document.body.insertAdjacentHTML('beforeend', HTML);
    iniciar();
  }

  function iniciar() {
  const $=s=>document.querySelector(s);
  const res=$('#res'),expr=$('#expr'),say=t=>$('#say').textContent=t;
  const SYM={'+':'+','-':'−','*':'×','/':'÷'};
  let tokens=[],cur='',justEval=false,err=false,lastExpr='',hist=[];
  try{hist=JSON.parse(localStorage.getItem('calc-hist')||'[]')}catch(e){}
  const save=()=>{try{localStorage.setItem('calc-hist',JSON.stringify(hist))}catch(e){}};

  /* ---------- formatação ---------- */
  function fmtNum(s){
    if(/e/i.test(s))return s.replace('.',',');
    const neg=s[0]==='-';if(neg)s=s.slice(1);
    const [i,d]=s.split('.');
    return(neg?'-':'')+(+i).toLocaleString('pt-BR',{maximumFractionDigits:0})+(d!==undefined?','+d:'');
  }
  function fmtVal(n){return isFinite(n)?fmtNum(String(+n.toPrecision(12))):'Erro'}
  const exprStr=()=>tokens.map(t=>typeof t==='number'?fmtVal(t):SYM[t]).join(' ');

  /* ---------- cálculo (sem eval) ---------- */
  function calc(t){
    const o=[t[0]];
    for(let i=1;i<t.length;i+=2){
      const op=t[i],n=t[i+1];
      if(op==='*')o[o.length-1]*=n;
      else if(op==='/'){if(n===0)return NaN;o[o.length-1]/=n}
      else o.push(op,n);
    }
    let r=o[0];
    for(let i=1;i<o.length;i+=2)r=o[i]==='+'?r+o[i+1]:r-o[i+1];
    return r;
  }

  function render(){
    let main,sub;
    if(err){main='Erro';sub=lastExpr}
    else{
      if(cur!=='')main=fmtNum(cur);
      else{const n=[...tokens].reverse().find(t=>typeof t==='number');main=n===undefined?'0':fmtVal(n)}
      sub=justEval?lastExpr:exprStr();
    }
    res.textContent=main;
    res.style.fontSize=main.length>14?'32px':main.length>11?'40px':main.length>8?'50px':'';
    expr.textContent=sub||'\u00a0';
  }

  function equals(){
    if(justEval)return;
    if(cur!==''){tokens.push(Number(cur));cur=''}
    if(typeof tokens[tokens.length-1]==='string')tokens.pop();
    if(tokens.length<3){if(tokens.length)cur=String(tokens[0]);tokens=[];return}
    const e=exprStr(),r=calc(tokens);tokens=[];lastExpr=e;
    if(!isFinite(r)){err=true;return}
    const v=+r.toPrecision(12);
    hist.unshift({e,v});hist=hist.slice(0,100);save();renderHist();
    cur=String(v);justEval=true;
  }

  function press(k){
    if(err){tokens=[];cur='';err=false;justEval=false;lastExpr=''}
    if(/^\d$/.test(k)){
      if(justEval){tokens=[];cur='';justEval=false}
      if(cur.replace(/[-.]/g,'').length>=12)return;
      cur=cur==='0'?k:cur==='-0'?'-'+k:cur+k;
    }else if(k==='dot'){
      if(justEval){tokens=[];cur='';justEval=false}
      if(cur===''||cur==='-')cur+='0';
      if(!cur.includes('.'))cur+='.';
    }else if(k==='C'){tokens=[];cur='';justEval=false;lastExpr=''}
    else if(k==='neg'){
      if(cur==='')cur='0';
      cur=cur[0]==='-'?cur.slice(1):'-'+cur;
    }else if(k==='pct'){
      if(cur!=='')cur=String(+(Number(cur)/100).toPrecision(12));
    }else if(k==='='){equals()}
    else{
      justEval=false;
      if(cur!==''){tokens.push(Number(cur),k);cur=''}
      else if(tokens.length)tokens[tokens.length-1]=k;
      else tokens.push(0,k);
    }
    render();
  }
  $('#keys').addEventListener('click',e=>{const b=e.target.closest('[data-k]');if(b)press(b.dataset.k)});
  document.addEventListener('keydown',e=>{
    if(e.ctrlKey||e.metaKey||e.altKey)return;
    const k=e.key;
    if(/^\d$/.test(k)||'+-*/'.includes(k))press(k);
    else if(k===','||k==='.')press('dot');
    else if(k==='Enter'||k==='='){e.preventDefault();press('=')}
    else if(k==='%')press('pct');
    else if(k==='Escape')press('C');
    else if(k==='Backspace'&&!justEval&&!err&&cur!==''){cur=cur.slice(0,-1);if(cur==='-')cur='';render()}
  });

  /* ---------- histórico ---------- */
  const panel=$('#hist'),list=$('#list');
  function renderHist(){
    $('#clr').disabled=!hist.length;
    list.innerHTML='';
    if(!hist.length){list.innerHTML='<li class="empty">Nenhuma conta ainda. Faça um cálculo e ele aparece aqui.</li>';return}
    hist.forEach(h=>{
      const li=document.createElement('li'),b=document.createElement('button');
      b.innerHTML='<span class="he"></span><span class="hr"></span>';
      b.firstChild.textContent=h.e;b.lastChild.textContent=fmtVal(h.v);
      b.title='Usar este resultado';
      b.onclick=()=>{tokens=[];cur=String(h.v);justEval=false;err=false;lastExpr='';toggleHist(false);render()};
      li.appendChild(b);list.appendChild(li);
    });
  }
  function toggleHist(force){
    const open=force===undefined?!panel.classList.contains('open'):force;
    panel.classList.toggle('open',open);$('#hbtn').setAttribute('aria-pressed',open);
  }
  $('#hbtn').onclick=()=>toggleHist();
  $('#clr').onclick=()=>{hist=[];save();renderHist()};

  /* ---------- tema ---------- */
  const root=document.documentElement;
  try{const t=localStorage.getItem('calc-theme');if(t)root.dataset.theme=t}catch(e){}
  $('#tbtn').onclick=()=>{
    const dark=(root.dataset.theme||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'))==='dark';
    root.dataset.theme=dark?'light':'dark';
    try{localStorage.setItem('calc-theme',root.dataset.theme)}catch(e){}
  };

  /* ---------- voz ---------- */
  const W={zero:0,um:1,uma:1,dois:2,duas:2,'três':3,tres:3,quatro:4,cinco:5,seis:6,sete:7,oito:8,nove:9,dez:10,onze:11,doze:12,treze:13,catorze:14,quatorze:14,quinze:15,dezesseis:16,dezessete:17,dezoito:18,dezenove:19,vinte:20,trinta:30,quarenta:40,cinquenta:50,sessenta:60,setenta:70,oitenta:80,noventa:90,cem:100,cento:100,duzentos:200,trezentos:300,quatrocentos:400,quinhentos:500,seiscentos:600,setecentos:700,oitocentos:800,novecentos:900};
  function words(s){
    let tot=0,c=0,any=false;
    for(const w of s.split(/\s+/)){
      if(!w||w==='e')continue;
      if(w in W){c+=W[w];any=true}
      else if(w==='mil'){tot+=(c||1)*1000;c=0;any=true}
      else if(/^milh(ão|ões|ao|oes)$/.test(w)){tot+=(c||1)*1e6;c=0;any=true}
      else return null;
    }
    return any?tot+c:null;
  }
  function segNum(s){
    let pct=false;
    if(/por ?cento|%/.test(s)){pct=true;s=s.replace(/por ?cento|%/g,'').trim()}
    let v;
    if(/^[\d.,\s]+$/.test(s)){
      v=parseFloat(s.replace(/\s/g,'').replace(/\.(?=\d{3}(\D|$))/g,'').replace(',','.'));
    }else{
      const m=s.split(/\s+v[íi]rgula\s+/);
      if(m.length===2){const a=words(m[0]),b=words(m[1]);v=a!==null&&b!==null?parseFloat(a+'.'+b):null}
      else v=words(s);
    }
    if(v==null||isNaN(v))return null;
    return pct?v/100:v;
  }
  function parseSpeech(t){
    t=' '+t.toLowerCase()+' ';
    t=t.replace(/quanto (é|e|são|sao)|calcule|calcular|igual a|igual|resultado|=/g,' ')
      .replace(/multiplicado por|multiplicar por|vezes|×|\bx\b/g,' * ')
      .replace(/(\d)\s*x\s*(?=\d)/g,'$1 * ')
      .replace(/dividido por|dividido|÷|\//g,' / ')
      .replace(/\bmais\b/g,' + ').replace(/\bmenos\b|−/g,' - ');
    const p=t.split(/([+*\/-])/),out=[];
    for(let i=0;i<p.length;i++){
      if(i%2){out.push(p[i]);continue}
      const s=p[i].trim();
      if(!s){if(i===0){out.push(0);continue}return null}
      const v=segNum(s);if(v===null)return null;out.push(v);
    }
    return out.length>=3&&typeof out[out.length-1]==='number'?out:null;
  }
  function applySpeech(txt){
    const t=parseSpeech(txt);
    if(!t){say('Não entendi uma conta em “'+txt+'”. Tente algo como “doze vezes 4”.');return}
    tokens=t;cur='';justEval=false;err=false;equals();render();
    say(err?'Não dá para dividir por zero.':'Entendi: '+lastExpr+' = '+res.textContent);
  }
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  const mic=$('#mic');let rec=null,listening=false;
  mic.onclick=()=>{
    if(!SR){say('Este navegador não tem reconhecimento de voz. Use o Chrome, o Edge ou o Safari.');return}
    if(listening){rec.stop();return}
    let finalText='',failed=false;
    rec=new SR();rec.lang='pt-BR';rec.interimResults=true;rec.maxAlternatives=1;
    rec.onstart=()=>{listening=true;mic.classList.add('on');mic.setAttribute('aria-label','Parar de ouvir');say('Ouvindo… diga, por exemplo, “vinte e cinco mais 3”.')};
    rec.onresult=e=>{
      let txt='';for(const r of e.results)txt+=r[0].transcript;
      say('“'+txt+'”');finalText=txt;
    };
    rec.onerror=e=>{
      failed=true;
      say(e.error==='not-allowed'||e.error==='service-not-allowed'?'Microfone bloqueado. Permita o acesso ao microfone para esta página e tente de novo.'
        :e.error==='no-speech'?'Não ouvi nada. Toque no microfone e fale a conta.'
        :'Não consegui usar a voz agora ('+e.error+').');
    };
    rec.onend=()=>{
      listening=false;mic.classList.remove('on');mic.setAttribute('aria-label','Falar a conta');
      if(finalText&&!failed)applySpeech(finalText);
      else if(!failed&&!finalText)say('Não ouvi nada. Toque no microfone e fale a conta.');
    };
    try{rec.start()}catch(e){say('Não foi possível iniciar o microfone.')}
  };

  renderHist();render();

  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', montar);
  else montar();
})();
