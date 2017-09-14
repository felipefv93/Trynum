import { NgModule }      from '@angular/core';
import { EstadoPipe }    from '../directives/estado.pipe';

@NgModule({
    imports:        [],
    declarations:   [EstadoPipe],
    exports:        [EstadoPipe],
})

export class ToolModule {

  static forRoot() {
     return {
         ngModule: ToolModule,
         providers: [],
     };
  }
} 