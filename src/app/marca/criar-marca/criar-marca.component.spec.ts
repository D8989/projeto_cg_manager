import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarMarcaComponent } from './criar-marca.component';

describe('CriarMarcaComponent', () => {
  let component: CriarMarcaComponent;
  let fixture: ComponentFixture<CriarMarcaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarMarcaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CriarMarcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
