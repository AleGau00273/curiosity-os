"use strict";
// A lightweight, accessible carousel: highlights supplement the full HTML portfolio.
const slides = [
  {label:"01 / INTRO", title:"HELLO, WORLD!", description:"I'm Alexander. Curiosity keeps me learning, experimenting, and building.", link:"#about", linkText:"Meet Alexander ↗"},
  {label:"02 / SOFTWARE", title:"ECOLINK", description:"A collaborative C# fleet manager. I designed four interfaces and helped with backend development and integration.", link:"#ecolink-spotlight", linkText:"Explore EcoLink ↗"},
  {label:"03 / WEB DEVELOPMENT", title:"EXPLORE AUSTRALIA", description:"A class project featuring five responsive pages I built using CSS Grid, Flexbox, and Bootstrap.", link:"#australia-spotlight", linkText:"Explore the website ↗"},
  {label:"04 / HARDWARE", title:"HANDHELD REBUILD", description:"I restored and upgraded a Game Boy Advance, practicing soldering, audio modifications, and troubleshooting.", link:"#gba-spotlight", linkText:"See the restoration ↗"},
  {label:"05 / TOOLKIT", title:"ALWAYS LEARNING", description:"C#, JavaScript, SQL, HTML, CSS, and expanding into Java, C++, and ASP.NET Core MVC.", link:"#skills", linkText:"Browse my skills ↗"},
  {label:"06 / CONNECT", title:"SAY HELLO!", description:"Interested in technology, creative projects, or working together? I'd love to connect.", link:"#contact", linkText:"Get in touch ↗"}
];
const content = document.getElementById("screenContent");
const counter = document.getElementById("screenCounter");
const link = document.getElementById("slideLink");
const dots = document.getElementById("carouselDots");
const stage = document.querySelector(".console-stage");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let current = 0;
let timer;
let manuallyPaused = false;
const autoplayButton = document.getElementById("toggleAutoplay");
function syncAutoplayButton() {
  autoplayButton.textContent = manuallyPaused ? "▶" : "Ⅱ";
  autoplayButton.setAttribute("aria-label", manuallyPaused ? "Play automatic highlights" : "Pause automatic highlights");
  autoplayButton.setAttribute("title", manuallyPaused ? "Play automatic highlights" : "Pause automatic highlights");
  autoplayButton.setAttribute("aria-pressed", String(manuallyPaused));
}
function showSlide(index) {
  current = (index + slides.length) % slides.length;
  const slide = slides[current];
  const kicker = document.createElement("p"); kicker.className = "screen-kicker"; kicker.textContent = slide.label;
  const title = document.createElement("h2"); title.textContent = slide.title;
  const description = document.createElement("p"); description.textContent = slide.description;
  content.replaceChildren(kicker,title,description);
  counter.textContent = `${String(current+1).padStart(2,"0")} / ${String(slides.length).padStart(2,"0")}`;
  link.href = slide.link; link.textContent = slide.linkText;
  dots.querySelectorAll("button").forEach((button,i) => {button.setAttribute("aria-current",String(i===current));});
}
function stopAuto() { window.clearTimeout(timer); timer = undefined; }
function canAutoPlay() { return !manuallyPaused && !reduceMotion.matches && !document.hidden; }
function startAuto(ignoreHover = false) {
  stopAuto();
  if (!canAutoPlay()) return;
  if (!ignoreHover && (stage.matches(":hover") || stage.contains(document.activeElement))) return;
  timer = window.setTimeout(() => {
    if (!canAutoPlay()) return;
    showSlide(current + 1);
    startAuto(true);
  }, 6500);
}
// Manual navigation gets a fresh countdown even while a control is hovered or focused.
function navigateTo(index) { showSlide(index); startAuto(true); }
slides.forEach((slide,i)=>{
  const button=document.createElement("button");button.type="button";button.className="carousel-dot";button.setAttribute("aria-label",`Show highlight ${i+1}: ${slide.title}`);
  button.addEventListener("click",()=>navigateTo(i));dots.append(button);
});
document.getElementById("previousSlide").addEventListener("click",()=>navigateTo(current-1));
document.getElementById("nextSlide").addEventListener("click",()=>navigateTo(current+1));
autoplayButton.addEventListener("click", () => {
  manuallyPaused = !manuallyPaused;
  syncAutoplayButton();
  if (manuallyPaused) stopAuto(); else startAuto(true);
});
stage.addEventListener("mouseenter",stopAuto);
stage.addEventListener("mouseleave",()=>startAuto());
stage.addEventListener("focusin",stopAuto);
stage.addEventListener("focusout",event=>{if(!stage.contains(event.relatedTarget))startAuto();});
document.getElementById("consoleScreen").addEventListener("keydown",event=>{
  if(event.key==="ArrowRight"||event.key==="ArrowLeft"){
    event.preventDefault();navigateTo(current+(event.key==="ArrowRight"?1:-1));
  }
});
document.addEventListener("visibilitychange",()=>document.hidden?stopAuto():startAuto());
reduceMotion.addEventListener?.("change",()=>startAuto());
syncAutoplayButton();showSlide(0);startAuto();

