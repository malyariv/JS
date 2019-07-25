let rub = document.getElementById("rub"),
    usd = document.getElementById("usd"),
    euro = document.getElementById("euro");


rub.addEventListener("input",(ev)=>{
    let request = new XMLHttpRequest();
    request.open("GET", "/currency");
    request.setRequestHeader("Content-type", "application/json; charset = utf-8");
    request.send();
    request.addEventListener("readystatechange", function(){
        if (request.readyState === 4 && request.status === 200) {
            let result = JSON.parse(request.response);
            usd.value = (parseFloat(rub.value) / parseFloat(result.usd)).toFixed(3);
            euro.value = (parseFloat(rub.value) / parseFloat(result.euro)).toFixed(3);
        }
    });

 //   console.log("responce is " + getJson());
});

