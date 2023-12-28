import { Component, OnInit} from '@angular/core';
import {ConfigsService, NotificationService} from '../../../shared';

@Component({
  selector: 'app-configs-form',
  templateUrl: './configs-form.component.html',
  styleUrls: ['./configs-form.component.scss']
})
export class ConfigsFormComponent implements OnInit {
    configs = {
        referral_program_commissions: null,
        system_commission: null,
        executor_find_counter: null,
        accept_wait_time: null,
        min_cash_balance: null,
        min_cash_bonus_balance: null,
        master_order_count_needed: null,
        middle_order_count_needed: null,
        return_to_the_application_customer_days: null,
        return_to_the_application_executor_days: null,
        return_to_the_application_customer_texts: '',
        return_to_the_application_executor_texts: ''
    };

    customer_push_texts = [];
    executor_push_texts = [];

    constructor(
        private configsService: ConfigsService,
        private notif: NotificationService
    ) {}

    ngOnInit() {
        this.configsService.getConfigs()
            .then((confData: Array<any>) => {
                for(let i=0;i<confData.length;i++){
                    this.configs[confData[i].param] = confData[i].value;
                    if(confData[i].param === 'return_to_the_application_customer_texts'){
                        let tmparr = confData[i].value ? confData[i].value.split('|') : [];
                        this.customer_push_texts = [];
                        for(let j=0;j<tmparr.length;j++){
                            this.customer_push_texts.push({val: tmparr[j]});
                        }
                    }

                    if(confData[i].param === 'return_to_the_application_executor_texts'){
                        let tmparr = confData[i].value ? confData[i].value.split('|') : [];
                        this.executor_push_texts = [];
                        for(let j=0;j<tmparr.length;j++){
                            this.executor_push_texts.push({val: tmparr[j]});
                        }
                    }
                }
            })
    }

    saveConfigs(){
        this.configs['return_to_the_application_executor_texts'] = '';
        if(this.executor_push_texts.length){
            for(let i=0;i<this.executor_push_texts.length;i++){
                this.configs['return_to_the_application_executor_texts'] += i===0 ? this.executor_push_texts[i].val : '|' + this.executor_push_texts[i].val;
            }
        }
        this.configs['return_to_the_application_customer_texts'] = '';
        if(this.customer_push_texts.length){
            for(let i=0;i<this.customer_push_texts.length;i++){
                this.configs['return_to_the_application_customer_texts'] += i===0 ? this.customer_push_texts[i].val : '|' + this.customer_push_texts[i].val;
            }
        }

        this.configsService.updateConfigs(this.configs)
            .then(upData => {
                this.notif.showOne('Сохранено!')
            })
    }

    addCustomerPushMessage(){
        this.customer_push_texts.push({val: ''});
    }

    deleteCustomerPushMessage(text){
        this.customer_push_texts = this.customer_push_texts.filter(_text => text !== _text);
    }

    addExecutorPushMessage(){
        this.executor_push_texts.push({val: ''});
    }

    deleteExecutorPushMessage(text){
        this.executor_push_texts = this.executor_push_texts.filter(_text => text !== _text);
    }
}
