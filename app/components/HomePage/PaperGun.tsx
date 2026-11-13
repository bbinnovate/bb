'use client';

import { useEffect, useRef, useState } from 'react';
import Button from "../Button";

type Kind = {
  type: 'big' | 'tag';
  word: string;
  sub: string;
  detail: string;
  href: string;
  kicker: string;
  id: string;
  w: number;
  h: number;
  color: { bg: string; dark: boolean } | null;
  slot: number | null;
  primary: Slip | null;
  fs: number | null;
  cx: number;
  cy: number;
  sc: number;
};

type SlipEl = HTMLDivElement & { _face: HTMLDivElement; _w: HTMLElement };

type Slip = {
  el: SlipEl;
  kind: Kind;
  mode: 'fly' | 'glide' | 'placed' | 'gone';
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  flip: number;
  s: number;
  ph: number;
  ph2: number;
  age: number;
  fly: number;
  twin: boolean;
  g?: { t0: number; x: number; y: number; rot: number; flip: number; s: number };
};

export default function PaperGun() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [logoFailed, setLogoFailed] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const $ = <T extends HTMLElement = HTMLElement>(s: string) => root.querySelector(s) as T;
    const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const MOBILE = matchMedia('(max-width: 700px)').matches;

    /* ---------- tunables ---------- */
    const FIRE_MS = RM ? 300 : 85;
    const GRAVITY = 0.28, DRAG = 0.975, MAXFALL = 5, FLUTTER = 1.4, FLIP = RM ? 20 : 55;
    const FLY_MIN = MOBILE ? 260 : RM ? 380 : 700, FLY_MAX = MOBILE ? 420 : RM ? 520 : 1100;
    const GLIDE_MS = RM ? 420 : 700;
    const GAP = 10, TRAY_H = 58;

    /* ---------- the work ---------- */
    const BIG_DATA: string[][] = [
  // Frontend
  ['Next.js', 'Frontend', 'Creating fast, SEO-friendly applications with the App Router.'],
  ['JavaScript', 'Core Technology', 'Writing interactive and functional web applications.'],
  ['TypeScript', 'Core Technology', 'Building scalable applications with type-safe code.'],
  ['Tailwind CSS', 'Styling', 'Building modern interfaces with utility-first styling.'],

  // Backend
  ['Node.js', 'Backend', 'Developing scalable server-side applications and APIs.'],
  ['Express.js', 'Backend', 'Building REST APIs and backend services.'],
  ['REST APIs', 'Backend', 'Connecting frontend applications with backend services.'],

  // Database & Cloud
  ['Firebase', 'Backend & Cloud', 'Using authentication, Firestore and cloud services.'],
  ['Supabase', 'Backend & Database', 'Working with PostgreSQL, authentication and backend services.'],
  ['Firestore', 'Database', 'Storing and managing real-time application data.'],

   // Platforms & CMS
  ['Shopify', 'E-commerce  ', 'Building and customizing e-commerce stores and Shopify experiences.'],
  ['Framer', 'Website Builder', 'Designing and building interactive, responsive websites.'],
  ['WordPress', 'CMS', 'Building and managing content-driven websites.'],

  // Animation & 3D
  ['GSAP', 'Animation', 'Creating smooth, scroll-based and interactive animations.'],
  ['Framer Motion', 'Animation', 'Adding fluid transitions and motion to React interfaces.'],
  ['Three.js', '3D Development', 'Creating immersive 3D experiences for the web.'],
   
  ['React Three Fiber', '3D Development', 'Building interactive 3D scenes with React.'],


  // Tools & Deployment
  ['GitHub', 'Collaboration', 'Managing repositories and collaborating on projects.'],
  ['Vercel', 'Deployment', 'Deploying and hosting modern frontend applications.'],
  
];
    const TAG_DATA: string[][] = [
      ['UI', 'Interfaces with a lot of personality.'],
      ['UX', 'Flows that feel obvious.'],
      ['Figma', 'Where every idea gets sketched first.'],
      ['Claude', 'My favourite building partner.'],
      ['React', 'How most things get built.'],
    ];

    const base = { color: null, slot: null, primary: null, fs: null, cx: 0, cy: 0, sc: 1 };
    const BIG: Kind[] = BIG_DATA.map((a) => ({
      ...base, type: 'big', word: a[0], sub: a[1], detail: a[2], href: a[3] || '', kicker: a[1],
      id: a[0].toLowerCase(), w: 220, h: 84,
    }));
    const TAGS: Kind[] = TAG_DATA.map((a) => ({
      ...base, type: 'tag', word: a[0], sub: '', detail: a[1], href: '', kicker: a[0] === '2026' ? 'Year' : 'Skill',
      id: a[0].toLowerCase(), w: 88, h: 64,
    }));

    const PAPER = ['#fab31e'];
    const lum = (hex: string) => {
      const c = [1, 3, 5].map((i) => {
        const v = parseInt(hex.substr(i, 2), 16) / 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
    };

    const kinds = new Map<string, Kind>();
    let colorIdx = 0, slotCount = 0;
    [...BIG, ...TAGS].forEach((k) => kinds.set(k.id, k));
    const byWord = (w: string) => kinds.get(w.toLowerCase())!;
    const GROUPS: Record<string, Kind[]> = {
      work: ['Zenwood', 'The depot', 'Shredder', 'Look closer', '12 keys', 'Key ball'].map(byWord),
      about: ['Debbie', '50 apps', '30 brands'].map(byWord),
      process: ['Talk', 'Sketch', 'Build'].map(byWord),
      contact: ['Hello@'].map(byWord),
    };

    /* ---------- elements ---------- */
    const hero = $('#hero'), sky = $('#sky'), tray = $('#tray'), trayLabel = $('#trayLabel');
    const gun = $('#gun'), gunSvg = gun.querySelector('svg') as SVGSVGElement, slotEl = $<HTMLElement>('#slot') as unknown as SVGGraphicsElement;
    const sprayBtn = $('#spray'), cleanBtn = $('#clean'), countEl = $('#count');
    const card = $('#card');

    /* ---------- slip factory ---------- */
    function colorFor(k: Kind) {
      if (!k.color) {
        const bg = PAPER[colorIdx++ % PAPER.length];
        k.color = { bg, dark: lum(bg) < 0.35 };
      }
      return k.color;
    }

    function makeEl(k: Kind) {
      const c = colorFor(k);
      const el = document.createElement('div') as SlipEl;
      el.className = 'slip ' + k.type + (c.dark ? '' : ' light');
      el.style.setProperty('--bg', c.bg);
      el.style.setProperty('--fg', '#000');
      const face = document.createElement('div');
      face.className = 'face';
      const w = document.createElement('b');
      w.className = 'w';
      w.textContent = k.word;
      face.appendChild(w);
      if (k.sub) {
        const s = document.createElement('i');
        s.className = 's';
        s.textContent = k.sub;
        face.appendChild(s);
      }
      el.appendChild(face);
      el._face = face;
      el._w = w;
      const baseFs = k.type === 'big' ? k.h * (k.word.length > 9 ? 0.3 : 0.36) : k.h * 0.36;
      w.style.fontSize = (k.fs || baseFs) + 'px';
      return { el, w, base: baseFs };
    }

    function fit(k: Kind, w: HTMLElement, baseFs: number) {
      if (k.fs) return;
      const avail = k.w - (k.type === 'big' ? 28 : 16);
      let fs = baseFs;
      w.style.fontSize = fs + 'px';
      const ow = w.offsetWidth;
      if (ow > avail) fs = (baseFs * avail) / ow;
      k.fs = Math.floor(fs * 10) / 10;
      w.style.fontSize = k.fs + 'px';
    }

    /* ---------- tray layout ---------- */
    function layout() {
      const order = [...kinds.values()].filter((k) => k.slot !== null).sort((a, b) => a.slot! - b.slot!);
      if (!order.length) return;
      const sr = sky.getBoundingClientRect(), tr = tray.getBoundingClientRect();
      const padTop = trayLabel.offsetTop + trayLabel.offsetHeight + 16;
      const W = tr.width, availH = tr.height - padTop - 8;
      const pack = (H: number) => {
        let x = 0, y = 0;
        const pos: { x: number; y: number; w: number }[] = [];
        for (const k of order) {
          const w = (H * k.w) / k.h;
          if (x > 0 && x + w > W + 0.5) { x = 0; y += H + GAP; }
          pos.push({ x, y, w });
          x += w + GAP;
        }
        return { pos, height: y + H };
      };
      let H = TRAY_H, r = pack(H);
      while (H > 22 && r.height > availH) { H -= 1; r = pack(H); }
      const ox = tr.left - sr.left, oy = tr.top - sr.top + padTop;
      order.forEach((k, i) => {
        const p = r.pos[i];
        k.cx = ox + p.x + p.w / 2;
        k.cy = oy + r.pos[i].y + H / 2;
        k.sc = H / k.h;
        const pr = k.primary;
        if (pr && pr.mode === 'placed') {
          pr.x = k.cx; pr.y = k.cy; pr.s = k.sc;
          pr.el.style.setProperty('--s', String(k.sc));
          put(pr);
        }
      });
    }

    /* ---------- slips in play ---------- */
    let live: Slip[] = [];
    let count = 0, shot = 0, bigI = 0, tagI = 0;

    function put(p: Slip) {
      const k = p.kind;
      p.el.style.transform = `translate3d(${(p.x - k.w / 2).toFixed(2)}px,${(p.y - k.h / 2).toFixed(2)}px,0) rotate(${p.rot.toFixed(2)}deg) perspective(700px) rotateX(${p.flip.toFixed(2)}deg) scale(${p.s.toFixed(4)})`;
    }
    const norm = (d: number) => { d = ((d % 360) + 360) % 360; return d > 180 ? d - 360 : d; };
    const rnd = (a: number, b: number) => a + Math.random() * (b - a);

    function autoKind() {
      const isTag = shot++ % 4 === 3;
      return isTag ? TAGS[tagI++ % TAGS.length] : BIG[bigI++ % BIG.length];
    }

    let kickAnim: Animation | null = null;
    let kickT: ReturnType<typeof setTimeout>;
    function kick() {
      gun.classList.add('firing');
      clearTimeout(kickT);
      kickT = setTimeout(() => gun.classList.remove('firing'), 130);
      if (kickAnim) kickAnim.cancel();
      const d = RM ? 5 : 14;
      kickAnim = gunSvg.animate(
        [{ transform: 'translateX(0)' }, { transform: `translateX(${d}px)`, offset: 0.22 }, { transform: 'translateX(0)' }],
        { duration: RM ? 120 : 190, easing: 'cubic-bezier(.2,.9,.3,1.4)' }
      );
    }

    function fire(kind?: Kind) {
      kind = kind || autoKind();
      const { el, w, base: baseFs } = makeEl(kind);
      sky.appendChild(el);
      fit(kind, w, baseFs);
      const sr = sky.getBoundingClientRect(), r = slotEl.getBoundingClientRect();
      const a = (rnd(150, 190) * Math.PI) / 180;
      const sp = MOBILE ? rnd(4, 7) : RM ? rnd(6, 9) : rnd(9, 16);
      const p: Slip = {
        el, kind, mode: 'fly',
        x: r.left + r.width / 2 - sr.left, y: r.top + r.height / 2 - sr.top,
        vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
        rot: rnd(-40, 40), vr: (Math.random() < 0.5 ? -1 : 1) * rnd(2, 6) * (RM ? 0.3 : 1),
        flip: 0, s: 0.45, ph: rnd(0, 6.28), ph2: rnd(0, 6.28),
        age: 0, fly: rnd(FLY_MIN, FLY_MAX), twin: false,
      };
      live.push(p);
      put(p);
      count++;
      countEl.innerHTML = `<b>${count}</b> ${count === 1 ? 'slip' : 'slips'} sprayed`;
      kick();
    }

    function beginGlide(p: Slip, now: number) {
      const k = p.kind;
      if (!k.primary) { k.primary = p; k.slot = slotCount++; layout(); }
      else p.twin = true;
      p.mode = 'glide';
      p.g = { t0: now, x: p.x, y: p.y, rot: norm(p.rot), flip: p.flip, s: p.s };
    }

    function hop(p: Slip | null) {
      if (!p || p.mode === 'gone') return;
      const d = -8 / (p.s || 1);
      p.el._face.animate(
        [{ transform: 'translateY(0)' }, { transform: `translateY(${d}px)`, offset: 0.4 }, { transform: 'translateY(0)' }],
        { duration: 340, easing: 'cubic-bezier(.3,.8,.3,1)' }
      );
    }

    function step(p: Slip, now: number, dt: number, f: number) {
      if (p.mode === 'fly') {
        p.age += dt;
        p.vx *= Math.pow(DRAG, f);
        p.vy = Math.min(MAXFALL, p.vy + GRAVITY * f);
        p.x += p.vx * f + Math.sin(p.age * 0.006 + p.ph) * FLUTTER * f;
        p.y += p.vy * f;
        p.rot += p.vr * f;
        p.flip = FLIP * Math.sin(p.age * 0.012 + p.ph2);
        p.s = Math.min(1, 0.45 + (p.age / 160) * 0.55);
        put(p);
        if (p.age >= p.fly) beginGlide(p, now);
      } else if (p.mode === 'glide') {
        const g = p.g!, k = p.kind;
        const t = Math.min(1, (now - g.t0) / GLIDE_MS), e = 1 - Math.pow(1 - t, 3);
        p.x = g.x + (k.cx - g.x) * e;
        p.y = g.y + (k.cy - g.y) * e;
        p.rot = g.rot * (1 - e);
        p.flip = g.flip * (1 - e);
        p.s = g.s + (k.sc - g.s) * e;
        if (p.twin) p.el.style.opacity = String(t < 0.55 ? 1 : Math.max(0, 1 - (t - 0.55) / 0.45));
        put(p);
        if (t >= 1) {
          if (p.twin) { p.mode = 'gone'; p.el.remove(); hop(k.primary); }
          else {
            p.mode = 'placed'; p.x = k.cx; p.y = k.cy; p.s = k.sc; p.rot = 0; p.flip = 0;
            p.el.style.setProperty('--s', String(k.sc));
            p.el.classList.add('placed');
            p.el.tabIndex = 0;
            p.el.setAttribute('role', 'button');
            p.el.setAttribute('aria-label', k.word + (k.sub ? ', ' + k.sub : ''));
            put(p);
          }
        }
      }
    }

    let last = performance.now();
    let raf = 0;
    function tick(now: number) {
      const dt = Math.min(64, now - last), f = dt / 16.667;
      last = now;
      for (const p of live) step(p, now, dt, f);
      if (live.some((p) => p.mode === 'gone')) live = live.filter((p) => p.mode !== 'gone');
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    /* ---------- clean up ---------- */
    function cleanUp() {
      const gone = live;
      live = [];
      for (const p of gone) {
        p.mode = 'gone';
        const el = p.el;
        el.style.pointerEvents = 'none';
        el.classList.remove('placed');
        const o = getComputedStyle(el).opacity;
        el.animate([{ opacity: o }, { opacity: '0' }], { duration: 320, fill: 'forwards' }).onfinish = () => el.remove();
      }
      kinds.forEach((k) => { k.slot = null; k.primary = null; });
      slotCount = 0;
      closeCard();
    }

    /* ---------- detail card ---------- */
    function openCard(k: Kind) {
      $('#cKick').textContent = k.kicker;
      $('#cTitle').textContent = k.word;
      $('#cText').textContent = k.detail;
      const l = $<HTMLAnchorElement>('#cLink');
      if (k.href) { l.hidden = false; l.href = k.href; l.textContent = 'hello@debbie.example ↗'; }
      else l.hidden = true;
      card.classList.add('open');
      card.setAttribute('aria-hidden', 'false');
    }
    function closeCard() {
      card.classList.remove('open');
      card.setAttribute('aria-hidden', 'true');
    }
    const onCardX = () => closeCard();
    $('#cardX').addEventListener('click', onCardX);

    const onSkyClick = (e: Event) => {
      const el = (e.target as HTMLElement).closest('.slip.placed');
      if (!el) return;
      const p = live.find((q) => q.el === el);
      if (p) openCard(p.kind);
    };
    const onSkyKey = (e: KeyboardEvent) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const el = (e.target as HTMLElement).closest('.slip.placed');
      if (!el) return;
      e.preventDefault();
      e.stopPropagation();
      const p = live.find((q) => q.el === el);
      if (p) openCard(p.kind);
    };
    sky.addEventListener('click', onSkyClick);
    sky.addEventListener('keydown', onSkyKey);

    /* ---------- holding to spray ---------- */
    const holders = new Set<string>();
    let timer: ReturnType<typeof setInterval> | null = null;
    function hold(src: string) {
      holders.add(src);
      if (!timer) { fire(); timer = setInterval(() => fire(), FIRE_MS); }
    }
    function release(src: string) {
      holders.delete(src);
      if (!holders.size && timer) { clearInterval(timer); timer = null; }
    }
    function releaseAll() {
      holders.clear();
      if (timer) { clearInterval(timer); timer = null; }
      sprayBtn.classList.remove('down');
    }

    const onGunDown = (e: PointerEvent) => { if (e.button) return; e.preventDefault(); hold('gun'); };
    const onSprayDown = (e: PointerEvent) => { if (e.button) return; hold('btn'); };
    const onPointerUp = () => { release('gun'); release('btn'); };
    const onGunLeave = () => release('gun');
    const onSprayLeave = () => release('btn');
    const onCtx = (e: Event) => e.preventDefault();
    const onVis = () => { if (document.hidden) releaseAll(); };
    gun.addEventListener('pointerdown', onGunDown);
    sprayBtn.addEventListener('pointerdown', onSprayDown);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
    gun.addEventListener('pointerleave', onGunLeave);
    sprayBtn.addEventListener('pointerleave', onSprayLeave);
    gun.addEventListener('contextmenu', onCtx);
    window.addEventListener('blur', releaseAll);
    document.addEventListener('visibilitychange', onVis);

    const typing = (t: EventTarget | null) => !!t && /^(INPUT|TEXTAREA|SELECT)$/.test((t as HTMLElement).tagName);
    const onKeyDown = (e: KeyboardEvent) => {
      if (typing(e.target)) return;
      const t = e.target as HTMLElement;
      if (t.closest && t.closest('.slip')) return;
      if (e.code === 'Space') {
        e.preventDefault();
        if (e.repeat) return;
        hold('space');
        sprayBtn.classList.add('down');
      } else if (e.key === 'Enter' && e.target === sprayBtn) {
        e.preventDefault();
        if (e.repeat) return;
        hold('enter');
        sprayBtn.classList.add('down');
      } else if (e.key === 'Escape') closeCard();
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') { e.preventDefault(); release('space'); if (!holders.has('enter')) sprayBtn.classList.remove('down'); }
      else if (e.key === 'Enter') { release('enter'); if (!holders.has('space')) sprayBtn.classList.remove('down'); }
    };
    const onSprayClick = (e: Event) => e.preventDefault();
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    sprayBtn.addEventListener('click', onSprayClick);
    cleanBtn?.addEventListener('click', cleanUp);

    /* ---------- nav bursts ---------- */
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const later = (fn: () => void, ms: number) => { timeouts.push(setTimeout(fn, ms)); };
    function burst(list: Kind[], gap: number) { list.forEach((k, i) => later(() => fire(k), i * gap)); }
    const navLinks = Array.from(root.querySelectorAll<HTMLElement>('[data-group]'));
    const navHandlers = navLinks.map((a) => {
      const h = (e: Event) => {
        e.preventDefault();
        const list = GROUPS[a.dataset.group!];
        openCard(list[0]);
        burst(list, RM ? 260 : 115);
      };
      a.addEventListener('click', h);
      return h;
    });

    /* ---------- layout upkeep ---------- */
    let lt = 0;
    const relayout = () => { cancelAnimationFrame(lt); lt = requestAnimationFrame(layout); };
    window.addEventListener('resize', relayout);
    let ro: ResizeObserver | null = null;
    if ('ResizeObserver' in window) { ro = new ResizeObserver(relayout); ro.observe(tray); ro.observe(hero); }

    /* ---------- intro: after 0.7s, a burst of 20 ---------- */
    let cancelled = false;
    const fontsReady = Promise.race([
      Promise.all([
        document.fonts.load('900 20px "Cabinet Grotesk"'),
        document.fonts.load('600 20px "Clash Display"'),
        document.fonts.load('italic 20px "Instrument Serif"'),
      ]).catch(() => {}),
      new Promise((r) => setTimeout(r, 2200)),
    ]);
    const loaded = document.readyState === 'complete' ? Promise.resolve() : new Promise<void>((r) => window.addEventListener('load', () => r(), { once: true }));
    Promise.all([fontsReady, loaded]).then(() => {
      if (cancelled) return;
      relayout();
      later(() => { for (let i = 0; i < 20; i++) later(() => fire(), i * (RM ? 260 : 95)); }, 700);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      cancelAnimationFrame(lt);
      clearTimeout(kickT);
      if (timer) clearInterval(timer);
      timeouts.forEach(clearTimeout);
      ro?.disconnect();
      window.removeEventListener('resize', relayout);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
      window.removeEventListener('blur', releaseAll);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      document.removeEventListener('visibilitychange', onVis);
      navLinks.forEach((a, i) => a.removeEventListener('click', navHandlers[i]));
      sky.innerHTML = '';
    };
  }, []);

  return (
    <div ref={rootRef}>
      

      <main className="hero container py-10 sm:py-15 lg:py-20" id="hero">
        <div className="copy">
          
    
           <h2 className="black-text  lg:w-[900px] w-full leading-snug">
          The <span className="text-highlight">Stack</span> That Powers{" "}
          <span className="text-highlight">Innovation,</span> Performance, And Growth{" "}
          <span className="text-highlight">Across</span> Every{" "}
          <span className="text-highlight">Project</span>
        </h2>
          <p className="sub">My work comes out of this gun. Pull the trigger and catch a slip.</p>
          <div className="row">
 
            <button className="key black" id="spray" type="button">Spray my work </button>
            {/* <button className="key" id="clean" type="button">Clean up<span className="lg">↺</span></button> */}
            <span className="count" id="count" aria-live="polite"><b>0</b> slips sprayed</span>
          </div>
        </div>

        <section className="tray" id="tray" aria-label="Slips that came out">
          <span className="tray-label" id="trayLabel">What came out · Click a slip</span>
        </section>

        <div className="gunwrap">
          <div className="gun" id="gun" role="button" tabIndex={0} aria-label="Portfolio paper gun. Hold to spray slips of Debbie's work.">
            <svg viewBox="30 70 680 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <defs>
                <linearGradient id="gTop" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ff5a5e" /><stop offset="1" stopColor="#ff3a40" /></linearGradient>
                <linearGradient id="gSide" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ff3b3f" /><stop offset=".5" stopColor="#e0141c" /><stop offset="1" stopColor="#a50a10" /></linearGradient>
                <linearGradient id="gBack" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#c00d14" /><stop offset="1" stopColor="#7d050a" /></linearGradient>
                <linearGradient id="gGrip" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ff3036" /><stop offset=".5" stopColor="#d9121a" /><stop offset="1" stopColor="#9c080e" /></linearGradient>
                <linearGradient id="gGripBack" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8e070d" /><stop offset="1" stopColor="#5a0308" /></linearGradient>
                <linearGradient id="gSlot" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#14070a" /><stop offset="1" stopColor="#3a0a10" /></linearGradient>
              </defs>

              {/* grip (drawn first so the body overlaps it) */}
              <polygon points="560,280 620,246 660,396 600,430" fill="url(#gGripBack)" />
              <polygon points="450,280 560,280 600,430 490,430" fill="url(#gGrip)" />
              <line x1="456" y1="288" x2="494" y2="424" stroke="#fff" strokeOpacity=".5" strokeWidth="3" strokeLinecap="round" />
              <rect x="498" y="296" width="52" height="4" rx="2" fill="#000" opacity=".12" />
              <rect x="506" y="330" width="52" height="4" rx="2" fill="#000" opacity=".1" />

              {/* trigger guard + trigger */}
              <path d="M356 278 V330 Q356 372 398 372 H476" fill="none" stroke="#b50d14" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M356 282 V330 Q356 366 396 366 H470" fill="none" stroke="#ff5a5e" strokeOpacity=".55" strokeWidth="3" strokeLinecap="round" />
              <g id="trigger"><path d="M404 282 H434 L429 338 Q427 349 418 349 Q409 349 407 338 Z" fill="#8a060b" /><path d="M412 290 L411 332" stroke="#c0343a" strokeWidth="2.5" strokeLinecap="round" opacity=".6" /></g>

              {/* body: back, top, side */}
              <polygon points="620,130 680,96 680,246 620,280" fill="url(#gBack)" />
              <polygon points="60,130 120,96 680,96 620,130" fill="url(#gTop)" />
              <rect x="60" y="130" width="560" height="150" fill="url(#gSide)" />
              <line x1="64" y1="134" x2="616" y2="134" stroke="#fff" strokeOpacity=".8" strokeWidth="3" strokeLinecap="round" />
              <line x1="128" y1="97" x2="672" y2="97" stroke="#fff" strokeOpacity=".35" strokeWidth="2" strokeLinecap="round" />
              <g stroke="#000" strokeOpacity=".16" strokeWidth="2"><line x1="170" y1="140" x2="170" y2="274" /><line x1="520" y1="140" x2="520" y2="274" /></g>
              <g stroke="#fff" strokeOpacity=".14" strokeWidth="2"><line x1="173" y1="140" x2="173" y2="274" /><line x1="523" y1="140" x2="523" y2="274" /></g>
              <g fill="#4e0307"><circle cx="112" cy="160" r="6" /><circle cx="112" cy="254" r="6" /><circle cx="588" cy="160" r="6" /><circle cx="588" cy="254" r="6" /></g>
              <g fill="#ff7b7e" opacity=".5"><circle cx="110" cy="158" r="2" /><circle cx="110" cy="252" r="2" /><circle cx="586" cy="158" r="2" /><circle cx="586" cy="252" r="2" /></g>
              <text x="345" y="228" textAnchor="middle" textLength="410" lengthAdjust="spacingAndGlyphs" fill="#fff" fontFamily="'Cabinet Grotesk','Helvetica Neue',Arial,sans-serif" fontWeight="900" fontSize="64" letterSpacing="2">Bombay Blokes</text>

              {/* paper slot at the front end */}
              <rect x="68" y="160" width="18" height="94" rx="4" fill="#5a0308" />
              <rect id="slot" x="71" y="163" width="12" height="88" rx="3" fill="url(#gSlot)" />
            </svg>
          </div>
        </div>

        <div className="sky" id="sky" aria-hidden="false"></div>
      </main>

      <aside className="card" id="card" aria-live="polite" aria-hidden="true">
        <button className="x" id="cardX" type="button" aria-label="Close">×</button>
        <p className="kick" id="cKick"></p>
        <h3 className="ttl" id="cTitle"></h3>
        <p className="txt" id="cText"></p>
        <a className="lnk" id="cLink" hidden></a>
      </aside>
    </div>
  );
}
