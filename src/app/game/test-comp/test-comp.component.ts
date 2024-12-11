import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-test-comp',
  templateUrl: './test-comp.component.html',
  styleUrls: ['./test-comp.component.css']
})
export class TestCompComponent implements OnInit {

  constructor() { }
  message: string="Hola Mundo!"

  @Output() messageEvent= new EventEmitter<string>();

  ngOnInit(): void {
  }

  sendMessage()
  {
    this.messageEvent.emit(this.message)
  }

}
