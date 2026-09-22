# Nature asset coverage

This note records the current asset wiring for the ReForge visual system. Asset URLs are served from the project-managed storage namespace through `client/src/config/assets.ts`; no binary media is committed to the application source tree.

| Surface | Current asset treatment | Evidence |
|---|---|---|
| Public home | Hero image plus rituals atmosphere image | `client/src/pages/site/Home.tsx` uses `natureAsset("hero")` and `natureAsset("rituals")` |
| Sign-in | Guides atmosphere image behind the entry card | `client/src/pages/site/SignIn.tsx` uses `REFORGE_ASSETS.guides` |
| Dashboard | Dashboard atmosphere asset in the authenticated shell/page | `client/src/pages/Dashboard.tsx` uses the shared asset registry |
| Journal | Journal-specific SVG asset is available in the registry; guest mode uses nature cards and privacy copy | `REFORGE_ASSETS.journal`; `GuestDemoWorkspace.tsx` |
| Check-ins | Check-in-specific SVG asset is available and used by authenticated feature presentation | `REFORGE_ASSETS.checkIn`; `AdditionalFeatures.tsx` |
| Goals | Goals-specific SVG asset is available in the registry; guest mode uses the shared nature-card language | `REFORGE_ASSETS.goals`; `GuestDemoWorkspace.tsx` |
| Guides | Guides atmosphere image is used in the authenticated newsletter/feature presentation and shared library styling | `REFORGE_ASSETS.guides`; `Guides.tsx` |
| Music | Music-specific SVG asset is available in the registry | `REFORGE_ASSETS.music` |
| Rules | Rules presentation reuses the check-in atmosphere asset with a dedicated forest/clay overlay | `AdditionalFeatures.tsx` |
| Newsletter | Newsletter presentation reuses the guides atmosphere asset with a dedicated forest/clay overlay | `AdditionalFeatures.tsx` |
| Settings | Settings-specific SVG asset is available in the registry; the guest privacy screen uses the shared nature-card shell | `REFORGE_ASSETS.settings`; `GuestDemoWorkspace.tsx` |

The registry confirms the intended route-specific assets are available. The authenticated route-by-route visual sweep is intentionally still pending until a controlled sign-in session can be verified; this document does not claim that pending browser coverage is complete.
