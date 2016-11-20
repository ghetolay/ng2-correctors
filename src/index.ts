export { CorrectorsModule } from './ng2-correctors.module';
export { CorrectorsValidator } from './correctors.validator';

export * from './model';

import { CorrectorFn } from './model';
import { isNumber } from './correctors/isnumber';
import { maxInt } from './correctors/maxint';
import { maxLength } from './correctors/maxlength';
import { minLength } from './correctors/minlength';

export const Correctors = {
	isNumber: isNumber,
	maxInt: maxInt,
	maxLength: maxLength,
	minLength: minLength
}
