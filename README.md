Extend
======

Small function to simulate class inheritance.
Based on both Backbone and Ext.

## Why?

All the major JavaScript frameworks provide a built-in function to extend simulated classes, but you must include at least the base packages of the framework to be able to use that function.

This simple function privides easy class inheritance without any dependence, you can simply copy&paste it in your code and you're all done.

## Usage

Although this code is really easy to use, I must point something out:

* Each class that have been inherted using this function, will be able to extend itself with a method that will be added as a static property.

* There'll be also a new method inside the class, an ```Override``` function, that will be helpful if you want to override methods already defined

Here's an example:

```js
(function() {
    // 'Abstract' class Car
    function Car() {
        this.type = 'Car';
    }
    Car.prototype.start = function () {
        return this.type + ' ' + this.model + '(' + this.year + ')' + ' has been started.';
    };

    // Defining a child of Car
    var Audi = Extend(Car, {
        constructor: function () {
            this.model = 'Audi';
            this.year = 2013;
        }
    });

    // Another child
    var BMW = Extend(Car, {
        constructor: function () {
            this.model = 'BMW';
            this.year = 2013;
        }
    });

    // Inheriting an inherited class
    var BMW_M3 = Extend(BMW, {
        constructor: function () {
            this.version = 'M3';
            this.horsePower = 500;
        }
    });
    BMW_M3.Override({
        start: function () {
            return this.type + ' ' + this.model + '(' + this.year + ') ' + this.version + ' has been started.';
        }
    });

    // Exposing the objects to examine
    this.Car = Car;
    this.Audi = Audi;
    this.BMW = BMW;
    this.BMW_M3 = BMW_M3;

    (new BMW_M3).start();
    // -> Car BMW(2013) M3 has been started.
    (new BMW_M3).horsePower;
    // -> 500

}.call(this));
```

As you see, it's pretty easy to use.