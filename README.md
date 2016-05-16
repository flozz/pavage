# Pavage

> Lightweight library to arrange HTML elements in a Waterfall / Pinterest-like column layout

![Example](https://raw.githubusercontent.com/flozz/pavage/master/demo.png)

## Quick Start

To use `pavage`, you just have to make some HTML and then call the `pavage.fromDOM()` function:

```html
<div class="pavage" data-column="4" data-spacing="10">
    <div class="demo-item" style="height: 100px"></div>
    <div class="demo-item" style="height: 200px"></div>
    <div class="demo-item" style="height: 50px"></div>
    ...
</div>

<script src="./pavage.js"></script>
<script>
    pavage.fromDOM();
</script>
```

* the `pavage` class must be set on each element that will contain item to render with pavage
* the `data-column` attribute defines the number of column that will be displayed (default: 3)
* the `data-spacing` attribute defines the spacing between items (default: 0)
