import { DisputesModule } from './disputes.module';

describe('DisputesModule', () => {
    let chartsModule: DisputesModule;

    beforeEach(() => {
        chartsModule = new DisputesModule();
    });

    it('should create an instance', () => {
        expect(chartsModule).toBeTruthy();
    });
});
