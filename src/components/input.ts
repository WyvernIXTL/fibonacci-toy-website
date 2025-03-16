import type { State } from 'vanjs-core';
import van from 'vanjs-core/debug';
const { button, div, pre, h1, main, input, span, select, label, option, nav } =
  van.tags;

function naturalFromString(value: unknown): number | undefined {
  if (typeof value !== 'string') {
    return undefined;
  }

  const isMinusReg = /^\-\d*/g;
  if (value.match(isMinusReg)) {
    return undefined;
  }

  const reg = /_*\.*,*\s*/g;
  const prunedValue = value.replace(reg, '');
  if (prunedValue === '') {
    return undefined;
  }

  const parsedNumber = Number.parseInt(prunedValue, 10);
  if (parsedNumber < 0) {
    return undefined;
  }
  return parsedNumber;
}

const NaturalInputLeftRounded = (props: {
  input: State<number | undefined>;
}) => {
  const once = van.state(false);
  const valid = van.derive(() => !once.val || props.input.val !== undefined);
  const inputAsString = van.derive(() =>
    props.input.val ? props.input.val.toString() : '',
  );
  return div(
    {
      class: () => `field border left-round max ${valid.val ? '' : 'invalid'}`,
    },
    input({
      type: 'number',
      value: inputAsString.val,
      oninput: (e) => {
        props.input.val = naturalFromString(e.target?.value);
        once.val = true;
      },
    }),
    () =>
      valid.val
        ? span({ class: 'helper' }, 'Which n-th fibonacci?')
        : span({ class: 'error' }, 'Not a natural number!'),
  );
};

const SelectorSquare = (props: {
  selection: string[];
  selected: State<string>;
}) => {
  return div(
    { class: 'field border no-round' },
    select(
      {
        oninput: (e) => {
          props.selected.val = e.target.val;
        },
      },
      props.selection.map((member) =>
        option({ selected: () => props.selected.val === member }, member),
      ),
    ),
    label('Algorithm'),
  );
};

type ButtonMode = 'Go' | 'Cancel';

const GoButtonRight = (props: {
  mode: State<ButtonMode>;
  disabled: State<boolean>;
}) => {
  const buttonModeStyle = van.derive(() =>
    props.mode.val === 'Go' ? 'fill' : 'error-text',
  );
  return button(
    {
      class: () => `border right-round large ${buttonModeStyle.val}`,
      disabled: () => props.disabled.val,
    },
    () => (props.mode.val === 'Go' ? '  Go  ' : 'Cancel'),
  );
};

export const NaturalInputWithSelectorAndGoButton = () => {
  const input = van.state(undefined);
  const selected = van.state('this');
  const buttonMode = van.state('Go' as ButtonMode);
  const buttonDisabled = van.state(false);
  return nav(
    { class: 'no-space' },
    NaturalInputLeftRounded({ input: input }),
    SelectorSquare({ selection: ['that', 'this'], selected: selected }),
    GoButtonRight({ mode: buttonMode, disabled: buttonDisabled }),
  );
};
