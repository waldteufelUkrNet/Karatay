import { ForgotModule } from './forgot.module';

describe('LoginModule', () => {
    let loginModule: ForgotModule;

    beforeEach(() => {
        loginModule = new ForgotModule();
    });

    it('should create an instance', () => {
        expect(loginModule).toBeTruthy();
    });
});
