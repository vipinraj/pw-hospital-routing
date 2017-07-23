import { IndoorMapCreatorPage } from './app.po';

describe('indoor-map-creator App', () => {
  let page: IndoorMapCreatorPage;

  beforeEach(() => {
    page = new IndoorMapCreatorPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
