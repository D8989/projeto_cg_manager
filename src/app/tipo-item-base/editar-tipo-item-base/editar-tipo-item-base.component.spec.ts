import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTipoItemBaseComponent } from './editar-tipo-item-base.component';

describe('EditarTipoItemBaseComponent', () => {
  let component: EditarTipoItemBaseComponent;
  let fixture: ComponentFixture<EditarTipoItemBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarTipoItemBaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarTipoItemBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
