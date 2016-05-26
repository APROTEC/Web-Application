import { Component, Input} from 'angular2/core';
import {EmailService} from './services/email.service'
import {Alert} from '../alerts/alert.compononet';

@Component({
  selector:'emailModal',
  templateUrl: 'app/components/shared/email/email.html',
  directives:[Alert],
  providers:[EmailService]
})
export class emailComponent  {
  @Input() component;
  message = { message:"El correo ha sido enviado",
              typeMessage: "Success" };
  showMsg = false;
  constructor(private _EmailService: EmailService){}
  onSubmitEmail(pSubject:string, pContent:string){
    console.log(this.component.destinaries);
    console.log(pSubject);
    console.log(pContent)
      this._EmailService.sendEmail(this.component.destinaries,pSubject,pContent).subscribe(
        data => {},
        error => {},
        () => {
          this.showMsg = true;
          setTimeout( ()=>   {this.showMsg = false},5000 )
        }
      )
  };

}
