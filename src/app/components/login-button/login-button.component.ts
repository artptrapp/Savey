import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.scss'],
})
export class LoginButtonComponent implements OnInit {

  @Input() buttonType: "FACEBOOK" | "GOOGLE" = "FACEBOOK"
  @Input() loading: false
  @Output() onButtonClick: EventEmitter<string> = new EventEmitter();

  public innerText: string = ""
  constructor() {
  }

  ngOnInit() {
    this.innerText = this.buttonType == "FACEBOOK" ? "Login with Facebook" : "Login with Google"
  }

  handleClick() {
    this.onButtonClick.emit(this.buttonType)
  }

}
