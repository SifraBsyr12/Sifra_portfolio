import { useLayoutEffect } from 'react'
import './styles.css'
import * as d from './data.js'

const Points = ({ items }) => (
  <ul className="tick">{items.map(t => <li key={t}>{t}</li>)}</ul>
)
const Chips = ({ items }) => (
  <div className="chips">{items.map(c => <span className="chip" key={c}>{c}</span>)}</div>
)
const Cards = ({ items }) => (
  <ul className="cred">
    {items.map(([a, b]) => <li key={a}><strong>{a}</strong><span>{b}</span></li>)}
  </ul>
)
const nav = [['about','About'],['experience','Experience'],['projects','Projects'],['skills','Skills'],['credentials','Credentials'],['contact','Contact']]

function initAnimations(){
  if(matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver' in window))return;
  document.documentElement.classList.add('js');
  var els=document.querySelectorAll('.head,.about p,.facts,.job,.p,.sk,.cred li,.refs,.contact h2,.contact p,.contact .btns');
  var io=new IntersectionObserver(function(es){es.forEach(function(e){
    if(e.isIntersecting){var t=e.target;t.classList.add('in');io.unobserve(t);
      setTimeout(function(){t.classList.remove('reveal','in');t.style.transitionDelay=''},1200)}})},{threshold:.15});
  els.forEach(function(el,i){el.classList.add('reveal');el.style.transitionDelay=(i%3)*90+'ms';io.observe(el)});
  document.querySelectorAll('.stats b').forEach(function(b){
    var t=b.textContent,n=parseInt(t,10),s=t.replace(/[0-9]/g,'');b.textContent='0'+s;
    var o=new IntersectionObserver(function(es){if(!es[0].isIntersecting)return;o.disconnect();
      var st=performance.now();(function f(now){var p=Math.min((now-st)/1200,1);
        b.textContent=Math.round(n*(1-Math.pow(1-p,3)))+s;if(p<1)requestAnimationFrame(f)})(st)},{threshold:.6});
    o.observe(b)});
}


function initExtras(){
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  var bar=document.createElement('div');bar.className='progress';document.body.appendChild(bar);
  function onScroll(){var h=document.documentElement,m=h.scrollHeight-h.clientHeight;bar.style.transform='scaleX('+(m>0?h.scrollTop/m:0)+')'}
  addEventListener('scroll',onScroll,{passive:true});onScroll();
  var role=document.querySelector('.hero .role');
  if(role){var ty=document.createElement('div');ty.className='typed';ty.setAttribute('aria-hidden','true');ty.innerHTML='<span></span><i></i>';role.after(ty);
    var words=['Manual and automated testing','Playwright and API testing','Bug hunting with JIRA','Audit-minded and ISO 27001 trained'],span=ty.firstChild,w=0,c=0,del=false;
    (function tick(){var word=words[w],d=del?35:70;span.textContent=word.slice(0,c);
      if(!del&&c===word.length){del=true;d=1400}else if(del&&c===0){del=false;w=(w+1)%words.length;d=350}
      c+=del?-1:1;setTimeout(tick,d)})();}
  var st=document.querySelector('.statswrap');
  if(st){var names=[];document.querySelectorAll('.sk .chip').forEach(function(x){if(names.indexOf(x.textContent)<0)names.push(x.textContent)});
    var tk=document.createElement('div');tk.className='ticker';tk.setAttribute('aria-hidden','true');
    var html=names.map(function(n){return '<span>'+n+'</span>'}).join('');
    tk.innerHTML='<div class="track">'+html+html+'</div>';st.after(tk)}
  var links={};document.querySelectorAll('nav ul a').forEach(function(a){links[a.getAttribute('href').slice(1)]=a});
  var so=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)Object.keys(links).forEach(function(k){links[k].classList.toggle('active',k===e.target.id)})})},{rootMargin:'-45% 0px -50% 0px'});
  Object.keys(links).forEach(function(k){var s=document.getElementById(k);if(s)so.observe(s)});
  if(matchMedia('(hover:hover)').matches)document.querySelectorAll('.p,.sk').forEach(function(el){
    el.addEventListener('mousemove',function(e){var r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      el.style.transform='perspective(800px) rotateX('+(-y*6)+'deg) rotateY('+(x*6)+'deg) translateY(-4px)'});
    el.addEventListener('mouseleave',function(){el.style.transform=''})});
}

