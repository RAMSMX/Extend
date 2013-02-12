/*
 *  Extend.js
 *  ---------
 *  (c) 2013 Juan Lorenzo Hernandez Cruz
 *  Extend.js is freely distributable under the terms of the BSD license
 *  
 *  Small function to simulate class inheritance.
 *  Based on both Backbone and Ext.
*/
(function () {
    var o = Object.prototype,
        has = o.hasOwnProperty,
        apply = function (d, f) {
            for (var k in f) if (has.call(f, k)) {
                d[k] = f[k];
            }
        };
    /*
     * This function provides simple inheritance functionallity.
     * Why shall you use it? The main difference is that, unlike
     * other inheritance functions, it automatically invokes
     * the parent's constructor, so you don't need to invoke it
     * manually.
     * 
     * It supports inheritance of inherited classes.
     */
    function Extend(parent, protoProps, staticProps) {
        var Child, fn = function () {};
        if (has.call(protoProps, 'constructor')) {
            // If a new constructor wants to be defined,
            // set it up so the parent's constructor
            // is invoked previously.
            Child = function () {
                parent.apply(this, arguments);
                protoProps.constructor.apply(this, arguments);
            };
            fn.prototype = parent.prototype;
            Child.prototype = new fn();
        } else {
            // Just use the default parent's constructor
            Child = parent.prototype.constructor;
            apply(Child.prototype, parent.prototype);
        }
        // Copy the new prototype functions
        apply(Child.prototype, protoProps);
        // Copy static properties
        apply(Child, parent);
        // Copy the new static properties
        apply(Child, staticProps);
        // Set up a '_super' static property to allow
        // access to the parent's original prototype
        Child._super = parent.prototype;
        // Allow the class to extend itself
        Child.Extend = function (protoProps, staticProps) {
            return Extend(this, protoProps, staticProps);
        };
        // Allow overriding of methods
        Child.Override = function (protoProps) {
            return apply(this.prototype, protoProps);
        };
        return Child;
    }
    // Exposing the function to the global scope
    this.Extend = Extend;
}.call(this));
