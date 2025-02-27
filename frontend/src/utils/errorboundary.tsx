import React, { Component, ReactNode } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

interface ErrorBoundaryProps {
  children: ReactNode; 
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error: error, errorInfo: null }; // Update state to render the fallback UI
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    console.error("Error caught by Error Boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <h2>Something went wrong. Please try again later.</h2>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
