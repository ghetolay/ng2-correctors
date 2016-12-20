import { Directive, Input, Renderer, ElementRef, OnChanges, forwardRef } from '@angular/core';

import { CorrectorFn, CorrectorError, AbstractCorrector, correctorProvider } from '../model';

export function minLength(minLength: number, placeholder: string): CorrectorFn {
	return (value: any, prevValue: any, hasError: boolean, ): CorrectorError | undefined => {
		value = value || '';

		let lengthDiff = minLength - value.length;
		if (lengthDiff > 0)
			return {
				correctedValue: value + placeholder.repeat(lengthDiff),
				error: {
					max: minLength,
					current: value
				}
			};
	}
}

@Directive({
	selector: '[minLength_]',
	providers: [correctorProvider(MinLengthCorrector)]
})
export class MinLengthCorrector extends AbstractCorrector {

	name = 'minLength';

	@Input() minLength_: number;

	private _placeholder = '_';
	@Input()
	set placeholder_(placeholder: string) {
		if( placeholder && placeholder.length > 0)
			this._placeholder = placeholder.substr(1, 1);
	}

	createCorrector(): CorrectorFn | undefined {
		if(this.minLength_ != null && this.minLength_ != undefined)
			return minLength(this.minLength_, this._placeholder);
	}
}
