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
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CompraService } from '../compra.service';
import { ICreatePagamento } from '../interfaces/create-pagamento.interface';
import { IFormaPagamento } from '../interfaces/forma-pagamento.interface';
import { IAddPagDialogData } from '../interfaces/add-pag-dialog-data.interface';
import { IMessageResp } from '../../common/res/message-resp.interface';
import { firstValueFrom, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-add-pagamento-dialog',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-pagamento-dialog.component.html',
  styleUrl: './add-pagamento-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPagamentoDialogComponent {
  private readonly dialogRef = inject(
    MatDialogRef<AddPagamentoDialogComponent>
  );
  private readonly data = inject<IAddPagDialogData>(MAT_DIALOG_DATA);

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

  async onSaveClick(): Promise<void> {
    const respMessage: IMessageResp = { message: '' };

    await lastValueFrom(
      this.compraService.addPagamento({
        compraId: this.data.compraId,
        formaPagamento: this.pagSelectedForm.value!,
        nomeUsuario: this.nomeForm.value!,
        valor: this.valorForm.value!,
      })
    )
      .then((resp) => {
        respMessage.id = resp.id;
        respMessage.message = resp.message;
      })
      .catch((erro) => {
        alert(erro.error.message);
      });

    this.dialogRef.close(respMessage);
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
