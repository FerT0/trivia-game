export default function GenerateQuestions(){
    let selectedQuestions = []
    let selectQuiz = Math.floor(Math.random() * 11);
    for (let i = 1; i < 11;){
        if (selectedQuestions.includes(selectQuiz)){
            selectQuiz = Math.floor(Math.random() * 11);
        } else {
            selectedQuestions.push(selectQuiz)
            i ++;
        }
    }


    return selectedQuestions
}

