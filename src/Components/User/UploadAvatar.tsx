import { Modal } from '../Modal/Modal';

interface UploadAvatarProps {
  handleClose: () => void;
}

export function UploadAvatar(props: UploadAvatarProps) {

  function closeModal() {
    props.handleClose();
  }

  return (
    <Modal handleModalClose={closeModal}>
      <div>upload avatar form</div>
    </Modal>
  )
}
