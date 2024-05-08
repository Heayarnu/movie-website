import EmailInput from './EmailInput';
import React from 'react';

const CallToAction = () => (
  <div className="bg-transparent">
    <p className="font-semibold text-lg px-4 md:px-16 text-center mt-6 lg:text-xl 2xl:text-2xl text-white">
      Ready to watch? Enter your email or mobile number to create or restart
      your membership.
    </p>

    <EmailInput />
  </div>
);

export default CallToAction;
