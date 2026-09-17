import React from 'react';

const ErrorPage = () => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
    }}>
      <div style={{
        textAlign: 'center',
        background: '#ffffff',
        borderRadius: '20px',
        boxShadow: '0 20px 45px rgba(15, 23, 42, 0.12)',
        padding: '48px 32px',
        maxWidth: '520px',
        width: '100%',
      }}>
        <div style={{
          fontSize: '72px',
          fontWeight: '700',
          color: '#ef4444',
          lineHeight: 1,
          marginBottom: '16px',
        }}>
          404
        </div>

        <h1 style={{
          margin: '0 0 12px',
          fontSize: '32px',
          color: '#1f2937',
        }}>
          Page Not Found
        </h1>

        <p style={{
          margin: '0 0 28px',
          fontSize: '16px',
          color: '#6b7280',
          lineHeight: 1.6,
        }}>
          The page you are looking for does not exist or may have been moved.
        </p>

        <a
          href="/"
          style={{
            display: 'inline-block',
            textDecoration: 'none',
            background: '#2563eb',
            color: '#fff',
            padding: '12px 24px',
            borderRadius: '999px',
            fontWeight: '600',
            transition: 'all 0.2s ease',
          }}
        >
          Go Home
        </a>
      </div>
    </div>
  );
};

export default ErrorPage;