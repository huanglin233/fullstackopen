
const { test, describe } = require('node:test');
const assert = require('node:assert');

const average = require('../utils/for_testing').average;

describe('average', () => {
    test('of one value is the value itself', () => {
        assert.strictEqual(average([1]), 1);
    })
})
