# JQuery-ElementStepper
A simple configurable container stepper. 
It can step any type of a container and can fire some events if buttons are pressed.

# How to use

Define a container that should hold the subelements. And define back and forward controls:

```html
<div class="divSlider">
   <!-- [...] elements that can be stepped -->
</div>
<div class="PrevButton">Prev</div>
<div class="NextButton">Next</div>

```

Than you have to setup a little jQuery javascript:

```javascript
    jQuery(parent).find(".divSlider").elementStepper({
        next: jQuery(parent).find('.NextButton'),
        prev: jQuery(parent).find('.PrevButton'),

        after: function () { // fired after the animation has been finished
        },
        onPrevNextEvent: function (e) { // fired before some other work is done. return false to cancle the action
        }
    });
```

# Options
 * childElement - *default*: div - Specify the type of the childelements
 * prev - *default*: null - Hold the jQuery object of the prevbutton
 * next - *default*: null - Hold the jQuery object of the nextbutton
 * easing - *default*: 'swing' - The animation type that should be used for the content change
 * duration - *default*: 500 - The duration of the animation
