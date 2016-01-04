'use strict';

describe('@version tag', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/versiontag.js');
    var foo = docSet.getByLongname('foo')[0];

    it('When a symbol has a @version tag, the doclet has a version property set to that value.', function() {
        expect(foo.version).toBe('1.2.3');
    });
});