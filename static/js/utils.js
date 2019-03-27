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