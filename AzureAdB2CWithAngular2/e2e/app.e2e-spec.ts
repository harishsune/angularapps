import { AppPage } from './app.po';

describe('AzureAdB2CAngular2App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome!');
  });
});
