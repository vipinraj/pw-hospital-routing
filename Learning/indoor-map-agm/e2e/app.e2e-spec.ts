import { IndoorMapAgmPage } from './app.po';

describe('indoor-map-agm App', () => {
  let page: IndoorMapAgmPage;

  beforeEach(() => {
    page = new IndoorMapAgmPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
