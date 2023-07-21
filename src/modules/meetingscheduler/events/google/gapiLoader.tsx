// utils/gapiLoader.ts

declare global {
    interface Window {
      gapi: any; // You can add more specific typings for 'gapi' here if available
    }
  }
  
  export const loadGapi = (onLoad: () => void) => {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
  
    script.onload = () => {
      if (typeof window.gapi === 'undefined') {
        console.error('Failed to load Google API client library.');
      } else {
        onLoad();
      }
    };
  
    document.head.appendChild(script);
  };

  // gapiLoader.ts

// export const loadGapi = (onLoad: () => void) => {
//   const script = document.createElement('script');
//   script.src = 'https://apis.google.com/js/api.js';

//   script.onload = () => {
//     if (typeof window.gapi === 'undefined') {
//       console.error('Failed to load Google API client library.');
//     } else {
//       onLoad();
//     }
//   };

//   document.head.appendChild(script);
// };
