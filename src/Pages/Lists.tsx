import { useContext, useEffect, useState } from 'react';
import { Layout } from './Layout';
import {
  createList,
  deleteList,
  fetchLists,
  updateList,
  updateListPrivacy,
} from '../Services/ListService';
import { IList } from '../Interfaces/IList';
import { NewList } from '../Components/NewList';
import { Modal } from '../Components/Modal/Modal';
import { Input } from '../Components/Input/Input';
import { Loading } from '../Components/Loading';
import { UserContext } from '../Services/AuthService';
import { Navigate } from 'react-router-dom';
import { ListCard } from '../Components/Cards/ListCard';
import { Button } from '../Components/Button';

export function Lists() {
  const [loading, setLoading]         = useState(true);
  const [lists, setLists]             = useState<IList[]>([]);
  const [showModal, setShowModal]     = useState(false);
  const [currentList, setCurrentList] = useState<IList>();

  const [isAdding, setIsAdding] = useState(false);

  const user = useContext(UserContext);

  if ( !user.username ) {
    return (<Navigate to="/login"/>);
  }

  useEffect(() => {
    fetchLists().then((l) => {
      setLists(l.lists);
      setLoading(false);
    });
  }, []);

  async function addList(newList: IList) {
    const data = await createList(newList);
    setLists([data.list, ...lists]);
    setIsAdding(false);
  }

  async function doDeleteList(list: IList) {
    await deleteList(list._id!);
    setLists(lists.filter((l) => l._id !== list._id));
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
    if ( !currentList?._id ) return;
    const response = await updateList(currentList._id, { editTitle, editCover });
    const newList: IList = response.data.list[0];
    lists.map((l) => {
      if ( l._id === newList._id ) {
        l.title = newList.title;
        l.cover = newList.cover;
      }
    });

    handleModal();
  }

  async function handleListPrivacy(list: IList) {
    const { data } = await updateListPrivacy(list._id!, list.isPrivate!);
    const newList  = lists.map(l => {
      if ( l._id === list._id ) l.isPrivate = data.list[0].isPrivate;
      return l;
    });
    setLists(newList);
  }

  function handleModal() {
    setShowModal(false);
  }

  function onAddNewListClick() {
    setIsAdding(true);
  }

  function onAddNewListClose() {
    setIsAdding(false);
  }

  return (
    <>
      <Layout>
        {/*<NewList handleClick={addList}/>*/}
        <div className="w-full lg:w-2/3 text-left mx-auto mb-5">
          <Button onButtonClick={onAddNewListClick} label="Add New List" class="button button-primary" />
        </div>
        {loading ? (
          <Loading/>
        ) : lists.length === 0 ? (
            <div className="dark:text-white">You have no lists yet</div>
          ) :
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2 w-full lg:w-2/3 mx-auto">
            {lists.map((list: IList) => (
              <ListCard list={list}
                        key={list._id}
                        handleEdit={editList}
                        handleListPrivacy={handleListPrivacy}
                        handleDelete={doDeleteList}/>
            ))}
          </div>
        }
      </Layout>
      {isAdding ? (
        <NewList handleAddNewListClose={onAddNewListClose} handleAddNewListSubmit={addList} />
      ) : null}
      {showModal ? (
        <Modal title="Editing the list" handleModalClose={handleModal}>
          <div className="flex flex-col space-y-2">
            <Input
              handleChange={(v) => setEditTitle(v)}
              placeholder="New list title"
              value={editTitle}
              required={true}
            />
            <Input
              handleChange={(v) => setEditCover(v)}
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
              {/* <Buttons class="button button-success" label="Save" /> */}
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
}
