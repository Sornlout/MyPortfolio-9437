import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowDown, ArrowUp, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const projects = [
  { id: 'iphone', title: 'A little orange energy', category: 'Product & social', type: 'Social design', desc: 'A bold product composition with warm orange tones, clear hierarchy, and a personality-led visual.' },
  { id: 'haaland', title: 'Made for the spotlight', category: 'Sports posters', type: 'Poster design', desc: 'A football poster exploring layered photography, oversized typography, and a bright blue palette.' },
  { id: 'fresh', title: 'Fresh perspective', category: 'Product & social', type: 'Social design', desc: 'A fresh green campaign composition combining product imagery, portraiture, and Khmer typography.' },
  { id: 'cinema', title: 'A cinematic mood', category: 'Film & culture', type: 'Poster design', desc: 'A cinematic poster study using dramatic lighting, layered characters, and atmospheric textures.' },
  { id: 'headphones', title: 'Turn up the blue', category: 'Product & social', type: 'Social design', desc: 'A blue-on-blue headphone promotion balancing product focus with bold, readable information.' },
  { id: 'foden', title: 'Play with purpose', category: 'Sports posters', type: 'Poster design', desc: 'A sports poster with dynamic player cutouts, large-scale numbers, and a cohesive sky-blue identity.' },
  { id: 'food', title: 'A taste of Khmer', category: 'Food & drink', type: 'Social design', desc: 'A food promotion featuring a warm red palette, a clear menu layout, and Khmer lettering.' },
  { id: 'youth', title: 'The next generation', category: 'Community & events', type: 'Poster design', desc: 'A youth event poster bringing together a green palette, energetic typography, and a people-first composition.' },
  { id: 'social', title: 'Stories worth a scroll', category: 'Digital compositions', type: 'Social design', desc: 'A collection of social-first visual explorations, from cinematic imagery to lifestyle product design.' },
];
const filters = ['All work', 'Poster design', 'Social design'];
type Project = typeof projects[number];

function Star({ className = '' }: { className?: string }) { return <span aria-hidden="true" className={`ink-star ${className}`}>✦</span>; }

