import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.scss'],
})
export class LoginButtonComponent implements OnInit {

  @Input() buttonType: "FACEBOOK" | "GOOGLE" | "ANONYMOUS" = "FACEBOOK"
  @Input() loading: false
  @Output() onButtonClick: EventEmitter<string> = new EventEmitter();

  public innerText: string = ""

  private innerTextMapping = {
    "FACEBOOK": "Login with Facebook",
    "GOOGLE": "Login with Google",
    "ANONYMOUS": "Login anonymously"
  }
  constructor() {
  }

  ngOnInit() {
    this.innerText = this.innerTextMapping[this.buttonType]
  }

  handleClick() {
    this.onButtonClick.emit(this.buttonType)
  }

}
