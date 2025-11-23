import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: Error | null}> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("System Failure:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen w-screen bg-black text-red-500 font-mono flex flex-col items-center justify-center p-8 text-center">
            <h1 className="text-4xl font-bold mb-4 animate-pulse">SYSTEM FAILURE</h1>
            <p className="border border-red-900 p-4 bg-red-900/10 mb-4 max-w-2xl overflow-auto">
                {this.state.error?.toString() || "Unknown Error"}
            </p>
            <p className="text-xs text-gray-500">KERNEL_PANIC: PLEASE REFRESH TERMINAL</p>
        </div>
      );
    }

    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);