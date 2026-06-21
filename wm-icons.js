// wm-icons.js — the world-model icon set (engraved celestial line-art, v2).
// One vocabulary for every surface: atlas, briefs, cards, rail.
// Reference register (Andrew's plates, 2026-06-10): layered depth at three
// scales (form / scene / dust), dual stroke weight, containment ring with an
// inner echo, alternating long-short rays, hatching on every curved volume,
// scatter-dot star fields, density falling off from the focal center.
(function(){
const I = {};
const NS = (w,h,inner)=>`<svg width="${w}" height="${w}" viewBox="0 0 ${h} ${h}">${inner}</svg>`;
// deterministic scatter (no Math.random — stable between renders)
const lcg = s=>{ let a=(s%2147483647)||7; return ()=>{ a=a*16807%2147483647; return a/2147483647; }; };
const dust = (n,x0,y0,x1,y1,c,seed=3,o=0.55)=>{ const r=lcg(seed); let s='';
  for(let i=0;i<n;i++){ s+=`<circle cx="${(x0+r()*(x1-x0)).toFixed(1)}" cy="${(y0+r()*(y1-y0)).toFixed(1)}" r="${(0.32+r()*0.5).toFixed(2)}" fill="${c}" opacity="${(o*(0.35+r()*0.65)).toFixed(2)}"/>`; } return s; };
const ticks = (cx,cy,r0,r1,n,c,w=0.6,o=0.75)=>{ let s='';
  for(let i=0;i<n;i++){ const a=i/n*Math.PI*2;
    s+=`<line x1="${(cx+Math.cos(a)*r0).toFixed(1)}" y1="${(cy+Math.sin(a)*r0).toFixed(1)}" x2="${(cx+Math.cos(a)*r1).toFixed(1)}" y2="${(cy+Math.sin(a)*r1).toFixed(1)}" stroke="${c}" stroke-width="${w}" opacity="${o}"/>`; } return s; };
const rays = (cx,cy,r0,rShort,rLong,n,c,w=0.75)=>{ let s='';
  for(let i=0;i<n;i++){ const a=i/n*Math.PI*2, L=i%2?rShort:rLong;
    s+=`<line x1="${(cx+Math.cos(a)*r0).toFixed(1)}" y1="${(cy+Math.sin(a)*r0).toFixed(1)}" x2="${(cx+Math.cos(a)*L).toFixed(1)}" y2="${(cy+Math.sin(a)*L).toFixed(1)}" stroke="${c}" stroke-width="${w}"/>`;
    if(i%4===0) s+=`<circle cx="${(cx+Math.cos(a)*(L+1.6)).toFixed(1)}" cy="${(cy+Math.sin(a)*(L+1.6)).toFixed(1)}" r="0.7" fill="${c}" opacity="0.8"/>`; } return s; };
const star4 = (cx,cy,r,c,w=0.8,fill=false)=>`<path d="M${cx} ${cy-r} L${cx+r*0.18} ${cy-r*0.18} L${cx+r} ${cy} L${cx+r*0.18} ${cy+r*0.18} L${cx} ${cy+r} L${cx-r*0.18} ${cy+r*0.18} L${cx-r} ${cy} L${cx-r*0.18} ${cy-r*0.18} Z" ${fill?`fill="${c}"`:`fill="none" stroke="${c}" stroke-width="${w}"`}/>`;

// ── hierarchy ──
I.sun = (sz=54,c='#E8C779')=>NS(sz,54,
  `<g class="rotr" style="animation-duration:200s">${ticks(27,27,24.6,26.3,40,c,0.55,0.6)}<circle cx="27" cy="27" r="23.8" fill="none" stroke="${c}" stroke-width="0.45" opacity="0.55"/></g>`
  +`<circle cx="27" cy="27" r="21.4" fill="none" stroke="${c}" stroke-width="0.5" stroke-dasharray="1 4" opacity="0.65"/>`
  +`<g class="rot" style="animation-duration:130s">${rays(27,27,15.3,19,22.6,24,c,0.7)}</g>`
  +`<circle cx="27" cy="27" r="12.5" fill="none" stroke="${c}" stroke-width="1.15"/>`
  +`<circle cx="27" cy="27" r="10.3" fill="none" stroke="${c}" stroke-width="0.45" stroke-dasharray="1 3" opacity="0.7"/>`
  // hatched lower hemisphere — light sourced from within
  +`<path d="M19.6 31 H34.4 M20.8 33.4 H33.2 M23 35.6 H31" stroke="${c}" stroke-width="0.45" opacity="0.6"/>`
  +`<circle cx="27" cy="27" r="3.2" fill="${c}" class="tw4" style="animation-duration:5s"/>`
  +dust(9,8,8,46,46,c,5,0.5));
I.moonToday = (sz=34,c='#C9A85C')=>NS(sz,34,
  `<circle cx="17" cy="17" r="15.2" fill="none" stroke="${c}" stroke-width="0.5" stroke-dasharray="1 3.4" opacity="0.6"/>`
  +`<circle cx="17" cy="17" r="13.2" fill="none" stroke="${c}" stroke-width="0.95"/>`
  +`<path d="M21 5.4 A13 13 0 0 1 21 28.6 A10 10 0 0 0 21 5.4" fill="${c}" opacity="0.85"/>`
  // hatching across the dark face of the disc
  +`<path d="M9.4 10.6 C7.6 14.4 7.6 19.6 9.4 23.4 M12.6 8 C10.2 13.2 10.2 20.8 12.6 26 M15.6 6.4 C12.8 12.4 12.8 21.6 15.6 27.6" fill="none" stroke="${c}" stroke-width="0.4" opacity="0.55"/>`
  +star4(7.5,13,2,c,0.55)+star4(11,21.5,1.5,c,0.5)
  +dust(5,3,3,31,31,c,9,0.55));
I.scales = (sz=34,c='#C9A85C')=>NS(sz,34,
  `<path d="M5 4 A16 16 0 0 1 29 4" fill="none" stroke="${c}" stroke-width="0.45" stroke-dasharray="1 3" opacity="0.6"/>`
  +`<line x1="17" y1="6.5" x2="17" y2="26.5" stroke="${c}" stroke-width="1"/>`
  +`<line x1="6" y1="9.5" x2="28" y2="9.5" stroke="${c}" stroke-width="1"/>`
  // dotted suspension chains with bead, hatched pans
  +`<line x1="6" y1="9.5" x2="6" y2="15" stroke="${c}" stroke-width="0.45" stroke-dasharray="0.8 1.6"/><line x1="28" y1="9.5" x2="28" y2="15" stroke="${c}" stroke-width="0.45" stroke-dasharray="0.8 1.6"/>`
  +`<path d="M2.5 15 A3.5 3.2 0 0 0 9.5 15 Z M24.5 15 A3.5 3.2 0 0 0 31.5 15 Z" fill="none" stroke="${c}" stroke-width="0.8"/>`
  +`<path d="M3.6 16.6 H8.4 M4.6 17.8 H7.4 M25.6 16.6 H30.4 M26.6 17.8 H29.4" stroke="${c}" stroke-width="0.4" opacity="0.65"/>`
  +star4(17,4,2.4,c,0.6)
  +`<line x1="11" y1="28" x2="23" y2="28" stroke="${c}" stroke-width="1"/><path d="M12.6 29.6 H21.4 M14.4 31 H19.6" stroke="${c}" stroke-width="0.45" opacity="0.6"/>`
  +`<circle cx="17" cy="9.5" r="1.2" fill="${c}"/>`);

// ── fields ──
I.gearAI = (sz=46,c='#E3BC5E')=>{ let t=''; for(let i=0;i<12;i++){ const a=i/12*Math.PI*2;
  t+=`<line x1="${23+Math.cos(a)*15}" y1="${23+Math.sin(a)*15}" x2="${23+Math.cos(a)*19.4}" y2="${23+Math.sin(a)*19.4}" stroke="${c}" stroke-width="1.9" opacity="0.85"/>`; }
  return NS(sz,46,
  `<circle cx="23" cy="23" r="21.6" fill="none" stroke="${c}" stroke-width="0.45" stroke-dasharray="0.8 3.4" opacity="0.55"/>`
  +`<g class="rot" style="animation-duration:90s">${t}<circle cx="23" cy="23" r="15" fill="none" stroke="${c}" stroke-width="1"/></g>`
  +`<circle cx="23" cy="23" r="9.2" fill="none" stroke="${c}" stroke-width="0.55" stroke-dasharray="1 3" opacity="0.85"/>`
  // astrolabe bar + sight ring
  +`<line x1="14.5" y1="23" x2="31.5" y2="23" stroke="${c}" stroke-width="0.5" opacity="0.8"/><circle cx="23" cy="23" r="4.4" fill="none" stroke="${c}" stroke-width="0.6"/>`
  +`<circle cx="23" cy="23" r="1.8" fill="${c}"/>`
  +star4(38.5,7.5,2.2,c,0.55)+dust(6,2,2,44,44,c,13,0.5)); };
I.crescentBeauty = (sz=46,c='#E08568')=>NS(sz,46,
  `<circle cx="23" cy="23" r="21.6" fill="none" stroke="${c}" stroke-width="0.45" stroke-dasharray="0.8 3.4" opacity="0.5"/>`
  +`<g class="rotr" style="animation-duration:140s">${[0,1,2,3,4,5].map(i=>{const a=i/6*Math.PI*2; return `<ellipse cx="${23+Math.cos(a)*16}" cy="${23+Math.sin(a)*16}" rx="4.2" ry="1.8" fill="none" stroke="${c}" stroke-width="0.55" transform="rotate(${(a*57.3+90).toFixed(0)} ${(23+Math.cos(a)*16).toFixed(1)} ${(23+Math.sin(a)*16).toFixed(1)})" opacity="0.75"/><circle cx="${(23+Math.cos(a+0.52)*16).toFixed(1)}" cy="${(23+Math.sin(a+0.52)*16).toFixed(1)}" r="0.65" fill="${c}" opacity="0.7"/>`;}).join('')}</g>`
  +`<circle cx="23" cy="23" r="9.5" fill="none" stroke="${c}" stroke-width="1"/>`
  +`<path d="M26 15.5 A9 9 0 1 0 26 30.5 A7 7 0 1 1 26 15.5" fill="${c}" opacity="0.75"/>`
  // hatch the dark face
  +`<path d="M17 19 C16 21.4 16 24.6 17 27 M19.6 16.6 C18.2 20 18.2 26 19.6 29.4" fill="none" stroke="${c}" stroke-width="0.4" opacity="0.6"/>`
  +star4(23,7.5,1.7,c,0.5)+dust(5,3,28,20,44,c,17,0.5));
I.globeWorld = (sz=46,c='#7FAEE8')=>NS(sz,46,
  ticks(23,23,20.3,21.8,28,c,0.5,0.5)
  +`<circle cx="23" cy="23" r="16" fill="none" stroke="${c}" stroke-width="1"/>`
  +`<ellipse cx="23" cy="23" rx="16" ry="6.5" fill="none" stroke="${c}" stroke-width="0.55" opacity="0.8"/><ellipse cx="23" cy="23" rx="6.5" ry="16" fill="none" stroke="${c}" stroke-width="0.55" opacity="0.8"/><ellipse cx="23" cy="23" rx="12" ry="15" fill="none" stroke="${c}" stroke-width="0.35" opacity="0.45"/>`
  +`<line x1="7" y1="23" x2="39" y2="23" stroke="${c}" stroke-width="0.45" opacity="0.7"/>`
  // terminator hatching on the eastern limb
  +`<path d="M33.5 12.5 C36.6 18 36.6 28 33.5 33.5 M30.5 9.8 C34.8 16.6 34.8 29.4 30.5 36.2" fill="none" stroke="${c}" stroke-width="0.4" opacity="0.5"/>`
  +`<g class="rot" style="animation-duration:120s"><circle cx="23" cy="5.4" r="1.7" fill="${c}"/><circle cx="23" cy="5.4" r="3" fill="none" stroke="${c}" stroke-width="0.35" opacity="0.6"/></g>`
  +`<circle cx="23" cy="23" r="2" fill="${c}"/>`
  +star4(5.5,8,2,c,0.5)+dust(5,28,2,45,16,c,21,0.5));
I.boughCareer = (sz=46,c='#6FCDB4')=>NS(sz,46,
  `<circle cx="23" cy="23" r="21.6" fill="none" stroke="${c}" stroke-width="0.45" stroke-dasharray="0.8 3.4" opacity="0.5"/>`
  +`<path d="M23 41 V26 M23 26 L12.5 14.5 M23 26 L33.5 14.5 M12.5 14.5 L8 10 M12.5 14.5 L16 8.5 M33.5 14.5 L30 8.5 M33.5 14.5 L38 10 M23 33 L18.5 29.5 M23 36 L27 33" fill="none" stroke="${c}" stroke-width="0.95"/>`
  // hatched ground swell + root dots
  +`<path d="M12 41.5 C18 39.5 28 39.5 34 41.5 M15 43.6 C20 42.2 26 42.2 31 43.6" fill="none" stroke="${c}" stroke-width="0.45" opacity="0.65"/>`
  +`<circle cx="11" cy="44" r="0.6" fill="${c}" opacity="0.7"/><circle cx="35.5" cy="44" r="0.6" fill="${c}" opacity="0.7"/>`
  +`<circle cx="8" cy="10" r="1.8" fill="${c}"/><circle cx="16" cy="8.5" r="1.8" fill="none" stroke="${c}" stroke-width="0.7"/><circle cx="30" cy="8.5" r="1.8" fill="none" stroke="${c}" stroke-width="0.7"/><circle cx="38" cy="10" r="1.8" fill="${c}"/>`
  +`<circle class="tw4" cx="23" cy="26" r="2.2" fill="${c}"/>`
  +star4(23,4.5,2,c,0.55)+dust(5,4,16,12,34,c,25,0.5));
I.dieGaming = (sz=46,c='#B79BE8')=>NS(sz,46,
  `<circle cx="23" cy="23" r="21.6" fill="none" stroke="${c}" stroke-width="0.45" stroke-dasharray="0.8 3.4" opacity="0.5"/>`
  +`<g class="rotr" style="animation-duration:180s"><polygon points="23,6.5 36.5,14.7 36.5,31.3 23,39.5 9.5,31.3 9.5,14.7" fill="none" stroke="${c}" stroke-width="1"/><circle cx="23" cy="6.5" r="0.8" fill="${c}"/><circle cx="36.5" cy="14.7" r="0.8" fill="${c}"/><circle cx="36.5" cy="31.3" r="0.8" fill="${c}"/><circle cx="23" cy="39.5" r="0.8" fill="${c}"/><circle cx="9.5" cy="31.3" r="0.8" fill="${c}"/><circle cx="9.5" cy="14.7" r="0.8" fill="${c}"/></g>`
  +`<polygon points="23,13 31,17.8 31,27.2 23,32 15,27.2 15,17.8" fill="none" stroke="${c}" stroke-width="0.55" opacity="0.8"/>`
  // facet hatching, lower-right face
  +`<path d="M25 29.5 L29.5 26.8 M24.4 31.2 L28 29" stroke="${c}" stroke-width="0.4" opacity="0.55"/>`
  +`<circle cx="19.5" cy="20" r="1.5" fill="${c}"/><circle cx="26.5" cy="20" r="1.5" fill="${c}"/><circle cx="23" cy="25.5" r="1.5" fill="${c}"/>`
  +star4(40,40,2,c,0.5)+dust(5,2,2,16,14,c,29,0.5));

// ── epistemics ──
I.forecastStar = (c='#D8CDB4',sz=22)=>NS(sz,22,
  `<circle cx="11" cy="11" r="9.8" fill="none" stroke="${c}" stroke-width="0.4" stroke-dasharray="0.8 2.6" opacity="0.6"/>`
  +`<path d="M11 1.6 L12.7 9.3 L20.4 11 L12.7 12.7 L11 20.4 L9.3 12.7 L1.6 11 L9.3 9.3 Z" fill="none" stroke="${c}" stroke-width="0.85"/>`
  +`<path d="M5.2 5.2 L7.8 7.8 M16.8 5.2 L14.2 7.8 M16.8 16.8 L14.2 14.2 M5.2 16.8 L7.8 14.2" stroke="${c}" stroke-width="0.4" opacity="0.6"/>`
  +`<circle cx="11" cy="11" r="1.5" fill="${c}"/>`+dust(3,1,1,21,21,c,31,0.5));
I.novaHit = (c='#9FCB8E',sz=22)=>NS(sz,22,
  `<circle cx="11" cy="11" r="9.6" fill="none" stroke="${c}" stroke-width="0.45" stroke-dasharray="1 3"/>`
  +ticks(11,11,8.2,9.2,16,c,0.4,0.55)
  +`<path d="M11 2.8 L12.4 9.6 L19.2 11 L12.4 12.4 L11 19.2 L9.6 12.4 L2.8 11 L9.6 9.6 Z" fill="none" stroke="${c}" stroke-width="0.95"/>`
  +`<circle cx="11" cy="11" r="1.9" fill="${c}"/>`+dust(3,1,1,21,21,c,33,0.55));
I.beliefSeal = (c='#C9A85C',sz=22)=>NS(sz,22,
  `<circle cx="11" cy="11" r="9.2" fill="none" stroke="${c}" stroke-width="0.6" stroke-dasharray="1 3"/>`
  +`<path d="M11 1 V3.4 M11 18.6 V21 M1 11 H3.4 M18.6 11 H21" stroke="${c}" stroke-width="0.5" opacity="0.8"/>`
  +`<rect x="7.6" y="7.6" width="6.8" height="6.8" fill="none" stroke="${c}" stroke-width="0.9" transform="rotate(45 11 11)"/>`
  +`<rect x="9.3" y="9.3" width="3.4" height="3.4" fill="none" stroke="${c}" stroke-width="0.45" opacity="0.7" transform="rotate(45 11 11)"/>`
  +`<circle cx="11" cy="11" r="0.9" fill="${c}"/>`);
I.eyeObserve = (c='#C9A85C',sz=30)=>NS(sz,30,
  `<path d="M3 14.5 Q15 4.5 27 14.5 Q15 24.5 3 14.5 Z" fill="none" stroke="${c}" stroke-width="0.9"/>`
  +`<path d="M5 11.5 Q15 5.5 25 11.5" fill="none" stroke="${c}" stroke-width="0.4" opacity="0.6"/>`
  // lash hairlines radiating from the lower lid
  +`<path d="M7 19.6 L5.8 21.6 M11 21.4 L10.2 23.6 M15 22 L15 24.4 M19 21.4 L19.8 23.6 M23 19.6 L24.2 21.6" stroke="${c}" stroke-width="0.45" opacity="0.7"/>`
  +`<circle cx="15" cy="14.5" r="4.6" fill="none" stroke="${c}" stroke-width="0.5" opacity="0.75"/>`
  +`<path d="M15 10.8 L16 13.5 L18.7 14.5 L16 15.5 L15 18.2 L14 15.5 L11.3 14.5 L14 13.5 Z" fill="${c}"/>`
  +`<line x1="15" y1="25.4" x2="15" y2="27" stroke="${c}" stroke-width="0.5" stroke-dasharray="0.8 1.4"/><circle cx="15" cy="28.4" r="0.9" fill="${c}"/>`
  +dust(3,1,1,29,8,c,37,0.5));
I.hourglassRipe = (c='#C9A85C',sz=30)=>NS(sz,30,
  `<line x1="7" y1="4" x2="23" y2="4" stroke="${c}" stroke-width="1"/><line x1="7" y1="26" x2="23" y2="26" stroke="${c}" stroke-width="1"/>`
  +`<circle cx="6" cy="4" r="0.8" fill="${c}"/><circle cx="24" cy="4" r="0.8" fill="${c}"/><circle cx="6" cy="26" r="0.8" fill="${c}"/><circle cx="24" cy="26" r="0.8" fill="${c}"/>`
  +`<line x1="8.4" y1="4" x2="8.4" y2="26" stroke="${c}" stroke-width="0.4" opacity="0.55"/><line x1="21.6" y1="4" x2="21.6" y2="26" stroke="${c}" stroke-width="0.4" opacity="0.55"/>`
  +`<path d="M9.5 4 C9.5 11.5 14 12.8 15 15 C16 12.8 20.5 11.5 20.5 4 M9.5 26 C9.5 18.5 14 17.2 15 15 C16 17.2 20.5 18.5 20.5 26" fill="none" stroke="${c}" stroke-width="0.8"/>`
  +`<path d="M12 23.4 L15 18.6 L18 23.4 Z" fill="${c}" opacity="0.85"/><path d="M11.4 24.6 H18.6" stroke="${c}" stroke-width="0.4" opacity="0.6"/>`
  +`<path d="M13.6 8.4 L15 6.6 L16.4 8.4 Z" fill="${c}"/>`
  +`<circle cx="15" cy="12.2" r="0.45" fill="${c}"/><circle cx="15" cy="14" r="0.4" fill="${c}"/><circle cx="15" cy="16" r="0.45" fill="${c}"/>`);
I.handCommit = (c='#C9A85C',sz=30)=>{
  const hand = `<path d="M6.2 29 C5.4 24.6 6 20.8 8 17.6 M10.6 29 C10 25.6 10.2 22.4 11.6 19.6" fill="none" stroke="${c}" stroke-width="0.7"/>`
    +`<path d="M8 17.6 C8 15.4 8.7 13.4 9.9 12 M9.6 18.4 C9.8 16.2 10.6 14.4 11.8 13.2 M11.2 19.2 C11.6 17.2 12.5 15.7 13.6 14.7 M12.7 20.4 C13.3 18.7 14.2 17.4 15.2 16.6" fill="none" stroke="${c}" stroke-width="0.55"/>`;
  return NS(sz,30,
  // wisp ring circling the orb
  `<ellipse cx="15" cy="10.5" rx="9.5" ry="3.4" fill="none" stroke="${c}" stroke-width="0.4" stroke-dasharray="0.8 2" opacity="0.65" transform="rotate(-12 15 10.5)"/>`
  +hand+`<g transform="translate(30,0) scale(-1,1)">${hand}</g>`
  +`<path d="M15 4.6 L15.9 9.6 L20.9 10.5 L15.9 11.4 L15 16.4 L14.1 11.4 L9.1 10.5 L14.1 9.6 Z" fill="none" stroke="${c}" stroke-width="0.75"/>`
  +`<path d="M15 2 V3.6 M21.3 4.2 L20.2 5.3 M8.7 4.2 L9.8 5.3" stroke="${c}" stroke-width="0.45" opacity="0.7"/>`
  +`<circle cx="15" cy="10.5" r="1.1" fill="${c}"/>`+dust(4,3,1,27,7,c,41,0.5)); };

// ── artifacts ──
I.scrollBrief = (c='#C9A85C',sz=20)=>NS(sz,20,
  `<path d="M5 3 H16 A2 2 0 0 1 16 7 H5 A2 2 0 0 1 5 3 M5 3 A2 2 0 0 0 5 7 V17 H14 A2 2 0 0 0 16 15 V7" fill="none" stroke="${c}" stroke-width="0.8"/>`
  +`<line x1="7.5" y1="10" x2="13.5" y2="10" stroke="${c}" stroke-width="0.6"/><line x1="7.5" y1="12.4" x2="13.5" y2="12.4" stroke="${c}" stroke-width="0.6"/><line x1="7.5" y1="14.8" x2="11" y2="14.8" stroke="${c}" stroke-width="0.6" opacity="0.8"/>`
  +`<circle cx="13.8" cy="14.8" r="0.8" fill="none" stroke="${c}" stroke-width="0.45"/>`);
I.compassDive = (c='#C9A85C',sz=22)=>NS(sz,22,
  `<circle cx="11" cy="11" r="9.6" fill="none" stroke="${c}" stroke-width="0.75"/>`
  +ticks(11,11,8.4,9.4,16,c,0.4,0.7)
  +`<path d="M11 3.4 L12.3 9.7 L18.6 11 L12.3 12.3 L11 18.6 L9.7 12.3 L3.4 11 L9.7 9.7 Z" fill="none" stroke="${c}" stroke-width="0.6"/>`
  +`<path d="M11 5.5 L11.9 10.1 L11 11 L10.1 10.1 Z" fill="${c}"/>`
  +`<circle cx="11" cy="11" r="1" fill="${c}"/>`);
I.voicesDebate = (c='#C9A85C',sz=24)=>NS(sz,24,
  `<path d="M4 8 A6 6 0 0 1 12 8" fill="none" stroke="${c}" stroke-width="0.85"/>`
  +`<path d="M12 16 A6 6 0 0 1 20 16" fill="none" stroke="${c}" stroke-width="0.85" transform="rotate(180 16 13)"/>`
  +`<path d="M7 11 C9 13.5 15 13.5 17 11" fill="none" stroke="${c}" stroke-width="0.4" stroke-dasharray="0.8 1.6" opacity="0.7"/>`
  +`<path d="M11 11 L12 12.6 L13 11 L12 9.6 Z" fill="${c}"/>`
  +`<circle cx="5.5" cy="10" r="0.85" fill="${c}"/><circle cx="18.5" cy="14" r="0.85" fill="${c}"/>`
  +dust(3,2,18,22,23,c,43,0.5));
I.constellation = (c='#C9A85C',sz=24)=>NS(sz,24,
  `<line x1="5" y1="18" x2="10" y2="8" stroke="${c}" stroke-width="0.55"/><line x1="10" y1="8" x2="17" y2="12" stroke="${c}" stroke-width="0.55"/><line x1="17" y1="12" x2="20" y2="5" stroke="${c}" stroke-width="0.55"/><line x1="10" y1="8" x2="14" y2="19" stroke="${c}" stroke-width="0.55" stroke-dasharray="1.4 1.8"/><line x1="17" y1="12" x2="14" y2="19" stroke="${c}" stroke-width="0.4" stroke-dasharray="0.8 2" opacity="0.6"/>`
  +`<circle cx="5" cy="18" r="1.4" fill="${c}"/><circle cx="10" cy="8" r="1.9" fill="none" stroke="${c}" stroke-width="0.75"/><circle cx="10" cy="8" r="0.6" fill="${c}"/><circle cx="17" cy="12" r="1.4" fill="${c}"/><circle cx="20" cy="5" r="1.1" fill="${c}"/><circle cx="14" cy="19" r="1.1" fill="none" stroke="${c}" stroke-width="0.65"/>`
  +star4(3.5,5,1.6,c,0.45)+dust(4,1,1,23,23,c,47,0.5));

// ── plates (the two new reference forms, 2026-06-10 night) ──
// sunfall — gold disc top-center, long rays falling the height of a tall
// navy panel, dust graded dense→sparse. Built as a background layer.
I.sunfall = (w=330,h=560,c='#C9A85C')=>{
  const cx=w/2, cy=12, R=42, r=lcg(11); let g='';
  g+=`<defs><radialGradient id="wmSfG"><stop offset="0%" stop-color="#E8C779" stop-opacity="1"/><stop offset="55%" stop-color="${c}" stop-opacity="0.6"/><stop offset="100%" stop-color="${c}" stop-opacity="0"/></radialGradient></defs>`;
  g+=`<circle cx="${cx}" cy="${cy}" r="${R}" fill="url(#wmSfG)"/>`;
  for(let i=0;i<44;i++){ const a=r()*Math.PI*2, rr=Math.sqrt(r())*R*0.92;
    g+=`<circle cx="${(cx+Math.cos(a)*rr).toFixed(1)}" cy="${(cy+Math.sin(a)*rr).toFixed(1)}" r="${(0.35+r()*0.65).toFixed(2)}" fill="${c}" opacity="${(0.25+r()*0.5).toFixed(2)}"/>`; }
  for(let i=0;i<30;i++){ const a=i/30*Math.PI*2, L=R+4+(i%2?5:11);
    g+=`<line x1="${(cx+Math.cos(a)*(R+2)).toFixed(1)}" y1="${(cy+Math.sin(a)*(R+2)).toFixed(1)}" x2="${(cx+Math.cos(a)*L).toFixed(1)}" y2="${(cy+Math.sin(a)*L).toFixed(1)}" stroke="#E8C779" stroke-width="0.8" opacity="0.75"/>`; }
  for(let i=0;i<26;i++){ const x=cx-118+i*(236/25)+(r()*6-3), top=cy+R+4+r()*22, len=80+r()*r()*(h-150);
    g+=`<line x1="${x.toFixed(1)}" y1="${top.toFixed(1)}" x2="${x.toFixed(1)}" y2="${(top+len).toFixed(1)}" stroke="${c}" stroke-width="0.85" opacity="${(0.4+r()*0.32).toFixed(2)}"/>`; }
  for(let i=0;i<95;i++){ const t=r(), y=cy+R+t*t*(h-R-26), x=cx+(r()*2-1)*132;
    g+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(0.35+r()*0.65).toFixed(2)}" fill="#E8C779" opacity="${(0.2+(1-t)*0.55).toFixed(2)}"/>`; }
  for(let i=-4;i<=4;i++){ const x=cx+i*8, L=i%2?6:13;
    g+=`<line x1="${x}" y1="${h}" x2="${x}" y2="${h-L}" stroke="${c}" stroke-width="0.7" opacity="0.6"/>`; }
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="display:block">${g}</svg>`; };
// handsOrb — two line-work hands cradling a starburst inside a wisp ring,
// crescents + constellation field above. Emblem scale (overview hero, design page).
I.handsOrb = (sz=150,c='#C9A85C')=>{
  const hand = `<path d="M40 150 C36 130 38 112 47 96 M56 150 C53 134 54 119 60 106" fill="none" stroke="${c}" stroke-width="1.05"/>`
    +`<path d="M47 96 C47 87 50 79 55 73 M53 100 C54 91 57 84 62 78.5 M59 105 C61 96.5 64.5 90.5 69 86 M65 110 C67.5 103 71 97.5 75 93.5" fill="none" stroke="${c}" stroke-width="0.8"/>`
    +`<path d="M61 118 C66 112 71.5 108.5 76.5 107" fill="none" stroke="${c}" stroke-width="0.8"/>`;
  let g = `<ellipse cx="75" cy="74" rx="46" ry="16" fill="none" stroke="${c}" stroke-width="0.5" stroke-dasharray="1 2.6" opacity="0.7" transform="rotate(-13 75 74)"/>`
    +`<ellipse cx="75" cy="74" rx="40" ry="13" fill="none" stroke="${c}" stroke-width="0.4" stroke-dasharray="0.8 3.2" opacity="0.45" transform="rotate(9 75 74)"/>`
    +hand+`<g transform="translate(150,0) scale(-1,1)">${hand}</g>`
    +`<circle cx="75" cy="74" r="15" fill="none" stroke="${c}" stroke-width="0.45" opacity="0.6"/>`
    +`<path d="M75 52 L78 70 L96 74 L78 78 L75 96 L72 78 L54 74 L72 70 Z" fill="none" stroke="${c}" stroke-width="0.95"/>`
    +rays(75,74,17,21,26,16,c,0.5)
    +`<circle cx="75" cy="74" r="3" fill="${c}"/>`
    // crescents + constellation field above
    +`<path d="M26 22 A9 9 0 1 0 36 32 A7.2 7.2 0 1 1 26 22" fill="${c}" opacity="0.8" transform="rotate(-24 30 27)"/>`
    +`<path d="M124 22 A9 9 0 1 1 114 32 A7.2 7.2 0 1 0 124 22" fill="${c}" opacity="0.8" transform="rotate(24 120 27)"/>`
    +`<line x1="48" y1="18" x2="60" y2="26" stroke="${c}" stroke-width="0.4" opacity="0.6"/><line x1="60" y1="26" x2="75" y2="16" stroke="${c}" stroke-width="0.4" opacity="0.6"/><line x1="75" y1="16" x2="92" y2="24" stroke="${c}" stroke-width="0.4" opacity="0.6"/>`
    +`<circle cx="48" cy="18" r="1.1" fill="${c}"/><circle cx="60" cy="26" r="1.4" fill="${c}"/>${star4(75,16,2.4,c,0.55)}<circle cx="92" cy="24" r="1.1" fill="${c}"/>`
    +dust(16,8,8,142,142,c,53,0.5);
  return `<svg width="${sz}" height="${sz}" viewBox="0 0 150 150">${g}</svg>`; };

// oval tarot-badge frame (the design-system presentation form)
I.badge = (inner,label,c='#C9A85C')=>`<div style="width:108px; text-align:center;">
  <div style="width:104px; height:150px; border:1px solid ${c}66; border-radius:52px; display:flex; align-items:center; justify-content:center; position:relative;">
    <div style="position:absolute; inset:5px; border:1px solid ${c}2e; border-radius:48px;"></div>${inner}</div>
  <div style="font-family:Cinzel,serif; font-size:8.5px; letter-spacing:.22em; text-transform:uppercase; color:${c}; margin-top:7px;">${label}</div></div>`;

window.WMICONS = I;
})();