// Original 8x8 sprites generated from pixel patterns; no third-party game assets.
const patterns=[
['00100100','01111110','11111111','11111111','01111110','00111100','00011000','00000000'],
['00011000','00111100','01111110','11111111','11111111','01111110','00100100','00000000'],
['00011000','00011000','01111110','11111111','01111110','00011000','00011000','00000000'],
['00000000','00111100','01000010','10100101','10000001','01000010','00111100','00000000']
];
const colors=['#a5d9c6','#c8b4e4','#e7c98a','#91b7d9'];
function spriteSvg(pattern,color){let pixels='';pattern.forEach((row,y)=>[...row].forEach((bit,x)=>{if(bit==='1')pixels+=`<rect x="${x}" y="${y}" width="1" height="1"/>`;}));return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8" fill="${color}">${pixels}</svg>`)}`;}
const field=document.getElementById('spriteField');
// Distribute decorative sprites across the entire document, not just the console.
for(let i=0;i<48;i++){
  const img=document.createElement('img');img.className='pixel-sprite';img.src=spriteSvg(patterns[i%4],colors[i%4]);img.alt='';img.width=24;img.height=24;
  img.style.left=`${3+((i*37)%94)}%`;img.style.top=`${1+((i*29)%97)}%`;
  img.style.setProperty('--duration',`${12+(i%6)*2}s`);img.style.setProperty('--delay',`${-i*.8}s`);
  field.append(img);
}


// EcoLink screenshot gallery: static project assets, no third-party image dependencies.
const ecoScreenshots = [
  {file:"fleet-dashboard.png",title:"Fleet Dashboard",description:"The central command screen for registering and reviewing vehicles, their drivers, payloads, and energy levels.",alt:"EcoLink fleet dashboard showing registered vehicles and selected vehicle details"},
  {file:"driver-assignment.png",title:"Driver Assignment",description:"The interface for assigning or changing a driver for a selected vehicle.",alt:"EcoLink driver assignment interface"},
  {file:"driver-assignment-result.png",title:"Driver Assignment Result",description:"A follow-up view showing the updated driver assignment in the fleet interface.",alt:"EcoLink fleet interface after a driver assignment"},
  {file:"cargo-management.png",title:"Cargo Management",description:"Available warehouse packages can be moved into or out of a vehicle while tracking its payload capacity.",alt:"EcoLink cargo loading interface with available and loaded packages"},
  {file:"cargo-confirmation.png",title:"Cargo Confirmation",description:"After confirming cargo changes, the fleet dashboard reflects the vehicle's updated payload.",alt:"EcoLink fleet dashboard showing updated cargo payload"},
  {file:"energy-management.png",title:"Energy Management",description:"The charging interface displays the vehicle's energy level and allows a percentage-based transfer.",alt:"EcoLink charging hub interface with energy level and transfer controls"}
];
const ecoGallery = document.getElementById("galleryImage");
const ecoDialog = document.getElementById("galleryDialog");
if (ecoGallery && ecoDialog) {
  const galleryTitle = document.getElementById("galleryTitle");
  const galleryDescription = document.getElementById("galleryDescription");
  const galleryCounter = document.getElementById("galleryCounter");
  const galleryMissing = document.getElementById("galleryMissing");
  const galleryDots = document.getElementById("galleryDots");
  const galleryExpand = document.getElementById("galleryExpand");
  const dialogImage = document.getElementById("galleryDialogImage");
  let ecoIndex = 0;
  function ecoShow(index) {
    ecoIndex = (index + ecoScreenshots.length) % ecoScreenshots.length;
    const item = ecoScreenshots[ecoIndex];
    const source = `assets/images/projects/ecolink/${item.file}`;
    galleryTitle.textContent = item.title;
    galleryDescription.textContent = item.description;
    galleryCounter.textContent = `${String(ecoIndex + 1).padStart(2,"0")} / ${String(ecoScreenshots.length).padStart(2,"0")}`;
    galleryMissing.hidden = true;
    ecoGallery.hidden = false;
    galleryExpand.disabled = false;
    ecoGallery.alt = item.alt;
    ecoGallery.src = source;
    galleryDots.querySelectorAll("button").forEach((dot,i) => dot.setAttribute("aria-current", String(i === ecoIndex)));
  }
  ecoGallery.addEventListener("error", () => {
    ecoGallery.hidden = true;
    galleryMissing.hidden = false;
    galleryExpand.disabled = true;
  });
  ecoGallery.addEventListener("load", () => { ecoGallery.hidden = false; galleryMissing.hidden = true; galleryExpand.disabled = false; });
  ecoScreenshots.forEach((item,index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "gallery-dot";
    dot.setAttribute("aria-label", `Show screenshot ${index + 1}: ${item.title}`);
    dot.addEventListener("click", () => ecoShow(index));
    galleryDots.append(dot);
  });
  document.getElementById("galleryPrevious").addEventListener("click", () => ecoShow(ecoIndex - 1));
  document.getElementById("galleryNext").addEventListener("click", () => ecoShow(ecoIndex + 1));
  galleryExpand.addEventListener("click", () => {
    const item = ecoScreenshots[ecoIndex];
    dialogImage.src = ecoGallery.src;
    dialogImage.alt = item.alt;
    document.getElementById("galleryDialogTitle").textContent = item.title;
    if (typeof ecoDialog.showModal === "function") ecoDialog.showModal();
  });
  document.getElementById("galleryClose").addEventListener("click", () => ecoDialog.close());
  ecoDialog.addEventListener("click", event => { if (event.target === ecoDialog) ecoDialog.close(); });
  ecoShow(0);
}


// GBA restoration archive: manual-only carousel, with videos paused when changing slides.
const gbaSlides = Array.from(document.querySelectorAll("[data-gba-slide]"));
if (gbaSlides.length) {
  const items = [
    ["Before and After", "I rebuilt a worn Game Boy Advance with a new shell and backlit screen, giving the original hardware a second life."],
    ["Preparing to Solder", "This project challenged me to move beyond simple repairs and practice more involved board-level work."],
    ["Audio Upgrades", "I installed a CleanAMP Pro amplifier and a dehum/dehiss kit to reduce unwanted audio noise."],
    ["Board-Level Modifications", "A closer look at the circuit board during the C54 capacitor removal."],
    ["Display Control Wiring", "I soldered three wires to the Select, L, and R test points so I could adjust screen settings, including brightness."],
    ["Power-On Demonstration", "The finished handheld running after the restoration. Press play to watch."],
    ["Screen Settings Demonstration", "A demonstration of the screen controls enabled by the new wiring. Press play to watch."]
  ];
  let gbaIndex = 0;
  const gbaDots = document.getElementById("gbaDots");
  const gbaCounter = document.getElementById("gbaCounter");
  const gbaTitle = document.getElementById("gbaSlideTitle");
  const gbaDescription = document.getElementById("gbaSlideDescription");
  function showGbaSlide(index) {
    gbaSlides.forEach(slide => slide.querySelectorAll("video").forEach(video => video.pause()));
    gbaIndex = (index + gbaSlides.length) % gbaSlides.length;
    gbaSlides.forEach((slide, i) => { slide.hidden = i !== gbaIndex; });
    gbaTitle.textContent = items[gbaIndex][0];
    gbaDescription.textContent = items[gbaIndex][1];
    gbaCounter.textContent = `${String(gbaIndex + 1).padStart(2,"0")} / ${String(gbaSlides.length).padStart(2,"0")}`;
    gbaDots.querySelectorAll("button").forEach((dot, i) => dot.setAttribute("aria-current", String(i === gbaIndex)));
  }
  items.forEach((item, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Show restoration item ${i + 1}: ${item[0]}`);
    dot.addEventListener("click", () => showGbaSlide(i));
    gbaDots.append(dot);
  });
  document.getElementById("gbaPrevious").addEventListener("click", () => showGbaSlide(gbaIndex - 1));
  document.getElementById("gbaNext").addEventListener("click", () => showGbaSlide(gbaIndex + 1));
  showGbaSlide(0);
}



// Explore Australia: compact preview carousel, separate from the existing galleries.
const australiaSlides = Array.from(document.querySelectorAll("[data-australia-slide]"));
if (australiaSlides.length) {
  const items = [
    ["A Collaborative Homepage", "My classmate Rory built much of the homepage, including its Bootstrap navigation and image carousel. Together, we connected it to the themed pages."],
    ["Cities & Landmarks · Bootstrap Cards", "I built this page's responsive card layout, with image crops and subtle hover effects, as an early template for the content pages."],
    ["Economy & Travel · Bootstrap Tooltips", "I built a three-column Bootstrap layout with interactive Quick Fact tooltips and subtle image hover effects."],
    ["History & Symbols · Flexbox", "I used alternating text-and-image Flexbox rows and a media query to stack the content for smaller screens."],
    ["People & Culture · Accordion", "I arranged an image and interactive Bootstrap accordion side by side, with collapsible sections for cultural topics."],
    ["Land & Climate · CSS Grid", "I created a two-column image grid that becomes one column on mobile, with captions revealed on hover and always visible on smaller screens."]
  ];
  let current = 0;
  const dots = document.getElementById("australiaDots");
  const counter = document.getElementById("australiaCounter");
  const title = document.getElementById("australiaSlideTitle");
  const description = document.getElementById("australiaSlideDescription");
  function show(index) {
    current = (index + australiaSlides.length) % australiaSlides.length;
    australiaSlides.forEach((slide, i) => { slide.hidden = i !== current; });
    title.textContent = items[current][0];
    description.textContent = items[current][1];
    counter.textContent = `${String(current + 1).padStart(2, "0")} / ${String(australiaSlides.length).padStart(2, "0")}`;
    dots.querySelectorAll("button").forEach((dot, i) => dot.setAttribute("aria-current", String(i === current)));
  }
  items.forEach((item, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Show Australia preview ${i + 1}: ${item[0]}`);
    dot.addEventListener("click", () => show(i));
    dots.append(dot);
  });
  document.getElementById("australiaPrevious").addEventListener("click", () => show(current - 1));
  document.getElementById("australiaNext").addEventListener("click", () => show(current + 1));
  show(0);
}
