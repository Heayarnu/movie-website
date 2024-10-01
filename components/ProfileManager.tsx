'use client';

import {
  AddProfileCard,
  ChangeProfileNameDialog,
  DeleteProfileDialog,
  ProfileDialog,
  useFetchProfiles,
  useHandleAddProfile,
  useHandleProfileClick,
} from '@/components/Profilehandler';
import { Profile } from '@/types/index';
import { ChevronsUpDownIcon, MoreHorizontal, Pen, Trash } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ThemeToggler } from './ThemeToggler';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

export const ProfileManager = ({ profile }: { profile: Profile }) => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  useState<string | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [profileName, setProfileName] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [profileToDelete, setProfileToDelete] = useState<string | null>(null);
  const handleOpenDeleteDialog = (profileId: string) => {
    setProfileToDelete(profileId);
    setIsDeleteDialogOpen(true);
  };
  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };
  const handleDeleteSuccess = () => {
    window.location.reload();
  };

  const [isChangeNameDialogOpen, setIsChangeNameDialogOpen] = useState(false);
  const [profileToChangeName, setProfileToChangeName] = useState<string | null>(
    null,
  );
  const [oldProfileName, setOldProfileName] = useState<string | null>(null);

  const handleOpenChangeNameDialog = (profileId: string, oldName: string) => {
    setProfileToChangeName(profileId);
    setOldProfileName(oldName);
    setIsChangeNameDialogOpen(true);
  };
  const handleCloseChangeNameDialog = () => {
    setIsChangeNameDialogOpen(false);
  };
  const handleChangeSuccess = () => {
    window.location.reload();
  };

  useFetchProfiles(setProfiles, setError, setIsLoading);
  const handleProfileClick = useHandleProfileClick();

  const { handleAddProfile, isPending } = useHandleAddProfile(
    profileName,
    selectedImage || '',
    setProfiles,
    setError,
  );

  const filteredProfiles = profiles.filter((p) => p.name !== profile.name);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col pr-3">
      <div className="flex w-full flex-row items-center justify-between">
        <Image
          src={profile.imageSrc}
          alt="profile icon"
          width={50}
          height={50}
          className="rounded-md"
        />

        <div className="-mr-5 -mt-3">
          <ThemeToggler />
        </div>
      </div>

      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        {' '}
        <div className="my-2 flex w-full items-center justify-between">
          <h1 className="text-xl font-semibold sm:text-2xl">{profile.name}</h1>

          <CollapsibleTrigger asChild>
            <ChevronsUpDownIcon className="ml-2 cursor-pointer" />
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <div className="mt-2 border-b border-gray-400" />
          {filteredProfiles.map((p, index) => (
            <div key={index} className="flex items-center justify-between pt-4">
              <button
                className="flex items-center justify-start text-lg transition-all duration-100 sm:hover:scale-105"
                onClick={() => handleProfileClick(p)}
              >
                <Image
                  src={p.imageSrc}
                  alt="profile icon"
                  width={30}
                  height={30}
                  className="mr-4 rounded-lg"
                />
                {p.name}
              </button>

              <TooltipProvider>
                <Tooltip>
                  <DropdownMenu>
                    <TooltipTrigger>
                      <DropdownMenuTrigger asChild>
                        <MoreHorizontal className="h-6 w-6 cursor-pointer text-gray-500 dark:text-white" />
                      </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Options</p>
                    </TooltipContent>

                    <DropdownMenuContent>
                      <DropdownMenuLabel>Manage Profile</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleOpenChangeNameDialog(p.id, p.name)}
                      >
                        Rename
                        <DropdownMenuShortcut>
                          <Pen className="mr-2 h-4 w-4" />
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleOpenDeleteDialog(p.id)}
                      >
                        Delete
                        <DropdownMenuShortcut>
                          <Trash className="mr-2 h-4 w-4" />
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {isDeleteDialogOpen && profileToDelete && (
                    <DeleteProfileDialog
                      profileId={profileToDelete}
                      onClose={handleCloseDeleteDialog}
                      onDeleteSuccess={handleDeleteSuccess}
                    />
                  )}

                  {isChangeNameDialogOpen &&
                    profileToChangeName &&
                    oldProfileName && (
                      <ChangeProfileNameDialog
                        profileId={profileToChangeName}
                        oldName={oldProfileName}
                        onClose={handleCloseChangeNameDialog}
                        onChangeSuccess={handleChangeSuccess}
                      />
                    )}
                </Tooltip>
              </TooltipProvider>
            </div>
          ))}

          {profiles.length < 4 && !isLoading && (
            <div className="mt-2 flex justify-start">
              <AddProfileCard onClick={handleOpenModal} />

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
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>
      <div className="mt-2 border-b border-gray-400" />
    </div>
  );
};

export default ProfileManager;
