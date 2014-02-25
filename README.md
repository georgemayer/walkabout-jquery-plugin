###Walkabout readme

The walkabout jquery plugin is a plug and play tutorial for your website or app. It let's you define tutorial content with html data attributes. 

The steps are ordered by the data-tut-step attribute and the content of each step is determined by the data-tut-content attribute. The plugin is initialized by calling walkabout() on $(document). 

Here's a basic call: 

```javascript
<script>
$(document).ready(function() {
    $(document).walkabout({
        autostart: true
    });
});
</script>        
```

With the corresponding html:

```html

<div
  data-tut-step="1"
  data-tut-content="Hello world!"
>
  Step one
</div>
```
