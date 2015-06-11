var groups = mmooc.groups;
var baseURL = "http://beta.matematikk.mmooc.no";
$ = jQuery;

describe("groups", function() {

  describe("checkGroupPageLink", function() {
    it("Group page links should only be corrected when on the groups page itself", function() {
      expect(groups.changeGroupListURLs(baseURL + "/groups")).toBe(true);
      expect(groups.changeGroupListURLs(baseURL + "/groups/1")).toBe(false);
      expect(groups.changeGroupListURLs(baseURL + "/groups?foo=bar")).toBe(true);
      expect(groups.changeGroupListURLs(baseURL + "/groups/1?foo=bar")).toBe(false);
      expect(groups.changeGroupListURLs(baseURL + "/groups?foo=bar&bar=baz")).toBe(true);
      expect(groups.changeGroupListURLs(baseURL + "/groups/1?foo=bar&bar=baz")).toBe(false);
    });
  });
});
