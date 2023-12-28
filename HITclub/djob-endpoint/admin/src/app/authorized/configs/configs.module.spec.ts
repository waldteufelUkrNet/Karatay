import { ConfigsModule } from './configs.module';

describe('ConfigsModule', () => {
    let chartsModule: ConfigsModule;

    beforeEach(() => {
        chartsModule = new ConfigsModule();
    });

    it('should create an instance', () => {
        expect(chartsModule).toBeTruthy();
    });
});
