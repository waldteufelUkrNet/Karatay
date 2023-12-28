import { RichtexteditorModule } from './richtexteditor.module';

describe('RichtexteditorModule', () => {
  let pageHeaderModule: RichtexteditorModule;

  beforeEach(() => {
    pageHeaderModule = new RichtexteditorModule();
  });

  it('should create an instance', () => {
    expect(pageHeaderModule).toBeTruthy();
  });
});
