import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarItemBaseComponent } from './editar-item-base.component';

describe('EditarItemBaseComponent', () => {
  let component: EditarItemBaseComponent;
  let fixture: ComponentFixture<EditarItemBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarItemBaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarItemBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
