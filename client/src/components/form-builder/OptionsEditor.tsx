import Button from '../ui/Button';
import Input from '../ui/Input';

interface OptionsEditorProps {
  options: string[];
  onChange: (options: string[]) => void;
}

const OptionsEditor = ({ options, onChange }: OptionsEditorProps) => {
  const handleOptionChange = (value: string, index: number): void => {
    onChange(options.map((opt, i) => (i === index ? value : opt)));
  };

  return (
    <div className="space-y-3">
      {options.map((option, index) => (
        <div key={index} className="flex gap-2">
          <Input
            value={option}
            onChange={(e) => handleOptionChange(e.target.value, index)}
          />

          <Button
            type="button"
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
