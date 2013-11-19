# Creating New Modules/Module Pages

The event page consists of one or more `Module`s. Each module then consists of
one or more `ModulePage`s. Each module gets a top-level navigation item, each
page for that module gets a sub-navigation item under its module's top-level
navigation item. A module is responsible for generating `event-module-header`
and `event-module-footer` content. This content may or may not be dependent on
the current module page. A module page is responsible for generating
`event-module-content` content.

## Creating a new Module

Each newly created module should be placed in a directory structure like so: 

```
src/
|
+-- htdocs/
    |
    +-- modules/
        |
        +-- MODULE_NAME/
            |
            +-- MODULE_VERSION/
                |
                |-- js/
                |
                +-- css/
```

The `MODULE_NAME` is the lowercase name of the module to be created. The
`MODULE_VERSION` is the [semver](http://semver.org/) number for the module
version. Each new version of a module will be placed in a new `MODULE_VERSION`
sub-folder. This allows the event page to use any version of a module at any
time.

A new module JS class must be implemented using the RequireJS framework and
should extend the `base/version/EventModule` class. Here is the API with some
documentation for what needs to be implemented.

```javascript
/**
 * This method serves as a destructor, giving the module a chance to clean up
 * any allocated memory before the EventPage discards the module. This may be
 * used to unbind event handlers and/or clear out data structures etc...
 */
destroy ();

/**
 * Generates a markup string for HTML to be displayed in the event-module-header
 * element for this module. The default implementation for this method returns
 * an empty string.
 *
 * @param page {EventModulePage}
 *      The page that is currently being rendered.
 *
 * @return {String}
 */
getHeaderMarkup (page);

/**
 * Generates a markup string for HTML to be displayed in the event-module-footer
 * element for this module. The default implementation for this method returns
 * an empty string.
 *
 * @param page {EventModulePage}
 *      The page that is currently being rendered.
 *
 * @return {String}
 */
getFooterMarkup (page);
```

## Creating a new ModulePage

A new module page JS class must be implemented using the RequireJS framework and
should extend the `base/version/EventModulePage` class. Here is the API with
some documentation for what needs to be implemented.

```javascript
/**
 * This method serves as a destructor, giving the page a chance to clean up
 * any allocated memory before the module discards the page. This may be
 * used to unbind event handlers and/or clear out data structures etc...
 */
destroy ();

/**
 * Inserts the markup for the header content into the module page's header
 * (this._header) element. This method should also bind any/all events to 
 * elements in the header element at this time.
 *
 * The default implementation of this method delegates to the containing page's
 * module.
 */
_setHeaderMarkup ();

/**
 * Inserts the markup for the main content into the module page's content
 * (this._content) element. This method should also bind any/all events to 
 * elements in the content element at this time.
 *
 * The default implementation of this method puts a rendered time stamp into
 * the content section.
 */
_setContentMarkup ();

/**
 * Inserts the markup for the footer content into the module page's footer
 * (this._footer) element. This method should also bind any/all events to 
 * elements in the footer element at this time.
 *
 * The default implementation of this method delegates to the containing page's
 * module.
 */
_setFooterMarkup ();
```

Once initial implementation is completed, be sure to also include tests for the
module. Tests should be placed in the

```
test/
|
+-- spec/
    |
    +-- modules/
        |
        +-- MODULE_NAME/
            |
            +-- MODULE_VERSION/
```

folder. Tests should at a minimum cover the public methods of the implementation
as well as any private methods prone to irregular behavior. After implementing
tests, be sure to include the tests in the test suite by modifying the main
`test/index.js` file.

If the module contains view output and CSS to be visually checked, you should
also implement a separate UI HTML test page. This page is a light-weight HTML
page that renders the view for visual inspection.
