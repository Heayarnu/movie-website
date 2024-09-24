'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Profile, ProfileCardProps } from '@/types/index';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState, useTransition } from 'react';
import { DotLoader } from 'react-spinners';

// Predefined profile images
const predefinedImages = [
  '/netflix-profile-blue.webp',
  '/netflix-profile-yellow.webp',
  '/netflix-profile-red.webp',
  '/netflix-profile-green.webp',
];

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

// AddProfileCard component for showing the Plus icon
const AddProfileCard = ({ onClick }: { onClick: () => void }) => (
  <div
    onClick={onClick}
    className="group mx-auto flex w-32 cursor-pointer flex-col items-center justify-center sm:w-36 md:w-44"
  >
    <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-md border-2 border-dashed border-gray-400 group-hover:border-white sm:h-36 sm:w-36 md:h-44 md:w-44">
      <Plus className="h-16 w-16 text-gray-400 group-hover:text-white" />
    </div>
    <div className="mt-4 text-center text-2xl text-gray-500 group-hover:text-white">
      Add Profile
    </div>
  </div>
);
const Profiles = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [profileName, setProfileName] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Added loading state
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // Fetch profiles on mount
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch('/api/profiles');
        const { profiles, error } = await response.json();

        if (error) {
          setError(error);
        } else {
          setProfiles(profiles || []);
        }
      } catch (err) {
        setError('Something went wrong. Please try again.');
      } finally {
        setIsLoading(false); // Set loading to false once data is fetched
      }
    };
    fetchProfiles();
  }, []);

  // Handle profile click
  const handleProfileClick = useCallback(
    (profile: Profile) => {
      startTransition(() => {
        router.push('/Home');
      });
    },
    [router],
  );

  // Handle profile creation
  const handleAddProfile = async () => {
    if (!profileName || !selectedImage) return; // Ensure profile name and image are selected

    startTransition(async () => {
      try {
        const response = await fetch('/api/profiles', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: profileName,
            imageSrc: selectedImage,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to create profile');
        }

        const profile = await response.json();

        // Successfully created the profile
        setProfiles((prev) => [...prev, profile]);
        handleProfileClick(profile);
      } catch (err) {
        setError('Something went wrong. Please try again.');
        console.error('Error:', err);
      }
    });
  };

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

        {/* Modal for adding profile */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="w-auto">
            <DialogHeader>
              <DialogTitle>Create a Profile</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <Label htmlFor="profileName">Profile Name</Label>
              <Input
                id="profileName"
                type="text"
                disabled={isPending}
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                placeholder="Enter profile name"
              />

              {/* Display predefined images for selection */}
              <Label>Select a Profile Image</Label>

              <div className="flex space-x-4">
                {predefinedImages.map((image) => (
                  <div
                    key={image}
                    className={`h-14 w-14 cursor-pointer overflow-hidden rounded-md border-2 md:h-20 md:w-20 ${
                      selectedImage === image
                        ? 'border-blue-500'
                        : 'border-gray-300'
                    }`}
                    onClick={() => setSelectedImage(image)}
                  >
                    <Image
                      src={image}
                      alt="profile-img"
                      width={80}
                      height={80}
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-4">
              <Button
                variant="default"
                onClick={handleAddProfile}
                disabled={!profileName || !selectedImage || isPending}
              >
                Save
              </Button>
              <Button
                type="submit"
                variant="secondary"
                disabled={isPending}
                onClick={handleCloseModal}
                className="cursor-pointer bg-red-600 text-white hover:bg-red-700"
              >
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {error && <div className="mt-4 text-red-500">{error}</div>}
      </div>
    </div>
  );
};

export default Profiles;
