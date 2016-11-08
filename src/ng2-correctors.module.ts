import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CorrectorsValidator } from './correctors.validator';
import { IfCorrErrors } from './ifcorrerrors.directive';

import { IsNumberCorrector } from './correctors/isnumber';
import { MaxLengthCorrector } from './correctors/maxlength';
import { MaxIntCorrector } from './correctors/maxint';

let decl_export = [
  CorrectorsValidator,
  IfCorrErrors,

  IsNumberCorrector,
  MaxLengthCorrector,
  MaxIntCorrector,
];

@NgModule({
  imports: [
    FormsModule
  ],
  declarations: decl_export,
  exports: decl_export
})
export class CorrectorsModule { }


