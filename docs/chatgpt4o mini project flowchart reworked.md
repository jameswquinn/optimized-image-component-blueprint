```mermaid
graph TD;
  A[Start] --> B[Initialize State]
  B --> C[Use Effect Hook (on mount)]
  C --> D{Check IntersectionObserver Support}
  D --> |Yes| E[Setup IntersectionObserver]
  D --> |No| F[Load Polyfill]
  F --> G{Polyfill Load Success?}
  G --> |Yes| E
  G --> |No| H[Disable Lazy Loading] --> I[Load Image]
  E --> J[Setup Resize Event Listener]
  J --> K[Setup Connection Change Listener (if supported)]
  K --> L[Use Effect Hook (on `preload` or `src` change)]
  L --> M{Preload Image?}
  M --> |Yes| N[Call `preloadImage`]
  M --> |No| O[Skip Preload]
  N --> P[Create Image Object]
  P --> Q{Image Load Success?}
  Q --> |Yes| R[Set `isPreloaded` to true] --> S[Call `onPreloadComplete`]
  Q --> |No| T[Log Preload Failure]
  E --> U[Load Image]
  U --> V{Is Scrolling Fast?}
  V --> |Yes| W[Defer Image Load]
  V --> |No| X{Check if Already Loading}
  X --> |Yes| Y[Do Nothing]
  X --> |No| Z[Start Image Load]
  Z --> AA[Determine Image Source]
  AA --> AB[Create Image Object]
  AB --> AC{Image Load Success?}
  AC --> |Yes| AD[Set `isLoaded` to true] --> AE[Update States] --> AF[Remove Blur]
  AC --> |No| AG[Handle Load Error]
  AG --> AH{Retry Count < 3?}
  AH --> |Yes| AI[Increment Retry Count] --> AJ[Retry Image Load]
  AH --> |No| AK[Set Error State]
  J --> AL[Handle Resize Event]
  AL --> AM[Update Device Type and Pixel Density]
  AM --> AN{Reload Image if Necessary}
  AN --> AO[Render]
  AO --> AP[Display Placeholder if Not Loaded]
  AO --> AQ[Show Loading Indicator if Loading]
  AO --> AR[Show Error Message if Error]
  AO --> AS[Display Image]
  AP --> AT[End]
  AQ --> AT
  AR --> AT
  AS --> AT

```
