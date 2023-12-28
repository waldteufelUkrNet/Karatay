import { AuthorizedModule } from './authorized.module';

describe('LayoutModule', () => {
    let layoutModule: AuthorizedModule;

    beforeEach(() => {
        layoutModule = new AuthorizedModule();
    });

    it('should create an instance', () => {
        expect(layoutModule).toBeTruthy();
    });
});
