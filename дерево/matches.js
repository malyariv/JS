window.addEventListener(("DOMContentLoaded"),()=>{
	
    let btn = document.getElementById("start"),
        areaOut = document.getElementById("out"),
        letters = ['а','б','в',"г","д","е","ж","з","и","й","к","л","м","н","о","п","р","с","т","у","ф","х","ц","ч","ш","ь","э","я"];
        
	
    btn.addEventListener("click", ()=>{
		let strings = document.getElementById("articles").value.split("\n"),
            words = document.getElementById("in").value.split("\n"),
            results = [];
        words.forEach((w)=>{
            letters.forEach((l)=>{
                let _w = l+w,
                    r = new RegExp(_w, 'i'),
                    counter = 0;
                strings.forEach((s)=>{
                    if (r.test(s)) {
                        counter++;
                    }
                });
                if (counter>7) {
                    results.push({
                        word: _w,
                        counter: counter
                    });
                }
            });
        });
        results.sort((a,b)=>b.counter-a.counter);
        let res = "";
        results.forEach((r)=>{
            res +=r.word + "   " + r.counter + "\n";
        });
        areaOut.value = res;
        console.log(results);
    });
});