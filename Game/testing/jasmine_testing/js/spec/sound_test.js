describe("Sound Unit Tests", function() {


  it("Check to see if Sound plays", function() {
  	play_sound(soundJump);
  });

  it("Get the current time of Sound played", function() {
    console.log(thistime);
    expect(thistime).not.toBeNull;
  });
});
