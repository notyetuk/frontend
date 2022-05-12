import './card.scss';
import { IList } from '../../Interfaces/IList';
import { useNavigate } from 'react-router-dom';
import { CardButton } from '../Buttons/CardButton';
import { Edit } from '../../Icons/Edit';
import { LockClosed, LockOpen } from '../../Icons/Lock';
import { Bin } from '../../Icons/Bin';

interface ICardProps {
  list: IList;
  handleEdit: (list: IList) => void;
  handleListPrivacy: (list: IList) => void;
  handleDelete: (list: IList) => void;
}

export function ListCard(props: ICardProps) {

  const navigate = useNavigate();

  function onClickCard() {
    return navigate(`/list/${props.list._id}`);
  }

  function onClickEdit() {
    props.handleEdit(props.list);
  }

  function onClickPrivacy() {
    props.handleListPrivacy(props.list);
  }

  function onClickDelete() {
    props.handleDelete(props.list);
  }

  return (
    <div className="card smooth" onClick={onClickCard}>
      <img className="card__cover" src={props.list.cover} alt="list cover"/>

      <div className="card__content">
        <div className="title">{props.list.title}</div>
        <div className="price">£{Number(props.list.total || 0).toFixed(2)}</div>
        <div className="item-count">{props.list.items} items</div>
      </div>

      <div className="card__footer">
        <CardButton value="Edit" handleButtonClick={onClickEdit}>
          <Edit classes="w-4 h-4"/>
        </CardButton>
        <CardButton value="Privacy" handleButtonClick={onClickPrivacy}>
          {props.list.isPrivate ? <LockClosed classes="w-4 h-4"/> : <LockOpen classes="w-4 h-4"/>}
        </CardButton>
        <CardButton value="Delete" handleButtonClick={onClickDelete} color="red">
          <Bin classes="w-4 h-4"/>
        </CardButton>
      </div>
    </div>
  );
}
