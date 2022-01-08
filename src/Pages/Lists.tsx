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

export function Lists() {
  const [loading, setLoading] = useState(true);
  const [lists, setLists] = useState<IList[]>([]);

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
    console.log(data.message);
    setLists([data.list, ...lists]);
  }

  async function deleteList(id?: string) {
    const { data } = await axios.delete(`${$global.API}/list/${id}`, {
      headers: Headers,
    });
    console.log(data.message);
    setLists(lists.filter((l) => l._id !== id));
  }

  return (
    <>
      <Layout>
        <NewList handleClick={addList} />

        {loading ? (
          <div className="w-5 mx-auto">
            <Spinner />
          </div>
        ) : lists.length === 0 ? (
          'You have no lists yet'
        ) : (
          lists.map((l: IList) => (
            <List
              key={l._id}
              _id={l._id}
              title={l.title}
              createdAt={l.createdAt}
              cover={l.cover}
              handleDelete={() => deleteList(l._id)}
            />
          ))
        )}
      </Layout>
    </>
  );
}
