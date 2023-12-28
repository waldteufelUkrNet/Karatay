import { PushModule } from './push.module';

describe('PushModule', () => {
    let chartsModule: PushModule;

    beforeEach(() => {
        chartsModule = new PushModule();
    });

    it('should create an instance', () => {
        expect(chartsModule).toBeTruthy();
    });
});
