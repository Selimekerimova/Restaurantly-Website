let menuBtns=document.querySelectorAll(".menu-btn")
let menuCards=document.querySelector(".menu-cards")
let checkLinks=document.querySelectorAll(".check-link")
let checkLists=document.querySelectorAll(".specials-content ul li")
let menuArr;
const BASE_URL="http://localhost:8080";

// swiper
document.addEventListener("DOMContentLoaded", function () {
    const openBtn = document.querySelector(".fa-play");
    const closeBtn = document.querySelector(".close-button");
    const swiperModal = document.getElementById("swiper-modal");
    let mySwiper;

    // Swiper-ı yaratmaq funksiyası
    function initializeSwiper() {
      if (!mySwiper) {
        mySwiper = new Swiper(".swiper-container", {
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          loop: false,
        });
      }
    }

    // İkona klik edildikdə modalı aç
    openBtn.addEventListener("click", function () {
      swiperModal.style.display = "flex";
      this.style.display="none"
      initializeSwiper();
    });

    // Close buttona klik edildikdə modalı bağla
    closeBtn.addEventListener("click", function () {
      swiperModal.style.display = "none";
      openBtn.style.display='flex'
      // Video dayandırmaq üçün:
      const video = swiperModal.querySelector("iframe");
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    });

  
  });


  // event swiper
  var swiper = new Swiper(".mySwiper", {
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
     
    },
    autoplay: {
      delay: 2500,  // 2.5 saniyəlik interval
      disableOnInteraction: false,  // İstifadəçi ilə qarşılıqlı təsirdən sonra da avtomatik hərəkəti davam etdir
    },
    loop: true,
    
  });

  // / / / / / slider
  let currentIndex = 0;
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length / 2;  // Təkrar olan şəkillərə görə yarısı
  const slideTrack = document.querySelector('.slide-track');
  const dots = document.querySelectorAll('.dot'); // Dairələr
  
  
  function showNextSlide() {
    currentIndex++;
    
    // Şəkillərin yarısına çatdıqda sıfırdan başla
    if (currentIndex >= totalSlides) {
      slideTrack.style.transition = "none"; // Keçidi dayandır
      currentIndex = 0; // Sıfırdan başla
      slideTrack.style.transform = `translateX(0px)`; // Şəkili başa al
      
      // Keçidə davam etmək üçün kiçik bir gecikmə
      setTimeout(() => {
        slideTrack.style.transition = "transform 0.5s ease"; // Keçidi bərpa et
      }, 50);
    } else {
      slideTrack.style.transform = `translateX(-${currentIndex * 450}px)`;
    }
      
    // Dairələri yenilə
    updateDots();
  }
  
  // Hər 3 saniyədə bir avtomatik dəyişsin
  setInterval(showNextSlide, 3000);
  
  // Dairələri yenilə
  function updateDots() {
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  // Əgər əvvəlcədən aktiv olaraq göstərilən birinci dairə varsa, onu yenilə
  updateDots();
  

  // scroll
window.addEventListener("scroll",function(){
 document.querySelector(".btn-content").classList.toggle("show-btn",scrollY>300)
  // console.log(window.scrollY);

})

document.querySelector(".scroll-btn").addEventListener("click",function(){
  window.scrollTo(0,0)
})

// active class
menuBtns.forEach(item=>{
  item.addEventListener("click",function(){
    menuBtns.forEach(elem=>elem.classList.remove("active"))
    item.classList.toggle("active")
  })
})


// menu 
async function getAllData(endpoint){
  try {
    const res= await axios(`${BASE_URL}/${endpoint}`)
    menuArr=[...res.data]
    // console.log(data);
    drawCard(res.data)
  } catch (error) {
    console.log(error);
  }
}
getAllData("product")

// draw card
function drawCard(data){
  menuCards.innerHTML=""
  data.forEach(item=>{

    let menuCard=document.createElement("div")
    menuCard.classList.add("menu-card")

    let leftSide=document.createElement("div")
    leftSide.classList.add("left-side")
    
    let image=document.createElement("img")
    image.src=`${item.img}`
    
    let rightSide=document.createElement("div")
    rightSide.classList.add("right-side")
    
    let top=document.createElement("div")
    top.classList.add("top")

    let dots=document.createElement("span")
    top.classList.add("dots")

    let price=document.createElement("p")
    price.classList.add("price")
    price.innerText=`${item.price}`


    let menuTitle=document.createElement("h3")
    menuTitle.classList.add("menu-title")
    menuTitle.innerText=`${item.title}`

    let ingredients=document.createElement("p")
    ingredients.classList.add("menu-content")
    ingredients.innerText=`${item.content}`


leftSide.append(image)
rightSide.append(top,ingredients)
top.append(menuTitle,dots,price)
menuCard.append(leftSide,rightSide)
menuCards.append(menuCard)
  })
}

// filter menu
menuBtns.forEach(btn=>{
  btn.addEventListener("click",function(){
    if(btn.textContent==="All"){
    drawCard(menuArr)
    }
    if(btn.textContent==="Starters"){
      let filtered=menuArr.filter(item=>item.category=="starters")
      drawCard(filtered)
    }
    if(btn.textContent==="Salads"){
      let filtered=menuArr.filter(item=>item.category=="salads")
      drawCard(filtered)
    }
    if(btn.textContent==="Specialty"){
      let filtered=menuArr.filter(item=>item.category=="specialty")
      drawCard(filtered)
    }
  })
})

// Check Our Specials

checkLists.forEach(list=>{
  list.addEventListener("click",function(){
    checkLists.forEach(item=>{
      item.classList.remove("active")
    })
    list.classList.add("active")
  })
})

let contentDivs=document.querySelectorAll(".special-text")
  contentDivs.forEach(div=>{
  checkLinks[0].addEventListener("click", function(){
    div.classList.remove("show")
    contentDivs[0].classList.add("show")
  })
  checkLinks[1].addEventListener("click", function(){
    div.classList.remove("show")
    contentDivs[1].classList.add("show")
  })
  checkLinks[2].addEventListener("click", function(){
    div.classList.remove("show")
    contentDivs[2].classList.add("show")
  })
  checkLinks[3].addEventListener("click", function(){
    div.classList.remove("show")
    contentDivs[3].classList.add("show")
  })
  checkLinks[4].addEventListener("click", function(){
    div.classList.remove("show")
    contentDivs[4].classList.add("show")
  })
})


// Galery swiper slide

