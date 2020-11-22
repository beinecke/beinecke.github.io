export function shuffle(arr){
	let sor = arr.map(function(m){
		return Object.assign({
			score: Math.random(),
		}, m);
	})
		.sort(function(a, b){
			return a.score - b.score;
		})
	return sor;
}

export function fRandomArr(arr) {
	return arr.sort(() => {return Math.random()-0.5});
}

export function fCompareArr(arr1,arr2) {
	let bol = false;
	arr1.forEach(el => {
		if(arr2.indexOf(el)>-1){
			bol = true;
		}
	})
	return bol;
}
