import { Component, inject } from '@angular/core';
import { QuizService } from './../quiz.service';
import { Choice,Question } from './../question';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  viewMode: string = 'each';
  audio = new Audio()
  quizService: QuizService = inject(QuizService)
  questions: Question[]
  currentQuestionIndex = 0
  isEnd = false
  showQuestionList = false
  score = 0

  usedQuestion: string[] = []
  usedAnswer: string[] = []

  constructor() {
    this.questions = this.quizService.getQuizDataNoImage();
    this.audio.src = '../assets/audio/mixkit-arcade-retro-game-over-213.wav'
    this.newQuiz()
  }
  
  onclickChoice(choice: Choice, question: Question) {
    this.playSound()

    if (choice.isAnswer) this.score++

    if (this.currentQuestionIndex == this.questions.length - 1) {
      this.isEnd = true
    } else {
      this.currentQuestionIndex++
      this.usedQuestion.push(question.text)
      this.usedAnswer.push(choice.text)
      this.questions[this.currentQuestionIndex].choices.sort((a, b) => 0.5 - Math.random())
    }
  }

  private playSound() {
    this.audio.load();
    this.audio.addEventListener('canplaythrough', () => {
      this.audio.play();
    })
  }

  onclickNewQuiz() {
    this.newQuiz()
  }
  private newQuiz() {
    this.questions.sort((a, b) => 0.5 - Math.random())
    this.isEnd = false
    this.currentQuestionIndex = 0
    this.score = 0
    this.usedAnswer = []
    this.usedQuestion = []
  }
  onClickPrevious() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }
  onClickNext() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }
  onClickQuestionList() {
    this.showQuestionList = !this.showQuestionList;
  }
  getAnswerForQuestion(question: Question): string {
    const correctChoice = question.choices.find(choice => choice.isAnswer);
    return correctChoice ? correctChoice.text : 'Answer not available';
  }
}