import { NotificationsModule } from './notifications.module';

describe('NotificationsModule', () => {
  let pageHeaderModule: NotificationsModule;

  beforeEach(() => {
    pageHeaderModule = new NotificationsModule();
  });

  it('should create an instance', () => {
    expect(pageHeaderModule).toBeTruthy();
  });
});
