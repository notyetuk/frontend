import { useNavigate } from 'react-router-dom';
import { IList } from '../Interfaces/IList';
import { Bin } from '../Icons/Bin';
import { Edit } from '../Icons/Edit';
import { LockClosed, LockOpen } from '../Icons/Lock';
import axios from 'axios';
import { ConfigStore as $global } from '../Stores/ConfigStore';
import { Headers } from '../Services/RequestService';
import { useState } from 'react';
import { Toast } from './Toast';
import { Input } from './Input';
import { Copy } from '../Icons/Copy';

export function List(list: IList) {
  const [isPrivate, setIsPrivate] = useState(list.isPrivate);
  const [toastShow, setToastShow] = useState(false);
  const [toastText, setToastText] = useState('');

  const navigate = useNavigate();
  function openList() {
    navigate(`/list/${list._id}`);
  }

  async function setPrivate() {
    const { data } = await axios.put(
      `${$global.API}/list/privacy/${list._id}`,
      {
        isPrivate: !isPrivate,
      },
      {
        headers: Headers,
      }
    );
    setIsPrivate(!isPrivate);
    setToastText(`Made list ${!isPrivate ? 'private' : 'public'}.`);
    setToastShow(true);
  }

  function handleCloseToast() {
    setToastShow(false);
  }

  function copyShareableLink() {
    setToastShow(true);
    setToastText('Copied shareable link to clipboard.');
    navigator.clipboard.writeText(`${$global.URL}/list/s/${list._id}`);
  }

  return (
    <>
      {toastShow ? (
        <Toast
          type="info"
          text={toastText}
          show={toastShow}
          closeToast={handleCloseToast}
        />
      ) : null}
      <div className="p-3 rounded-md border border-slate-300 bg-slate-50 text-left mb-2 shadow hover:shadow-md">
        <div className="flex space-x-3 relative">
          <div className="absolute right-3 flex space-x-2">
            <button
              className="button-plain p-1 rounded-full outline-none"
              onClick={setPrivate}
            >
              {isPrivate ? (
                <LockClosed classes="w-4 h-4" />
              ) : (
                <LockOpen classes="w-4 h-4" />
              )}
            </button>
            <button
              className="button-success text-white p-1 rounded-full outline-none"
              onClick={() => list.handleEdit!(list._id)}
            >
              <Edit classes="w-4 h-4" />
            </button>
            <button
              className="button-error text-white p-1 rounded-full outline-none"
              onClick={() => list.handleDelete!(list._id)}
            >
              <Bin classes="w-4 h-4" />
            </button>
          </div>
          <div className="w-1/4">
            <img
              src={list.cover}
              onClick={openList}
              className="cursor-pointer object-cover h-full"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <div onClick={openList}>
              <div className="text-2xl cursor-pointer">{list.title}</div>
            </div>
            <div>Total: £{!list.total ? '0' : parseFloat(list.total).toFixed(2)}</div>
            <div className="text-sm">
              Added on {new Date(list.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
        <div className="mt-2 flex space-x-2">
          {isPrivate ? null : (
            <>
              <Input
                type="text"
                value={`${$global.URL}/list/s/${list._id}`}
                disabled={true}
                classes="w-full"
              />
              <button
                className="button button-primary"
                onClick={copyShareableLink}
              >
                <Copy classes="w-5 h-5" />
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
