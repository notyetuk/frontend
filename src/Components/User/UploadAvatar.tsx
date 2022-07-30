import { Modal } from '../Modal/Modal';
import { Button } from '../Button';
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
        <form encType="multipart/form-data" onSubmit={doUpload} className="flex flex-col">
          <input type="file" name="avatar" onChange={selectAvatarFile}/>
          <div className="flex justify-end mt-5">
            <Button label="Upload" class="button button-primary" disabled={isUploading}></Button>
          </div>
        </form>
      }
    </Modal>
  );
}
