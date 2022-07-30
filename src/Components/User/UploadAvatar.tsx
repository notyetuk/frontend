import { Modal } from '../Modal/Modal';
import { Button } from '../Button';
import { useAvatarUpload } from '../../Hooks/useAvatarUpload';
import { MutableRefObject, useRef } from 'react';

interface UploadAvatarProps {
  handleClose: () => void;
}

export function UploadAvatar(props: UploadAvatarProps) {

  const closeModal = () => {
    props.handleClose();
  };

  const { selectAvatarFile, doUpload, avatarFile, isUploading } = useAvatarUpload({ closeModal });

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
      <AvatarPreview avatarFile={avatarFile}/>
    </Modal>
  );
}

function AvatarPreview(props: any) {

  const avatarPreview: MutableRefObject<HTMLCanvasElement | null> = useRef(null);

  if ( props.avatarFile ) {
    const canvas = avatarPreview.current;
    canvas!.width = 200;
    canvas!.height = 200;
    const context = canvas!.getContext('2d');

    const image = new Image();
    image.onload = () => {
      drawImageProp(context, image, 0, 0, 200, 200, 0.5, 0.5);
    };
    image.src = URL.createObjectURL(props.avatarFile);
  }

  return (
    <canvas width={0} height={0} ref={avatarPreview}></canvas>
  );
}

/**
 * By Ken Fyrstenberg Nilsen
 *
 * drawImageProp(context, image [, x, y, width, height [,offsetX, offsetY]])
 *
 * If image and context are only arguments rectangle will equal canvas
 */
function drawImageProp(ctx: any, img: any, x: any, y: any, w: any, h: any, offsetX: any, offsetY: any) {

  if ( arguments.length === 2 ) {
    x = y = 0;
    w = ctx.canvas.width;
    h = ctx.canvas.height;
  }

  // default offset is center
  offsetX = typeof offsetX === 'number' ? offsetX : 0.5;
  offsetY = typeof offsetY === 'number' ? offsetY : 0.5;

  // keep bounds [0.0, 1.0]
  if ( offsetX < 0 ) offsetX = 0;
  if ( offsetY < 0 ) offsetY = 0;
  if ( offsetX > 1 ) offsetX = 1;
  if ( offsetY > 1 ) offsetY = 1;

  var iw = img.width,
    ih = img.height,
    r = Math.min(w / iw, h / ih),
    nw = iw * r,   // new prop. width
    nh = ih * r,   // new prop. height
    cx, cy, cw, ch, ar = 1;

  // decide which gap to fill
  if ( nw < w ) ar = w / nw;
  if ( Math.abs(ar - 1) < 1e-14 && nh < h ) ar = h / nh;  // updated
  nw *= ar;
  nh *= ar;

  // calc source rectangle
  cw = iw / (nw / w);
  ch = ih / (nh / h);

  cx = (iw - cw) * offsetX;
  cy = (ih - ch) * offsetY;

  // make sure source rectangle is valid
  if ( cx < 0 ) cx = 0;
  if ( cy < 0 ) cy = 0;
  if ( cw > iw ) cw = iw;
  if ( ch > ih ) ch = ih;

  // fill image in dest. rectangle
  ctx.drawImage(img, cx, cy, cw, ch, x, y, w, h);
}
