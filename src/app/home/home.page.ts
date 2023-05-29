import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessagesConst } from '../consts/messages-const';
import { CurrentExchangeRateModel } from '../models/current-exchange-rate.model';
import { DailyExchangeRateModel, ExchageRateData } from '../models/daily-exchange-rate.model';
import { ExchangeRateService } from '../services/exchange-rate.service';
import { ToastService } from '../services/toast.service';
import { differenceInDays, parseISO } from 'date-fns';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public fromSymbol: string = '';
  public toSymbol: string = 'BRL';
  public differenceOnClose: number[] = [];
  public isPositive: boolean[] = [];
  public apiKey: string = 'RVZG0GHEV2KORLNA';
  public isLoading: boolean = false;
  public isLoadingItemsFiltered: boolean = false;
  public isAccordionExpanded: boolean = false;
  public currentDate: Date = new Date();

  public currentExchangeRate?: CurrentExchangeRateModel;
  public dailyExchangeRate?: DailyExchangeRateModel;
  public filteredItems: ExchageRateData[] = [];
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

  public ngOnInit(): void {
    this.codeToUperCase();
  }

  public codeToUperCase(): void {
    const inputValueControl = this.exchangeRateForm.get('fromSymbol') as FormControl;
    inputValueControl.valueChanges.pipe(
      map(value => value.toUpperCase()),
    ).subscribe(upperCaseValue => {
      inputValueControl.setValue(upperCaseValue, { emitEvent: false });
    });
  }

  public getCurrentExchangeRate(): void {
    this.isLoading = true;
    const formData = this.exchangeRateForm.value;
    this.fromSymbol = formData.fromSymbol;

    this.exchangeRateService.getExchangeRate(environment.api.getCurrentExchangeRate, this.apiKey, this.fromSymbol, this.toSymbol)
      .subscribe(
        async data => {
          if (data.success) {
            this.currentExchangeRate = data;
            this.filteredItems = [];
            await this.getDailyExchangeRate();
            this.isLoading = false;
            this.isAccordionExpanded = false;
          } else {
            this.currentExchangeRate = undefined;
            await this.toastService.presentToast(MessagesConst.INVALID_CODE);
            this.isLoading = false;
            this.isLoadingItemsFiltered = false;
            this.isAccordionExpanded = false;
          }
        },
      );
  }

  public getDailyExchangeRate(): void {
    this.isLoadingItemsFiltered = true;
    this.toggleAccordion();
    this.exchangeRateService.getExchangeRate(environment.api.getDailyExchangeRate, this.apiKey, this.fromSymbol, this.toSymbol)
      .subscribe(
        async data => {
          if (data.success) {
            this.dailyExchangeRate = data;
            // @ts-ignore
            this.filteredItems = data.data.filter(item => {
              const itemDate = parseISO(item.date);
              const daysDifference = differenceInDays(this.currentDate, itemDate);
              return daysDifference <= 31;
            });
            this.getDifferenceOnCloseDay();
            await this.filteredItems.pop();
            this.isLoadingItemsFiltered = false;
          }
          else {
            await this.toastService.presentToast(MessagesConst.INVALID_CODE);
            this.isLoadingItemsFiltered = false;
          }

        },
      );
  }

  toggleAccordion(): void {
    this.isAccordionExpanded = !this.isAccordionExpanded;
  }

  public getDifferenceOnCloseDay(): void {
    for (let i = 0; i < this.filteredItems.length - 1; i++) {
      const currentDay = this.filteredItems[i];
      const previousDay = this.filteredItems[i + 1];
      const differenceClose = (currentDay.close - previousDay.close).toFixed(3);
      this.isPositive[i] = parseFloat(differenceClose) >= 0;
      this.differenceOnClose[i] = parseFloat(differenceClose);
    }
  }
}
