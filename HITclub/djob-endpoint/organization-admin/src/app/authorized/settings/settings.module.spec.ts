import { SettingsModule } from './settings.module';

describe('SettingsModule', () => {
    let chartsModule: SettingsModule;

    beforeEach(() => {
        chartsModule = new SettingsModule();
    });

    it('should create an instance', () => {
        expect(chartsModule).toBeTruthy();
    });
});
