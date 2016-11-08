import { OpaqueToken, forwardRef, Directive, OnInit, OnDestroy, Optional, Inject, Renderer, ElementRef, Output, EventEmitter, isDevMode } from '@angular/core';

import { NG_VALIDATORS, Validator, FormControl } from '@angular/forms';

import { Corrector, CORRECTOR_TOKEN } from './model';

@Directive({
  selector: '[corrValidator]',
  providers:[{
    provide: NG_VALIDATORS,
    useExisting: forwardRef( () => CorrectorsValidator ),
    multi: true
  }],
  exportAs: 'corrErrors'
})
export class CorrectorsValidator implements Validator {

  @Output() onError = new EventEmitter<{}>();
  @Output() onValid = new EventEmitter<string>();

  private el: HTMLInputElement;
  private prevValue = null;
  private unlisten: Function;

  private correctors: Corrector[];

  constructor(private renderer: Renderer, @Optional() @Inject(CORRECTOR_TOKEN) correctors: Corrector[], elRef: ElementRef) {
    this.el = elRef.nativeElement;

    if (isDevMode) {
      if (!correctors)
        console.warn('CorrectorValidator used without any corrector defined');
    }

    this.correctors = correctors || [];
  }

  validate(c: FormControl): {[key: string]: any} {
    let value = c.value;

    let errors = {};
    let hasError = false;

    let parseResult = result => {
      if(result) {
        //should be only one
        for( let name in result) {
          let corrResult = result[name];
          if (corrResult.hasOwnProperty('correctedValue'))
            value = corrResult.correctedValue;
        }

        hasError = true;
        Object.assign(errors, result);
      }
    };

    for (let corrector of this.correctors) {
      let implicitsCorrectors = corrector.implicits;

      if (implicitsCorrectors)
        for (let correctorFunction of implicitsCorrectors)
          parseResult( correctorFunction(value, this.prevValue, hasError) )

      parseResult( corrector.validate(value, this.prevValue, hasError) );
    }

    this.prevValue = value;

    if (hasError) {
      c.setValue(value, {
        onlySelf: true,
        emitEvent: false,
        emitModelToViewChange: true,
        emitViewToModelChange: true //depends
      });
      this.onError.emit(errors);
    }
    else
      this.onValid.emit(value);

    return null;
  }

}
