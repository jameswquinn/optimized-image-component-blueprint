# Frequently Asked Questions (FAQ)

## 1. How does the ImageLoader component determine which image format to use?

The component checks for browser support of WebP and AVIF formats. It will use WebP if supported, then AVIF, and finally fall back to JPEG/PNG. This check is performed in the `checkImageFormatSupport` function.

## 2. Can I use the ImageLoader with images that don't have multiple formats available?

Yes, you can. If the specified formats (WebP or AVIF) are not available, the component will use the original image format provided in the `src` prop.

## 3. How does lazy loading work with this component?

The component uses the Intersection Observer API to detect when the image enters the viewport. Once the image is in view, it starts loading. This behavior is handled in the `setupIntersectionObserver` function.

## 4. What happens if the browser doesn't support Intersection Observer?

The component automatically loads a polyfill for Intersection Observer if it's not natively supported. If the polyfill fails to load, the component falls back to loading images immediately without lazy loading.

## 5. How can I customize the placeholder image?

You can modify the `selectPlaceholder` function in the component to return a custom placeholder image URL based on your requirements.

## 6. Is it possible to disable lazy loading for certain images?

While there's no direct prop for this, you can achieve this by setting the `preload` prop to `true`, which will load the image immediately when the component mounts.

## 7. How does the retry mechanism work for failed image loads?

If an image fails to load, the component will retry up to 3 times with an exponential backoff. This is implemented in the `handleLoadError` function.

## 8. Can I use this component with a Content Delivery Network (CDN)?

Yes, you can use this component with images served from a CDN. Just provide the full URL in the `src` prop.

## 9. How does the component handle different screen densities (e.g., Retina displays)?

The component checks the device's pixel ratio and attempts to load a higher resolution image for high-density displays. This is handled in the `determineImageSource` function.

## 10. Is there a way to track when the image has finished loading?

Yes, you can use the `onPreloadComplete` prop to receive a callback when the image has finished loading.

## 11. How can I style the loading indicator?

The loading indicator uses CSS classes. You can customize its appearance by modifying the CSS for the `.loading-indicator` class.

## 12. Does this component support Server-Side Rendering (SSR)?

The component should work with SSR, but you might need to ensure that the Intersection Observer polyfill is loaded correctly in a server environment.

## 13. Can I use this component with dynamically changing `src` props?

Yes, the component will react to changes in the `src` prop and load the new image accordingly.

## 14. How does the component handle very large images?

The component itself doesn't compress or resize images. It's recommended to provide appropriately sized images from the server based on typical use cases.

## 15. Is there a maximum retry limit for failed image loads?

By default, the component will retry loading a failed image up to 3 times. This can be adjusted by modifying the `handleLoadError` function.

## 16. How can I debug issues with image loading?

Check the browser's network tab to see if the correct image URLs are being requested. Also, look for any console errors related to image loading or polyfill issues.

## 17. Does this component support progressive image loading?

The component supports a blur-up effect, which can give the appearance of progressive loading. However, true progressive JPEG loading depends on the image format and how it's served.

## 18. Can I use this component with image URLs that might change or expire?

Yes, but you'll need to handle URL updates by changing the `src` prop when the URL changes or refreshes.

## 19. How does the component handle different aspect ratios?

The `objectFit` prop allows you to control how the image fits within its container, accommodating different aspect ratios.

## 20. Is there a way to prefetch images that are not immediately visible?

You can use the `preload` prop to start loading images before they enter the viewport, which can be useful for critical images that are just off-screen.
