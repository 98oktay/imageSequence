jQuery imageSequence Plugin
=============
_Sekans halindeki görselleri web sayfasında animasyon olarak görüntülemeye yarayan jQueri eklentisidir. _ 
### Using Inline (*easiest*)

Isim   | Açıklama
---------------- | -----
image-sequence   | 3D dönme özelliğine sahip olacak resmin `img` tagına eklenecek CSS classı
data-namepattern | 3D dönüşlerinde gösterilecek ek resimlerin isim tanımları. Resimlerin 1,2,3 gibi bir sıra ile isimlendirilmiş olmaları gerekiyor. Örn: `s44_lines-#.png`
data-startnum    | İlk sekansta gösterilecek resmin numarası.
data-endnum      | Son sekansta gösterilecek resmin numarası.
data-starton     | Resim sekanslarının ne tür bir aksiyonla (`drag` vs) değişeceğini tanımları.
data-easing      | Resim sekans geçişlerinde easing olup olmayacını belirtir.
data-repeat      | Döngünün tekrar edip etmeyeceğini belirtir.
data-yoyo        | Döngünün bittikten sonra geriye doğru devam etmesini sağlar.
data-positionfixer| Görselin altına belirtilen miktarda boşluk bırakır. Starton değeri scroll ise scroll sırasında belirtildiği miktar kadar fixed kalır.
```html
<img class="image-sequence" src="images/s44_lines-0.png" alt="" data-namepattern="s44_lines-#.png" data-startnum="0" data-endnum="59" data-starton="drag" 
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
