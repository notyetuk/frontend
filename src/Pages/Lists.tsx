import { useEffect, useState } from 'react';
import { Layout } from './Layout';
import { fetchLists } from '../Services/ListService';
import { List } from '../Components/List';
import { IList } from '../Interfaces/IList';
import { Spinner } from '../Icons/Spinner';
import { NewList } from '../Components/NewList';
import axios from 'axios';
import { ConfigStore as $global } from '../Stores/ConfigStore';
import { Headers } from '../Services/RequestService';
import { Modal } from '../Components/Modal';
import { Input } from '../Components/Input';
import { Loading } from '../Components/Loading';

export function Lists() {
  const [loading, setLoading] = useState(true);
  const [lists, setLists] = useState<IList[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentList, setCurrentList] = useState<IList>();

  useEffect(() => {
    fetchLists().then((l) => {
      setLists(l.lists);
      setLoading(false);
    });
  }, [null]);

  async function addList(newList: IList) {
    const { data } = await axios.post(`${$global.API}/list`, newList, {
      headers: Headers,
    });
    setLists([data.list, ...lists]);
  }

  async function deleteList(id?: string) {
    const { data } = await axios.delete(`${$global.API}/list/${id}`, {
      headers: Headers,
    });
    setLists(lists.filter((l) => l._id !== id));
  }

  async function editList(list: IList) {
    setEditTitle(list.title);
    setEditCover(list.cover);
    setCurrentList(list);
    setShowModal(true);
  }

  const [editTitle, setEditTitle] = useState('');
  const [editCover, setEditCover] = useState('');
  async function saveList() {
    const { data } = await axios.put(
      `${$global.API}/list/${currentList!._id}`,
      {
        editTitle,
        editCover,
      },
      {
        headers: Headers,
      }
    );
    const newList: IList = data.list[0];
    lists.map((l) => {
      if (l._id === newList._id) {
        l.title = newList.title;
        l.cover = newList.cover;
      }
    });

    handleModal();
  }

  function handleModal() {
    setShowModal(false);
  }

  return (
    <>
      <Layout>
        <NewList handleClick={addList} />
        {loading ? (
          // <div className="w-5 mx-auto">
          //   <Spinner />
          // </div>
          <Loading />
        ) : lists.length === 0 ? (
          'You have no lists yet'
        ) : (
          lists.map((l: IList) => (
            <List
              key={l._id}
              _id={l._id}
              title={l.title}
              total={l.total}
              createdAt={l.createdAt}
              cover={l.cover}
              isPrivate={l.isPrivate}
              handleDelete={() => deleteList(l._id)}
              handleEdit={() => editList(l)}
            />
          ))
        )}
      </Layout>
      {showModal ? (
        <Modal handleModal={handleModal}>
          <div className="flex flex-col space-y-2">
            <div className="mb-4 text-xl">Editing the list.</div>
            <Input
              handleChange={(e) => setEditTitle(e.target.value)}
              placeholder="New list title"
              value={editTitle}
              required={true}
            />
            <Input
              handleChange={(e) => setEditCover(e.target.value)}
              placeholder="New list cover"
              value={editCover}
              required={true}
            />
            <div className="flex space-x-2">
              <button className="button button-success" onClick={saveList}>
                Save
              </button>
              <button className="button button-plain" onClick={handleModal}>
                Close
              </button>
              {/* <Button class="button button-success" label="Save" /> */}
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
}
