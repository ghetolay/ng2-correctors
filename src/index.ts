export { CorrectorsModule } from './ng2-correctors.module';
export { CorrectorsValidator } from './correctors.validator';

export * from './model';

import { isNumber } from './correctors/isnumber';
import { maxInt } from './correctors/maxint';
import { maxLength } from './correctors/maxlength';
import { minLength } from './correctors/minlength';

//@ts-ignore need to import to avoid error on infer type but they complain it's unused
//should not be needed anymore with 2.7
import { CorrectorFn } from './model';
export const Correctors = {
	isNumber,
	maxInt,
	maxLength,
	minLength
};