export default function Portfolio() {
  const [filter, setFilter] = useState('All work');
  const [selected, setSelected] = useState<Project | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  function open(project: Project) { lastFocus.current = document.activeElement as HTMLElement; setSelected(project); }
  function close() { setSelected(null); }
  function step(direction: number) { setSelected(current => current ? projects[(projects.indexOf(current) + direction + projects.length) % projects.length] : null); }
  useEffect(() => {
    if (selected) { if (!dialog.current?.open) dialog.current?.showModal(); document.body.style.overflow = 'hidden'; }
    else { dialog.current?.close(); document.body.style.overflow = ''; lastFocus.current?.focus(); }
    return () => { document.body.style.overflow = ''; };
  }, [selected]);
  useEffect(() => { const handler = (event: KeyboardEvent) => { if (!selected) return; if (event.key === 'ArrowRight') step(1); if (event.key === 'ArrowLeft') step(-1); }; window.addEventListener('keydown', handler); return () => window.removeEventListener('keydown', handler); }, [selected]);
  return (
    <main id="top">
      <header className="site-header">
        <a href="#top" className="signature" aria-label="Len Sornlout home">ls<span>✦</span></a>
        <nav aria-label="Main navigation"><a className="nav-home" href="#top">Home</a><a href="#work">My work</a><a href="#about">About me</a></nav>
        <span className="header-note">a work in progress, always.</span>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-center">
          <span className="eyebrow">WELCOME TO MY LITTLE CREATIVE CORNER</span>
          <h1 id="hero-title">Len <em>Sornlout</em><span className="name-period">.</span></h1>
          <p className="hero-role">Graphic designer <span> / </span> UX/UI designer <span> / </span> Video editor</p>
          <p className="hero-note">A little curiosity. A lot of imagination.</p>
          <a className="explore-button" href="#work">Explore my work <ArrowDown size={15}/></a>
        </div>
        <button className="scrap hero-orange" onClick={() => open(projects[0])} aria-label="View orange product design"><span className="tape"/><img src="/images/iphone.webp" alt="Orange smartphone promotional design"/><span className="scrap-caption">a pop of personality ↗</span></button>
        <button className="scrap hero-sports" onClick={() => open(projects[1])} aria-label="View football poster"><span className="tape"/><img src="/images/haaland.webp" alt="Blue Erling Haaland football poster"/><span className="scrap-caption">made to stand out</span></button>
        <div className="scrap hero-portrait"><img src="/images/portrait.webp" alt="Len Sornlout"/><span className="scrap-caption">the person behind the pixels</span></div>
        <button className="scrap hero-green" onClick={() => open(projects[2])} aria-label="View green campaign design"><span className="tape"/><img src="/images/fresh.webp" alt="Green beverage campaign design"/><span className="scrap-caption">something fresh!</span></button>
        <Star className="star-one"/><Star className="star-two"/><Star className="star-three"/>
        <span className="side-note note-left">ideas, collected<br/>along the way</span>
        <span className="side-note note-right">a few things<br/>I've been making</span>
        <svg className="doodle-arrow" width="95" height="70" viewBox="0 0 95 70" aria-hidden="true"><path d="M5 5 Q70 5 66 53 M52 41 L66 55 L79 39" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>
        <div className="hero-bottom"><span>DESIGNED WITH A LITTLE HEART</span><span>SCROLL TO LOOK AROUND <ArrowDown size={12}/></span></div>
      </section>

      <section className="work-section section-wrap" id="work" aria-labelledby="work-title">
        <div className="section-heading"><div><span className="eyebrow">01 / THE CREATIVE COLLECTION</span><h2 id="work-title">A few of my <em>favorite things.</em><Star/></h2></div><span className="hand-note">a peek inside my sketchbook</span></div>
        <div className="work-toolbar"><p>Posters, pixels, and everything in between.</p><div className="filters" aria-label="Filter projects">{filters.map(item => <button key={item} className={filter === item ? 'active' : ''} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}{item === 'All work' && <span>09</span>}</button>)}</div></div>
        <div className="project-grid">{projects.filter(p => filter === 'All work' || p.type === filter).map((project, i) => <button className={`project-card project-${i % 3}`} key={project.id} onClick={() => open(project)}><div className="project-paper"><span className="project-pin"/><img loading="lazy" src={`/images/${project.id}.webp`} alt={project.title + ' — ' + project.category}/><span className="project-view">Take a closer look <ArrowUpRight size={16}/></span></div><div className="project-info"><div><span>{project.category}</span><h3>{project.title}</h3></div><ArrowUpRight size={21}/></div></button>)}</div>
        <p className="collection-note">Different ideas. Same love for making things.<Star/></p>
      </section>

      <section className="about-section section-wrap" id="about" aria-labelledby="about-title">
        <div className="about-photo"><span className="tape"/><img loading="lazy" src="/images/portrait.webp" alt="Portrait of Len Sornlout"/><span className="scrap-caption">Hi, I'm Len. Nice to meet you!</span><Star/></div>
        <div className="about-copy"><span className="eyebrow">02 / BEHIND THE WORK</span><h2 id="about-title">A designer.<br/>A storyteller.<br/><em>A curious mind.</em></h2><p>I'm Len Sornlout, a creative working across graphic design, UX/UI design, and video editing. I love bringing ideas to life through thoughtful visuals and stories that connect.</p><p>From a bold poster to a digital experience, this is my little space to collect what I make and share a bit of who I am.</p><div className="skill-tags"><span>Graphic design</span><span>UX/UI design</span><span>Video editing</span></div></div>
        <div className="about-sticker"><Sparkles size={27}/><span>Always making.<br/>Always learning.</span></div>
      </section>
      <footer className="site-footer section-wrap"><div><span className="eyebrow">THAT'S MY LITTLE CORNER OF THE INTERNET</span><p>Thanks for <em>stopping by.</em><Star/></p></div><a href="#top">Back to top <ArrowUp size={16}/></a><div className="footer-bottom"><span>© {new Date().getFullYear()} Len Sornlout</span><span>Made with care, and a little blue ink.</span></div></footer>

      <dialog ref={dialog} className="project-dialog" onCancel={event => { event.preventDefault(); close(); }} aria-labelledby="dialog-title">
        {selected && <div className="dialog-content"><button className="close-dialog" onClick={close} aria-label="Close project"><X size={22}/></button><div className="dialog-image"><img src={`/images/${selected.id}.webp`} alt={selected.title}/></div><div className="dialog-info"><span className="eyebrow">{selected.category}</span><h2 id="dialog-title">{selected.title}</h2><p>{selected.desc}</p><span className="skill-tags"><span>{selected.type}</span></span><div className="dialog-controls"><button onClick={() => step(-1)} aria-label="Previous project"><ChevronLeft size={20}/> Previous</button><span>{String(projects.indexOf(selected) + 1).padStart(2, '0')} / 09</span><button onClick={() => step(1)} aria-label="Next project">Next <ChevronRight size={20}/></button></div></div></div>}
      </dialog>
    </main>
  );
}