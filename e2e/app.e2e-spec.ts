import { EindwerkPage } from './app.po';

describe('eindwerk App', function() {
  let page: EindwerkPage;

  beforeEach(() => {
    page = new EindwerkPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
