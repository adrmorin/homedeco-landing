import React, { useEffect, useRef, useState } from "react";
import { projects, gallery as galleryRaw, steps } from "./data.js";

const asset = (f) => `${import.meta.env.BASE_URL}images/${f}`;
const pad = (n) => (n < 10 ? "0" + n : "" + n);

export default function App({ phone = "+1 (754) 210-1105", autoplay = true }) {
  const [slide, setSlide] = useState(0);
  const [photo, setPhoto] = useState(0);
  const [playing, setPlaying] = useState(true);
  const heroRef = useRef(null);
  const heroGlowRef = useRef(null);

  const handleHeroMove = (e) => {
    const el = heroRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100).toFixed(2) + "%");
    el.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100).toFixed(2) + "%");
  };
  const handleHeroEnter = () => { if (heroGlowRef.current) heroGlowRef.current.style.opacity = "1"; };
  const handleHeroLeave = () => { if (heroGlowRef.current) heroGlowRef.current.style.opacity = "0"; };

  // Autoplay: advances through the photos of the current project (before -> after), then stops.
  useEffect(() => {
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !autoplay || !playing) return;
    const t = setInterval(() => {
      const n = projects[slide].photos.length;
      if (photo < n - 1) setPhoto(photo + 1);
      else setPlaying(false);
    }, 3200);
    return () => clearInterval(t);
  }, [slide, photo, playing, autoplay]);

  const go = (i) => {
    const n = projects.length;
    setSlide((i + n) % n);
    setPhoto(0);
    setPlaying(true);
  };

  const pr = projects[slide];
  const slideNo = pad(slide + 1);
  const slideTotal = pad(projects.length);
  const name = pr.name;
  const desc = pr.desc;
  const stageLabel = pr.photos[photo].label;
  const prev = () => go(slide - 1);
  const next = () => go(slide + 1);
  const dots = projects.map((p, i) => ({
    aria: "Go to " + p.name,
    w: i === slide ? 22 : 6,
    bg: i === slide ? "#274962" : "#B9C4CC",
    go: () => go(i),
  }));
  const photos = pr.photos.map((ph, i) => ({
    src: asset(ph.src),
    label: ph.label,
    alt: pr.name + " - " + ph.label,
    aria: "Show photo " + (i + 1) + " of " + pr.photos.length + ": " + ph.label,
    op: i === photo ? 1 : 0,
    top: i === photo ? 1 : 0.6,
    ring: i === photo ? "2px solid #C9A66B" : "2px solid transparent",
    pick: () => { setPhoto(i); setPlaying(false); },
  }));
  const gallery = galleryRaw.map((g) => ({ ...g, src: asset(g.src) }));

  return (
<div style={{"width":"100%","background":"#FAF6F1","color":"#14202B","fontFamily":"'Inter',system-ui,sans-serif","overflow":"hidden"}}>


<section ref={heroRef} onMouseMove={handleHeroMove} onMouseEnter={handleHeroEnter} onMouseLeave={handleHeroLeave} style={{"position":"relative","background":"linear-gradient(135deg,#14202B 0%,#12343B 55%,#0E4850 100%)","color":"#FFFFFF","--mx":"50%","--my":"40%"}}>
<div ref={heroGlowRef} aria-hidden="true" style={{"position":"absolute","inset":"0","zIndex":"0","pointerEvents":"none","opacity":"0","transition":"opacity .4s ease","background":"radial-gradient(480px circle at var(--mx) var(--my),rgba(79,209,222,.32),rgba(79,209,222,.14) 40%,transparent 70%)"}}></div>
<header style={{"position":"relative","zIndex":"1","maxWidth":"1240px","margin":"0 auto","padding":"28px 32px","boxSizing":"border-box","display":"flex","flexWrap":"wrap","alignItems":"center","justifyContent":"space-between","gap":"16px"}}>
<div style={{"display":"flex","flexDirection":"column","alignItems":"center","textAlign":"center","gap":"6px"}}><img src={asset("logo-on-dark.svg")} alt="HOMEDECO" style={{"height":"38px","width":"auto","display":"block"}} /><span style={{"fontFamily":"'Cormorant Garamond',Georgia,serif","fontStyle":"italic","fontWeight":"400","color":"#C9A66B","fontSize":"15px","lineHeight":"18px","letterSpacing":".5px"}}>Luxury, shaped by light.</span></div>
<a className="btn-ghost" href="tel:+17542101105" style={{"display":"inline-flex","alignItems":"center","gap":"10px","minHeight":"48px","padding":"0 24px","boxSizing":"border-box","border":"1px solid #C9A66B","color":"#FFFFFF","fontFamily":"'Montserrat',sans-serif","fontWeight":"600","fontSize":"14px","letterSpacing":"2px","textTransform":"uppercase","textDecoration":"none"}}>
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A66B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>
{phone}
</a>
</header>
<div style={{"position":"relative","zIndex":"1","maxWidth":"1240px","margin":"0 auto","padding":"48px 32px 96px","boxSizing":"border-box","display":"flex","flexWrap":"wrap","alignItems":"center","gap":"64px"}}>
<div style={{"flex":"1 1 460px","minWidth":"0","display":"flex","flexDirection":"column","gap":"28px"}}>
<div style={{"display":"flex","alignItems":"center","gap":"16px"}}>
<span style={{"width":"48px","height":"1px","background":"#C9A66B","display":"block"}}></span>
<span style={{"fontFamily":"'Montserrat',sans-serif","fontWeight":"600","fontSize":"12px","lineHeight":"16px","letterSpacing":"3px","textTransform":"uppercase","color":"#C9A66B"}}>Luxury, shaped by light.</span>
</div>
<h1 style={{"margin":"0","fontFamily":"'Cormorant Garamond',Georgia,serif","fontWeight":"300","fontSize":"clamp(52px,7.5vw,92px)","lineHeight":"0.98","letterSpacing":"-0.5px","color":"#FFFFFF"}}>Walls that <em style={{"fontStyle":"italic","fontWeight":"400","color":"#C9A66B"}}>glow.</em><br />Rooms that stay with you.</h1>
<p style={{"margin":"0","fontSize":"18px","lineHeight":"30px","color":"#EEF2F5","maxWidth":"500px"}}>Backlit stone, living green and wood, gold and black finishes, sculpted LED ceilings. HOMEDECO designs and installs the details that make a space feel unmistakably yours.</p>
<div style={{"display":"flex","flexWrap":"wrap","alignItems":"center","gap":"20px","marginTop":"8px"}}>
<a className="btn-cta btn-pulse" href="tel:+17542101105" style={{"display":"inline-flex","alignItems":"center","gap":"12px","minHeight":"58px","padding":"0 36px","boxSizing":"border-box","background":"#EC268F","color":"#FFFFFF","fontFamily":"'Montserrat',sans-serif","fontWeight":"700","fontSize":"19px","textDecoration":"none"}}>
<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>
Call to schedule a visit
</a>
<span style={{"fontSize":"16px","lineHeight":"24px","color":"#EEF2F5"}}>{phone}</span>
<div style={{"display":"flex","alignItems":"center","gap":"16px","paddingLeft":"20px","borderLeft":"1px solid #C9A66B"}}>
<div className="qr-box" style={{"background":"#FFFFFF","padding":"8px","lineHeight":"0","border":"1px solid #C9A66B"}}><svg viewBox="0 0 49 49" width="96" height="96" role="img" aria-label="QR code that saves the HOMEDECO LLC contact with its phone number" shapeRendering="crispEdges"><rect width="49" height="49" fill="#FFFFFF"/><path stroke="#14202B" d="M2 2.5h7m1 0h4m1 0h1m2 0h1m1 0h1m1 0h1m3 0h1m1 0h1m2 0h2m1 0h1m3 0h1m1 0h7m-45 1h1m5 0h1m3 0h1m1 0h2m1 0h3m1 0h1m3 0h2m1 0h2m1 0h2m1 0h1m2 0h1m2 0h1m5 0h1m-45 1h1m1 0h3m1 0h1m4 0h1m1 0h2m1 0h2m2 0h1m1 0h4m1 0h2m1 0h4m1 0h1m2 0h1m1 0h3m1 0h1m-45 1h1m1 0h3m1 0h1m1 0h3m1 0h1m3 0h1m4 0h4m3 0h3m2 0h1m1 0h2m1 0h1m1 0h3m1 0h1m-45 1h1m1 0h3m1 0h1m1 0h1m3 0h7m1 0h8m2 0h1m1 0h5m1 0h1m1 0h3m1 0h1m-45 1h1m5 0h1m1 0h2m3 0h1m1 0h2m1 0h3m3 0h1m2 0h1m1 0h1m1 0h3m4 0h1m5 0h1m-45 1h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7m-37 1h1m1 0h4m1 0h1m4 0h1m3 0h1m1 0h1m2 0h2m2 0h2m-35 1h1m3 0h1m1 0h4m1 0h1m2 0h2m2 0h8m5 0h3m2 0h6m2 0h1m-44 1h2m4 0h3m1 0h4m2 0h3m1 0h1m1 0h4m1 0h3m2 0h1m1 0h4m1 0h5m-45 1h4m1 0h3m1 0h2m1 0h2m2 0h1m1 0h1m6 0h2m7 0h1m1 0h3m2 0h1m1 0h1m-44 1h1m2 0h1m1 0h1m4 0h5m3 0h3m1 0h1m2 0h1m1 0h3m3 0h1m1 0h1m8 0h1m-45 1h1m1 0h1m2 0h3m2 0h3m1 0h1m1 0h4m4 0h4m2 0h1m1 0h4m1 0h2m3 0h3m-44 1h1m5 0h7m2 0h1m1 0h1m4 0h2m1 0h1m1 0h1m1 0h2m4 0h1m1 0h3m2 0h2m-43 1h3m1 0h2m1 0h2m1 0h1m1 0h1m1 0h1m1 0h1m1 0h2m8 0h2m4 0h1m2 0h1m1 0h3m-44 1h2m5 0h2m1 0h5m1 0h1m1 0h1m3 0h1m3 0h1m1 0h2m5 0h1m1 0h1m1 0h2m2 0h1m-44 1h2m3 0h2m6 0h6m4 0h1m2 0h2m4 0h3m1 0h1m1 0h2m2 0h2m-42 1h1m1 0h1m9 0h1m2 0h3m1 0h2m3 0h6m3 0h2m1 0h2m2 0h1m-39 1h6m2 0h2m7 0h1m1 0h1m1 0h1m1 0h1m3 0h1m1 0h1m2 0h1m5 0h1m-43 1h1m1 0h2m1 0h1m3 0h4m4 0h2m2 0h2m1 0h1m1 0h10m3 0h1m3 0h2m-41 1h6m1 0h3m3 0h2m1 0h6m1 0h1m3 0h2m1 0h7m1 0h1m1 0h1m-45 1h1m2 0h2m3 0h1m1 0h1m1 0h1m5 0h1m1 0h1m3 0h1m1 0h2m1 0h2m1 0h1m2 0h2m3 0h5m-45 1h2m2 0h1m1 0h1m1 0h2m2 0h1m1 0h2m2 0h1m1 0h1m1 0h1m1 0h2m3 0h1m5 0h2m1 0h1m1 0h1m2 0h1m-44 1h2m1 0h2m3 0h1m1 0h2m4 0h3m1 0h1m3 0h1m2 0h2m4 0h4m3 0h1m2 0h1m-43 1h1m1 0h6m2 0h1m1 0h2m1 0h2m1 0h6m2 0h1m2 0h1m1 0h1m1 0h7m1 0h1m1 0h1m-43 1h1m1 0h1m4 0h3m1 0h1m1 0h2m1 0h2m1 0h3m1 0h9m4 0h1m2 0h4m-45 1h4m1 0h2m5 0h4m4 0h1m2 0h1m2 0h1m2 0h1m1 0h5m7 0h1m-44 1h1m1 0h2m3 0h2m3 0h4m3 0h1m1 0h3m1 0h1m1 0h2m4 0h1m1 0h4m5 0h1m-45 1h2m2 0h1m1 0h5m1 0h2m3 0h2m1 0h2m2 0h1m1 0h2m1 0h2m1 0h3m2 0h1m4 0h1m1 0h1m-45 1h2m5 0h1m3 0h1m3 0h1m2 0h3m3 0h1m1 0h2m2 0h2m5 0h1m1 0h1m3 0h2m-45 1h3m1 0h3m1 0h1m3 0h1m10 0h1m4 0h2m2 0h1m2 0h1m1 0h1m2 0h2m1 0h1m-44 1h4m1 0h1m1 0h1m1 0h1m1 0h3m1 0h4m10 0h1m1 0h1m1 0h5m1 0h1m3 0h2m-45 1h1m2 0h2m1 0h1m2 0h4m2 0h2m2 0h3m1 0h1m1 0h2m2 0h1m2 0h1m3 0h1m3 0h1m1 0h1m-43 1h2m1 0h3m2 0h2m2 0h4m1 0h1m1 0h1m1 0h1m2 0h1m1 0h1m2 0h3m1 0h1m3 0h2m2 0h4m-41 1h1m1 0h2m5 0h2m1 0h1m1 0h1m3 0h1m1 0h1m4 0h1m2 0h3m2 0h1m1 0h1m3 0h1m-43 1h4m4 0h1m1 0h1m1 0h1m1 0h1m2 0h2m1 0h3m1 0h1m1 0h10m2 0h1m1 0h1m2 0h1m-45 1h1m2 0h2m1 0h1m5 0h3m3 0h8m1 0h1m2 0h4m2 0h6m1 0h2m-37 1h1m2 0h2m2 0h1m3 0h2m3 0h1m1 0h7m3 0h1m3 0h5m-45 1h7m1 0h5m1 0h2m1 0h1m2 0h1m1 0h1m1 0h1m4 0h1m6 0h1m1 0h1m1 0h1m1 0h2m-44 1h1m5 0h1m2 0h1m1 0h1m2 0h4m1 0h2m3 0h5m5 0h1m1 0h1m3 0h1m2 0h1m-44 1h1m1 0h3m1 0h1m1 0h1m1 0h1m2 0h5m1 0h7m1 0h1m1 0h2m1 0h1m3 0h5m1 0h1m-43 1h1m1 0h3m1 0h1m2 0h6m2 0h1m1 0h2m2 0h5m1 0h4m2 0h1m2 0h1m3 0h1m-43 1h1m1 0h3m1 0h1m3 0h5m1 0h1m2 0h4m2 0h3m1 0h1m1 0h5m4 0h1m1 0h2m-44 1h1m5 0h1m4 0h3m2 0h1m2 0h3m1 0h1m3 0h4m2 0h1m2 0h2m-38 1h7m1 0h2m1 0h1m1 0h2m3 0h3m1 0h3m2 0h1m3 0h10m1 0h1m1 0h1"/></svg></div>
<div style={{"display":"flex","flexDirection":"column","gap":"4px","maxWidth":"150px"}}>
<span style={{"fontFamily":"'Montserrat',sans-serif","fontWeight":"600","fontSize":"11px","lineHeight":"16px","letterSpacing":"2px","textTransform":"uppercase","color":"#C9A66B"}}>Scan to save</span>
<span style={{"fontSize":"14px","lineHeight":"20px","color":"#EEF2F5"}}>Add our number to your contacts</span>
</div>
</div>
</div>
</div>
<div style={{"position":"relative","flex":"1 1 380px","minWidth":"0","maxWidth":"520px","margin":"0 auto"}}>
<div style={{"position":"absolute","top":"-20px","right":"-20px","left":"20px","bottom":"20px","border":"1px solid #C9A66B","borderRadius":"999px 999px 0 0"}}></div>
<img src={asset("hero.jpg")} alt="Turquoise organic-cutout partition wall in a hotel lobby lounge" style={{"position":"relative","display":"block","width":"100%","aspectRatio":"3/4","objectFit":"cover","borderRadius":"999px 999px 0 0"}} />
</div>
</div>
</section>


<section style={{"background":"#FAF6F1","padding":"72px 32px 24px"}}>
<div style={{"maxWidth":"880px","margin":"0 auto","textAlign":"center","display":"flex","flexDirection":"column","alignItems":"center","gap":"20px"}}>
<span style={{"width":"1px","height":"48px","background":"#274962","display":"block"}}></span>
<p style={{"margin":"0","fontFamily":"'Cormorant Garamond',Georgia,serif","fontWeight":"400","fontSize":"clamp(26px,3.6vw,40px)","lineHeight":"1.25","color":"#274962"}}>Light, texture and natural materials, composed with the precision of a private residence and the drama of a grand hotel lobby.</p>
</div>
</section>


<section style={{"background":"#FAF6F1","padding":"72px 0 96px"}}>
<div style={{"maxWidth":"1240px","margin":"0 auto","padding":"0 32px","boxSizing":"border-box","display":"flex","flexDirection":"column","gap":"48px"}}>
<div style={{"display":"flex","flexDirection":"column","gap":"16px","maxWidth":"720px"}}>
<div style={{"display":"flex","alignItems":"center","gap":"16px"}}>
<span style={{"width":"48px","height":"1px","background":"#274962","display":"block"}}></span>
<span style={{"fontFamily":"'Montserrat',sans-serif","fontWeight":"600","fontSize":"12px","lineHeight":"16px","letterSpacing":"3px","textTransform":"uppercase","color":"#274962"}}>The Collection</span>
</div>
<h2 style={{"margin":"0","fontFamily":"'Cormorant Garamond',Georgia,serif","fontWeight":"300","fontSize":"clamp(40px,5.5vw,64px)","lineHeight":"1.02","color":"#274962"}}>From first visit to <em style={{"fontStyle":"italic","fontWeight":"400"}}>final light</em></h2>
</div>
<div style={{"display":"flex","flexWrap":"wrap","gap":"48px","alignItems":"stretch"}}>
<div style={{"flex":"1 1 300px","minWidth":"0","display":"flex","flexDirection":"column","justifyContent":"space-between","gap":"32px"}}>
<div style={{"display":"flex","flexDirection":"column","gap":"20px"}}>
<div style={{"fontFamily":"'Cormorant Garamond',Georgia,serif","fontWeight":"300","fontSize":"22px","lineHeight":"1","color":"#274962","letterSpacing":"2px"}}>{slideNo} <span style={{"opacity":".5"}}>/ {slideTotal}</span></div>
<h3 style={{"margin":"0","fontFamily":"'Cormorant Garamond',Georgia,serif","fontWeight":"400","fontSize":"clamp(36px,4.2vw,52px)","lineHeight":"1.04","color":"#14202B"}}>{name}</h3>
<p style={{"margin":"0","fontSize":"17px","lineHeight":"28px","color":"#14202B","maxWidth":"380px"}}>{desc}</p>
</div>
<div style={{"display":"flex","flexDirection":"column","gap":"20px"}}>
<div style={{"display":"flex","alignItems":"center","gap":"12px"}}>
<button className="car-btn" type="button" aria-label="Previous project" onClick={prev} style={{"width":"52px","height":"52px","borderRadius":"50%","border":"1px solid #274962","background":"transparent","color":"#274962","cursor":"pointer","display":"inline-flex","alignItems":"center","justifyContent":"center","padding":"0"}}>
<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>
</button>
<button className="car-btn" type="button" aria-label="Next project" onClick={next} style={{"width":"52px","height":"52px","borderRadius":"50%","border":"1px solid #274962","background":"transparent","color":"#274962","cursor":"pointer","display":"inline-flex","alignItems":"center","justifyContent":"center","padding":"0"}}>
<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>
</button>
</div>
<div style={{"display":"flex","flexWrap":"wrap","alignItems":"center"}}>
{dots.map((d,i)=>(<React.Fragment key={i}>
<button type="button" aria-label={d.aria} onClick={d.go} style={{"width":"26px","height":"44px","border":"0","background":"transparent","padding":"0","cursor":"pointer","display":"inline-flex","alignItems":"center","justifyContent":"center"}}><span style={{"display":"block","width":`${d.w}px`,"height":"6px","borderRadius":"3px","background":d.bg,"transition":"width .3s ease,background .3s ease"}}></span></button>
</React.Fragment>))}
</div>
</div>
</div>
<div style={{"flex":"2 1 480px","minWidth":"0","display":"flex","flexDirection":"column","gap":"16px"}}>
<div style={{"position":"relative","width":"100%","aspectRatio":"5/4","background":"#EEF2F5","overflow":"hidden"}}>
{photos.map((p,i)=>(<React.Fragment key={i}>
<img src={p.src} alt={p.alt} style={{"position":"absolute","inset":"0","width":"100%","height":"100%","objectFit":"cover","display":"block","transition":"opacity .9s ease","opacity":p.op}} />
</React.Fragment>))}
<div style={{"position":"absolute","left":"16px","top":"16px","display":"inline-flex","alignItems":"center","gap":"8px","padding":"8px 14px","background":"rgba(20,32,43,.85)","color":"#FFFFFF","fontFamily":"'Montserrat',sans-serif","fontWeight":"600","fontSize":"12px","lineHeight":"16px","letterSpacing":"2px","textTransform":"uppercase"}}><span style={{"width":"8px","height":"8px","borderRadius":"50%","background":"#C9A66B","display":"block"}}></span>{stageLabel}</div>
</div>
<div style={{"display":"flex","gap":"12px"}}>
{photos.map((p,i)=>(<React.Fragment key={i}>
<button type="button" aria-label={p.aria} onClick={p.pick} style={{"flex":"1 1 0","minWidth":"0","border":"0","background":"transparent","padding":"0","cursor":"pointer","display":"flex","flexDirection":"column","gap":"8px","textAlign":"left","opacity":p.top,"transition":"opacity .3s ease"}}>
<span style={{"display":"block","width":"100%","aspectRatio":"4/3","overflow":"hidden","outline":p.ring,"outlineOffset":"2px"}}><img src={p.src} alt="" style={{"width":"100%","height":"100%","objectFit":"cover","display":"block"}} /></span>
<span style={{"fontFamily":"'Montserrat',sans-serif","fontWeight":"600","fontSize":"11px","lineHeight":"14px","letterSpacing":"2px","textTransform":"uppercase","color":"#274962"}}>{p.label}</span>
</button>
</React.Fragment>))}
</div>
</div>
</div>
</div>
</section>


<section style={{"background":"#FAF6F1","lineHeight":"0","overflow":"hidden"}}><svg aria-hidden="true" viewBox="0 0 1200 120" preserveAspectRatio="xMidYMax slice" style={{"display":"block","width":"100%","height":"120px"}}><rect className="slat" x="4" y="0" width="12" height="120" rx="2" fill="#274962" style={{"animationDelay":"-0.00s"}}/><rect className="slat" x="24" y="0" width="12" height="120" rx="2" fill="#274962" style={{"animationDelay":"-0.11s"}}/><rect className="slat" x="44" y="0" width="12" height="120" rx="2" fill="#274962" style={{"animationDelay":"-0.22s"}}/><rect className="slat" x="64" y="0" width="12" height="120" rx="2" fill="#C9A66B" style={{"animationDelay":"-0.33s"}}/><rect className="slat" x="84" y="0" width="12" height="120" rx="2" fill="#274962" style={{"animationDelay":"-0.44s"}}/><rect className="slat" x="104" y="0" width="12" height="120" rx="2" fill="#274962" style={{"animationDelay":"-0.55s"}}/><rect className="slat" x="124" y="0" width="12" height="120" rx="2" fill="#274962" style={{"animationDelay":"-0.66s"}}/><rect className="slat" x="144" y="0" width="12" height="120" rx="2" fill="#274962" style={{"animationDelay":"-0.77s"}}/><rect className="slat" x="164" y="0" width="12" height="120" rx="2" fill="#274962" style={{"animationDelay":"-0.88s"}}/><rect className="slat" x="184" y="0" width="12" height="120" rx="2" fill="#274962" style={{"animationDelay":"-0.99s"}}/><rect className="slat" x="204" y="0" width="12" height="120" rx="2" fill="#C9A66B" style={{"animationDelay":"-1.10s"}}/><rect className="slat" x="224" y="0" width="12" height="120" rx="2" fill="#274962" style={{"animationDelay":"-1.21s"}}/><rect className="slat" x="244" y="0" width="12" height="120" rx="2" fill="#274962" style={{"animationDelay":"-1.32s"}}/><rect className="slat" x="264" y="0" width="12" height="120" rx="2" fill="#274962" style={{"animationDelay":"-1.43s"}}/><rect className="slat" x="284" y="0" width="12" height="120" rx="2" fill="#274962" style={{"animationDelay":"-1.54s"}}/><rect className="slat" x="304" y="0" width="12" height="120" rx="2" fill="#274962" style={{"animationDelay":"-1.65s"}}/><rect className="slat" x="324" y="0" width="12" height="120" rx="2" fill="#274962" style={{"animationDelay":"-1.76s"}}/><rect className="slat" x="344" y="0" width="12" height="120" rx="2" fill="#C9A66B" style={{"animationDelay":"-1.87s"}}/><rect className="slat" x="364" y="0" width="12" height="120" rx="2" fill="#274962" style={{"animationDelay":"-1.98s"}}/><rect className="slat" x="384" y="0" width="12" height="120" rx="2" fill="#274962" style={{"animationDelay":"-2.09s"}}/><rect className="slat" x="404" y="0" width="12" height="120" rx="2" fill="#274962" style={{"animationDelay":"-2.20s"}}/><rect className="slat" x="424" y="0" width="12" height="120" rx="2" fill="#274962" style={{"animationDelay":"-2.31s"}}/><rect className="slat" x="444" y="0" width="12" height="120" rx="2" fill="#274962" style={{"animationDelay":"-2.42s"}}/><rect className="slat" x="464" y="0" width="12" height="120" rx="2" fill="#274962" style={{"animationDelay":"-2.53s"}}/><rect className="slat" x="484" y="0" width="12" height="120" rx="2" fill="#C9A66B" style={{"animationDelay":"-2.64s"}}/><rect className="slat" x="504" y="0" width="12" height="120" rx="2" fill="#274962" style={{"animationDelay":"-2.75s"}}/><rect className="slat" x="524" y="0" width="12" height="120" rx="2" fill="#274962" style={{"animationDelay":"-2.86s"}}/><rect className="slat" x="544" y="0" width="12" height="120" rx="2" fill="#274962" style={{"animationDelay":"-2.97s"}}/><rect className="slat" x="564" y="0" width="12" height="120" rx="2" fill="#274962" style={{"animationDelay":"-3.08s"}}/><rect className="slat" x="584" y="0" width="12" height="120" rx="2" fill="#274962" style={{"animationDelay":"-3.19s"}}/><rect className="slat" x="604" y="0" width="12" height="120" rx="2" fill="#274962" style={{"animationDelay":"-3.30s"}}/><rect className="slat" x="624" y="0" width="12" height="120" rx="2" fill="#C9A66B" style={{"animationDelay":"-3.41s"}}/><rect className="slat" x="644" y="0" width="12" height="120" rx="2" fill="#274962" style={{"animationDelay":"-3.52s"}}/><rect className="slat" x="664" y="0" width="12" height="120" rx="2" fill="#274962" style={{"animationDelay":"-3.63s"}}/><rect className="slat" x="684" y="0" width="12" height="120" rx="2" fill="#274962" style={{"animationDelay":"-3.74s"}}/><rect className="slat" x="704" y="0" width="12" height="120" rx="2" fill="#274962" style={{"animationDelay":"-3.85s"}}/><rect className="slat" x="724" y="0" width="12" height="120" rx="2" fill="#274962" style={{"animationDelay":"-3.96s"}}/><rect className="slat" x="744" y="0" width="12" height="120" rx="2" fill="#274962" style={{"animationDelay":"-4.07s"}}/><rect className="slat" x="764" y="0" width="12" height="120" rx="2" fill="#C9A66B" style={{"animationDelay":"-4.18s"}}/><rect className="slat" x="784" y="0" width="12" height="120" rx="2" fill="#274962" style={{"animationDelay":"-4.29s"}}/><rect className="slat" x="804" y="0" width="12" height="120" rx="2" fill="#274962" style={{"animationDelay":"-4.40s"}}/><rect className="slat" x="824" y="0" width="12" height="120" rx="2" fill="#274962" style={{"animationDelay":"-4.51s"}}/><rect className="slat" x="844" y="0" width="12" height="120" rx="2" fill="#274962" style={{"animationDelay":"-4.62s"}}/><rect className="slat" x="864" y="0" width="12" height="120" rx="2" fill="#274962" style={{"animationDelay":"-4.73s"}}/><rect className="slat" x="884" y="0" width="12" height="120" rx="2" fill="#274962" style={{"animationDelay":"-4.84s"}}/><rect className="slat" x="904" y="0" width="12" height="120" rx="2" fill="#C9A66B" style={{"animationDelay":"-4.95s"}}/><rect className="slat" x="924" y="0" width="12" height="120" rx="2" fill="#274962" style={{"animationDelay":"-5.06s"}}/><rect className="slat" x="944" y="0" width="12" height="120" rx="2" fill="#274962" style={{"animationDelay":"-5.17s"}}/><rect className="slat" x="964" y="0" width="12" height="120" rx="2" fill="#274962" style={{"animationDelay":"-5.28s"}}/><rect className="slat" x="984" y="0" width="12" height="120" rx="2" fill="#274962" style={{"animationDelay":"-5.39s"}}/><rect className="slat" x="1004" y="0" width="12" height="120" rx="2" fill="#274962" style={{"animationDelay":"-5.50s"}}/><rect className="slat" x="1024" y="0" width="12" height="120" rx="2" fill="#274962" style={{"animationDelay":"-5.61s"}}/><rect className="slat" x="1044" y="0" width="12" height="120" rx="2" fill="#C9A66B" style={{"animationDelay":"-5.72s"}}/><rect className="slat" x="1064" y="0" width="12" height="120" rx="2" fill="#274962" style={{"animationDelay":"-5.83s"}}/><rect className="slat" x="1084" y="0" width="12" height="120" rx="2" fill="#274962" style={{"animationDelay":"-5.94s"}}/><rect className="slat" x="1104" y="0" width="12" height="120" rx="2" fill="#274962" style={{"animationDelay":"-6.05s"}}/><rect className="slat" x="1124" y="0" width="12" height="120" rx="2" fill="#274962" style={{"animationDelay":"-6.16s"}}/><rect className="slat" x="1144" y="0" width="12" height="120" rx="2" fill="#274962" style={{"animationDelay":"-6.27s"}}/><rect className="slat" x="1164" y="0" width="12" height="120" rx="2" fill="#274962" style={{"animationDelay":"-6.38s"}}/><rect className="slat" x="1184" y="0" width="12" height="120" rx="2" fill="#C9A66B" style={{"animationDelay":"-6.49s"}}/></svg></section>


<section style={{"background":"#14202B","padding":"96px 0"}}>
<div style={{"maxWidth":"1240px","margin":"0 auto","padding":"0 32px","boxSizing":"border-box","display":"flex","flexDirection":"column","gap":"56px"}}>
<div style={{"display":"flex","flexDirection":"column","gap":"16px","maxWidth":"680px"}}>
<div style={{"display":"flex","alignItems":"center","gap":"16px"}}>
<span style={{"width":"48px","height":"1px","background":"#C9A66B","display":"block"}}></span>
<span style={{"fontFamily":"'Montserrat',sans-serif","fontWeight":"600","fontSize":"12px","lineHeight":"16px","letterSpacing":"3px","textTransform":"uppercase","color":"#C9A66B"}}>Selected Work</span>
</div>
<h2 style={{"margin":"0","fontFamily":"'Cormorant Garamond',Georgia,serif","fontWeight":"300","fontSize":"clamp(40px,5.5vw,64px)","lineHeight":"1.02","color":"#FFFFFF"}}>A look at our <em style={{"fontStyle":"italic","color":"#C9A66B"}}>recent</em> projects</h2>
</div>
<div className="gallery">
{gallery.map((g,i)=>(<React.Fragment key={i}>
<div style={{"breakInside":"avoid","marginBottom":"16px"}}>
<img src={g.src} alt={g.alt} style={{"width":"100%","height":"auto","display":"block","borderRadius":"2px"}} />
</div>
</React.Fragment>))}
</div>
</div>
</section>


<section style={{"background":"#FAF6F1","padding":"96px 0"}}>
<div style={{"maxWidth":"1240px","margin":"0 auto","padding":"0 32px","boxSizing":"border-box","display":"flex","flexDirection":"column","gap":"56px"}}>
<div style={{"display":"flex","flexDirection":"column","gap":"16px","maxWidth":"680px"}}>
<div style={{"display":"flex","alignItems":"center","gap":"16px"}}>
<span style={{"width":"48px","height":"1px","background":"#274962","display":"block"}}></span>
<span style={{"fontFamily":"'Montserrat',sans-serif","fontWeight":"600","fontSize":"12px","lineHeight":"16px","letterSpacing":"3px","textTransform":"uppercase","color":"#274962"}}>The Process</span>
</div>
<h2 style={{"margin":"0","fontFamily":"'Cormorant Garamond',Georgia,serif","fontWeight":"300","fontSize":"clamp(40px,5.5vw,64px)","lineHeight":"1.02","color":"#274962"}}>From a phone call to a finished wall</h2>
</div>
<div style={{"display":"grid","gridTemplateColumns":"repeat(auto-fit,minmax(200px,1fr))","gap":"32px"}}>
{steps.map((s,i)=>(<React.Fragment key={i}>
<div style={{"borderTop":"1px solid #C9A66B","paddingTop":"20px","display":"flex","flexDirection":"column","gap":"10px"}}>
<span style={{"fontFamily":"'Cormorant Garamond',Georgia,serif","fontWeight":"300","fontSize":"56px","lineHeight":"1","color":"#274962"}}>{s.n}</span>
<h3 style={{"margin":"0","fontFamily":"'Montserrat',sans-serif","fontWeight":"700","fontSize":"14px","lineHeight":"20px","letterSpacing":"2px","textTransform":"uppercase","color":"#14202B"}}>{s.title}</h3>
<p style={{"margin":"0","fontSize":"16px","lineHeight":"26px","color":"#14202B"}}>{s.text}</p>
</div>
</React.Fragment>))}
</div>
</div>
</section>


<section style={{"background":"#FFFFFF","padding":"96px 0"}}>
<div style={{"maxWidth":"820px","margin":"0 auto","padding":"0 32px","boxSizing":"border-box","display":"flex","flexDirection":"column","gap":"40px"}}>
<h2 style={{"margin":"0","fontFamily":"'Cormorant Garamond',Georgia,serif","fontWeight":"300","fontSize":"clamp(40px,5.5vw,56px)","lineHeight":"1.05","color":"#274962"}}>Questions before you call</h2>
<div style={{"display":"flex","flexDirection":"column","borderTop":"1px solid #DDE4E9"}}>
<details style={{"borderBottom":"1px solid #DDE4E9","padding":"24px 0"}}>
<summary className="faq-q" style={{"fontFamily":"'Cormorant Garamond',Georgia,serif","fontWeight":"500","fontSize":"26px","lineHeight":"32px","color":"#14202B"}}>What happens during the visit?<span className="faq-ic" aria-hidden="true"><svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#274962" strokeWidth="1.6" strokeLinecap="round"><circle className="faq-ring" cx="14" cy="14" r="12.5"/><path className="faq-h" d="M8 14h12"/><path className="faq-v" d="M14 8v12"/></svg></span></summary>
<p style={{"margin":"14px 0 0","fontSize":"16px","lineHeight":"26px","color":"#14202B"}}>We look at the space, talk through your ideas and the finishes you like, and take the measurements needed to start designing.</p>
</details>
<details style={{"borderBottom":"1px solid #DDE4E9","padding":"24px 0"}}>
<summary className="faq-q" style={{"fontFamily":"'Cormorant Garamond',Georgia,serif","fontWeight":"500","fontSize":"26px","lineHeight":"32px","color":"#14202B"}}>Do you work on homes and businesses?<span className="faq-ic" aria-hidden="true"><svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#274962" strokeWidth="1.6" strokeLinecap="round"><circle className="faq-ring" cx="14" cy="14" r="12.5"/><path className="faq-h" d="M8 14h12"/><path className="faq-v" d="M14 8v12"/></svg></span></summary>
<p style={{"margin":"14px 0 0","fontSize":"16px","lineHeight":"26px","color":"#14202B"}}>Yes. Our portfolio includes residential rooms as well as lobbies, bars, conference rooms and other commercial spaces.</p>
</details>
<details style={{"borderBottom":"1px solid #DDE4E9","padding":"24px 0"}}>
<summary className="faq-q" style={{"fontFamily":"'Cormorant Garamond',Georgia,serif","fontWeight":"500","fontSize":"26px","lineHeight":"32px","color":"#14202B"}}>Which areas do you serve?<span className="faq-ic" aria-hidden="true"><svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#274962" strokeWidth="1.6" strokeLinecap="round"><circle className="faq-ring" cx="14" cy="14" r="12.5"/><path className="faq-h" d="M8 14h12"/><path className="faq-v" d="M14 8v12"/></svg></span></summary>
<p style={{"margin":"14px 0 0","fontSize":"16px","lineHeight":"26px","color":"#14202B"}}>Miami, Florida and surrounding South Florida areas. Call us and we will confirm whether we can visit your address.</p>
</details>
</div>
</div>
</section>


<section style={{"position":"relative","overflow":"hidden","background":"#274962","padding":"96px 32px"}}>
<svg aria-hidden="true" style={{"position":"absolute","inset":"0","width":"100%","height":"100%","zIndex":"0","pointerEvents":"none"}}><defs><pattern id="fish" width="60" height="30" patternUnits="userSpaceOnUse"><g fill="none" stroke="#C9A66B" strokeWidth="1"><circle cx="0" cy="0" r="28"/><circle cx="0" cy="0" r="20"/><circle cx="0" cy="0" r="12"/><circle cx="60" cy="0" r="28"/><circle cx="60" cy="0" r="20"/><circle cx="60" cy="0" r="12"/><circle cx="30" cy="30" r="28"/><circle cx="30" cy="30" r="20"/><circle cx="30" cy="30" r="12"/></g><animateTransform attributeName="patternTransform" type="translate" from="0 0" to="60 0" dur="16s" repeatCount="indefinite"/></pattern></defs><rect width="100%" height="100%" fill="url(#fish)" opacity=".3"/></svg>
<div style={{"position":"relative","zIndex":"1","background":"#274962","maxWidth":"960px","margin":"0 auto","border":"1px solid #C9A66B","padding":"72px 40px","boxSizing":"border-box","display":"flex","flexDirection":"column","alignItems":"center","textAlign":"center","gap":"28px"}}>
<h2 style={{"margin":"0","fontFamily":"'Cormorant Garamond',Georgia,serif","fontWeight":"300","fontSize":"clamp(40px,5.5vw,64px)","lineHeight":"1.02","color":"#FFFFFF"}}>Ready to see your space in a <em style={{"fontStyle":"italic","color":"#C9A66B"}}>new light?</em></h2>
<p style={{"margin":"0","fontSize":"18px","lineHeight":"30px","color":"#EEF2F5","maxWidth":"520px"}}>Give us a call and we will set up a visit that fits your schedule.</p>
<a className="btn-cta btn-pulse" href="tel:+17542101105" style={{"display":"inline-flex","alignItems":"center","gap":"12px","minHeight":"58px","padding":"0 36px","boxSizing":"border-box","background":"#EC268F","color":"#FFFFFF","fontFamily":"'Montserrat',sans-serif","fontWeight":"700","fontSize":"19px","textDecoration":"none"}}>
<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>
Call {phone}
</a>
<div className="qr-card" style={{"display":"flex","flexWrap":"wrap","alignItems":"center","justifyContent":"center","gap":"28px","marginTop":"16px","paddingTop":"36px","borderTop":"1px solid #C9A66B","width":"100%","maxWidth":"560px"}}>
<div className="qr-box" style={{"background":"#FFFFFF","padding":"14px","lineHeight":"0","border":"1px solid #C9A66B"}}><svg viewBox="0 0 49 49" width="168" height="168" role="img" aria-label="QR code that saves the HOMEDECO LLC contact with its phone number" shapeRendering="crispEdges"><rect width="49" height="49" fill="#FFFFFF"/><path stroke="#14202B" d="M2 2.5h7m1 0h4m1 0h1m2 0h1m1 0h1m1 0h1m3 0h1m1 0h1m2 0h2m1 0h1m3 0h1m1 0h7m-45 1h1m5 0h1m3 0h1m1 0h2m1 0h3m1 0h1m3 0h2m1 0h2m1 0h2m1 0h1m2 0h1m2 0h1m5 0h1m-45 1h1m1 0h3m1 0h1m4 0h1m1 0h2m1 0h2m2 0h1m1 0h4m1 0h2m1 0h4m1 0h1m2 0h1m1 0h3m1 0h1m-45 1h1m1 0h3m1 0h1m1 0h3m1 0h1m3 0h1m4 0h4m3 0h3m2 0h1m1 0h2m1 0h1m1 0h3m1 0h1m-45 1h1m1 0h3m1 0h1m1 0h1m3 0h7m1 0h8m2 0h1m1 0h5m1 0h1m1 0h3m1 0h1m-45 1h1m5 0h1m1 0h2m3 0h1m1 0h2m1 0h3m3 0h1m2 0h1m1 0h1m1 0h3m4 0h1m5 0h1m-45 1h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7m-37 1h1m1 0h4m1 0h1m4 0h1m3 0h1m1 0h1m2 0h2m2 0h2m-35 1h1m3 0h1m1 0h4m1 0h1m2 0h2m2 0h8m5 0h3m2 0h6m2 0h1m-44 1h2m4 0h3m1 0h4m2 0h3m1 0h1m1 0h4m1 0h3m2 0h1m1 0h4m1 0h5m-45 1h4m1 0h3m1 0h2m1 0h2m2 0h1m1 0h1m6 0h2m7 0h1m1 0h3m2 0h1m1 0h1m-44 1h1m2 0h1m1 0h1m4 0h5m3 0h3m1 0h1m2 0h1m1 0h3m3 0h1m1 0h1m8 0h1m-45 1h1m1 0h1m2 0h3m2 0h3m1 0h1m1 0h4m4 0h4m2 0h1m1 0h4m1 0h2m3 0h3m-44 1h1m5 0h7m2 0h1m1 0h1m4 0h2m1 0h1m1 0h1m1 0h2m4 0h1m1 0h3m2 0h2m-43 1h3m1 0h2m1 0h2m1 0h1m1 0h1m1 0h1m1 0h1m1 0h2m8 0h2m4 0h1m2 0h1m1 0h3m-44 1h2m5 0h2m1 0h5m1 0h1m1 0h1m3 0h1m3 0h1m1 0h2m5 0h1m1 0h1m1 0h2m2 0h1m-44 1h2m3 0h2m6 0h6m4 0h1m2 0h2m4 0h3m1 0h1m1 0h2m2 0h2m-42 1h1m1 0h1m9 0h1m2 0h3m1 0h2m3 0h6m3 0h2m1 0h2m2 0h1m-39 1h6m2 0h2m7 0h1m1 0h1m1 0h1m1 0h1m3 0h1m1 0h1m2 0h1m5 0h1m-43 1h1m1 0h2m1 0h1m3 0h4m4 0h2m2 0h2m1 0h1m1 0h10m3 0h1m3 0h2m-41 1h6m1 0h3m3 0h2m1 0h6m1 0h1m3 0h2m1 0h7m1 0h1m1 0h1m-45 1h1m2 0h2m3 0h1m1 0h1m1 0h1m5 0h1m1 0h1m3 0h1m1 0h2m1 0h2m1 0h1m2 0h2m3 0h5m-45 1h2m2 0h1m1 0h1m1 0h2m2 0h1m1 0h2m2 0h1m1 0h1m1 0h1m1 0h2m3 0h1m5 0h2m1 0h1m1 0h1m2 0h1m-44 1h2m1 0h2m3 0h1m1 0h2m4 0h3m1 0h1m3 0h1m2 0h2m4 0h4m3 0h1m2 0h1m-43 1h1m1 0h6m2 0h1m1 0h2m1 0h2m1 0h6m2 0h1m2 0h1m1 0h1m1 0h7m1 0h1m1 0h1m-43 1h1m1 0h1m4 0h3m1 0h1m1 0h2m1 0h2m1 0h3m1 0h9m4 0h1m2 0h4m-45 1h4m1 0h2m5 0h4m4 0h1m2 0h1m2 0h1m2 0h1m1 0h5m7 0h1m-44 1h1m1 0h2m3 0h2m3 0h4m3 0h1m1 0h3m1 0h1m1 0h2m4 0h1m1 0h4m5 0h1m-45 1h2m2 0h1m1 0h5m1 0h2m3 0h2m1 0h2m2 0h1m1 0h2m1 0h2m1 0h3m2 0h1m4 0h1m1 0h1m-45 1h2m5 0h1m3 0h1m3 0h1m2 0h3m3 0h1m1 0h2m2 0h2m5 0h1m1 0h1m3 0h2m-45 1h3m1 0h3m1 0h1m3 0h1m10 0h1m4 0h2m2 0h1m2 0h1m1 0h1m2 0h2m1 0h1m-44 1h4m1 0h1m1 0h1m1 0h1m1 0h3m1 0h4m10 0h1m1 0h1m1 0h5m1 0h1m3 0h2m-45 1h1m2 0h2m1 0h1m2 0h4m2 0h2m2 0h3m1 0h1m1 0h2m2 0h1m2 0h1m3 0h1m3 0h1m1 0h1m-43 1h2m1 0h3m2 0h2m2 0h4m1 0h1m1 0h1m1 0h1m2 0h1m1 0h1m2 0h3m1 0h1m3 0h2m2 0h4m-41 1h1m1 0h2m5 0h2m1 0h1m1 0h1m3 0h1m1 0h1m4 0h1m2 0h3m2 0h1m1 0h1m3 0h1m-43 1h4m4 0h1m1 0h1m1 0h1m1 0h1m2 0h2m1 0h3m1 0h1m1 0h10m2 0h1m1 0h1m2 0h1m-45 1h1m2 0h2m1 0h1m5 0h3m3 0h8m1 0h1m2 0h4m2 0h6m1 0h2m-37 1h1m2 0h2m2 0h1m3 0h2m3 0h1m1 0h7m3 0h1m3 0h5m-45 1h7m1 0h5m1 0h2m1 0h1m2 0h1m1 0h1m1 0h1m4 0h1m6 0h1m1 0h1m1 0h1m1 0h2m-44 1h1m5 0h1m2 0h1m1 0h1m2 0h4m1 0h2m3 0h5m5 0h1m1 0h1m3 0h1m2 0h1m-44 1h1m1 0h3m1 0h1m1 0h1m1 0h1m2 0h5m1 0h7m1 0h1m1 0h2m1 0h1m3 0h5m1 0h1m-43 1h1m1 0h3m1 0h1m2 0h6m2 0h1m1 0h2m2 0h5m1 0h4m2 0h1m2 0h1m3 0h1m-43 1h1m1 0h3m1 0h1m3 0h5m1 0h1m2 0h4m2 0h3m1 0h1m1 0h5m4 0h1m1 0h2m-44 1h1m5 0h1m4 0h3m2 0h1m2 0h3m1 0h1m3 0h4m2 0h1m2 0h2m-38 1h7m1 0h2m1 0h1m1 0h2m3 0h3m1 0h3m2 0h1m3 0h10m1 0h1m1 0h1"/></svg></div>
<div style={{"display":"flex","flexDirection":"column","gap":"8px","textAlign":"left","maxWidth":"240px"}}>
<span style={{"fontFamily":"'Montserrat',sans-serif","fontWeight":"600","fontSize":"12px","lineHeight":"16px","letterSpacing":"3px","textTransform":"uppercase","color":"#C9A66B"}}>Scan to save</span>
<span style={{"fontFamily":"'Cormorant Garamond',Georgia,serif","fontWeight":"400","fontSize":"28px","lineHeight":"1.15","color":"#FFFFFF"}}>Our contact, in one scan</span>
<span style={{"fontSize":"15px","lineHeight":"24px","color":"#EEF2F5"}}>Point your phone camera at the code to add HOMEDECO LLC and our phone number to your contacts.</span>
</div>
</div>
</div>
</section>


<footer style={{"background":"#14202B","color":"#FFFFFF","padding":"56px 0"}}>
<div style={{"maxWidth":"1240px","margin":"0 auto","padding":"0 32px","boxSizing":"border-box","display":"flex","flexWrap":"wrap","alignItems":"center","justifyContent":"space-between","gap":"24px"}}>
<div style={{"display":"flex","flexDirection":"column","alignItems":"center","textAlign":"center","gap":"8px"}}><img src={asset("logo-on-dark.svg")} alt="HOMEDECO" style={{"height":"36px","width":"auto","display":"block"}} /><span style={{"fontFamily":"'Cormorant Garamond',Georgia,serif","fontStyle":"italic","fontWeight":"400","color":"#C9A66B","fontSize":"18px","lineHeight":"22px"}}>Luxury, shaped by light.</span></div>
<div style={{"display":"flex","flexDirection":"column","gap":"4px","fontSize":"14px","lineHeight":"20px","color":"#EEF2F5"}}>
<span>{phone}</span>
<span>Miami, Florida</span>
<span>© HOMEDECO LLC. All rights reserved.</span>
</div>
</div>
</footer>

</div>
  );
}
