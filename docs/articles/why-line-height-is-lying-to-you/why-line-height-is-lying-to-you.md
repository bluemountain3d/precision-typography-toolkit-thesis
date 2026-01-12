# Why line-height is lying to you

En ingress på två till tre meningar 

## The Illusion of the bounding Box

Har du någon gång funderat över varför bokstäverna med en font-size på 16px inte är just 16px?

När vi sätter font-size är det inte främst storleken på bokstäverna vi bestämmer, utan storleken på Em-boxen. 

- Varför line-height ljuger: Förklara att webbläsaren lägger till "leading" (radavstånd) jämnt över och under glyfen, vilket skapar det där irriterande tomrummet.

Visualisering: En bokstav inuti en box där boxen är mycket större än bokstaven.

## Anatomy of a font - The Metrics

Här tänker jag att man introducerar de faktiska värdena som gömmer sig i en font.
- Ascender, Descender, Cap Height, x-Height, Em-box
- Visa hur dessa är relaterade till line-height

## Horizontal Alignment: The Side-bearing Secret

Här tänker jag att man förklarar vad side-bearing är. Många glömmer att bokstäver inte bara har luft över/under, utan även på sidorna.

- Vad är det? Det är det optiska mellanrummet inbyggt i fonten för att bokstäver inte ska krocka.

- Problemet: När man vill att en rubrik ska ligga exakt kant i kant med en bild eller en röd linje, kommer side-bearing göra att det ser ut som ett litet indrag.

## Lösningen: Leading-trim & Metrics-math
Vertical: Introducera leading-trim (CSS) och hur man räknar ut det manuellt med negativa marginaler om man inte har support för trim ännu.

Horizontal: Hur man "negaterar" side-bearing för att uppnå "optical alignment".