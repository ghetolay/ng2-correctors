import { Directive, Input, OnChanges, SimpleChanges, OnDestroy, ViewContainerRef, TemplateRef, EmbeddedViewRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { CorrectorsValidator } from './correctors.validator';

export interface ErrorContext {
  errors: { [name: string]: any };
}

@Directive({
  selector: '[ifCorrErrors]'
})
export class IfCorrErrors implements OnChanges, OnDestroy {

  @Input('ifCorrErrorsCorrErrors') correctors: CorrectorsValidator;

  @Input() duration = 2000;

  private subscriptions = [Subscription.EMPTY];
  private timeout: number;
  private view: EmbeddedViewRef<ErrorContext>;

  constructor(private viewContainer: ViewContainerRef, private template: TemplateRef<ErrorContext>) {  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes['correctors']) {
      this.subscriptions.forEach( s => s.unsubscribe() );

      this.subscriptions = [
        this.correctors.onError.subscribe( (err: {}) => {
          this.show();
          this.view.context['errors'] = err;
        }),
        this.correctors.onValid.subscribe( () => {
          this.hide();
        })
      ];
    }
  }

  show() {
    if (!this.view)
      this.view = this.viewContainer.createEmbeddedView(this.template, {errors: {maxInt: 10}});

    if ( !isNaN(this.duration) ) {
      clearTimeout(this.timeout);

      // TODO we are getting typings from node for setTimeout, don't want that
      this.timeout = <any>setTimeout( () => {
        this.hide();
      }, this.duration);
    }
  }

  hide() {
    clearTimeout(this.timeout);

    this.viewContainer.clear();
    delete this.view;
  }

  ngOnDestroy() {
    this.subscriptions.forEach( s => s.unsubscribe() );
  }
}
