import { ExecutorsModule } from './executors.module';

describe('ExecutorsModule', () => {
    let chartsModule: ExecutorsModule;

    beforeEach(() => {
        chartsModule = new ExecutorsModule();
    });

    it('should create an instance', () => {
        expect(chartsModule).toBeTruthy();
    });
});
