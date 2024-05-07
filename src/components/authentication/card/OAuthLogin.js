import React from 'react';
import SocialAuthButtons from '../SocialAuthButtons';
import AuthCardLayout from 'layouts/AuthCardLayout';

const OAuthLogin = () => {
  return (
    <AuthCardLayout>
      <SocialAuthButtons />
    </AuthCardLayout>
  );
};

export default OAuthLogin;
