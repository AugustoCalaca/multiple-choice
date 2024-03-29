import React from 'react';

type ErrorBoundaryState = { error: { message: string; source: string } | null };
class ErrorBoundary extends React.Component {
  state: ErrorBoundaryState = {
    error: null,
  };

  static getDerivedStateFromError(error) {
    return {
      error,
    };
  }

  render() {
    if (this.state.error !== null) {
      return (
        <div>
          <div>Error: {this.state.error.message}</div>
          <div>
            <pre>{JSON.stringify(this.state.error.source, null, 2)}</pre>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
