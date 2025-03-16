import type { State } from 'vanjs-core';
import van from 'vanjs-core/debug';
const { button, div, pre, h1, main, input, span } = van.tags;

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
    span(
      {
        class: () => (valid.val ? 'helper' : 'error'),
      },
      () => (valid.val ? 'Which n-th fibonacci?' : 'Not a natural number!'),
    ),
  );
};

export const NaturalInputWithSelectorAndGoButton = () => {
  const input = van.state(undefined);
  return div(NaturalInputLeftRounded({ input: input }));
};
