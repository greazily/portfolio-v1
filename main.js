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
    end: ()=> sections[0].offsetWidth * (sections.length - 4),
    invalidateOnRefresh: true,
    onUpdate: self => console.log(self.progress)
  }
});

sections.forEach(section => {section.addEventListener("click", (e)=>{

    let ts = st.scrollTrigger,
        title = section.querySelector(".title"),
        heading = section.querySelector(".heading");

        if(section.classList.contains("active")){
            // insert if statement to handle section index 0
            title.classList.remove("expand");
            section.scrollTo({top: 0, behavior: 'smooth'});
            setTimeout(function() {
                heading.classList.remove("active");
                section.classList.remove("active");
                headerGrid.classList.remove("active");

            if(ts.progress.toFixed(3) > 0 || sections.indexOf(section) > 0) {
                gsap.to(container, {
                    xPercent: scrollLength * ts.progress,
                    duration: .8,
                    delay: .8,
                    ease: "power2.inOut",
                    onComplete: resetScroll
            })} else {
                setTimeout(resetScroll, 800);
                
            }
            

            }, 400);

            function resetScroll() {
                ts.scroll(scrolledDistance);
                ts.enable(false);
                ts.getTween().progress(1);
                title.classList.remove("active");
            
            
            
        }
            

            
            
        } else {

            let delay;

            if(ts.progress.toFixed(3) > 0 || sections.indexOf(section) > 0) {
                gsap.to(container, {
                    xPercent: ()=> -25 * sections.indexOf(section),
                    duration: .8,
                    ease: "power2.inOut",
                    onComplete: activate
                });
            } else {
                activate();
                
            }

            function activate() {
                section.classList.add("active");
                headerGrid.classList.add("active");
                title.classList.add("active");
                heading.classList.add("active");
                ts.disable(false);
                scrolledDistance = ts.scroll();
                setTimeout(function(){
                    title.classList.add("expand");
                }, 800);
                

            }
            
        }

    
    
}) 
});