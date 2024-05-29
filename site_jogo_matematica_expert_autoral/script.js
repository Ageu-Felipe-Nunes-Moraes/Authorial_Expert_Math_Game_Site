
class Difficulty{
    constructor(){
        if (!Difficulty.instance){
            this.time = 0;
        }
        return;
    }

    difficultyButtonClick(id){
        switch (id){         
            case "easy":
                this.time = 61;
                break;
            case "medium":
                this.time = 31;
                break;
            case "hard":
                this.time = 16;
                break;
            case "expert":
                this.time = 11;
                break;
            case "nightmare":
                this.time = 6;
                break;
            default:
                console.log("Botão não reconhecido");
        }
        localStorage.setItem('time', JSON.stringify(this.time))
        window.location.href = "jogo.html"; // Redireciona para a página do jogo
    }
}


// Cria uma instância única da classe Jogo
const difficulty = new Difficulty();
