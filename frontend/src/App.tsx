import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import { useAuthContext } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import LoadingBar from 'react-top-loading-bar';
import ErrorBoundary from '../src/utils/errorboundary';

const Home = lazy(() => import('./pages/Home'));

const App: React.FunctionComponent = (): React.ReactElement => {
  const [progress, setProgress] = useState(0);
  const { authUser, isLoading } = useAuthContext();
  const location = useLocation();

  useEffect(() => {
    if (isLoading) return;
    setProgress(30);
    setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setProgress(0);
      }, 500);
    }, 1000);
  }, [location, isLoading]);

  return (
    <ErrorBoundary>
      <LoadingBar
        color="#0EA5E9"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />

      <div className="p-4 h-screen flex items-center justify-center">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
            <Route path="/signup" element={!authUser ? <SignUp /> : <Navigate to="/" />} />
            <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
        <Toaster />
      </div>
    </ErrorBoundary>
  );
};

export default App;
