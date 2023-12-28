import { HistoryModule } from './history.module';

describe('HistoryModule', () => {
    let chartsModule: HistoryModule;

    beforeEach(() => {
        chartsModule = new HistoryModule();
    });

    it('should create an instance', () => {
        expect(chartsModule).toBeTruthy();
    });
});
