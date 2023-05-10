gsap.registerPlugin(ScrollTrigger);

let introduction = document.querySelector('.introduction');
let projects = document.querySelector('.projects');

gsap.to(".scroller", {
    y: ()=> introduction.offsetHeight,
    scrollTrigger: {
        trigger: ".projects",
        scroller: ".holder",
        pin: true,
        start: "top top",
        end: "bottom top",
        markers: true,
        scrub: 1,
        pinSpacing: false

    },
   

});

console.log(introduction.offsetHeight);