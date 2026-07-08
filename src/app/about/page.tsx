"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Asterisk, Play } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headlineRef = useRef<HTMLDivElement | null>(null);
  const introRef = useRef<HTMLDivElement | null>(null);

  const videoPillRef = useRef<HTMLDivElement | null>(null);
  const aiCardRef = useRef<HTMLDivElement | null>(null);
  const webCardRef = useRef<HTMLDivElement | null>(null);

  const [videoActive, setVideoActive] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // -----------------------------------------
      // 1. Initial headline reveal
      // -----------------------------------------
      const lines = gsap.utils.toArray<HTMLElement>(".hero-line");

      gsap.set(lines, {
        yPercent: 115,
        opacity: 0,
      });

      gsap.to(lines, {
        yPercent: 0,
        opacity: 1,
        duration: 1.25,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.15,
      });

      // -----------------------------------------
      // 2. Floating image cards entrance
      // -----------------------------------------
      gsap.fromTo(
        ".media-float",
        {
          scale: 0.65,
          opacity: 0,
          rotate: -5,
        },
        {
          scale: 1,
          opacity: 1,
          rotate: 0,
          duration: 1.15,
          stagger: 0.12,
          ease: "expo.out",
          delay: 0.65,
        }
      );

      // -----------------------------------------
      // 3. Continuous subtle floating movement
      // -----------------------------------------
      gsap.to(videoPillRef.current, {
        y: -8,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(aiCardRef.current, {
        y: 9,
        x: -3,
        duration: 3.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(webCardRef.current, {
        y: -10,
        x: 4,
        duration: 3.1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // -----------------------------------------
      // 4. Scroll parallax
      // -----------------------------------------
      gsap.to(videoPillRef.current, {
        x: 45,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.to(aiCardRef.current, {
        y: -75,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 30%",
          end: "bottom top",
          scrub: 1.4,
        },
      });

      gsap.to(webCardRef.current, {
        y: 65,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 20%",
          end: "bottom top",
          scrub: 1.3,
        },
      });

      // -----------------------------------------
      // 5. Bottom content reveal
      // -----------------------------------------
      gsap.fromTo(
        introRef.current,
        {
          y: 55,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: introRef.current,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // -----------------------------------------
      // 6. CTA reveal
      // -----------------------------------------
      gsap.fromTo(
        ".agency-cta",
        {
          y: 35,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".agency-cta",
            start: "top 92%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Cursor-following micro movement
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onMove = (event: MouseEvent) => {
      const rect = section.getBoundingClientRect();

      const x =
        ((event.clientX - rect.left) / rect.width - 0.5) * 2;

      const y =
        ((event.clientY - rect.top) / rect.height - 0.5) * 2;

      gsap.to(".media-float", {
        x: (index) => x * (8 + index * 4),
        rotate: (index) => x * (0.6 + index * 0.25),
        duration: 1.1,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    const onLeave = () => {
      gsap.to(".media-float", {
        x: 0,
        rotate: 0,
        duration: 1.2,
        ease: "power3.out",
      });
    };

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);

    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#f5f5f3]">
      <section
        ref={sectionRef}
        className="
  relative
  min-h-screen
  w-full
  max-w-none
  overflow-hidden
  bg-[#f5f5f3]
  px-[2.5vw]
  pb-16
  pt-24
  text-black
  md:pb-24
  md:pt-28
  lg:pt-32
"
      >
     {/* =====================================================
    GIANT HERO TYPOGRAPHY — FULL WIDTH
====================================================== */}
<div
  ref={headlineRef}
  className="relative z-10 w-full max-w-none"
>
  {/* LINE 1 */}
  <div className="relative w-full overflow-visible">
    <div
      className="
        hero-line
        flex w-full items-center
        whitespace-nowrap
        font-normal uppercase
        leading-[0.78]
        tracking-[-0.075em]
        text-[10.2vw]
      "
    >
      <span>BUILD</span>

      {/* VIDEO PILL */}
      <motion.div
        ref={videoPillRef}
        whileHover={{ scale: 1.08 }}
        onMouseEnter={() => setVideoActive(true)}
        onMouseLeave={() => setVideoActive(false)}
        className="
          media-float
          relative
          mx-[1.4vw]
          hidden
          h-[5.7vw]
          w-[10.4vw]
          shrink-0
          cursor-pointer
          overflow-hidden
          rounded-full
          bg-black
          md:block
        "
      >
        <img
          src="https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=80"
          alt="Digital product interface"
          className="h-full w-full object-cover opacity-75"
        />

        <div className="absolute inset-0 bg-black/15" />

        <motion.div
          animate={{
            scale: videoActive ? 1.18 : 1,
          }}
          transition={{
            duration: 0.35,
            ease: "easeOut",
          }}
          className="
            absolute inset-0
            flex items-center justify-center
            text-[0.85vw]
            font-medium
            tracking-[-0.03em]
            text-white
          "
        >
          <Play
            size={15}
            fill="white"
            className="mr-1"
          />
          PLAY
        </motion.div>
      </motion.div>

      <span>DIGITAL</span>
    </div>
  </div>

  {/* LINE 2 */}
  <div className="relative w-full overflow-visible">
    <div
      className="
        hero-line
        w-full
        whitespace-nowrap
        font-normal uppercase
        leading-[0.78]
        tracking-[-0.075em]
        text-[9.55vw]
      "
    >
      SOLUTIONS THAT
    </div>

    {/* AI TILE */}
    <motion.div
      ref={aiCardRef}
      whileHover={{
        scale: 1.055,
        rotate: -1.5,
      }}
      transition={{
        type: "spring",
        stiffness: 240,
        damping: 18,
      }}
      className="
        media-float
        absolute
        right-[4vw]
        top-[-5%]
        z-20
        hidden
        h-[10.8vw]
        w-[16.2vw]
        overflow-hidden
        bg-[#d8d5cc]
        shadow-[0_20px_50px_rgba(0,0,0,0.08)]
        md:block
      "
    >
      <img
        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=85"
        alt="AI business automation dashboard"
        className="h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/5" />

      <div className="
        absolute bottom-3 left-3
        rounded-full bg-black
        px-3 py-1.5
        text-[9px]
        font-medium uppercase
        tracking-[0.08em]
        text-white
      ">
        AI Automation
      </div>
    </motion.div>
  </div>

  {/* LINE 3 */}
  <div className="relative w-full overflow-visible">
    <div
      className="
        hero-line
        w-full
        whitespace-nowrap
        font-normal uppercase
        leading-[0.78]
        tracking-[-0.075em]
        text-[10.65vw]
      "
    >
      DRIVE GROWTH.
    </div>

    {/* WEB TILE */}
    <motion.div
      ref={webCardRef}
      whileHover={{
        scale: 1.06,
        rotate: 1.8,
      }}
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 17,
      }}
      className="
        media-float
        absolute
        left-[27.5%]
        top-[-14%]
        z-30
        hidden
        h-[9.4vw]
        w-[14vw]
        overflow-hidden
        bg-[#dad7cf]
        shadow-[0_18px_45px_rgba(0,0,0,0.08)]
        md:block
      "
    >
      <img
        src="https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1000&q=85"
        alt="Web and mobile application"
        className="h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/5" />
    </motion.div>
  </div>
</div>

        {/* =====================================================
            MOBILE MEDIA STRIP
        ====================================================== */}
        <div className="mt-10 grid grid-cols-3 gap-2 md:hidden">
          <motion.div
            whileTap={{ scale: 0.96 }}
            className="aspect-[1/1.2] overflow-hidden rounded-full bg-black"
          >
            <img
              src="https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=500&q=80"
              alt="Digital experience"
              className="h-full w-full object-cover opacity-80"
            />
          </motion.div>

          <motion.div
            whileTap={{ scale: 0.96 }}
            className="aspect-[1/1.2] overflow-hidden bg-[#ddd9d0]"
          >
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&q=80"
              alt="AI automation"
              className="h-full w-full object-cover"
            />
          </motion.div>

          <motion.div
            whileTap={{ scale: 0.96 }}
            className="aspect-[1/1.2] overflow-hidden bg-[#ddd9d0]"
          >
            <img
              src="https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=500&q=80"
              alt="Web development"
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>

        {/* =====================================================
            LOWER CONTENT
        ====================================================== */}
        <div
          className="
            relative z-20
            mt-20
            grid grid-cols-1
            gap-14
            md:mt-28
            md:grid-cols-[0.42fr_0.58fr]
            md:gap-16
            lg:mt-32
          "
        >
          {/* LEFT CTA */}
          <div className="flex items-start">
            <motion.a
              href="#services"
              whileHover="hover"
              initial="rest"
              animate="rest"
              className="
                agency-cta
                group
                relative
                flex
                min-h-[118px]
                w-full
                max-w-[440px]
                items-center
                overflow-hidden
                rounded-full
                bg-black
                px-8
                py-6
                text-white
                md:min-h-[120px]
                md:px-12
              "
            >
              {/* hover fill */}
              <motion.div
                variants={{
                  rest: {
                    scaleX: 0,
                  },
                  hover: {
                    scaleX: 1,
                  },
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  transformOrigin: "left center",
                }}
                className="
                  absolute inset-0
                  bg-[#252525]
                "
              />

              <div className="relative z-10 flex w-full items-center justify-between gap-5">
                <span
                  className="
                    max-w-[285px]
                    text-[15px]
                    font-medium
                    uppercase
                    leading-[1.18]
                    tracking-[-0.04em]
                    md:text-[17px]
                  "
                >
                  Explore our technology
                  <br />
                  & partnership approach
                </span>

                <motion.div
                  variants={{
                    rest: {
                      x: 0,
                    },
                    hover: {
                      x: 7,
                    },
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                >
                  <ArrowRight
                    size={21}
                    strokeWidth={1.7}
                  />
                </motion.div>
              </div>
            </motion.a>
          </div>

          {/* RIGHT INTRO */}
          <div
            ref={introRef}
            className="w-full"
          >
            <div className="h-px w-full bg-black/25" />

            <div className="pt-3">
              <p
                className="
                  mb-6
                  text-[12px]
                  font-normal
                  text-[#74747c]
                  md:text-[13px]
                "
              >
                Who We Are
              </p>

              <div className="flex items-start gap-3 md:gap-4">
                <Asterisk
                  className="
                    mt-[5px]
                    h-6 w-6
                    shrink-0
                    md:h-7 md:w-7
                  "
                  strokeWidth={1.7}
                />

                <h2
                  className="
                    max-w-[900px]
                    text-[27px]
                    font-normal
                    leading-[1.1]
                    tracking-[-0.055em]
                    sm:text-[32px]
                    md:text-[35px]
                    lg:text-[39px]
                    xl:text-[42px]
                  "
                >
                  We are a technology-driven software and digital
                  solutions partner helping ambitious businesses
                  build, scale, automate, and transform through
                  modern technology.
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            EXTRA DESCRIPTION — YOUR AGENCY CONTENT
        ====================================================== */}
        <div
          className="
            mt-16
            grid grid-cols-1
            gap-8
            border-t border-black/20
            pt-8
            md:ml-[42%]
            md:mt-20
            md:grid-cols-2
          "
        >
          <p
            className="
              text-[17px]
              leading-[1.45]
              tracking-[-0.025em]
              text-black/75
              md:text-[18px]
            "
          >
            From custom software and high-performance websites
            to mobile applications and AI-powered systems, we
            create secure, scalable, user-focused products built
            around real business goals.
          </p>

          <p
            className="
              text-[17px]
              leading-[1.45]
              tracking-[-0.025em]
              text-black/75
              md:text-[18px]
            "
          >
            Our expertise spans web development, app development,
            AI solutions, SEO, business automation, and digital
            transformation — turning ambitious ideas into
            measurable digital growth.
          </p>
        </div>
      </section>
    </main>
  );
}