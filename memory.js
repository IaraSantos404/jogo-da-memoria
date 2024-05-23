(function(){
	

	//var none = document.querySelector("displayNone")

	var pontuação = 0;

	var quant = 0;

	var images = [];

	var viraCartas = [];

	var modal = document.querySelector("#modalGameOver");



	for(var i = 0; i < 20; i++){

		var img = {
			src: "imgs/card" + i + ".jpg",
			id: i % 10 ,
		};

		images.push(img);

	}

	//chama a função startGame
	startGame();

	function startGame(){
		modal.classList.add('displayNone');

		quant = 0;
		pontuação = 0;
		document.getElementById("pontuacao").innerHTML = ("pontuação: " + pontuação)

		viraCartas = [];
		//chamar a função embaralhar
		embaralhar();

		var frontFaces = document.getElementsByClassName("front")
		var backFaces = document.getElementsByClassName("back")

		for(var i = 0; i < 20; i++){
			//remove as classes citadas para o recomeço do jogo
			frontFaces[i].classList.remove("flipped", "par")
			backFaces[i].classList.remove("flipped", "par")

			//posicionamento das cartas
			var card = document.getElementById("card" + i);
			card.style.left = i % 5 === 0 ? 5 + "px" : i % 5 * 155 + 5 + "px";
			card.style.top = i % 4 ===0 ? 5 + "px" : i%4 * 135 + 5 + "px";

			card.addEventListener("click", flipCard, false);

			frontFaces[i].style.background = "url('"+ images[i].src +"')";
			frontFaces[i].setAttribute("id", images[i].id);

		}


		modal.removeEventListener("click", startGame);


	}

	function embaralhar(){
		images.sort(()=>{
    	return 0.5 - Math.random();
		});
	}

	var bloquearCliques = false;
	function flipCard(){
		if(!bloquearCliques){
			if(viraCartas.length < 2){

				var faces = this.getElementsByClassName("face");
	
				//impede q o jogador clique na mesma carta 2 vezes
				if(faces[0].classList.length > 2){
					return;
				}
	
				//o classList.toggle adiciona uma determinada classe caso não
				//tenha no elemento e remove caso tenha.
	
				//0 = face back e 1 = face front
				faces[0].classList.toggle("flipped");
				faces[1].classList.toggle("flipped");
	
				viraCartas.push(this);
	
				if(viraCartas.length == 2){
				
					if(viraCartas[0].childNodes[3].id == viraCartas[1].childNodes[3].id){
	
						viraCartas[0].childNodes[1].classList.toggle("par");
						viraCartas[0].childNodes[3].classList.toggle("par");
						viraCartas[1].childNodes[1].classList.toggle("par");
						viraCartas[1].childNodes[3].classList.toggle("par");
	
						pontuação = pontuação + 100;
						quant = quant + 1;
	
						document.getElementById("pontuacao").innerHTML = ("pontuação: " + pontuação)
	
						viraCartas = [];
	
						if(quant == 10){
							gameOver();
						}
					}
					else {
						// quando as cartas não formam um par
						bloquearCliques = true;
						setTimeout(function() {
							viraCartas[0].childNodes[1].classList.toggle("flipped");
							viraCartas[0].childNodes[3].classList.toggle("flipped");
							viraCartas[1].childNodes[1].classList.toggle("flipped");
							viraCartas[1].childNodes[3].classList.toggle("flipped");
							viraCartas = [];

							bloquearCliques= false;
						}, 1000); }
	
					if(viraCartas[0].childNodes[3].id != viraCartas[1].childNodes[3].id){
						if (pontuação > 0) {
							pontuação = pontuação- 25;
						document.getElementById("pontuacao").innerHTML = ("pontuação: " + pontuação)
	
						}	
					}
	
				}
			}
			else{
				//console.log(viraCartas);
				//1 = face back 3 = face front
				viraCartas[0].childNodes[1].classList.toggle("flipped");
				viraCartas[0].childNodes[3].classList.toggle("flipped");
				viraCartas[1].childNodes[1].classList.toggle("flipped");
				viraCartas[1].childNodes[3].classList.toggle("flipped");
	
				viraCartas = [];
			}
		}
				
	}

	function gameOver(){
		modal.addEventListener("click", startGame);
		 modal.classList. remove('displayNone');

	}

	

}());


