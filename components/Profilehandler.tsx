import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Profile } from '@/types/index';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { setCookie } from 'nookies';
import {
  startTransition,
  useCallback,
  useEffect,
  useState,
  useTransition,
} from 'react';

export const useFetchProfiles = (
  setProfiles: Function,
  setError: Function,
  setIsLoading: Function,
) => {
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
  }, [setProfiles, setError, setIsLoading]);
};

export const useHandleProfileClick = () => {
  const router = useRouter();
  const pathname = usePathname();

  return useCallback(
    (profile: Profile) => {
      // Set profile ID in cookies
      setCookie(null, 'selectedProfileId', profile.id.toString(), {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: '/',
      });
      startTransition(() => {
        if (pathname === '/profiles') {
          router.push('/Home');
        } else {
          window.location.reload();
        }
      });
    },
    [router, pathname],
  );
};

export const useHandleAddProfile = (
  profileName: string,
  selectedImage: string,
  setProfiles: Function,
  setError: Function,
) => {
  const [isPending, startTransition] = useTransition();
  const handleProfileClick = useHandleProfileClick();

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
        setProfiles((prev: any) => [...prev, profile]);
        handleProfileClick(profile);
      } catch (err) {
        setError('Something went wrong. Please try again.');
        console.error('Error:', err);
      }
    });
  };

  return { handleAddProfile, isPending };
};

// AddProfileCard component for showing the Plus icon
export const AddProfileCard = ({ onClick }: { onClick: () => void }) => {
  const router = useRouter();
  const pathname = usePathname();
  const isProfilesPage = pathname === '/profiles';

  return (
    <div
      onClick={onClick}
      className={` group cursor-pointer  ${
        isProfilesPage
          ? 'mx-auto flex w-32 flex-col items-center justify-center sm:w-36 md:w-44'
          : 'flex flex-row items-center justify-start'
      }`}
    >
      <div
        className={`${
          isProfilesPage
            ? 'flex h-32 w-32 items-center justify-center overflow-hidden rounded-md border-2 border-dashed border-gray-400 sm:h-36 sm:w-36 sm:group-hover:border-white md:h-44 md:w-44'
            : 'flex border-none text-black transition-all duration-100  sm:group-hover:scale-105'
        }`}
      >
        <Plus
          className={`${
            isProfilesPage
              ? 'h-16 w-16 text-gray-400 group-hover:text-white'
              : 'h-8 w-8 text-black transition-all duration-100 dark:text-white sm:group-hover:scale-105'
          }`}
        />
      </div>
      <div
        className={`text-gray-500 ${
          isProfilesPage
            ? 'mt-4 text-center text-2xl group-hover:text-white'
            : 'ml-4 text-start text-lg font-medium text-black transition-all duration-100 dark:text-white sm:group-hover:scale-105'
        }`}
      >
        Add Profile
      </div>
    </div>
  );
};

export const deleteProfile = async (profileId: string) => {
  try {
    const response = await fetch(`/api/profiles`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ profileId }),
    });

    if (!response.ok) {
      throw new Error('Failed to delete profile');
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting profile:', error);
    return { error: (error as Error).message };
  }
};

export const changeProfileName = async (profileId: string, newName: string) => {
  try {
    const response = await fetch(`/api/profiles`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ profileId, newName }),
    });

    if (!response.ok) {
      throw new Error('Failed to change profile name');
    }

    return await response.json();
  } catch (error) {
    console.error('Error changing profile name:', error);
    return { error: (error as Error).message };
  }
};

interface ProfileDialogProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  isPending: boolean;
  profileName: string;
  setProfileName: (name: string) => void;
  selectedImage: string;
  setSelectedImage: (image: string) => void;
  handleAddProfile: () => void;
  handleCloseModal: () => void;
  setIsProfileOpen?: (isOpen: boolean) => void;
}

interface DeleteProfileDialogProps {
  profileId: string;
  onClose: () => void;
  onDeleteSuccess: () => void;
  setIsProfileOpen: (isOpen: boolean) => void;
}

interface ChangeProfileNameDialogProps {
  profileId: string;
  oldName: string;
  onClose: () => void;
  onChangeSuccess: () => void;
  setIsProfileOpen: (isOpen: boolean) => void;
}

export function ProfileDialog({
  profileName,
  setProfileName,
  selectedImage,
  setSelectedImage,
  handleAddProfile,
  handleCloseModal,
  isModalOpen,
  setIsModalOpen,
  isPending,
  setIsProfileOpen,
}: ProfileDialogProps & { isPending: boolean }) {
  // Predefined profile images
  const predefinedImages = [
    '/netflix-profile-blue.webp',
    '/netflix-profile-yellow.webp',
    '/netflix-profile-red.webp',
    '/netflix-profile-green.webp',
  ];

  return (
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
                    ? 'border-[3px] border-green-500'
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
            onClick={() => {
              handleAddProfile();
              setIsProfileOpen && setIsProfileOpen(false);
            }}
            disabled={
              !profileName ||
              profileName.length < 3 ||
              !selectedImage ||
              isPending
            }
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
  );
}

export const ChangeProfileNameDialog: React.FC<
  ChangeProfileNameDialogProps
> = ({ profileId, oldName, onClose, onChangeSuccess, setIsProfileOpen }) => {
  const [newName, setNewName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeName = async () => {
    setIsLoading(true);
    const result = await changeProfileName(profileId, newName);
    setIsLoading(false);

    if (!result.error) {
      onChangeSuccess();
      onClose();
    } else {
      alert(result.error);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-[90%] rounded-md sm:max-w-[60%] lg:max-w-[40%]">
        <DialogHeader>
          <DialogTitle>Change Profile Name</DialogTitle>
          <DialogDescription>
            <Input
              type="text"
              value={newName}
              onKeyDown={(e) => {
                if (
                  e.key === 'Enter' &&
                  !isLoading &&
                  newName.length >= 3 &&
                  newName !== oldName
                ) {
                  handleChangeName();
                }
              }}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Enter new name"
              className="mt-2 text-lg text-black dark:text-white"
            />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-row justify-end gap-2">
          <Button variant="destructive" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleChangeName();
              setIsProfileOpen(false);
            }}
            disabled={isLoading || newName.length < 3 || newName === oldName}
            className="bg-green-700 text-white hover:bg-green-600"
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const DeleteProfileDialog: React.FC<DeleteProfileDialogProps> = ({
  profileId,
  onClose,
  onDeleteSuccess,
  setIsProfileOpen,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    const result = await deleteProfile(profileId);
    setIsLoading(false);

    if (!result.error) {
      onDeleteSuccess();
      onClose();
    } else {
      alert(result.error);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="flex max-w-[90%] flex-col rounded-md sm:max-w-[60%] lg:max-w-[40%]">
        <DialogHeader className="flex flex-col items-center justify-center">
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this profile?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4 flex w-full flex-row items-center justify-center gap-2 sm:justify-center">
          <Button
            className="bg-stone-600 text-white hover:bg-stone-500"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              handleDelete();
              setIsProfileOpen(false);
            }}
            disabled={isLoading}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
