```mermaid
digraph ImageLoaderFlowchart {
    node [shape=box, style=rounded];
    
    // Nodes
    Start [label="Start" shape=circle];
    DetermineDeviceDetails [label="Determine Device Type & Pixel Density"];
    CheckIntersectionObserver [label="Check IntersectionObserver Support"];
    LoadPolyfill [label="Load IntersectionObserver Polyfill"];
    SetupObserver [label="Setup IntersectionObserver"];
    LoadImage [label="Load Image"];
    PreloadImage [label="Preload Image"];
    DetermineImageSource [label="Determine Image Source"];
    HandleLoadError [label="Handle Load Error"];
    Retry [label="Retry"];
    Error [label="Show Error"];
    End [label="End" shape=circle];
    
    // Edges
    Start -> DetermineDeviceDetails;
    DetermineDeviceDetails -> CheckIntersectionObserver;
    
    CheckIntersectionObserver -> SetupObserver [label="IntersectionObserver Supported"];
    CheckIntersectionObserver -> LoadPolyfill [label="No IntersectionObserver"];
    LoadPolyfill -> SetupObserver;
    
    SetupObserver -> LoadImage [label="IntersectionObserver Setup"];
    LoadImage -> PreloadImage [label="Preload Image if needed"];
    PreloadImage -> DetermineImageSource;
    DetermineImageSource -> LoadImage;
    
    LoadImage -> HandleLoadError [label="On Error"];
    HandleLoadError -> Retry [label="Retry Count < 3"];
    Retry -> LoadImage [label="Retry"];
    HandleLoadError -> Error [label="Retry Count >= 3"];
    
    Error -> End;
    PreloadImage -> End;
}

```
