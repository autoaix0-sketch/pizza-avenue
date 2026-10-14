# Pizza Avenue — image prompts (ChatGPT)

**How:** in ChatGPT, attach your margherita photo (`images/raw/margherita-vox.jpg`)
as the style reference, then paste **the style block + one prompt**. One image per
message. Save each result into `images/` with the exact filename shown, then tell
me — I cut them out and they go live.

> ⚠️ Ask for a **pure white background**, not "transparent". When asked for
> transparency, ChatGPT often *paints* a fake grey checkerboard into the image
> (that's what happened to the margherita). White is cut out cleanly by
> `scripts/cutout.py`.

## Style block — paste before every prompt

> Match the attached reference exactly: same studio lighting, same warm natural
> colour grading, same crisp high-end commercial food photography, same level of
> detail. Isolated subject on a pure white background (#FFFFFF), no shadow on the
> background, no plate, no board, no table, no props, no hands, no text, no logo.
> Square image, highest resolution, subject centred and filling about 85% of the
> frame, nothing cropped at the edges.

## The images

| File | Prompt (after the style block) |
|---|---|
| `cat_pizza.png` | Perfectly top-down view of a whole pepperoni pizza, Neapolitan style like the reference: puffy leopard-charred crust, bright tomato sauce, melted mozzarella, crisp cupped pepperoni slices with little pools of oil, a few oregano flakes. |
| `sig_pizza.png` | Perfectly top-down view of a whole pizza, same style as the reference: marinated grilled chicken pieces, red and green peppers, sliced mushrooms, black olives, melted mozzarella, leopard-charred crust. |
| `cat_burger.png` | Premium double smash burger, three-quarter front view at eye level: glossy toasted brioche bun with sesame seeds, two thin beef patties with crispy lacy edges, melted cheddar draping down, pickles, thin red onion, crisp lettuce, a little house sauce dripping. |
| `sig_burger.png` | A tall "supreme" burger, three-quarter view: double beef patty, two slices of melted cheddar, crispy bacon, a fried egg with a glossy runny yolk, lettuce, tomato, toasted sesame brioche bun. |
| `cat_tacos.png` | A French tacos (the French fast-food "tacos", NOT a Mexican taco): a large flour tortilla folded into a closed rectangular parcel, griddle-pressed with dark golden grill-mark stripes, a little molten cheese sauce escaping at one edge. Three-quarter view, whole, uncut. |
| `sig_tacos.png` | A French tacos cut diagonally in half, the two halves stacked slightly offset, cross-section facing the camera: seasoned chicken and minced beef, crispy golden fries, generous molten cheese sauce oozing out. Grill-mark stripes on the tortilla. |
| `cat_texmex.png` | A Tex-Mex snack assortment in a small open kraft-paper tray: golden chicken nuggets, three glossy buffalo wings, two crispy tenders, two breaded jalapeño poppers, two breaded camembert bites (one pulled open showing molten cheese), a small ramekin of white dipping sauce. Three-quarter view. |
| `sig_texmex.png` | Six golden breaded camembert bites in a loose pile, one pulled apart with a long molten cheese stretch, a small ramekin of red berry dipping sauce beside them. Three-quarter view. |
| `side_fries.png` | Golden crispy French fries overflowing a plain unbranded kraft-paper fry carton, a few fries falling out. Three-quarter view. |
| `drink_cup.png` | A plain unbranded paper soft-drink cup, cream colour with a deep green lid and a green paper straw, light condensation. Three-quarter view. No logo, no text. |
| `garnish_basil.png` | Three loose fresh basil leaves, top-down, slightly overlapping. |
| `garnish_tomato.png` | Two halved glossy cherry tomatoes and one whole, top-down. |

### `maison_scene.jpg` — the "La maison" photo (NOT a cutout, skip the style block)

> Premium editorial food photography, portrait 2:3. A freshly baked Neapolitan
> margherita on a wooden pizza peel, just pulled from a wood-fired oven, glowing
> embers softly blurred behind, deep green glazed tiles and a cream counter, warm
> low evening light, a little steam. No people, no text, no logo. Magazine feel,
> not stock.

## Before sending

Check them side by side: same light direction, same warmth, nothing cut off at
the edge, no text or watermark anywhere.
