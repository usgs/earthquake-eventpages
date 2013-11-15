# Creating New Modules/Module Pages

The event page consists of one or more `Module`s. Each module then consists of
one or more `ModulePage`s. Each module gets a top-level navigation item, each
page for that module gets a sub-navigation item under its module's top-level
navigation item. A module is responsible for generating event-module-header and
event-module-footer content. A module page is responsible for generating
event-module-content content.

## Creating a new Module

Each newly created module should be placed in the 

`src/htdocs/modules/MODULE_NAME/MODULE_VERSION`

directory in the project. The `MODULE_NAME` is the lowercase name of the module
to be created. The `MODULE_VERSION` is the semver number for the module version.
Each new version of a module will be placed in a new MODULE_VERSION sub-folder.
This allows the event page to use any version of a module at any time.

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
 * Updates the markup in this._header as appropriate. In many cases this may not
 * need to do anything, however if the header content depends on which of the
 * module's pages is currently being rendered, the module may need to update.
 *
 * @param page {EventModulePage}
 *      The page that is currently being rendered.
 */
_renderModuleHeader (page);

/**
 * Updates the markup in this._footer as appropriate. In many cases this may not
 * need to do anything, however if the footer content depends on which of the
 * module's pages is currently being rendered, the module may need to update.
 *
 * @param page {EventModulePage}
 *      The page that is currently being rendered.
 */
_renderModuleFooter (page);
```

The Javascript class should be placed in a `js` folder in the MODULE_VERSION
directory. If any CSS is required, the CSS should be placed in a `css` folder
in the MODULE_VERSION directory. Once initial implementation is completed, be
sure to also include tests for the module. Tests should be placed in the

`test/spec/modules/MODULE_NAME/MODULE_VERSION/`

folder. Tests should at a minimum cover the public methods of the
implementation as well as any private methods prone to irregular behavior.

## Creating a new ModulePage

Each newly created `ModulePage` should be placed in the same directory as its
parent module class. Again, JS files should go in the `js` directory and CSS
files should go in the `css` directory. The mdoule page must use the RequireJS
framework and should extend the `base/version/js/EventModulePage` class. Here is
the API with some documentation for what needs to be implemented.

```javascript
/**
 * Render content based on the event data into this._content container. This
 * method should return synchronously, but may fire AJAX (or other) asyncrhonous
 * requests to complete the rendering process.
 *
 */
render ();

 * This method serves as a destructor, giving the page a chance to clean up
 * any allocated memory before the module discards the page. This may be
 * used to unbind event handlers and/or clear out data structures etc...
 */
destroy ();
```

As with the module itself, the module page must also be tested.
