import { h } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';

const ImageLoader = ({ 
  src, 
  alt, 
  preload = false, 
  objectFit = 'cover', 
  width = '100%', 
  height = 'auto', 
  onPreloadComplete = () => {} 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [deviceType, setDeviceType] = useState(null);
  const [pixelDensity, setPixelDensity] = useState(1);
  const [connectionType, setConnectionType] = useState(null);
  const [supportedFormats, setSupportedFormats] = useState([]);
  const [placeholder, setPlaceholder] = useState(null);
  const [currentSrc, setCurrentSrc] = useState(null);

  const imgRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    determineDeviceType();
    determinePixelDensity();
    determineConnectionType();
    checkImageFormatSupport();
    selectPlaceholder();

    if ('IntersectionObserver' in window) {
      setupIntersectionObserver();
    } else {
      loadIntersectionObserverPolyfill().then(setupIntersectionObserver);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (preload) {
      preloadImage();
    }
  }, [preload, src]);

  const loadIntersectionObserverPolyfill = async () => {
    if ('IntersectionObserver' in window) return;
    try {
      const script = document.createElement('script');
      script.src = 'https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver';
      script.async = true;
      await new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
      console.log('IntersectionObserver polyfill loaded');
    } catch (error) {
      console.error('Failed to load IntersectionObserver polyfill:', error);
    }
  };

  const loadWebPPolyfill = async () => {
    if (window.WebPDecoder) return;
    try {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/webp-hero@0.0.2/dist-cjs/polyfills.js';
      script.async = true;
      await new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
      const webpHero = await import('https://unpkg.com/webp-hero@0.0.2/dist-cjs/webp-hero.bundle.js');
      const decoder = new webpHero.WebpMachine();
      await decoder.polyfillDocument();
      console.log('WebP polyfill loaded');
      checkImageFormatSupport();
    } catch (error) {
      console.error('Failed to load WebP polyfill:', error);
    }
  };

  const determineDeviceType = () => {
    setDeviceType(window.innerWidth <= 768 ? 'mobile' : 'desktop');
  };

  const determinePixelDensity = () => {
    setPixelDensity(window.devicePixelRatio || 1);
  };

  const determineConnectionType = () => {
    if ('connection' in navigator) {
      setConnectionType(navigator.connection.effectiveType);
    }
  };

  const checkImageFormatSupport = () => {
    const formats = [];
    
    const testWebP = new Image();
    testWebP.onload = () => {
      if (testWebP.width > 0 && testWebP.height > 0) {
        formats.push('webp');
      } else {
        loadWebPPolyfill();
      }
      checkAVIFSupport(formats);
    };
    testWebP.onerror = () => {
      loadWebPPolyfill();
      checkAVIFSupport(formats);
    };
    testWebP.src = 'data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA';
  };

  const checkAVIFSupport = (formats) => {
    const testAVIF = new Image();
    testAVIF.onload = () => {
      if (testAVIF.width > 0 && testAVIF.height > 0) {
        formats.push('avif');
      }
      setSupportedFormats(formats);
    };
    testAVIF.onerror = () => {
      setSupportedFormats(formats);
    };
    testAVIF.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=';
  };

  const selectPlaceholder = () => {
    setPlaceholder('/assets/images/placeholder.jpg');
  };

  const setupIntersectionObserver = () => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadImage();
        }
      },
      { rootMargin: '200px' }
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }
  };

  const preloadImage = () => {
    const img = new Image();
    img.onload = () => {
      setIsPreloaded(true);
      onPreloadComplete();
    };
    img.onerror = () => {
      console.error('Preload failed');
    };
    img.src = determineImageSource();
  };

  const loadImage = () => {
    if (isScrollingFast()) {
      setTimeout(loadImage, 300);
      return;
    }

    if (isLoading) return;

    setIsLoading(true);
    const imgSrc = determineImageSource();
    setCurrentSrc(imgSrc);

    const img = new Image();
    img.onload = () => {
      setIsLoaded(true);
      setIsLoading(false);
      setError(null);
    };
    img.onerror = handleLoadError;
    
    if (imgRef.current) {
      imgRef.current.classList.add('blur-up');
    }
    
    img.src = imgSrc;
  };

  const determineImageSource = () => {
    let imageSrc = src;
    
    if (deviceType === 'mobile') {
      imageSrc = imageSrc.replace(/\.(jpg|png)$/, '-mobile.$1');
    } else if (pixelDensity >= 3) {
      imageSrc = imageSrc.replace(/\.(jpg|png)$/, '-3x.$1');
    } else if (pixelDensity >= 2) {
      imageSrc = imageSrc.replace(/\.(jpg|png)$/, '-2x.$1');
    }

    if (supportedFormats.includes('avif')) {
      imageSrc = imageSrc.replace(/\.(jpg|png|webp)$/, '.avif');
    } else if (supportedFormats.includes('webp')) {
      imageSrc = imageSrc.replace(/\.(jpg|png)$/, '.webp');
    }

    if (connectionType === '2g' || connectionType === '3g') {
      imageSrc = imageSrc.replace(/\.(jpg|png|webp|avif)$/, '-low.$1');
    }

    return imageSrc;
  };

  const handleLoadError = () => {
    setIsLoading(false);
    if (retryCount < 3) {
      setRetryCount(retryCount + 1);
      setTimeout(loadImage, Math.pow(2, retryCount) * 1000);
    } else {
      setError('Failed to load image');
    }
  };

  const isScrollingFast = () => {
    // Implement logic to determine if scrolling is fast
    return false;
  };

  const handleResize = () => {
    const newDeviceType = window.innerWidth <= 768 ? 'mobile' : 'desktop';
    const newPixelDensity = window.devicePixelRatio || 1;

    if (newDeviceType !== deviceType || newPixelDensity !== pixelDensity) {
      setDeviceType(newDeviceType);
      setPixelDensity(newPixelDensity);
      if (!isLoaded && !isLoading) {
        loadImage();
      }
    }
  };

  return (
    <div 
      className={`image-loader-container ${isLoading ? 'skeleton' : ''}`}
      style={{ width, height }}
    >
      {!isLoaded && placeholder && (
        <img 
          src={placeholder} 
          alt="Loading placeholder" 
          className="image-loader-placeholder blur-up"
          style={{ objectFit }}
        />
      )}
      {isLoading && <div className="loading-indicator" />}
      {error && <p className="image-loader-error fade-in">{error}</p>}
      <img
        ref={imgRef}
        src={isLoaded ? currentSrc : placeholder}
        alt={alt}
        className={`image-loader-img ${isLoaded ? 'loaded lazyloaded' : ''}`}
        style={{ objectFit }}
        onLoad={() => {
          if (imgRef.current) {
            imgRef.current.classList.remove('blur-up');
          }
        }}
      />
    </div>
  );
};

export default ImageLoader;
