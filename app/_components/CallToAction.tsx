import EmailInput from './EmailInput';

const CallToAction = () => (
  <div className="bg-transparent">
    <p className="mt-6 px-4 text-center text-lg font-semibold text-white md:px-16 lg:text-xl 2xl:text-2xl">
      Ready to watch? Enter your email or mobile number to create or restart
      your membership.
    </p>

    <EmailInput />
  </div>
);

export default CallToAction;
