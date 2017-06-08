/* eslint-env mocha */
'use strict';

const sinon = require('sinon');
const assert = require('assert');
const mock = require('mock-require');

const pkg = require('../package.json');
const namespace = 'test:namespace';

// Mock the debug module
const mockDebugFunction = sinon.spy();
const mockDebugModule = sinon.stub().returns(mockDebugFunction);
mock('debug', mockDebugModule);

const debug = require('../lib')(namespace);
const debug_noprefix = require('../lib')(namespace, {prefix: false});

describe('Debug Module', () => {

    it('was initialized properly', () => {
        sinon.assert.calledTwice(mockDebugModule);
    });

    it('is called with correct namespace', () => {
        debug('testing123');
        sinon.assert.calledWith(mockDebugModule, `${pkg.name}:${namespace}`);
    });

    it('is called with correct namespace (prefix off)', () => {
        debug_noprefix('testing123');
        sinon.assert.calledWith(mockDebugModule, `${namespace}`);
    });

    it('is called with correct params (basic)', () => {
        mockDebugFunction.reset();
        mockDebugFunction.enabled = true;

        debug('testing');
        sinon.assert.calledWith(mockDebugFunction, 'testing');
    });

    it('calls functions correctly (single function)', () => {
        mockDebugFunction.reset();
        mockDebugFunction.enabled = true;

        debug(() => 'testing');
        sinon.assert.calledOnce(mockDebugFunction);
        sinon.assert.calledWith(mockDebugFunction, 'testing');

    });

    it('calls functions correctly (multiple arguments)', () => {
        mockDebugFunction.reset();
        mockDebugFunction.enabled = true;

        debug(1, 2, 3, 4, () => 5);
        sinon.assert.calledOnce(mockDebugFunction);
        sinon.assert.calledWith(mockDebugFunction, 1, 2, 3, 4, 5);
    });


    it('passes correct arguments through (multiple data types)', () => {
        mockDebugFunction.reset();
        mockDebugFunction.enabled = true;

        debug(() => 'testing', {}, []);
        sinon.assert.calledOnce(mockDebugFunction);
        sinon.assert.calledWith(mockDebugFunction, 'testing', {}, []);

    });

    it('doesn\'t do anything at all when debug is turned off', () => {
        mockDebugFunction.reset();
        mockDebugFunction.enabled = false;

        debug(() => 'testing', {}, []);
        sinon.assert.notCalled(mockDebugFunction);
    });

    it('is called twice correctly', () => {
        mockDebugFunction.reset();
        mockDebugFunction.enabled = true;

        debug(() => 'testing', {}, []);
        debug(() => 'testing', {}, []);
        sinon.assert.calledTwice(mockDebugFunction);
    });

    it('returned undefined', () => {
        mockDebugFunction.reset();
        mockDebugFunction.enabled = true;

        const result = debug(() => 'testing', {}, []);
        sinon.assert.calledOnce(mockDebugFunction);
        assert(result === undefined);
    });

});
