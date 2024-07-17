import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarCompraComponent } from './criar-compra.component';

describe('CriarCompraComponent', () => {
  let component: CriarCompraComponent;
  let fixture: ComponentFixture<CriarCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarCompraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CriarCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
