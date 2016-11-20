import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';

import { CorrectorFn, CorrectorError, AbstractCorrector, correctorProvider } from '../model';

import { maxLength } from './maxlength';
import { isNumber } from './isnumber';

export function maxInt(maxInt: number, length = maxInt == Infinity ? Infinity : maxInt.toString().length): CorrectorFn {
  return (initialValue: any, prevValue: any, hasError: boolean): CorrectorError => {
    if (!hasError && initialValue && initialValue.length > 0) {
      let value = initialValue;
      let lengthDiff = length - value.length;
      if( lengthDiff > 0 )
        value += '0'.repeat(lengthDiff);

      let intValue = +value;
      if ( intValue > maxInt)
        return {
          correctedValue: prevValue,
          error: {
          	max: maxInt,
           	current: intValue
          }
        }
    }
  }
}

@Directive({
  selector: '[maxInt_]',
  providers: [correctorProvider(MaxIntCorrector)]
})
export class MaxIntCorrector extends AbstractCorrector implements OnChanges {

	name = 'maxInt';

	@Input() maxInt_: number;
  	private length: number;

  	implicits: CorrectorFn[];

  	ngOnChanges(changes: SimpleChanges) {
    	this.length = this.maxInt_ == null || this.maxInt_ == undefined ?
      		null : this.maxInt_.toString().length;

    	this.implicits = this.length == null ? [] : [maxLength(this.length)];
    	this.implicits.push(isNumber());

    	super.ngOnChanges(changes);
  	}

  	/*
   	 * TODO BUG use case:
   	 * maxInt = 12
   	 * value is 12
   	 * when delete '1' with suppr key, since value can't start with 2 we return previous value
   	 * => deleting first char has no effect
   	 * => can't use suppr can only delete using backspace
   	 * => also cursor get set at the end since we reset the value
   	 */
  	createCorrector(): CorrectorFn {
    	if( this.maxInt_ != null && this.maxInt_ != undefined)
      	return maxInt(this.maxInt_, this.length);
  	}
}
