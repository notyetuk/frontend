import { CardButton } from "../../Components/Buttons/CardButton";
import './card-button.scss';

export default {
  title: 'Hello',
  component: CardButton,
};

const Template = (args: any) => <CardButton {...args} />

export const Primary = Template.bind({});