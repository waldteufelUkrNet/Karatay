import { AutocompleteModule } from './autocomplete.module';

describe('AutocompleteModule', () => {
  let pageHeaderModule: AutocompleteModule;

  beforeEach(() => {
    pageHeaderModule = new AutocompleteModule();
  });

  it('should create an instance', () => {
    expect(pageHeaderModule).toBeTruthy();
  });
});
