import { Component, Input} from 'angular2/core';

@Component({
  selector:'Alert',
  templateUrl: 'app/components/shared/alerts/alert.html',
  styleUrls:['app/components/shared/alerts/styles/alert.css']
})
export class Alert{
  @Input() message;
  showWarningMsg = false;
  typeMessage = "";

}
