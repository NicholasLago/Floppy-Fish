describe("Cookie Handler Unit Tests", function() {

  it("Set Cookie Name, Value and Expiry Days", function() {
  	setCookie("test",42, 999);
  	expect(setCookie.expires).not.toBeNull;
  });

  it("Cookie should not be set at 2", function() {
    var gC = getCookie("test");
    expect(gC).not.toEqual(2);
  });

  it("Get Cookie that was previously set at 42", function() {
    var gC = getCookie("test");
    console.log(gC);
    
    expect(gC).toEqual('42');
  });

  it("Check if cookies are not Null", function() {
    var gC = getCookie("test");
    console.log(gC);
    expect(gC).not.toBeNull;
  });
});
