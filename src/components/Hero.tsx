"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, Asterisk } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const mainRef = useRef<HTMLElement | null>(null);
    const heroRef = useRef<HTMLElement | null>(null);
    const heroTitleRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            /*
            =====================================================
            1. HERO ENTRANCE ANIMATION
            Inner elements control Y movement + rotation
            =====================================================
            */

            const heroLines =
                gsap.utils.toArray<HTMLElement>(".hero-line-inner");

            gsap.fromTo(
                heroLines,
                {
                    yPercent: 120,
                    rotate: 3,
                },
                {
                    yPercent: 0,
                    rotate: 0,
                    duration: 1.4,
                    stagger: 0.12,
                    ease: "power4.out",
                    delay: 0.2,
                }
            );

            /*
            =====================================================
            2. META ENTRANCE ANIMATION
            =====================================================
            */

            gsap.fromTo(
                ".hero-meta",
                {
                    opacity: 0,
                    y: 30,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.12,
                    delay: 1,
                    ease: "power3.out",
                }
            );

            /*
            =====================================================
            3. SCROLL ANIMATION

            IMPORTANT:
            We animate .hero-scroll-line-* wrappers.

            We DO NOT animate .hero-line-inner horizontally.

            Therefore:
            - inner = entrance animation
            - outer = scroll animation

            No transform conflict.
            =====================================================
            */

            gsap.fromTo(
                ".hero-scroll-line-1",
                {
                    x: 0,
                },
                {
                    x: "-35vw",
                    ease: "none",
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: 1,
                        invalidateOnRefresh: true,
                    },
                }
            );

            gsap.fromTo(
                ".hero-scroll-line-2",
                {
                    x: 0,
                },
                {
                    x: "35vw",
                    ease: "none",
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: 1,
                        invalidateOnRefresh: true,
                    },
                }
            );

            gsap.fromTo(
                ".hero-scroll-line-3",
                {
                    x: 0,
                },
                {
                    x: "-35vw",
                    ease: "none",
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: 1,
                        invalidateOnRefresh: true,
                    },
                }
            );

            /*
            =====================================================
            4. WHOLE TITLE VERTICAL PARALLAX
            =====================================================
            */

            if (heroTitleRef.current) {
                gsap.to(heroTitleRef.current, {
                    yPercent: -18,
                    ease: "none",
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: 1,
                    },
                });
            }

            /*
            =====================================================
            REFRESH AFTER DOM IS READY
            =====================================================
            */

            requestAnimationFrame(() => {
                ScrollTrigger.refresh();
            });
        }, mainRef);

        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <main
            ref={mainRef}
            className="min-h-screen overflow-x-hidden bg-white"
        >
            <section
                ref={heroRef}
                className="relative h-screen overflow-hidden bg-white text-black"            >
                <div className="relative z-10 flex min-h-screen flex-col justify-between px-5 pb-8 pt-28 md:px-10 md:pb-10 md:pt-22">

                    {/* ================= TOP META ================= */}

                    <div className="hero-meta flex items-center justify-between text-[9px] uppercase tracking-[0.18em] text-black/60 md:text-[11px]">
                        <span>
                           
                            CUSTOM SOFTWARE
                                                        <br />

                            DEVELOPMENT COMPANY
                        </span>

                        <span className="hidden text-right md:block">
                            Strategy / Design / AI
                            <br />
                            Digital / Web / Automation
                        </span>
                    </div>

                    {/* ================= HERO TITLE ================= */}

                    <div
                        ref={heroTitleRef}
                        className="relative"
                    >
                        <h2 className="select-none font-bold font-black uppercase">

                            {/* =====================================
                                LINE 1 — WE BUILD
                                SCROLL LEFT
                            ====================================== */}

                            <div className="hero-scroll-line-1 pb-[0.25em]">
                                <div className="hero-line-clip overflow-hidden">
                                    <div className="hero-line-inner whitespace-nowrap text-[15.5vw] leading-[0.82] tracking-[-0.08em] md:text-[15.5vw] md:leading-[0.82]">

                                        <span>WE </span>

                                        {/* B */}

                                        <span className="relative inline-block">
                                            <span className="absolute left-[22%] top-[14%] z-0 h-[72%] w-[56%] overflow-hidden">
                                                <img
                                                    src="https://miro.medium.com/1*nCpfU7AD35VLsljEvbVfSw.gif"
                                                    alt=""
                                                    className="h-full w-full object-cover"
                                                />
                                            </span>

                                            <span className="relative z-10">
                                                B
                                            </span>
                                        </span>

                                        <span>UIL</span>

                                        {/* D */}

                                        <span className="relative inline-block">
                                            <span className="absolute left-[20%] top-[14%] z-0 h-[72%] w-[58%] overflow-hidden">
                                                <img
                                                    src="https://www.idigitie.com/images/gif/search-engine-machine.gif"
                                                    alt=""
                                                    className="h-full w-full object-cover"
                                                />
                                            </span>

                                            <span className="relative z-10">
                                                D
                                            </span>
                                        </span>

                                    </div>
                                </div>
                            </div>

                            {/* =====================================
                                LINE 2 — DIGITAL
                                SCROLL RIGHT
                            ====================================== */}

                            <div className="hero-scroll-line-2 pb-[0.25em]">
                                <div className="hero-line-clip overflow-hidden">
                                    <div className="hero-line-inner flex items-center justify-between whitespace-nowrap text-[15.5vw] leading-[0.82] tracking-[-0.08em] md:text-[15.5vw] md:leading-[0.82]">

                                        <span>
                                            {/* D */}

                                            <span className="relative inline-block">
                                                <span className="absolute left-[20%] top-[14%] z-0 h-[72%] w-[58%] overflow-hidden">
                                                    <img
                                                        src="https://xtrimdigitech.com/wp-content/uploads/2025/10/web-dev.gif"
                                                        alt=""
                                                        className="h-full w-full object-cover"
                                                    />
                                                </span>

                                                <span className="relative z-10">
                                                    D
                                                </span>
                                            </span>

                                            <span>IGIT</span>

                                            {/* A */}

                                            <span className="relative inline-block">
                                                <span className="absolute left-[34%] top-[30%] z-0 h-[50%] w-[36%] overflow-hidden">
                                                    <img
                                                        src="https://cdn.dribbble.com/userupload/20238560/file/original-60c0ff28e65e651c81b8e08cea9fa5ba.gif"
                                                        alt=""
                                                        className="h-full w-full object-cover"
                                                    />
                                                </span>

                                                <span className="relative z-10">
                                                    A
                                                </span>
                                            </span>

                                            <span>L</span>
                                        </span>

                                        <Asterisk
                                            className="hidden h-[8vw] w-[8vw] shrink-0 animate-spin md:block"
                                            style={{
                                                animationDuration: "9s",
                                            }}
                                            strokeWidth={0.8}
                                        />

                                    </div>
                                </div>
                            </div>

                            {/* =====================================
                                LINE 3 — SOLUTIONS.
                                SCROLL LEFT
                            ====================================== */}

                            <div className="hero-scroll-line-3 pb-[0.25em]">
                                <div className="hero-line-clip overflow-hidden pb-[0.12em]">                                    <div className="hero-line-inner whitespace-nowrap text-[15.5vw] leading-[0.82] tracking-[-0.08em] text-[#ff4d00] md:text-[15.5vw] md:leading-[0.82]">
                                    <span>S</span>

                                    {/* FIRST O */}

                                    <span className="relative inline-block">
                                        <span className="absolute left-[18%] top-[14%] z-0 h-[72%] w-[64%] overflow-hidden rounded-[50%]">
                                            <img
                                                src="https://gsmdigitalsolutions.com/wp-content/uploads/2022/10/169c11293f5c08a325ee1bbc8a0d4cb8.gif"
                                                alt=""
                                                className="h-full w-full object-cover"
                                            />
                                        </span>

                                        <span className="relative z-10">
                                            O
                                        </span>
                                    </span>

                                    <span>LUTI</span>

                                    {/* SECOND O */}

                                    <span className="relative inline-block">
                                        <span className="absolute left-[18%] top-[14%] z-0 h-[72%] w-[64%] overflow-hidden rounded-[50%]">
                                            <img
                                                src="https://xtrimdigitech.com/wp-content/uploads/2025/10/Graphics-design-company-digitaljetuk-1-1.gif"
                                                alt=""
                                                className="h-full w-full object-cover"
                                            />
                                        </span>

                                        <span className="relative z-10">
                                            O
                                        </span>
                                    </span>

                                    <span>NS.</span>

                                </div>
                                </div>
                            </div>

                        </h2>
                    </div>

                    {/* ================= BOTTOM META ================= */}

                    <div className="hero-meta flex items-end justify-between">
                        <p className="max-w-[250px] text-xs uppercase leading-relaxed tracking-[0.08em] text-black/60">
                            We build websites, custom software, AI solutions, and SaaS products for modern businesses.
                        </p>

                        <a
                            href="#work"
                            className="flex h-14 w-14 items-center justify-center rounded-full border border-black/30 transition-all duration-300 hover:bg-black hover:text-white md:h-20 md:w-20"
                        >
                            <ArrowDown size={20} />
                        </a>
                    </div>

                </div>
            </section>
        </main>
    );
}