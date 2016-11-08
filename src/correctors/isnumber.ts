import { Directive, Input, Renderer, ElementRef, OnChanges, forwardRef } from '@angular/core';

import { CorrectorFn, CorrectorError, AbstractCorrector, correctorProvider } from '../model';

export function isNumber(invert = false): CorrectorFn {
  return (value: any, prevValue: any, hasError: boolean, invert = false): CorrectorError => {
    if (invert != isNaN(value))
      return {
        isNumber: {
          correctedValue: prevValue,
          current: value
        }
      };
  }
}

@Directive({
  selector: '[isNumber_]',
  providers: [correctorProvider(IsNumberCorrector)]
})
export class IsNumberCorrector extends AbstractCorrector {

  @Input() isNumber_ = true;

  createCorrector(): CorrectorFn {
    return isNumber(this.isNumber_);
  }
}
