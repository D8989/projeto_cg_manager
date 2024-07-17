import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarTipoLojaComponent } from './criar-tipo-loja.component';

describe('CriarTipoLojaComponent', () => {
  let component: CriarTipoLojaComponent;
  let fixture: ComponentFixture<CriarTipoLojaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarTipoLojaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CriarTipoLojaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
