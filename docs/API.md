# ImageLoader Component

The ImageLoader component is a highly optimized, feature-rich image loading solution for Preact applications. It supports lazy loading, responsive images, modern image formats (WebP, AVIF), and provides visual feedback during the loading process.

## Installation

```bash
npm install @your-org/image-loader
```

## Usage

```jsx
import { h } from 'preact';
import ImageLoader from '@your-org/image-loader';

const MyComponent = () => (
  <ImageLoader
    src="/path/to/image.jpg"
    alt="Description of the image"
    objectFit="cover"
    width="300px"
    height="200px"
    preload={false}
    onPreloadComplete={() => console.log('Preload complete')}
  />
);
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | Required | The source URL of the image to be loaded. |
| `alt` | `string` | Required | Alternative text for the image, important for accessibility. |
| `objectFit` | `string` | `'cover'` | CSS object-fit property value for the image. Options: 'cover', 'contain', 'fill', 'none', 'scale-down'. |
| `width` | `string` | `'100%'` | Width of the image container. Can be any valid CSS width value. |
| `height` | `string` | `'auto'` | Height of the image container. Can be any valid CSS height value. |
| `preload` | `boolean` | `false` | If true, the image will be preloaded as soon as the component mounts. |
| `onPreloadComplete` | `function` | `() => {}` | Callback function called when preloading is complete. |

## Features

### 1. Lazy Loading

The component uses the Intersection Observer API to implement lazy loading. Images are only loaded when they enter the viewport, reducing initial page load time and saving bandwidth.

### 2. Responsive Images

The component automatically selects the most appropriate image based on:
- Device type (mobile or desktop)
- Screen pixel density (1x, 2x, or 3x)
- Network connection speed

### 3. Modern Image Format Support

Supports modern image formats for better compression and quality:
- WebP: Automatically used if the browser supports it.
- AVIF: Used as the first choice if the browser supports it, falling back to WebP or JPEG/PNG.

### 4. Polyfills

- Intersection Observer: Automatically loads a polyfill if the browser doesn't support it.
- WebP: Dynamically loads a WebP polyfill for browsers that don't natively support it.

### 5. Visual Feedback

Provides various visual cues during the loading process:
- Skeleton loading effect
- Blur-up effect for smooth transitions
- Loading spinner for longer load times
- Fade-in animation when the image is loaded

### 6. Error Handling

- Implements a retry mechanism with exponential backoff for failed loads.
- Displays an error message if the image fails to load after multiple attempts.

### 7. Performance Optimization

- Defers loading during fast scrolling to prevent unnecessary network requests.
- Supports preloading for critical images.

### 8. Flexibility

- Supports custom object-fit values for various image display requirements.
- Allows setting explicit width and height for the image container.

## Browser Support

The ImageLoader component supports all modern browsers. For older browsers, it includes polyfills for key features like Intersection Observer and WebP support.

## Performance Considerations

- The component is optimized for performance, but be mindful of using too many instances on a single page, as it could impact memory usage.
- When using the `preload` option, use it sparingly and only for critical above-the-fold images to avoid unnecessary network requests.

## Accessibility

The component ensures accessibility by:
- Requiring an `alt` prop for all images.
- Using appropriate ARIA attributes for loading states.
- Ensuring color contrast for error messages.

## Examples

### Basic Usage

```jsx
<ImageLoader
  src="/images/example.jpg"
  alt="An example image"
/>
```

### With Custom Dimensions and Object Fit

```jsx
<ImageLoader
  src="/images/profile-pic.jpg"
  alt="User profile picture"
  objectFit="contain"
  width="150px"
  height="150px"
/>
```

### Preloading a Critical Image

```jsx
<ImageLoader
  src="/images/hero-banner.jpg"
  alt="Hero banner"
  preload={true}
  onPreloadComplete={() => console.log('Hero image preloaded')}
/>
```

## Best Practices

1. Always provide a meaningful `alt` text for images.
2. Use appropriate `objectFit` values based on your design requirements.
3. Set explicit `width` and `height` to prevent layout shifts during loading.
4. Use the `preload` option judiciously to balance between performance and user experience.
5. Ensure you have different image sizes available on your server for optimal responsive loading.

## Troubleshooting

If images are not loading as expected:
1. Check that the `src` URLs are correct and accessible.
2. Ensure your server supports serving WebP and AVIF formats if you're using them.
3. Verify that the polyfills are loading correctly in unsupported browsers.
4. Check the console for any error messages related to image loading.
