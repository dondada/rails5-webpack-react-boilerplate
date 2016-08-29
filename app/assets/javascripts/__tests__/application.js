describe('application', () => {
  beforeEach(() => {
    spyOn(console, 'log')
  })

  it('should log to the console', () => {
    require('../application')

    expect(console.log).toHaveBeenCalled()
  })
})
