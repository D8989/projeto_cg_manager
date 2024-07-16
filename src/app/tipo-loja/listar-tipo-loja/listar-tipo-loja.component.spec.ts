import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTipoLojaComponent } from './listar-tipo-loja.component';

describe('ListarTipoLojaComponent', () => {
  let component: ListarTipoLojaComponent;
  let fixture: ComponentFixture<ListarTipoLojaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarTipoLojaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarTipoLojaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