export default function App() {
  useLayoutEffect(() => { initAnimations(); initExtras() }, [])
  const p = d.profile
  return (
    <>
      <nav><div className="wrap">
        <a className="brand" href="#top">{p.short}</a>
        <ul>{nav.map(([id, l]) => <li key={id}><a href={`#${id}`}>{l}</a></li>)}</ul>
      </div></nav>

      <header className="hero" id="top"><div className="wrap">
        <div>
          <h1>{p.name}</h1>
          <div className="role">{p.role}</div>
          <p className="lead">{p.lead}</p>
          <div className="btns">
            <a className="btn primary" href="#projects">View projects</a>
            <a className="btn ghost" href="#contact">Get in touch</a>
          </div>
        </div>
      </div></header>

      <div className="wrap statswrap"><div className="stats">
        {[['30+','functional test cases in the URL detection research'],['3','web platforms and apps tested end to end'],['4','ISO standards studied'],['4','professional certifications']].map(([n, t]) => <div key={t}><b>{n}</b><span>{t}</span></div>)}
      </div></div>

      <section id="about"><div className="wrap about">
        <div>
          <div className="head"><h2>About</h2></div>
          {d.about.map(t => <p key={t}>{t}</p>)}
        </div>
        <div className="facts">
          {d.facts.map(([k, v]) => <div key={k}><span>{k}</span><strong>{v}</strong></div>)}
        </div>
      </div></section>

      <section id="experience" className="alt"><div className="wrap">
        <div className="head"><h2>Experience</h2><p>Hands-on work in auditing and workflow automation.</p></div>
        <div className="tl">
          {d.jobs.map(j => (
            <div className="job" key={j.title}>
              <h3>{j.title}</h3><div className="org">{j.org}</div><Points items={j.points} />
            </div>
          ))}
        </div>
      </div></section>

      <section id="projects"><div className="wrap">
        <div className="head"><h2>Projects and research</h2><p>Testing work across e-commerce, travel booking and security.</p></div>
        <div className="grid">
          <article className="p feature">
            <div><div className="tag">{d.research.tag}</div><h3>{d.research.title}</h3><Points items={d.research.points} /></div>
            <div style={{ alignSelf: 'center' }}><Chips items={d.research.chips} /></div>
          </article>
          {d.projects.map(x => (
            <article className="p" key={x.title}>
              <div className="tag">{x.tag}</div><h3>{x.title}</h3><Points items={x.points} />
            </article>
          ))}
        </div>
      </div></section>

      <section id="skills" className="alt"><div className="wrap">
        <div className="head"><h2>Technical skills</h2></div>
        <div className="skills">
          {Object.entries(d.skills).map(([k, v]) => <div className="sk" key={k}><h3>{k}</h3><Chips items={v} /></div>)}
        </div>
      </div></section>

      <section id="credentials"><div className="wrap two">
        <div><h3>Training and standards</h3><Cards items={d.training} /></div>
        <div><h3>Certifications</h3><Cards items={d.certs} /></div>
      </div></section>

      <section id="contact" className="contact"><div className="wrap">
        <h2>Let’s work on software quality together</h2>
        <p>I’m open to QA, test automation and quality-focused roles. Send me a message and I’ll reply promptly.</p>
        <div className="btns">
          <a className="btn primary" href={`mailto:${p.email}`}>{p.email}</a>
          <a className="btn ghost" href={`tel:${p.phone.replace(/\s/g, '')}`}>{p.phone}</a>
          <a className="btn ghost" href={p.github} rel="noopener">GitHub</a>
          <a className="btn ghost" href={p.linkedin} rel="noopener">LinkedIn</a>
        </div>
        <div className="refs"><div><strong>References</strong>Available on request.</div></div>
      </div></section>
      <footer className="end"><div className="wrap">© 2026 {p.name} · Anuradhapura, Sri Lanka</div></footer>
    </>
  )
}
