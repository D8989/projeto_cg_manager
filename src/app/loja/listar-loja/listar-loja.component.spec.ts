import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarLojaComponent } from './listar-loja.component';

describe('ListarLojaComponent', () => {
  let component: ListarLojaComponent;
  let fixture: ComponentFixture<ListarLojaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarLojaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarLojaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
