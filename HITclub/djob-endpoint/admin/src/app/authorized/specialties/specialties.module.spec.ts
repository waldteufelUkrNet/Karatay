import { SpecialtiesModule } from './specialties.module';

describe('SpecialtiesModule', () => {
    let chartsModule: SpecialtiesModule;

    beforeEach(() => {
        chartsModule = new SpecialtiesModule();
    });

    it('should create an instance', () => {
        expect(chartsModule).toBeTruthy();
    });
});
