[![License](https://img.shields.io/badge/license-MIT-yellow.svg)](https://raw.githubusercontent.com/jablonczay/code-box-copy/master/LICENSE)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/jablonczay/code-box-copy.svg?style=social)](https://twitter.com/jam_es_muriithi)

# JQuery jCheckBox

### What is this?

Code Box Copy is a lightweight, flexible syntax highlighter jQuery plugin that provides an easy-to-use, simple method to copy any text to the clipboard with a single click.

### Demo: [Usage Examples](https://james-muriithi.github.io/jCheckBox/)

## Quick Start

Add the following lines below to your page head:

```html
<!-- Bootstrap 4 CSS -->
<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet" async="">

<!-- JS -->
<!-- JQuery -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<!-- jCheckBox -->
<script src="https://james-muriithi.github.io/jCheckBox/dist/jquery.jCheckBox.min.js"></script>
<!-- end -->
```


### Example Usage


```html
<div class="user-permissions">
<div class="custom-control custom-checkbox" class="parent">
    <input type="checkbox" id="1" value="1">
    <label for="1">Manage Student</label>
</div>
<div class="custom-control custom-checkbox">
    <input type="checkbox" id="2" value="2" class="parent-1">
    <label for="2">Add Student</label>
</div>
<div class="custom-control custom-checkbox">
    <input type="checkbox" id="3" value="3" class="parent-1">
    <label for="3">View Students</label>
</div>
</div>
```


### Plugin Initialization

Add the following to the page head or at the end of the body section of your page:

```html
<script>
$(document).ready(function () {
    $(".your-check-box-div").jCheckBox();
});
</script>
```

You may also add optional parameters:

```html
<script>
$(document).ready(function () {
    $(".your-div").jCheckBox({
        checkChildren: true, //default true
        parentClass: "parent", //default parent
        onParentChecked: function() {}, //callback when the parent checkbox is checked
        onChildChecked: function() {}, //callback when the child checkbox is checked
        onParentUnchecked: function() {}, //callback when the parent checkbox is unchecked
        onChildUnchecked: function() {} //callback when the child checkbox is unchecked
    });
});
</script>
```
