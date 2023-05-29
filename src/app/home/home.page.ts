import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessagesConst } from '../consts/messages-const';
import { CurrentExchangeRateModel } from '../models/current-exchange-rate.model';
import { ExchangeRateService } from '../services/exchange-rate.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public toSymbol: string = 'BRL';
  public apiKey: string = 'RVZG0GHEV2KORLNA';
  public isLoading: boolean = false;

  public currentExchangeRate?: CurrentExchangeRateModel;
  public exchangeRateForm: FormGroup;

  constructor(
    private readonly exchangeRateService: ExchangeRateService,
    private readonly fb: FormBuilder,
    private readonly toastService: ToastService,
  ) {
    this.exchangeRateForm = this.fb.group({
      fromSymbol: ['', Validators.required],
    });
  }

  public getCurrentExchangeRate(): void {
    this.isLoading = true;
    const formData = this.exchangeRateForm.value;
    const fromSymbol = formData.fromSymbol;

    this.exchangeRateService.getCurrentExchangeRate(this.apiKey, fromSymbol, this.toSymbol)
      .subscribe(
        data => {
          if (data.success)
            this.currentExchangeRate = data;
          else
            this.toastService.presentToast(MessagesConst.INVALID_CODE);
        },
      );
    this.isLoading = false;
  }

}
