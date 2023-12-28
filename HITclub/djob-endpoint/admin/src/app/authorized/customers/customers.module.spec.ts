import { CustomersModule } from './customers.module';

describe('CustomersModule', () => {
    let chartsModule: CustomersModule;

    beforeEach(() => {
        chartsModule = new CustomersModule();
    });

    it('should create an instance', () => {
        expect(chartsModule).toBeTruthy();
    });
});
