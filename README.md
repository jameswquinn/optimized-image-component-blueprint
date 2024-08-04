# ImageLoader Component for Preact

The ImageLoader component is a high-performance, feature-rich image loading solution for Preact applications. It offers lazy loading, responsive images, support for modern image formats, and provides visual feedback during the loading process.

## Features

- 🚀 Lazy loading with Intersection Observer API
- 🖼️ Responsive image selection based on device and network conditions
- 🎨 Support for WebP and AVIF image formats
- 🔄 Automatic retry mechanism for failed loads
- 💅 Customizable placeholder and error states
- 📱 Adapts to different screen densities (1x, 2x, 3x)
- 🔍 Flexible image display with object-fit support
- ⚡ Preloading option for critical images
- 🌐 Fallback for browsers without Intersection Observer support

## Installation

```bash
npm install @your-org/image-loader
```

## Quick Start

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
  />
);
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | Required | The source URL of the image |
| `alt` | `string` | Required | Alternative text for the image |
| `objectFit` | `string` | `'cover'` | CSS object-fit property value |
| `width` | `string` | `'100%'` | Width of the image container |
| `height` | `string` | `'auto'` | Height of the image container |
| `preload` | `boolean` | `false` | If true, preload the image |
| `onPreloadComplete` | `function` | `() => {}` | Callback for preload completion |

## Advanced Usage

### Preloading Critical Images

```jsx
<ImageLoader
  src="/images/hero-banner.jpg"
  alt="Hero banner"
  preload={true}
  onPreloadComplete={() => console.log('Hero image preloaded')}
/>
```

### Custom Dimensions and Object Fit

```jsx
<ImageLoader
  src="/images/profile-pic.jpg"
  alt="User profile picture"
  objectFit="contain"
  width="150px"
  height="150px"
/>
```

## Browser Support

The ImageLoader component supports all modern browsers. For older browsers, it includes polyfills for key features like Intersection Observer and falls back gracefully if advanced features are not supported.

## Performance Considerations

- Use the `preload` option sparingly and only for critical above-the-fold images.
- Provide different image sizes on your server for optimal responsive loading.
- Set explicit `width` and `height` to prevent layout shifts during loading.

## Accessibility

The component ensures accessibility by:
- Requiring an `alt` prop for all images.
- Using appropriate ARIA attributes for loading states.
- Ensuring color contrast for error messages.

## Documentation

For more detailed documentation, including API references and advanced usage examples, please refer to:

- [API Documentation](./docs/API.md)
- [FAQ](./docs/FAQ.md)

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any problems or have any questions, please open an issue in this repository.
