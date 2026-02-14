import Button from '../ui/Button';
import Input from '../ui/Input';

type Props = {
  options: string[];
  onChange: (options: string[]) => void;
};

const OptionsEditor = ({ options, onChange }: Props) => {
  const handleOptionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ): void => {
    onChange(options.map((opt, i) => (i === index ? e.target.value : opt)));
  };

  return (
    <div className="space-y-3">
      {options.map((option, index) => (
        <div key={index} className="flex gap-2">
          <Input
            type="text"
            value={option}
            onChange={(e) => handleOptionChange(e, index)}
          />

          <Button
            className="px-3"
            variant="danger"
            onClick={() => onChange(options.filter((_, i) => i !== index))}
          >
            ✕
          </Button>
        </div>
      ))}

      <Button
        variant="ghost"
        type="button"
        className="text-sm"
        onClick={() => onChange([...options, ''])}
      >
        + Add option
      </Button>
    </div>
  );
};

export default OptionsEditor;
