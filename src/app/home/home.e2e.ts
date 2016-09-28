describe('Home', () => {

  beforeEach(() => {
    browser.get('/home');
  });

  it('should have a title', () => {
    let title = browser.getTitle();
    expect(title).toContain('Home');
  });

});
