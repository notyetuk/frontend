import { ChangeEvent, FormEvent, useState } from 'react';
import { uploadAvatar } from '../Services/ListService';

interface IUseAvatarUpload {
  closeModal?: () => void;
  renderPreview?: (avatarFile: File | undefined) => JSX.Element;
}

export function useAvatarUpload({ closeModal, renderPreview }: IUseAvatarUpload) {
  const [avatarFile, setAvatarFile] = useState<File>();
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const selectAvatarFile = (event: ChangeEvent<HTMLInputElement>) => {
    if ( !event.target.files ) {
      throw new Error('You must select an image file.');
    }
    setAvatarFile(event.target.files[0]);
  };

  const doUpload = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setIsUploading(true);
    if ( !avatarFile || typeof avatarFile === undefined ) {
      setIsUploading(false);
      throw new Error('You must select an image file.');
    }

    const formData = new FormData();
    formData.append('avatar', avatarFile);

    uploadAvatar(formData)
      .then((res) => {
        setIsUploading(false);
        closeModal!();
      })
      .catch((error) => {
        setIsUploading(false);
      });
  };

  return { selectAvatarFile, doUpload, avatarFile, isUploading };
}
