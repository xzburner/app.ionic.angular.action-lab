import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessagesConst } from '../consts/messages-const';
import { CurrentExchangeRateModel } from '../models/current-exchange-rate.model';
import { DailyExchangeRateModel } from '../models/daily-exchange-rate.model';
import { ExchangeRateService } from '../services/exchange-rate.service';
import { ToastService } from '../services/toast.service';
import { differenceInDays, parseISO } from 'date-fns';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public fromSymbol: string = '';
  public toSymbol: string = 'BRL';
  public apiKey: string = 'RVZG0GHEV2KORLNA';
  public isLoading: boolean = false;
  public currentDate: Date = new Date();

  public currentExchangeRate?: CurrentExchangeRateModel;
  public dailyExchangeRate: DailyExchangeRateModel[] = [];
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
    this.fromSymbol = formData.fromSymbol;

    this.exchangeRateService.getCurrentExchangeRate(this.apiKey, this.fromSymbol, this.toSymbol)
      .subscribe(
        data => {
          if (data.success) {
            this.currentExchangeRate = data;
            console.log(this.currentExchangeRate);
            this.isLoading = false;
          }
          else {
            this.toastService.presentToast(MessagesConst.INVALID_CODE);
            this.isLoading = false;
          }
        },
      );
  }

  public getDailyExchangeRate(): void {
    this.isLoading = true;
    const fromSymbol = 'USD';

    this.exchangeRateService.getDailyExchangeRate(this.apiKey, fromSymbol, this.toSymbol)
      .subscribe(
        data => {
          if (data.success) {// @ts-ignore
            this.dailyExchangeRate = data.data.filter(item => {
              const itemDate = parseISO(item.date);
              const daysDifference = differenceInDays(this.currentDate, itemDate);
              return daysDifference <= 30;
            });
            console.log(this.dailyExchangeRate);
          }
        },
      );
    this.isLoading = false;
  }

}
