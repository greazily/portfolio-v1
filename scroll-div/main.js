gsap.registerPlugin(Scrolltrigger);

gsap.to(".horizontal",{
    xPercent: -400,
    ease: "none",
    scrollTrigger: {
        scroller: ".scroller",
        trigger: ".horizontal",
        pin: true,
        scrub: 1,
        markers: true,
        end: "+=400" 
    }
})