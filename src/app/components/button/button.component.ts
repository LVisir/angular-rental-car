import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input() text: string | undefined;
  @Input() color: string | undefined;
  @Input() classType: string[] | undefined;
  @Input() buttonType: string | undefined;
  @Input() disable!: boolean;
  @Output() buttonClick = new EventEmitter();

  constructor() { }

  ngOnInit(): void {

  }

  onClick() {
    this.buttonClick.emit();
  }

}
