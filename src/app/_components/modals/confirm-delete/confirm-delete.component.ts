import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ModalDirective} from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss']
})
export class ConfirmDeleteComponent implements AfterViewInit {
  @ViewChild('frame') frameModal: ModalDirective;
  @Input() isVisible = false;
  @Input() message;
  @Output() emitter = new EventEmitter();
  @Input() deletedObject: any;

  constructor() {
  }

  hideModal() {
    this.emitter.emit({status: this.isVisible});
    this.isVisible = false;
    this.frameModal.hide();
  }

  showModal() {
    this.frameModal.show();
  }

  ngAfterViewInit(): void {
    if (this.isVisible) {
      this.showModal();
    }
  }

  delete() {
    this.emitter.emit({delete: true});
  }
}
