import { OpaqueToken, forwardRef, Provider, OnChanges, SimpleChanges } from '@angular/core';

export const CORRECTOR_TOKEN = new OpaqueToken('correctors');

export interface CorrectorError {
   correctedValue?: any;
   error?: {[name: string]: any};
}

export interface CorrectorFn { (value: any, prevValue: any, hasError: boolean): CorrectorError | undefined }

export interface Corrector {
	name: string;
  	implicits?: CorrectorFn[];

  	validate: CorrectorFn;
}

//helpers
export function correctorProvider(className: Function): Provider {
  return {
    provide: CORRECTOR_TOKEN,
    useExisting: forwardRef(() => className),
    multi: true,
  };
}

export abstract class AbstractCorrector implements Corrector, OnChanges {
  abstract name: string;

  private onChange: () => void;
  private corrector = NULL_CORRECTOR;

  validate(value: any, prevValue: any, hasError: boolean): CorrectorError | undefined {
    return this.corrector(value, prevValue, hasError);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.corrector = this.createCorrector() || NULL_CORRECTOR;
    if (this.onChange)
      this.onChange();
  }

  registerOnValidatorChange(fn: () => void) { this.onChange = fn; }

  abstract createCorrector(): CorrectorFn | undefined
}

export const NULL_CORRECTOR: CorrectorFn = () => undefined;
