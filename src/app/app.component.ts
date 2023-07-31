import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  question = {
    text: 'Who painted the Mona Lisa?',
    choices:[
      'Pablo Picasso',
      'Leonardo Da Vinci',
      'Vinceent van Gogh',
      'Michelangelo'
    ],
  }
  onClickChoice(text:string){ 
    console.log(text);
   }
}
