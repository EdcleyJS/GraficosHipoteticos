var amostraN;
$(document).ready(function () {
	async function animacao(){
		while(amostraN!=-1){
			if(hops && grades!=undefined){
				amostraN=Math.floor(Math.random()* distribution_data.length);
				VisPerguntas();
				bring_front(mapVisPerguntas);
				Vis02TutorialFunction();
				bring_front(mapVis02);
			}
			await sleep(660);
		}
	}
	animacao();
});