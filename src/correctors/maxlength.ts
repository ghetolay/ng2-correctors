import { Directive, Input, Renderer, ElementRef, OnChanges, forwardRef } from '@angular/core';

import { CorrectorFn, CorrectorError, AbstractCorrector, correctorProvider } from '../model';

export function maxLength(maxLength: number): CorrectorFn {
  return (value: any, prevValue: any, hasError: boolean, ): CorrectorError => {
    if(value && value.length > 0) {
      let lengthDiff = value.length - maxLength;
      if (lengthDiff > 0)
        return {
        	correctedValue: value.substr(0, maxLength),
        	error: {
            	max: maxLength,
            	current: value,
        	}
        };
    }
  }
}

@Directive({
  selector: '[maxLength_]',
  providers: [correctorProvider(MaxLengthCorrector)]
})
export class MaxLengthCorrector extends AbstractCorrector {

	name = "maxLength";

  	@Input() maxLength_: number;

  	createCorrector(): CorrectorFn {
    	if(this.maxLength_ != null && this.maxLength_ != undefined)
      	return maxLength(this.maxLength_);
  	}
}
