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

//生成从minNum到maxNum的随机数
export function getRandom(minNum, maxNum) {
	switch (arguments.length) {
		case 1:
			return parseInt(Math.random() * minNum + 1, 10);
			break;
		case 2:
			return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
			break;
		default:
			return 0;
			break;
	}
}