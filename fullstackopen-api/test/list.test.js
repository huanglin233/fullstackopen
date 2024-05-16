const { test, describe } = require('node:test');
const assert = require('node:assert');
const listHelpers = require('../utils/list_helper');

test('dummy returns one', () => {
    const blogs = [];

    const result = listHelpers.dummy(blogs);

    assert.strictEqual(result, 1);
})
