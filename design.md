# Len Sornlout — design direction

Responsive web portfolio inspired by the supplied scrapbook reference, adjusted to the requested blue palette and name-first composition.

## Visual system
Cream paper #f9f6ee, cobalt ink #2854ba, pale blue #dfe8f5, warm graphite #343934. Cormorant Garamond italic display, DM Sans body, Caveat handwritten annotations. Subtle paper texture, photographic borders, imperfect rotations, translucent tape and small ink stars. Generous whitespace and a 1180px content width.

## Page and flows
Single home page: centered name surrounded by supplied work; compact pill navigation; filtered staggered project collage; image detail dialog with previous/next and keyboard controls; short about section using the supplied disciplines; back-to-top footer. No invented contact details or unsupported project claims. Mobile collage reflows without horizontal overflow. Reduced-motion support.

## Implementation
Web package only. Portfolio component and CSS; images stored in public/images. Local React state handles filters and modal. No new API routes or database tables. Keep template analytics and runtime components.