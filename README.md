jQuery imageSequence Plugin
=============
_Description: What does this project do and who does it serve?_

## Project Setup

Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word i
### Using Inline (*easiest*)
```html
<img src="images/s44_lines-0.png" class="image-sequence" data-namepattern="s44_lines-#.png" data-startnum="0" data-endnum="59">
```
### Using a method (*advanced*)
```javascript
$("img.image-sequence").imageSequence({
    namepattern :   "image-#.png",
    startnum:       0,
    endnum:         10,
    repeat:         -1,
    reverse:        0,
    starton:        'load'
});
```
## Code Example
```html
<img src="images/phone-sequence-00000_357x357.jpg" 
      class="image-sequence" 
      data-namepattern="phone-sequence-000##_357x357" 
      data-startnum="0" 
      data-endnum="36"
      data-starton="drag" 
      data-easing="true">
```

[Demo Here](http://98oktay.github.io/imageSequence/demo/)

## API Reference



## Licence
