# MarvelBrowser

For now this is a reference document for myself.

## ListView

### The tag and its attributes

A list view is implented with the `listViewDirective`, like this:

`<list-view format="" items="" total="" tabs="" current-tab=""></list-view>`

Explanation of attributes:

| Format | Items | Total | Tabs | Current Tab |
| --- | --- | --- | --- | --- |
| The initial format of the list view. 'grid' or 'list' | Array with all items. | Number of items. | Array of tab names. | Name of the current tab. |

`Items` only have to include the data for the current tab. `Total` may differ from `items.length` (when using infinite scroll i.e.).

### Functions to implement

The scope which provides the attribute values for the list-view, can implement the following functions:

 - #### `navigateToItem (ID)`
   Called when an item is clicked on. Is passed the ID of the item. Expected behaviour: to navigate to a details page of the item.

 - #### `getMoreItemsPlease ()`
   Called (only once) when the user scrolls towards the end of the dataset. Expected behaviour: to add new data to the `items` array (if available).

 - #### `changeTab (tab)`
   Called when the user changes tabs (duh). Passed the name of the new tab. Expected behaviour: to change `current-tab` and update the `items` array with the new tab's data.

### Formatting items

The items passed to the list view must be parsed into a specific format. Each item must be an object with the following structure:

`{
	id: (int),
	title: (string),
	image: (string/URL),
	description: (string)
}`