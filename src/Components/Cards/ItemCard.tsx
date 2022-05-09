import './card.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IItem } from '../../Interfaces/IItem';
import { CardButton } from '../Buttons/CardButton';
import { Edit } from '../../Icons/Edit';
import { EditItemDialog } from '../Dialogs/EditItemDialog';
import { Bin } from '../../Icons/Bin';

interface ICardProps {
  item: IItem;
  handleEditItem: (item: IItem) => void;
  handleDeleteItem: (item: IItem) => void;
}

export function ItemCard(props: ICardProps) {

  const [isEditing, setIsEditing] = useState(false);

  function onClickEdit() {
    setIsEditing(true);
  }

  function onCloseEditDialog() {
    setIsEditing(false);
  }

  function onSaveItem(newData: any) {
    props.handleEditItem(newData);
    setIsEditing(false);
  }

  function onClickDelete() {
    props.handleDeleteItem(props.item);
  }

  function onClickItem() {
    return window.open(props.item.url);
  }

  return (
    <>
      <div className="card smooth" onClick={onClickItem}>
        <img className="card__cover" src={props.item.image} alt="list cover"/>

        <div className="card__content">
          <div className="title">{props.item.title}</div>
          <div className="price">£{props.item.price}</div>
        </div>

        <div className="card__footer">
          <CardButton value="Edit" handleButtonClick={onClickEdit}>
            <Edit classes="w-4 h-4"/>
          </CardButton>
          <CardButton value="Delete" handleButtonClick={onClickDelete} color="red">
            <Bin classes="w-4 h-4"/>
          </CardButton>
        </div>
      </div>

      {!isEditing ? null :
        <EditItemDialog
          item={props.item}
          handleItemSave={onSaveItem}
          handleDialogClose={onCloseEditDialog}/>
      }
    </>
  );
}
