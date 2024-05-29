
class Jogo{
    constructor(){
        if (!Jogo.instance){
            this.result = 0;
            this.firstValue = 0;
            this.secondValue = 0;
            this.numberQuestion = 0;;
            this.bigNumbersList = [];
            this.smallNumbersList = [];
            this.possibleResultsList = [];
            this.operation = "";
            this.popup = "" 
            this.operationList = ["+", "-", "*", "/"];
            this.initialTime = JSON.parse(localStorage.getItem('time'));
            this.time = this.initialTime;
            this.timerInterval = null; // Property to hold the interval ID
        }
        return;
    }

    timer() {
        this.timeId = document.getElementById("time");
        if (this.timeId) {
            const formattedTime = `${this.pad(Math.floor(this.time / 60))}:${this.pad(this.time % 60)}`;
            this.timeId.innerHTML = `Tempo: ${formattedTime}`;
        } else {
            console.error("Elemento com ID 'time' não encontrado.");
        }
    }
    
    pad(value) {
        return value < 10 ? "0" + value : value;
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            if (this.time > 0) {
                this.time--;
                this.timer();
            } else {
                clearInterval(this.timerInterval);
                this.addPopupRestart();
            }
        }, 1000); // Update every second
    }

    stopTimer() {
        clearInterval(this.timerInterval);
    }

    timeRestart(){
        this.time = this.initialTime;
    }

    // Método de inicialização que preenche as listas de números
    initializeLists() { //Ok
        for (let i = 1; i < 31; i++) {
            this.smallNumbersList.push(i);
        }

        for (let i = 1; i < 101; i++) {
            this.bigNumbersList.push(i);
        }
    }

    randomValueSmallNumbers(){ // Ok
        return Math.floor(Math.random() * this.smallNumbersList.length);
    }

    randomValueBigNumbers(){ // Ok
        return Math.floor(Math.random() * this.bigNumbersList.length);
    }

    mathOperations(){ // Ok
        return Math.floor(Math.random() * this.operationList.length);
    }

    randomOperations(){ // Ok
        let result = 0;
        this.operation =  this.operationList[this.mathOperations()];
        if (this.operation == "*" || this.operation == "/"){
            this.firstValue = this.smallNumbersList[this.randomValueSmallNumbers()];
            this.secondValue = this.smallNumbersList[this.randomValueSmallNumbers()];
        }
        
        else{
            this.firstValue = this.bigNumbersList[this.randomValueBigNumbers()];
            this.secondValue = this.bigNumbersList[this.randomValueBigNumbers()];
        }

        while (this.operation == "/" && this.firstValue % this.secondValue != 0){
            this.operation =  this.operationList[this.mathOperations()];
        }
        
        if (this.operation == "+"){
            result = this.firstValue + this.secondValue;
        }
        else if (this.operation == "-"){
            result = this.firstValue - this.secondValue;
        }
        else if (this.operation == "*"){
            result = this.firstValue * this.secondValue;
        }
        else if (this.operation == "/"){
            result = this.firstValue / this.secondValue;
        }


        return result;
    }

    shuffle(list) { // Ok
        for (let i = list.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // Gera um índice aleatório dentro do intervalo [0, i]
            [list[i], list[j]] = [list[j], list[i]]; // Troca os elementos nas posições i e j
        }
        console.log(list)
        return list;
    }


    listPossibilities(){ // Ok
        this.result = this.randomOperations();
        let possibleResults = [this.result];
        let changeAnswerOperations= ["+", "-"];

        for (let i = 0; i < 3; i++){
            let randomIndexOperation = Math.floor(Math.random() * changeAnswerOperations.length);
            let randomSignal = changeAnswerOperations[randomIndexOperation];

            if (randomSignal == "+"){
                possibleResults.push(this.result + this.smallNumbersList[this.randomValueSmallNumbers()]);
            }
            if (randomSignal == "-"){
                possibleResults.push(this.result - this.smallNumbersList[this.randomValueSmallNumbers()]);
            }
        }
        this.shuffle(possibleResults);
        console.log(possibleResults);
        return possibleResults;
    }

    question() {
        this.numberQuestion += 1;
        this.buttonOptions();
        let questionId = document.getElementById("question");
        if (questionId) {
            questionId.innerHTML = `${this.numberQuestion}) Resolva a seguinte operação: ${this.firstValue} ${this.operation} ${this.secondValue}`;
        } else {
            console.error("Elemento com ID 'question' não encontrado.");
        }
    }

    buttonOptions() {
        let choiceOptionsId = ["first-option", "second-option", "third-option", "fourth-option"];
        this.possibleResultsList = this.listPossibilities();
        for (let i = 0; i < choiceOptionsId.length; i++) {
            let getIdOptions = document.getElementById(choiceOptionsId[i]);
            if (getIdOptions) {
                getIdOptions.innerHTML = this.possibleResultsList[i];
            } else {
                console.error(`Elemento com ID '${choiceOptionsId[i]}' não encontrado.`);
            }
        }
    }

    checksConditionals(answer){
        if (answer == this.result){
            this.timeRestart();
            this.question() 
            let pontuacaoId = document.getElementById("pontuacao");
            pontuacaoId.innerHTML = `Pontuação: ${this.numberQuestion - 1}`;

        } else{
            this.addPopupRestart();
        }    
    }

    buttonClickOptions(id){
        switch(id){
            case "first-option":
                this.checksConditionals(this.possibleResultsList[0])
                break;
            case "second-option":
                this.checksConditionals(this.possibleResultsList[1])
                break;
            case "third-option":
                this.checksConditionals(this.possibleResultsList[2])
                break;
            case "fourth-option":
                this.checksConditionals(this.possibleResultsList[3])
                break;
            default:
                console.log("Botão não reconhecido");
        }
    }

    addPopupRestart(){
        this.popup = document.getElementById("pop-up");
        this.popup.classList.add("open-popup-restart");
        this.time = 0;
        let pontucaoFinalId = document.getElementById("pontuacao-final")
        pontucaoFinalId.innerHTML = `Pontuação total: ${this.numberQuestion-1}`
    }

    removePopupRestart(){
        this.popup = document.getElementById("pop-up");
        this.popup.classList.remove("open-popup-restart");
        window.location.href = "index.html"; // Redireciona para a página inicial
    }

}

const jogo = new Jogo;
jogo.initializeLists();
jogo.listPossibilities();
jogo.startTimer();
jogo.question();
