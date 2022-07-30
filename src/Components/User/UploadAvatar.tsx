import { Modal } from '../Modal/Modal';
import { useState } from 'react';
import { useAvatarUpload } from '../../Hooks/useAvatarUpload';

interface UploadAvatarProps {
  handleClose: () => void;
}

export function UploadAvatar(props: UploadAvatarProps) {

  const { selectAvatarFile, doUpload, isUploading } = useAvatarUpload();

  function closeModal() {
    props.handleClose();
  }

  return (
    <Modal title="Upload an Avatar" handleModalClose={closeModal}>
      {isUploading ? <div>Uploading file....</div> :
        <form encType="multipart/form-data" onSubmit={doUpload}>
          <input type="file" name="avatar" onChange={selectAvatarFile}/>
          <button type="submit">Submit</button>
        </form>
      }
    </Modal>
  );
}
