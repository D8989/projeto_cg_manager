import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPagamentoDialogComponent } from './add-pagamento-dialog.component';

describe('AddPagamentoDialogComponent', () => {
  let component: AddPagamentoDialogComponent;
  let fixture: ComponentFixture<AddPagamentoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPagamentoDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPagamentoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
