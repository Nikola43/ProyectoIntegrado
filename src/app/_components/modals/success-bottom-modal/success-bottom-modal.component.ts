import {AfterViewChecked, AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ModalDirective} from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-success-bottom-modal',
  templateUrl: './success-bottom-modal.html',
  styleUrls: ['./success-bottom-modal.component.scss']
})
export class SuccessBottomModalComponent implements AfterViewInit {
  @ViewChild('frame') frameModal: ModalDirective;
  @Input() isVisible = false;
  @Input() message;
  @Output() emitter = new EventEmitter();
  private modalTimeout = 1500;

  constructor() {
  }

  hideModal() {
    this.emitter.emit({status: this.isVisible});
    this.isVisible = false;
    this.frameModal.hide();
  }

  showModal() {
    this.frameModal.show();

    setTimeout(() => {
      this.hideModal();
    }, this.modalTimeout);
  }

  ngAfterViewInit(): void {
    if (this.isVisible) {
      this.showModal();
    }
  }
}
