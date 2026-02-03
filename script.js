document.getElementById("year").textContent = String(new Date().getFullYear());

// subtle float motion on outlines (like reference vibe)
const outlines = document.querySelectorAll(".outline");
let t = 0;

function animate(){
  t += 0.012;
  outlines.forEach((el, i) => {
    const y = Math.sin(t + i) * 6;
    const x = Math.cos(t + i) * 4;
    el.style.transform = `translate(${x}px, ${y}px)`;
  });
  requestAnimationFrame(animate);
}
animate();
