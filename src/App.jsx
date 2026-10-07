import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const visualRef = useRef(null);
  const orbitRef = useRef(null);
  const particleOneRef = useRef(null);
  const particleTwoRef = useRef(null);
  const particleThreeRef = useRef(null);

  useEffect(() => {
    // =========================
    // INTRO ANIMATION
    // =========================

    const intro = gsap.timeline();

    intro.from(".hero-title span", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.06,
      ease: "power3.out",
    });

    intro.from(
      ".stat",
      {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.2,
        ease: "power3.out",
      },
      "-=0.3"
    );

    intro.from(
      ".scroll-indicator",
      {
        opacity: 0,
        y: 15,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.2"
    );

    // =========================
    // NUMBER COUNTER
    // =========================

    const counters = document.querySelectorAll(".counter");

    counters.forEach((counter) => {
      const target = Number(counter.dataset.target);

      const counterObject = {
        value: 0,
      };

      gsap.to(counterObject, {
        value: target,
        duration: 1.5,
        delay: 0.8,
        ease: "power2.out",
        onUpdate: () => {
          counter.textContent = Math.round(counterObject.value);
        },
      });
    });

    // =========================
    // FLOATING ORBIT
    // =========================

    gsap.to(orbitRef.current, {
      rotation: 360,
      duration: 18,
      repeat: -1,
      ease: "none",
    });

    // =========================
    // FLOATING PARTICLES
    // =========================

    gsap.to(particleOneRef.current, {
      y: -25,
      x: 15,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(particleTwoRef.current, {
      y: 20,
      x: -18,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(particleThreeRef.current, {
      y: -18,
      x: -12,
      duration: 2.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // =========================
    // SCROLL-DRIVEN MAIN VISUAL
    // =========================

    gsap.to(visualRef.current, {
      y: 220,
      rotation: 180,
      scale: 1.2,

      scrollTrigger: {
        trigger: visualRef.current,
        start: "top center",
        end: "bottom top",
        scrub: 1,
      },

      ease: "none",
    });

    // =========================
    // SCROLL INDICATOR
    // =========================

    gsap.to(".scroll-indicator", {
      opacity: 0,

      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "200px top",
        scrub: true,
      },
    });

    // =========================
    // SECOND SECTION ANIMATION
    // =========================

    gsap.from(".second-section-content", {
      y: 80,
      opacity: 0,
      duration: 1,
      ease: "power3.out",

      scrollTrigger: {
        trigger: ".second-section",
        start: "top 75%",
      },
    });

    gsap.from(".section-line", {
      scaleX: 0,
      transformOrigin: "left center",
      duration: 1.2,
      ease: "power3.out",

      scrollTrigger: {
        trigger: ".second-section",
        start: "top 75%",
      },
    });

    // =========================
    // CLEANUP
    // =========================

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      gsap.killTweensOf([
        orbitRef.current,
        particleOneRef.current,
        particleTwoRef.current,
        particleThreeRef.current,
      ]);
    };
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">

      {/* =========================
          HERO SECTION
      ========================= */}

      <section className="hero-section relative min-h-screen overflow-hidden px-5 py-8 sm:px-8 md:px-12">

        {/* TOP LABEL */}

        <div className="relative z-20">
          <p className="mb-6 text-center text-xs tracking-[0.35em] text-gray-400 sm:text-sm sm:tracking-[0.5em]">
            CREATIVE DIGITAL EXPERIENCE
          </p>

          {/* MAIN HEADING */}

          <h1 className="hero-title flex flex-wrap justify-center text-center text-3xl font-bold leading-tight tracking-[0.12em] sm:text-4xl md:text-7xl md:tracking-[0.25em]">
            {"WELCOME ITZ FIZZ".split("").map((letter, index) => (
              <span key={index} className="inline-block">
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </h1>
        </div>

        {/* =========================
            MAIN VISUAL AREA
        ========================= */}

        <div className="relative flex min-h-[55vh] items-center justify-center">

          {/* PARTICLE 1 */}

          <div
            ref={particleOneRef}
            className="absolute left-[15%] top-[30%] h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.8)]"
          />

          {/* PARTICLE 2 */}

          <div
            ref={particleTwoRef}
            className="absolute right-[16%] top-[42%] h-4 w-4 rounded-full bg-purple-400 shadow-[0_0_25px_rgba(168,85,247,0.8)]"
          />

          {/* PARTICLE 3 */}

          <div
            ref={particleThreeRef}
            className="absolute bottom-[18%] left-[25%] h-2 w-2 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]"
          />

          {/* MAIN FIZZ VISUAL */}

          <div
            ref={visualRef}
            className="relative flex h-64 w-64 items-center justify-center rounded-full border border-white/30 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-700 shadow-[0_0_100px_rgba(99,102,241,0.5)] sm:h-80 sm:w-80 md:h-[420px] md:w-[420px]"
          >

            {/* OUTER ORBIT */}

            <div
              ref={orbitRef}
              className="absolute -inset-8 rounded-full border border-white/20"
            >
              <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.9)]" />
            </div>

            {/* SECOND ORBIT */}

            <div className="absolute -inset-4 rotate-45 rounded-full border border-white/10" />

            {/* GLOW */}

            <div className="absolute inset-8 rounded-full bg-white/10 blur-2xl" />

            {/* INNER CIRCLE */}

            <div className="absolute h-44 w-44 rounded-full border border-white/20 bg-black/30 backdrop-blur-xl sm:h-56 sm:w-56 md:h-72 md:w-72" />

            {/* FIZZ */}

            <span className="relative z-10 text-4xl font-black tracking-[0.15em] sm:text-5xl md:text-7xl">
              FIZZ
            </span>

            {/* DECORATIVE CIRCLE */}

            <div className="absolute -right-3 top-8 h-8 w-8 rounded-full border border-white/40 sm:-right-5 sm:top-10 sm:h-10 sm:w-10" />

            {/* DECORATIVE DOT */}

            <div className="absolute -bottom-3 left-14 h-5 w-5 rounded-full bg-white/70 sm:-bottom-4 sm:left-16 sm:h-6 sm:w-6" />

            {/* SMALL DOT */}

            <div className="absolute -left-3 bottom-20 h-3 w-3 rounded-full bg-cyan-300 sm:-left-4 sm:bottom-24 sm:h-4 sm:w-4" />

          </div>
        </div>

        {/* =========================
            STATISTICS
        ========================= */}

        <div className="grid grid-cols-1 gap-4 border-t border-white/20 pt-7 sm:grid-cols-3 sm:gap-5">

          <div className="stat rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md transition-transform duration-300 hover:-translate-y-1">

            <p className="mb-3 text-xs tracking-[0.25em] text-gray-500">
              ENGAGEMENT
            </p>

            <h2 className="text-4xl font-bold">
              <span className="counter" data-target="95">
                0
              </span>
              <span className="text-gray-500">%</span>
            </h2>

            <p className="mt-2 text-sm text-gray-400">
              User Engagement
            </p>

          </div>

          <div className="stat rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md transition-transform duration-300 hover:-translate-y-1">

            <p className="mb-3 text-xs tracking-[0.25em] text-gray-500">
              INTERACTION
            </p>

            <h2 className="text-4xl font-bold">
              <span className="counter" data-target="87">
                0
              </span>
              <span className="text-gray-500">%</span>
            </h2>

            <p className="mt-2 text-sm text-gray-400">
              Smooth Interaction
            </p>

          </div>

          <div className="stat rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md transition-transform duration-300 hover:-translate-y-1">

            <p className="mb-3 text-xs tracking-[0.25em] text-gray-500">
              EXPERIENCE
            </p>

            <h2 className="text-4xl font-bold">
              <span className="counter" data-target="100">
                0
              </span>
              <span className="text-gray-500">%</span>
            </h2>

            <p className="mt-2 text-sm text-gray-400">
              Creative Experience
            </p>

          </div>

        </div>

        {/* =========================
            SCROLL INDICATOR
        ========================= */}

        <div className="scroll-indicator absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">

          <span className="text-[10px] tracking-[0.4em] text-gray-500">
            SCROLL
          </span>

          <div className="h-10 w-px bg-gradient-to-b from-white to-transparent" />

        </div>

      </section>

      {/* =========================
          SECOND SECTION
      ========================= */}

      <section className="second-section relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950 px-6">

        {/* GRID BACKGROUND */}

        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* CONTENT */}

        <div className="second-section-content relative z-10 max-w-3xl text-center">

          <p className="mb-6 text-xs tracking-[0.5em] text-gray-500">
            NEXT EXPERIENCE
          </p>

          <h2 className="text-4xl font-bold tracking-[0.12em] sm:text-5xl md:text-7xl">
            KEEP
            <br />
            SCROLLING
          </h2>

          <div className="section-line mx-auto mt-10 h-px w-32 bg-white/40" />

          <p className="mx-auto mt-8 max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
            Designed with smooth motion, interactive visuals and
            scroll-driven experiences.
          </p>

        </div>

      </section>

    </main>
  );
}

export default App;