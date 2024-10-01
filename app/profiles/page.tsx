'use client';

import {
  AddProfileCard,
  ProfileDialog,
  useFetchProfiles,
  useHandleAddProfile,
  useHandleProfileClick,
} from '@/components/Profilehandler';
import { Profile, ProfileCardProps } from '@/types/index';
import Image from 'next/image';
import { useState } from 'react';
import { DotLoader } from 'react-spinners';

// ProfileCard component for individual profiles
const ProfileCard = ({ name, imageSrc, onClick }: ProfileCardProps) => (
  <div
    onClick={onClick}
    className="group mx-auto w-32 flex-row sm:w-36 md:w-44"
  >
    <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-md border-2 border-transparent group-hover:cursor-pointer group-hover:border-white sm:h-36 sm:w-36 md:h-44 md:w-44 ">
      <Image
        src={imageSrc}
        alt={`${name}-profile-img`}
        height={500}
        width={500}
        className="object-cover"
      />
    </div>
    <div className="mt-2 overflow-hidden overflow-ellipsis text-center text-2xl text-gray-500 group-hover:text-white md:mt-4">
      {name}
    </div>
  </div>
);

const Profiles = () => {
  const [profileName, setProfileName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [profiles, setProfiles] = useState<Profile[]>([]);

  useFetchProfiles(setProfiles, setError, setIsLoading);
  const handleProfileClick = useHandleProfileClick();

  const { handleAddProfile, isPending } = useHandleAddProfile(
    profileName,
    selectedImage || '',
    setProfiles,
    setError,
  );

  // Open/close modal
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // Return a loading state until profiles are fetched
  if (isLoading) {
    return (
      <div className="items- flex h-full w-full justify-center bg-gray-950">
        <DotLoader size={80} color="white" className="mt-20" />
      </div>
    );
  }

  return (
    <div className="flex h-full w-full items-center justify-center bg-gray-950">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl text-white md:text-6xl">Who is watching?</h1>

        <div
          className={`mt-12 ${profiles.length === 0 ? 'flex' : 'grid grid-cols-2'} items-center justify-center gap-6 md:gap-8 lg:flex`}
        >
          {profiles.map((profile) => (
            <button key={profile.id} disabled={isPending}>
              <ProfileCard
                name={profile.name}
                imageSrc={profile.imageSrc}
                onClick={() => handleProfileClick(profile)}
              />
            </button>
          ))}

          {/* Show Add Profile Card only if profiles are loaded */}
          {profiles.length < 4 && !isLoading && (
            <AddProfileCard onClick={handleOpenModal} />
          )}
        </div>

        <ProfileDialog
          isPending={isPending}
          profileName={profileName}
          setProfileName={setProfileName}
          selectedImage={selectedImage || ''}
          setSelectedImage={setSelectedImage}
          handleAddProfile={handleAddProfile}
          handleCloseModal={handleCloseModal}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />

        {error && <div className="mt-4 text-red-500">{error}</div>}
      </div>
    </div>
  );
};

export default Profiles;
