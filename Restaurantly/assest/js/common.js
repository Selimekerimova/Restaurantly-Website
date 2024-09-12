let linkElements=document.querySelectorAll("a")
let header=document.querySelector(".bottom-header")
let menuIcon=document.querySelector(".fa-bars")
// active class
linkElements.forEach(item=>item.addEventListener("click",function(){
    linkElements.forEach(link=>link.classList.remove("active"))
    item.classList.toggle("active")
}))

// scroll
window.addEventListener("scroll",function(){
    header.classList.toggle("scrollHeader",scrollY>55)
    // console.log(window.scrollY);
    
})

// menu icon
menuIcon.addEventListener("click",function(){
    this.classList.toggle("fa-xmark")
    document.querySelector(".bottom-header").classList.toggle("responsive-menu")
})