import util from "../src/js/modules/util";
describe('util', function() {
  describe('arraySorted', function() {
    var elem1, elem2, unsorted;

    beforeEach(function() {
      elem1 = { name: 'AKTZ002' };
      elem2 = { name: 'CC001' };
      unsorted = [elem2, elem1];
    });

    it('should sort the array based on the given attribute', function() {
      unsorted.push({ name: 'BB003' });
      unsorted.push({ name: 'BB002' });
      var arraySorted = util.arraySorted(unsorted, 'name');
      expect(arraySorted.length).toBe(4);
      expect(arraySorted[0]).toBe(elem1);
      expect(arraySorted[arraySorted.length - 1]).toBe(elem2);
    });

    it('should sort using norwegian locale', function() {
      var aring = { name: 'AA' };
      unsorted.push(aring);
      var arraySorted = util.arraySorted(unsorted, 'name');
      expect(arraySorted[0]).toBe(elem1);
      expect(arraySorted[arraySorted.length - 1]).toBe(aring);
    });

    it('should not sort if element to sort not given', function() {
      var arraySorted = util.arraySorted(unsorted);
      expect(arraySorted.length).toBe(2);
      expect(arraySorted[0]).toBe(elem2);
      expect(arraySorted[1]).toBe(elem1);
    });

    it('should not sort if element to sort is not existing', function() {
      var arraySorted = util.arraySorted(unsorted, 'notThere');
      expect(arraySorted.length).toBe(2);
      expect(arraySorted[0]).toBe(elem2);
      expect(arraySorted[1]).toBe(elem1);
    });
  });
});
