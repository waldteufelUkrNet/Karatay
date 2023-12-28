import { PromoModule } from './promo.module';

describe('PromoModule', () => {
    let chartsModule: PromoModule;

    beforeEach(() => {
        chartsModule = new PromoModule();
    });

    it('should create an instance', () => {
        expect(chartsModule).toBeTruthy();
    });
});
