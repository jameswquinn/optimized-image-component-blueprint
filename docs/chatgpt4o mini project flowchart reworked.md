```mermaid
graph TD
    A[Start] --> B[Determine Device Details]
    B --> B1[Check Device Type (Mobile/Desktop)]
    B --> B2[Check Pixel Density]
    B --> B3[Check Connection Type]
    B --> C[Check Image Format Support]
    C --> C1[Test for WebP Support]
    C --> C2[Test for AVIF Support]
    C --> D[Select Placeholder Image]
    D --> E[Setup Intersection Observer]
    E --> E1{If Supported}
    E1 --> E1a[Initialize and Observe Image]
    E1 --> E1b[If Not Supported]
    E1b --> E1b1[Load Polyfill and Initialize Observer]
    E --> F[Add Event Listeners]
    F --> F1[Resize Event Listener]
    F --> F2[Connection Type Change Listener (if supported)]
    F --> G[End]

    subgraph Preload Image [Preload Image (if `preload` prop is true)]
    H[Start Preload]
    H --> I[Create Image Object]
    I --> J[Set onLoad to Mark Preload Complete]
    I --> K[Set onError for Preload Failures]
    I --> L[Set src to Preload Image Source]
    L --> M[End Preload]
    end

    subgraph Lazy Loading and Image Loading [Lazy Loading and Image Loading]
    N[Start Image Load]
    N --> O{Is Lazy Loading Enabled?}
    O --> O1[Yes]
    O1 --> P[Initialize Intersection Observer]
    P --> Q[Image Enters Viewport]
    Q --> R[Load Image]
    O --> O2[No]
    O2 --> S[Load Image Immediately]
    S --> T[Create Image Object]
    T --> U[Set onLoad to Mark Image as Loaded]
    T --> V[Set onError to Handle Load Errors]
    T --> W[Set src to Image Source]
    W --> X[Add blur-up Class to Image Element]
    X --> Y[Handle Image Load]
    Y --> Z[Remove blur-up Class]
    Z --> AA[End Image Load]
    end

    subgraph Error Handling [Error Handling]
    AB[Start Error Handling]
    AB --> AC{Image Load Error?}
    AC --> AC1[Yes]
    AC1 --> AD[Retry Loading Image]
    AD --> AE{Retry Count < 3}
    AE --> AE1[Exponential Backoff]
    AE --> AF[Retry Count >= 3]
    AF --> AG[Show Error Message]
    AC --> AH[No]
    AH --> AI[End Error Handling]
    end

    subgraph Resize and Connection Handling [Resize and Connection Type Handling]
    AJ[Start Resize/Connection Handling]
    AJ --> AK[On Resize or Connection Change]
    AK --> AL[Update Device Type and Pixel Density]
    AL --> AM{If Image Not Loaded and Not Loading}
    AM --> AN[Trigger Image Load]
    AM --> AO[End Resize/Connection Handling]
    end

    % Linking all nodes
    B --> E
    E --> F
    F --> G
    G --> H
    H --> Preload Image
    N --> Lazy Loading and Image Loading
    Error Handling --> End
    Resize and Connection Handling --> End

```
