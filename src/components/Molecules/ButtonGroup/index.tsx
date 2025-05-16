import Button, { ButtonProps } from '../../Atoms/Button';

export type ButtonGroupProps = {
  buttons?: { button?: ButtonProps }[];
  justifyEnd?: boolean;
};

const ButtonGroup = ({ buttons, justifyEnd }: ButtonGroupProps) => {
  return buttons ? (
    <div
      className={`flex flex-wrap gap-x-normal ${
        justifyEnd ? 'justify-end' : ''
      }`}
    >
      {buttons.map(({ button }, i) => {
        return <Button key={i} {...button} />;
      })}
    </div>
  ) : null;
};

export default ButtonGroup;
