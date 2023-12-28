import { DashboardModule } from './dashboard.module';

describe('DashboardModule', () => {
    let chartsModule: DashboardModule;

    beforeEach(() => {
        chartsModule = new DashboardModule();
    });

    it('should create an instance', () => {
        expect(chartsModule).toBeTruthy();
    });
});
