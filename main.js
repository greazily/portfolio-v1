gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

window.history.scrollRestoration = "manual";

let sections = gsap.utils.toArray(".panel"),
    container = document.querySelector(".container"),
    headerGrid = document.querySelector(".header-grid"),
    scrollLength = - 25 * (sections.length - 4),
    scrolledDistance = 0;


    
let st = gsap.to(container, {
  xPercent:()=> scrollLength,
  ease: "none",
  scrollTrigger: {
    trigger: ".layout-rows",
    pin: true,
    scrub: 1,
    markers: true,
    end: ()=> sections[0].offsetWidth * sections.length,
    invalidateOnRefresh: true,
    onUpdate: self => console.log(self.progress)
  }
});

sections.forEach(section => {section.addEventListener("click", (e)=>{

    let ts = st.scrollTrigger;

        if(section.classList.contains("active")){
            // insert if statement to handle section index 0
            section.scrollTo({top: 0, behavior: 'smooth'});
            // $(section).animate({scrollTop: 0}, 500);
            // section.scrollTop = 0;
            section.classList.remove("active");
            headerGrid.classList.remove("active");

            

            gsap.to(container, {
                xPercent: scrollLength * ts.progress,
                duration: .8,
                delay: .8,
                ease: "power2.inOut",
                onComplete: resetScroll
            })

            function resetScroll() {
                ts.enable(false);
                ts.scroll(scrolledDistance);
                
            }


            
            
        } else {

            if(ts.progress.toFixed(3) > 0 || sections.indexOf(section) > 0) {
                gsap.to(container, {
                    xPercent: ()=> -25 * sections.indexOf(section),
                    duration: .8,
                    ease: "power2.inOut",
                    onComplete: activate
                })
            } else {
                activate();
            }

            function activate() {
                section.classList.add("active");
                headerGrid.classList.add("active");
                ts.disable(false);
                scrolledDistance = ts.scroll();

            }
            
        }

    
    
}) 
});