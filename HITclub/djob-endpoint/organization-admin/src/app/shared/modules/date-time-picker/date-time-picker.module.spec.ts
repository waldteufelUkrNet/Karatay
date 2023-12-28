import { DateTimePickerModule } from './date-time-picker.module';

describe('DateTimePickerModule', () => {
  let pageHeaderModule: DateTimePickerModule;

  beforeEach(() => {
    pageHeaderModule = new DateTimePickerModule();
  });

  it('should create an instance', () => {
    expect(pageHeaderModule).toBeTruthy();
  });
});
