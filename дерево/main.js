window.addEventListener(("DOMContentLoaded"),()=>{
	
	let btn = document.getElementById("start"),
		textField = document.getElementById("limit"),
		l = parseFloat(textField.value);
	const entropyLimit = l? l: 1;
	
	btn.addEventListener("click", ()=>{
		let strings = document.getElementById("articles").value.split("\n"),
			words = document.getElementById("words").value.split("\n"),
			regs = [];		
		words.forEach((el, index)=>{
			let r = new RegExp(el, 'i'),
				refs = [];			
			strings.forEach((s, ind)=>{
				if (r.test(s)) {
					refs.push(ind+1);
				}
			});
			regs.push({
				regular : r,
				references: refs
			});
		});
		let results = document.getElementById("results"),
			s = "";
		regs.forEach((el) => s += el.regular + "        " + el.references.length + "       "+ el.references + "\n");
		results.value = s;

		let unique = (r) => {
			let arr = [];
			r.forEach((x) => x.references.forEach((y)=>arr.push(y)));
			const s = [...new Set(arr)];
			return s;
		};

		let S = (x, y) => {
			return x==y? 0: x==0? 0: x*Math.log2(x/y)/y
		};
		
		let s0 = (r , totalAmount)=>{
			let sum = 0;
			r.forEach((x)=>{sum -= S(x.references.length, totalAmount)});
			return sum;
		};
		function getRegexNode(r) {
			let RegexNode = {};
			RegexNode.regexSet = r;
			RegexNode.uniqueArticles = unique(r);
			RegexNode.entropy = s0(r, RegexNode.uniqueArticles.length);
			return RegexNode;
		};
		let x = getRegexNode(regs);
		

		function getRest(strings, set) {
			let stroka="";
			strings.forEach((el, ind)=>{
				if (!set.has(ind+1)) {
					stroka += el + "\n";
				}
			});
			return stroka;
		};
		document.getElementById("rest").value = getRest(strings, new Set(x.uniqueArticles));
//		console.log(x);

		function intersection(arrA, arrB) {
			let _intersection = [], setB = new Set(arrB);
			arrA.forEach((el)=>{
				if (setB.has(el)) {
					_intersection.push(el);
				}
			});
			return _intersection;
		}
		function antiIntersection(arrA, arrB) {
			let _intersection = [], setB = new Set(arrB);
			arrA.forEach((el)=>{
				if (!setB.has(el)) {
					_intersection.push(el);
				}
			});
			return _intersection;
		}
		
		function getEtropyGain(rn){
			rn.entropyGain = []
			rn.regexSet.forEach((r)=>{
				let entropyYes = 0, entropyNo = 0;
				rn.regexSet.forEach((_r) => {
					let i = intersection(r.references, _r.references);
					entropyYes -= S(i.length,r.references.length);
					entropyNo -= S(_r.references.length - i.length, rn.uniqueArticles.length-r.references.length);
				});
				rn.entropyGain.push(rn.entropy - r.references.length*entropyYes/rn.uniqueArticles.length - (rn.uniqueArticles.length-r.references.length)*entropyNo/rn.uniqueArticles.length); 
//				console.log("yes=" + entropyYes);
//				console.log("no=" + entropyNo);
			});

//			console.log(rn.entropy);
//			console.log(rn.entropyGain);
		}

		function buildTree(rn){
			if (rn.regexSet.length ==1 || rn.entropy<entropyLimit) return rn;
			getEtropyGain(rn);
			let max = 0, maxInd = 0;
			rn.entropyGain.forEach((el, i)=>{
				if (el > max) {
					maxInd = i;
					max = el;
				}
			});
			rn.element = rn.regexSet[maxInd].regular;
//			console.log("max entropy is " + max + " in " + maxInd);
			const tuple = split(rn.regexSet, maxInd);
			rn.yesChild = buildTree(getRegexNode(tuple.y));
			rn.noChild = buildTree(getRegexNode(tuple.n));
			return rn;
		}

		function split(regSet, ind){
			let yes = [], no = [];
			regSet.forEach((el, i)=>{
				if (ind ==i) {
					yes.push({
						regular : el.regular,
						references: el.references		
					});
				}
				else{
					let inter = intersection(el.references, regSet[ind].references),
						antiinter = antiIntersection(el.references, regSet[ind].references);
					yes.push({
						regular : el.regular,
						references: inter		
					});
					no.push({
						regular : el.regular,
						references: antiinter		
					});
				}
			}); 
			return {y: yes, n: no}
		}
		let tree = buildTree(x);

		function drawTree(tree, flag, level) {
			let ul = flag? "":"<div id='root'>";
			let f = flag? flag: "";
			if (tree.yesChild || tree.noChild) {
				ul += f + "RegEx=" + tree.element+",  S=" + tree.entropy.toFixed(2) + ",  N=" + tree.uniqueArticles.length + "<ul>";			
				if (tree.yesChild && tree.yesChild.entropy>entropyLimit) ul += "<li class='child"+ level+"' style='display: none'>" + drawTree(tree.yesChild, "yes  ", level + 1) + "</li>";
				if (tree.noChild && tree.noChild.entropy>entropyLimit) ul += "<li class='child"+level+"' style='display: none'>" + drawTree(tree.noChild, "no  ", level + 1) + "</li>";
				if (flag) ul +="</ul>"
				else ul += "</div>";
			}
			return ul;
		};
		//style='display: none'
		let t = drawTree(tree, "", 1)
		const out = document.getElementById("out");
		out.innerHTML = t;
		console.log(tree);

	
	});

	function showOrHideChildren(el, level){
		let children = el.querySelectorAll(".child"+level)
		children.forEach((e)=>{
			if (e.style.display == "none") e.style.display="";
			else e.style.display="none";
		});
	}

	let out = document.getElementById("out");
	out.addEventListener('click',(event)=>{
		let t = event.target, r = document.getElementById("root");
		if (t && t==r) {
			showOrHideChildren(r, 1);
		}
		for(let i=1; i<10; i++) {
			let c = "child"+i;
			if (t&&t.classList.contains(c)) {
				showOrHideChildren(t, i+1);
				break
			}
		}
	});
});


	


