import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { IMessageResp } from '../../res/message-resp.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-message',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './dialog-message.component.html',
  styleUrl: './dialog-message.component.css',
})
export class DialogMessageComponent implements OnInit {
  private readonly dialogRef = inject(MatDialogRef<DialogMessageComponent>);
  private readonly data = inject<IMessageResp>(MAT_DIALOG_DATA);
  protected mensagem: string = '';
  protected respResult: string = '';

  ngOnInit(): void {
    this.mensagem = this.data.message;
    this.respResult = this.data.id ? 'Sucesso' : 'Erro!';
  }
}
