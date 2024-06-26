import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarMarcaComponent } from './listar-marca.component';

describe('ListarMarcaComponent', () => {
  let component: ListarMarcaComponent;
  let fixture: ComponentFixture<ListarMarcaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarMarcaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarMarcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
