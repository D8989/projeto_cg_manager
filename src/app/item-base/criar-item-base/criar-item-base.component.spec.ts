import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarItemBaseComponent } from './criar-item-base.component';

describe('CriarItemBaseComponent', () => {
  let component: CriarItemBaseComponent;
  let fixture: ComponentFixture<CriarItemBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarItemBaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CriarItemBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
