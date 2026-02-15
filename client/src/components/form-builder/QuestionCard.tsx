import type { QuestionDraft } from '../../types';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import OptionsEditor from './OptionsEditor';

type Props = {
  question: QuestionDraft;
  index: number;
  isValid: boolean;
  onChange: (updated: QuestionDraft) => void;
  onDelete: () => void;
};

const QuestionCard = ({
  question,
  index,
  isValid,
  onChange,
  onDelete,
}: Props) => {
  const updateField = <K extends keyof QuestionDraft>(
    key: K,
    value: QuestionDraft[K],
  ) => {
    onChange({ ...question, [key]: value });
  };

  const isChoiceType =
    question.type === 'MULTIPLE_CHOICE' || question.type === 'CHECKBOX';

  return (
    <div className="bg-surface border border-border rounded-xl p-5 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-text-secondary">
          Question {index + 1}
        </h3>

        {!isValid && <span className="text-xs text-danger">Incomplete</span>}

        <Button type="button" variant="danger" onClick={onDelete}>
          Delete
        </Button>
      </div>

      <div className="flex gap-2 justify-between items-start">
        <Input
          placeholder="Question title"
          value={question.title}
          onChange={(e) => updateField('title', e.target.value)}
        />
      </div>

      <Select
        value={question.type}
        onChange={(e) =>
          updateField('type', e.target.value as QuestionDraft['type'])
        }
      >
        <option value="TEXT">Text</option>
        <option value="DATE">Date</option>
        <option value="MULTIPLE_CHOICE">Multiple Choice</option>
        <option value="CHECKBOX">Checkbox</option>
      </Select>

      <label className="flex items-center gap-2 text-sm text-text-secondary">
        <Input
          type="checkbox"
          checked={question.required}
          onChange={(e) => {
            updateField('required', e.target.checked);
          }}
        />
        Required
      </label>

      {isChoiceType && (
        <OptionsEditor
          options={question.options}
          onChange={(newOptions) => updateField('options', newOptions)}
        />
      )}
    </div>
  );
};

export default QuestionCard;
