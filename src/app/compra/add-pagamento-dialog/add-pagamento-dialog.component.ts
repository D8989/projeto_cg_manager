import {
  ChangeDetectionStrategy,
  Component,
  inject,
  model,
} from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import {
  AbstractControl,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CompraService } from '../compra.service';
import { ICreatePagamento } from '../interfaces/create-pagamento.interface';
import { IFormaPagamento } from '../interfaces/forma-pagamento.interface';

@Component({
  selector: 'app-add-pagamento-dialog',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-pagamento-dialog.component.html',
  styleUrl: './add-pagamento-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPagamentoDialogComponent {
  readonly dialogRef = inject(MatDialogRef<AddPagamentoDialogComponent>);
  protected nomeForm = new FormControl('', [
    Validators.required,
    Validators.maxLength(100),
    Validators.minLength(1),
  ]);
  protected erroNomeMsg = '';

  protected valorForm = new FormControl(0, [Validators.required]);
  protected erroValorMsg = '';

  protected pagSelectedForm = new FormControl('', [Validators.required]);
  protected erroPagSelectedMsg = '';

  protected formasPagamentos: IFormaPagamento[] = [];

  constructor(private compraService: CompraService) {
    this.formasPagamentos = [
      { value: 'DINHEIRO', viewValue: 'dinheiro' },
      { value: 'CREDITO', viewValue: 'crédito' },
      { value: 'DEBITO', viewValue: 'debito' },
    ];
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    console.log(this.nomeForm.value);
    console.log(this.valorForm.value);
    console.log(this.pagSelectedForm.value);

    this.dialogRef.close({
      nome: this.nomeForm.value,
      valor: this.valorForm.value,
    });
    // console.log('DTO: ', this.createPagamentoDto);

    // this.dialogRef
    //   .beforeClosed()
    //   .subscribe(() => this.dialogRef.close(this.data));
  }

  checkNomeForm() {
    this.erroNomeMsg = this.compraService.checkNomeForm(this.nomeForm);
  }

  checkNumberForm() {
    this.erroValorMsg = this.compraService.checkValorForm(this.valorForm);
  }

  checkPagSelectForm() {
    this.erroPagSelectedMsg = this.compraService.checkPagSelectedForm(
      this.pagSelectedForm
    );
  }

  comparePagSelected(pag1: string, pag2: string) {
    return pag1 === pag2;
  }
}
