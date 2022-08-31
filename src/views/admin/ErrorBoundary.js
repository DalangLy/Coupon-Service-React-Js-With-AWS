import React from 'react';
import Lottie from 'lottie-react';
import Error500 from '../../lotties/error-404.json';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <>
          <div className='w-full h-full '>
            <div className=' w-full h-full p-20 place-items-center'>
              <div className='font-bold text-[10rem] text-center'>500</div>
              <div className='font-medium text-[2rem] text-center'>
                Internal Server Error
              </div>

              <div className='font-medium text-[1rem] text-center'>
                Ooops! you were not suppose to see this.
              </div>
              <Lottie
                animationData={Error500}
                style={{
                  height: 400,
                }}
                loop={true}
              />
            </div>
          </div>
        </>
      );
    }

    return this.props.children;
  }
}
