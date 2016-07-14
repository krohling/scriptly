Scriptly
=======

##Dynamically load scripts in the browser with a friendly Promise based API.

Scriptly is developed with a Promises API to make it super easy to setup and use.  It's also built with React developers in mind.  [Since FB is recommending against the use of mixins](https://facebook.github.io/react/blog/2016/07/13/mixins-considered-harmful.html), Scriptly provides a great alternative to other mixin based libraries.

Quick start
-------

  ```shell
  npm install scriptly
  ```
  
Usage
-------

Give Scriptly the url to your script.  Everything else works just how you'd expect it!

  ```js
Scriptly.loadScript('https://path/to/my/script.js')
        .then(() => {
          console.log("script loaded!");
        }, (err) => {
          console.log("oops!");
        });
  ```

Here's how you'd dynamically load the Stripe Checkout library and setup your Publishable Key.

```js
Scriptly.loadScript('https://js.stripe.com/v2/')
        .then(() => {
          Stripe.setPublishableKey("MY-STRIPE-PUBLISHABLE-KEY");
        }, (err) => {
          console.log("Failed to load Stripe library");
        });
```
  
