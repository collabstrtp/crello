"use client";

import { useEffect, useLayoutEffect, useRef, useCallback } from "react";
import gsap from "gsap";

type Timeline = gsap.core.Timeline;

import SplitText from "./SplitText";
import ContactForm from "./ContactForm";

interface ContactOverlayProps {
    open: boolean;
    onClose: () => void;
}

export default function ContactOverlay({
    open,
    onClose,
}: ContactOverlayProps) {
    const overlayRef = useRef<HTMLDivElement>(null);

    const topPanel = useRef<HTMLDivElement>(null);
    const bottomPanel = useRef<HTMLDivElement>(null);

    const topText = useRef<HTMLDivElement>(null);
    const bottomText = useRef<HTMLDivElement>(null);

    const cardRef = useRef<HTMLDivElement>(null);

    const formRef = useRef<HTMLDivElement>(null);

    const timeline = useRef<Timeline | undefined>(undefined);
    const isClosing = useRef(false);

    const closeOverlay = useCallback(() => {

        if (isClosing.current) return;

        isClosing.current = true;

        timeline.current?.timeScale(1.45).reverse?.();
    }, []);
    useEffect(() => {

        if (!open) return;

        const card = cardRef.current;

        if (!card) return;

        const move = (e: MouseEvent) => {

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;

            const y = e.clientY - rect.top;

            const rotateY = ((x / rect.width) - 0.5) * 6;

            const rotateX = ((y / rect.height) - 0.5) * -6;

            gsap.to(card, {

                rotateX,

                rotateY,

                duration: .4,

                ease: "power3.out",

                transformPerspective: 1200

            });

        };

        const leave = () => {

            gsap.to(card, {

                rotateX: 0,

                rotateY: 0,
                scale: 1,

                duration: .6,

                ease: "power3.out"

            });

        };

        card.addEventListener("mousemove", move);

        card.addEventListener("mouseleave", leave);

        return () => {

            card.removeEventListener("mousemove", move);

            card.removeEventListener("mouseleave", leave);

        };

    }, [open]);
    useEffect(() => {
        if (!open) return;

        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    useLayoutEffect(() => {
        if (!open) return;
        const mm = gsap.matchMedia();

        const ctx = gsap.context(() => {

            // ----------------------------
            // INITIAL STATES
            // ----------------------------

            gsap.set(topPanel.current, {
                height: "50vh",
            });

            gsap.set(bottomPanel.current, {
                height: "50vh",
            });

            gsap.set(cardRef.current, {
                yPercent: 120,
                scale: 0.86,
                rotate: -6,
            });

            gsap.set(formRef.current, {
                opacity: 0,
                y: 80,
            });

            gsap.set(".split-char", {
                y: 180,
            });

            // ----------------------------
            // TIMELINE
            // ----------------------------

            const tl = gsap.timeline({
                defaults: {
                    ease: "power4.out",
                },
            });

            timeline.current = tl;

            // Overlay

            tl.fromTo(
                overlayRef.current,
                {
                    opacity: 0,
                },
                {
                    opacity: 1,
                    duration: 0.35,
                    ease: "power2.out",
                }
            );

            // GET IN

            tl.to(
                topText.current?.querySelectorAll(".split-char") || [],
                {
                    y: 0,
                    duration: 0.9,
                    stagger: {
                        each: 0.02,
                        from: "start",
                    },
                    ease: "power4.out",
                }
            );

            // TOUCH

            tl.to(
                bottomText.current?.querySelectorAll(".split-char") || [],
                {
                    y: 0,
                    duration: 0.75,
                    stagger: {
                        each: 0.025,
                    },
                    ease: "power4.out",
                },
                "-=0.45"
            );

            // Hold

            tl.to({}, { duration: 0.45 });

            // Panels

            /*  tl.to(
                 topPanel.current,
                 {
                     height: "10vh",
                     duration: 1.2,
                     ease: "power4.inOut",
                 },
                 "open"
             );
 
             tl.to(
                 bottomPanel.current,
                 {
                     height: "10vh",
                     duration: 1.2,
                     ease: "power4.inOut",
                 },
                 "open"
             ); */
            mm.add(
                {
                    isDesktop: "(min-width: 768px)",
                    isMobile: "(max-width: 767px)",
                },
                (context) => {
                    const { isDesktop } = context.conditions as { isDesktop: boolean };
                    const panelHeight = isDesktop ? "11vh" : "8vh";

                    tl.to(topPanel.current, { height: panelHeight, duration: 1.2, ease: "power4.inOut" }, "open");
                    tl.to(bottomPanel.current, { height: panelHeight, duration: 1.2, ease: "power4.inOut" }, "open");
                }
            );
            // Card

            tl.to(
                cardRef.current,
                {
                    yPercent: 0,
                    rotate: 0,
                    scale: 1,
                    duration: 1.35,
                    ease: "power4.out",
                },
                "open+=0.08"
            );

            // Bounce

            tl.to(cardRef.current, {
                scale: 1.015,
                duration: 0.18,
                repeat: 1,
                yoyo: true,
            });

            // Form

            tl.to(
                formRef.current,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                },
                "-=0.4"
            );

            tl.to({}, { duration: 0.08 });

            tl.from(
                formRef.current?.querySelectorAll("[data-stagger]") || [],
                {
                    opacity: 0,
                    y: 30,
                    stagger: 0.12,
                    duration: 0.55,
                    ease: "power4.out",
                },
                "-=0.15"
            );

            // Reverse Complete

            tl.eventCallback("onReverseComplete", () => {
                isClosing.current = false;
                onClose();
            });

        }, overlayRef);

        return () => {
            timeline.current?.kill();
            timeline.current = undefined;
            ctx.revert();
        };

    }, [open, onClose]);

    useEffect(() => {

        if (!open) return;

        const esc = (e: KeyboardEvent) => {

            if (e.key === "Escape") {

                closeOverlay();

            }

        };

        window.addEventListener("keydown", esc);

        return () => {

            window.removeEventListener("keydown", esc);

        };

    }, [open, closeOverlay]);
    if (!open) return null;

    return (
        <div

            ref={overlayRef}

            onMouseDown={(e) => {

                if (e.target === overlayRef.current) {

                    closeOverlay();

                }

            }}
            className="
      fixed
      inset-0
      z-[999]
      bg-black
     overflow-y-auto
md:overflow-hidden
      "
        >

            {/* CLOSE */}

            <button
                onClick={closeOverlay} className="
absolute
right-10
top-10
z-50
uppercase
tracking-[6px]
text-white
text-sm
transition-opacity
duration-300
hover:text-orange-500"
            >
                CLOSE
            </button>

            {/* TOP PANEL */}

            <section
                ref={topPanel}
                className="
        absolute
        top-0
        left-0
        z-40
        flex
        w-full
        items-end
        justify-center
        overflow-hidden
        bg-black
        "
            >

                <div
                    ref={topText}
                    className="pb-0"
                >
                    <SplitText
                        text="GET IN"
                        className="
            font-black
            uppercase
            text-white
            leading-none
            tracking-[-8px]
            text-[90px]
            sm:text-[150px]
            lg:text-[260px]
            "
                    />
                </div>

            </section>

            {/* CARD */}

            <section
                ref={cardRef}
                style={{

                    pointerEvents: isClosing.current ? "none" : "auto"
                }}

                className="
absolute
z-20
left-1/2
-translate-x-1/2
w-[96vw]
max-w-[1500px]
top-[8vh]
bottom-[8vh]
overflow-hidden
rounded-[18px]
md:rounded-[28px]
"
            >

                <div
                    ref={formRef}
                    className="h-full"
                >
                    <ContactForm />
                </div>

            </section>

            {/* BOTTOM PANEL */}

            <section
                ref={bottomPanel}
                className="
        absolute
        bottom-0
        left-0
        z-40
       flex
        w-full
        items-start
        justify-center
        overflow-hidden
        bg-black
        "
            >

                <div
                    ref={bottomText}
                    className="pt-0"
                >
                    <SplitText
                        text="TOUCH"
                        className="
            font-black
            uppercase
            text-white
            leading-none
            tracking-[-8px]
            text-[72px]
sm:text-[120px]
md:text-[180px]
lg:text-[260px]
            "
                    />
                </div>

            </section>

        </div>
    );
}