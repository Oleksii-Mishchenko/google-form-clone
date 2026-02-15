import Input from '../ui/Input';
import Textarea from '../ui/Textarea';

type Props = {
  title: string;
  description: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
};

const FormMeta = ({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
}: Props) => (
  <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
    <Input
      placeholder="Form title"
      value={title}
      onChange={(e) => onTitleChange(e.target.value)}
    />

    <Textarea
      placeholder="Form description"
      value={description}
      onChange={(e) => onDescriptionChange(e.target.value)}
    />
  </div>
);

export default FormMeta;
