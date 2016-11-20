import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CorrectorsValidator } from './correctors.validator';
import { IfCorrErrors } from './ifcorrerrors.directive';

import { MaxLengthCorrector } from './correctors/maxlength';
import { MinLengthCorrector } from './correctors/minlength';
import { IsNumberCorrector } from './correctors/isnumber';
import { MaxIntCorrector } from './correctors/maxint';

let decl_export = [
  CorrectorsValidator,
  IfCorrErrors,

  MinLengthCorrector,
  MaxLengthCorrector,
  IsNumberCorrector,
  MaxIntCorrector
];

@NgModule({
  imports: [
    FormsModule
  ],
  declarations: decl_export,
  exports: decl_export
})
export class CorrectorsModule { }


