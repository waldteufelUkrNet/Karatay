import { LocationModule } from './location.module';

describe('LocationModule', () => {
  let pageHeaderModule: LocationModule;

  beforeEach(() => {
    pageHeaderModule = new LocationModule();
  });

  it('should create an instance', () => {
    expect(pageHeaderModule).toBeTruthy();
  });
});
