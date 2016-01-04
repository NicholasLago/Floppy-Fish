describe("PowerUp Testing!", function() {


  it("Does the symbol appear on the screen?", function() {
  	window.Play.init()
  	Flappy_Fish.PowerUp;
    expect(Flappy_Fish.centerY).toBeGreaterThan(0);
  });


});
