window.addEventListener("DOMContentLoaded",()=>{
    'use strict';
    let info = document.querySelector(".info-header"),
        infoTab = document.querySelectorAll(".info-header-tab"),
        tabContent = document.querySelectorAll(".info-tabcontent");
    
    function hideTabContent(x) {
        for(let i = x; i < tabContent.length; i++) {
            tabContent[i].classList.remove("show");
            tabContent[i].classList.add("hide");
        }
    }

    hideTabContent(1);

    function showTabContent(x) {
        if (tabContent[x].classList.contains("hide")) {
            tabContent[x].classList.remove("hide");
            tabContent[x].classList.add("show");
        }
    }

    info.addEventListener("click", (event)=>{
        const target = event.target;
        if (target && target.classList.contains("info-header-tab")){
            for (let i=0; i<infoTab.length; i++) {
                if (target == infoTab[i]) {
                    console.log(i)
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }    
        }
    });

    const deadLine = Date.now()+18*3600000+20*60000+11000;
    
    function getRemainingTime(dl){
        const t = dl - Date.now(),
              s = Math.floor(t/1000) % 60,
              m = Math.floor(t/60000) % 60,
              h = Math.floor(t/3600000);
        return {
            total : t,
            sec: s,
            min: m,
            hours: h
        } 
    }

    function setClock(id, dl) {
        const timer = document.getElementById(id),
            hours = timer.querySelector(".hours"),
            min = timer.querySelector(".minutes"),
            sec = timer.querySelector(".seconds"),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock(){
            let t = getRemainingTime(dl);
            hours.textContent = t.hours<10? "0"+t.hours: t.hours;
            min.textContent = t.min<10? "0"+t.min: t.min;
            sec.textContent = t.sec<10? "0"+t.sec: t.sec;

            if (t.total<=1) clearInterval(timeInterval);
        }

    }

    setClock("timer", deadLine);

    let more = document.querySelector(".more"),
        overlay = document.querySelector(".overlay"),
        close = document.querySelector(".popup-close");
    more.addEventListener("click",()=>{
        overlay.style.display = "block";
        more.classList.add(".more-splash");
        document.body.style.overflow = "hidden";
    });
    close.addEventListener("click", ()=>{
        overlay.style.display="none";
        more.classList.remove("more-splash");
        document.body.style.overflow = "";
    });

    // отправка формы на бек
    let message = {
        loading: "Загрузка ...",
        success: "Спасибо! Мы скоро с вами свяжемся.",
        failure: "Что-то пошло не так"
    };

    let form = document.querySelector(".main-form"),
        inputs = form.querySelectorAll("input"),
        statusMsg = document.createElement("div");
    
        statusMsg.classList.add("status");
    
    form.addEventListener("submit", (e)=>{
        e.preventDefault();
        form.appendChild(statusMsg);
        let formData = new FormData(form),
            json = {};
        formData.forEach((v,k)=> json[k] = v);
        console.log(json);
        postData(json)
            .then((arg)=> arg == "loading"? statusMsg.textContent = message.loading: statusMsg.textContent = message.success)
            .then((arg)=> arg == "loading"? statusMsg.textContent = message.loading: statusMsg.textContent = message.success)
            .catch(() => statusMsg.textContent = message.failure)
            .then(()=> inputs.forEach((e)=>e.value=""));
    });

    function postData(data) {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open("POST", "/needFeedback");
            request.setRequestHeader("Content-type", "application/json");
            request.send(JSON.stringify(data));
            request.addEventListener("readystatechange", ()=>{
                if (request.readyState<4) resolve("loading");
                else if (request.status == 200) resolve("success");
                     else reject();
            });    
        });
    }

    //Slider
    let slides = document.querySelectorAll(".slider-item"),
        dots = document.querySelectorAll(".dot"),
        dotContainer = document.querySelector(".slider-dots"),
        prev = document.querySelector(".arrow-left"),
        next = document.querySelector(".arrow-right"),
        currentSlideIndex = 0;
    
    function showSlide(n) {
        slides.forEach(s => s.style.display = "none");
        slides[n].style.display = "block";
    }
    showSlide(currentSlideIndex);

    prev.addEventListener("click", ()=>{
        currentSlideIndex>0? currentSlideIndex--: currentSlideIndex = slides.length -1;
        showSlide(currentSlideIndex);
        activeDot(currentSlideIndex);
    });
    next.addEventListener("click", ()=>{
        currentSlideIndex < (slides.length -1)? currentSlideIndex++: currentSlideIndex = 0;
        showSlide(currentSlideIndex);
        activeDot(currentSlideIndex);
    });
    dotContainer.addEventListener("click", ev => {
        const target = ev.target;
        dots.forEach((el, ind) => {
            if (el === target) {
                currentSlideIndex = ind;
                showSlide(ind);
                activeDot(ind);
            }
        });
    });
    function activeDot(n) {
        dots.forEach(el => el.classList.remove("dot-active"));
        dots[n].classList.add("dot-active");
    }
    //Calculator
    let people = document.querySelectorAll(".counter-block-input")[0],
        days = document.querySelectorAll(".counter-block-input")[1],
        select = document.getElementById("select"),
        total = 0,
        totalField = document.getElementById("total");
    totalField.textContent = 0;
    people.addEventListener("change", function(){
        if (people.value && days.value) total = (parseInt(people.value)+parseInt(days.value))*4000;
        else total = 0;
        showTotal();
    });
    days.addEventListener("change", function(){
        if (people.value && days.value) total = (parseInt(people.value)+parseInt(days.value))*4000;
        else total = 0;
        showTotal();
    });
    select.addEventListener("change", ()=>{
        if (people.value && days.value) total = (parseInt(people.value)+parseInt(days.value))*4000;
        else total = 0;
        showTotal();
    });
    function showTotal(){
        totalField.textContent = parseFloat(select.value)*total;
    };

});