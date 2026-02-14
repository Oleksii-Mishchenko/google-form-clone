import type { QuestionDraft } from '../../types';
import Checkbox from '../ui/Checkbox';
import Input from '../ui/Input';
import Select from '../ui/Select';
import OptionsEditor from './OptionsEditor';

type Props = {
  question: QuestionDraft;
  onChange: (updated: QuestionDraft) => void;
};

const QuestionCard = ({ question, onChange }: Props) => {
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
      <Input
        type="text"
        placeholder="Question title"
        value={question.title}
        onChange={(e) => updateField('title', e.target.value)}
      />

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
        <Checkbox
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
