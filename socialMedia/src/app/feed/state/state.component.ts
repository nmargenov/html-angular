import { Component,Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent {
  @Output() feedChange = new EventEmitter<string>(); 

  feed = 'following';

  changeState(state: string) {
    this.feed = state;
    this.feedChange.emit(state); 
  }

}
