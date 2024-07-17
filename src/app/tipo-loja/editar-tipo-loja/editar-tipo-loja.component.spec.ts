import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTipoLojaComponent } from './editar-tipo-loja.component';

describe('EditarTipoLojaComponent', () => {
  let component: EditarTipoLojaComponent;
  let fixture: ComponentFixture<EditarTipoLojaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarTipoLojaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarTipoLojaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
