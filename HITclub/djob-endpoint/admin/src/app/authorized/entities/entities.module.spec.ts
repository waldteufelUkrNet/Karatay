import { EntitiesModule } from './entities.module';

describe('ExecutorsModule', () => {
    let chartsModule: EntitiesModule;

    beforeEach(() => {
        chartsModule = new EntitiesModule();
    });

    it('should create an instance', () => {
        expect(chartsModule).toBeTruthy();
    });
});
