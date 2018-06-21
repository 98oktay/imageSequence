jQuery imageSequence Plugin
=============

## Project Setup

Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word i
### Using Inline (*easiest*)
```html
<img src="images/s44_lines-0.png" class="image-sequence" data-namepattern="s44_lines-#.png" data-startnum="0" data-endnum="59">
```

Image Sequence   | &nbsp;
---------------- | -----
image-sequence   | 3D dönme özelliğine sahip olacak resmin `img` tagına eklenecek CSS classı
data-namepattern | 3D dönüşlerinde gösterilecek ek resimlerin isim tanımları. Resimlerin 1,2,3 gibi bir sıra ile isimlendirilmiş olmaları gerekiyor. Örn: `s44_lines-#.png`
data-startnum    | İlk sekansta gösterilecek resmin numarası.
data-endnum      | Son sekansta gösterilecek resmin numarası.
data-starton     | Resim sekanslarının ne tür bir aksiyonla (`drag` vs) değişeceğini tanımları.
data-easing      | Resim sekans geçişlerinde easing olup olmayacını belirtir.

```html
<img class="image-sequence" src="http://www.nurus.com/content/images/breeze-dyna-support-2.jpg" alt="" data-namepattern="breeze-dyna-support-#.jpg" data-startnum="1" data-endnum="8" data-starton="drag" 
data-easing="true"/>
</div>
```

### Using as method (*advanced*)
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

[View Demo: 98oktay.github.io/imageSequence/demo/](http://98oktay.github.io/imageSequence/demo/)

## API Reference



## Licence
