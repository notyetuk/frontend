import { Modal } from '../Modal/Modal';
import { useRef, useState } from 'react';
import { uploadAvatar } from '../../Services/ListService';

interface UploadAvatarProps {
  handleClose: () => void;
}

export function UploadAvatar(props: UploadAvatarProps) {

  const [avatar, setAvatar] = useState<any>();

  function closeModal() {
    props.handleClose();
  }

  function submitAvatar(event: any) {
    event.preventDefault();
    event.stopPropagation();

    const formData = new FormData();
    formData.append('avatar', avatar);

    uploadAvatar(formData)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function onChange(event: any) {
    setAvatar(event.target.files[0]);
  }

  return (
    <Modal title="Upload an Avatar" handleModalClose={closeModal}>
      <form encType="multipart/form-data" onSubmit={submitAvatar}>
        <input type="file" name="avatar" onChange={onChange}/>
        <button type="submit">Submit</button>
      </form>
    </Modal>
  );
}
