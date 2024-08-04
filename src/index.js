import { h, render } from 'preact';
import { useState } from 'preact/hooks';
import ImageLoader from './components/ImageLoader';
import './styles/main.css';

// Polyfill for older browsers
import 'intersection-observer';

const App = () => {
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const handleImageLoad = () => {
    setImagesLoaded(prev => prev + 1);
  };

  return (
    <div className="container">
      <h1 className="text-center mt-4 mb-4">Image Loader Demo</h1>
      
      <p className="text-center mb-4">
        Images loaded: {imagesLoaded} / 3
      </p>

      <div className="row">
        <div className="col-md-4 mb-4">
          <ImageLoader 
            src="/path/to/image1.jpg" 
            alt="Description of image 1"
            width="100%"
            height="300px"
            objectFit="cover"
            onPreloadComplete={handleImageLoad}
          />
        </div>
        <div className="col-md-4 mb-4">
          <ImageLoader 
            src="/path/to/image2.jpg" 
            alt="Description of image 2"
            width="100%"
            height="300px"
            objectFit="contain"
            onPreloadComplete={handleImageLoad}
          />
        </div>
        <div className="col-md-4 mb-4">
          <ImageLoader 
            src="/path/to/image3.jpg" 
            alt="Description of image 3"
            width="100%"
            height="300px"
            objectFit="cover"
            preload={true}
            onPreloadComplete={handleImageLoad}
          />
        </div>
      </div>
    </div>
  );
};

// Render the app
render(<App />, document.getElementById('app'));
