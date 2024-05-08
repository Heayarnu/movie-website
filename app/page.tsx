'use client';

import Image from 'next/image';
import React from 'react';

import HomeScreenRows from '@/app/_components/HomeScreenRows';
import CallToAction from '@/app/_components/CallToAction';
import { Button } from '@/components/ui/button';
import Faq from '@/app/_components/Faq';
import LoginButton from './_components/login-button';
import Footer from '@/components/Footer';

const Home = () => {
  return (
    <div className="flex flex-col mx-auto">
      <div
        className="relative flex flex-col h-screen bg-cover bg-center md:h-[50vh] xl:h-screen 2xl:h-[60vh]"
        style={{ backgroundImage: "url('/background-image.png')" }}
      >
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/80 via-transparent to-transparent" />
        <div className="z-10 absolute inset-0 bg-opacity-40 bg-black" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 z-10 bg-gradient-to-t from-black/90 to-transparent" />

        <div className="z-20 flex flex-col 2xl:px-52">
          {/* NavBar */}
          <div className="flex flex-row justify-between     px-5 mt-4 md:px-7 xl:px-40">
            <Image
              src="/logo.png"
              alt="logo"
              width={200}
              height={80}
              className="w-24 lg:w-40 lg:-mt-3 object-contain"
            />

            <LoginButton>
              <Button className="bg-[#CC0000] hover:bg-[#990000] text-white h-8 w-20 mt-2 mr-1 lg:mt-3">
                Sign in
              </Button>
            </LoginButton>
          </div>

          <div className="flex items-center justify-center flex-col mt-10 sm:mt-28 p-3 lg:mt-44">
            <h1 className="text-[33px] text-white leading-tight font-bold lg:text-5xl px-1 mb-4 text-center">
              Unlimited movies, Tv shows, and more
            </h1>
            <p className="font-semibold text-xl text-white lg:text-2xl text-center">
              Watch anywhere. Cancel anytime.
            </p>
          </div>

          <CallToAction />
        </div>
      </div>

      {/* Rows */}
      <div>
        <HomeScreenRows
          h1="Enjoy on your TV"
          h2="Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more."
          imageSrc="/tv.png"
        />
        <HomeScreenRows
          h1="Download your shows to watch offline"
          h2="Save your favorites easily and always have something to watch."
          imageSrc="/download.png"
          isReversed
        />
        <HomeScreenRows
          h1="Create profiles for kids"
          h2="Send kids on adventures with their favorite characters in a space made just for them—free with your membership."
          imageSrc="/kids.png"
        />
      </div>

      <div className="bg-black border-y-8 border-stone-800 w-full pb-10">
        <h1 className="text-white font-bold text-center text-4xl mt-10 lg:text-5xl lg:mt-14 xl:text-6xl px-3">
          Frequently Asked Questions
        </h1>

        <div className="mb-10">
          <Faq />
        </div>

        <CallToAction />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
