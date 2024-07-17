import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarLojaComponent } from './criar-loja.component';

describe('CriarLojaComponent', () => {
  let component: CriarLojaComponent;
  let fixture: ComponentFixture<CriarLojaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarLojaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CriarLojaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
