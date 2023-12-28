import { OrdersModule } from './orders.module';

describe('OrdersModule', () => {
    let chartsModule: OrdersModule;

    beforeEach(() => {
        chartsModule = new OrdersModule();
    });

    it('should create an instance', () => {
        expect(chartsModule).toBeTruthy();
    });
});
