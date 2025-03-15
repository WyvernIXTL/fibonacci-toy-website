import van from 'vanjs-core/debug';
const { button, div, pre, h1, main, input, span } = van.tags;

function naturalFromString(value: string): number | undefined {
  const reg = /_*\-*\.*,*\s*/g;
  const prunedValue = value.replace(reg, '');
  if (prunedValue !== '') {
    const parsedNumber = Number.parseInt(prunedValue, 10);
    if (parsedNumber >= 0) {
      return parsedNumber;
    }
  }
  return undefined;
}

const NaturalInputLeftRounded = () => {
  const once = van.state(false);
  const userInput = van.state('');
  const naturalConvertedInput = van.derive(() =>
    naturalFromString(userInput.val),
  );
  const valid = van.derive(
    () => !once.val || naturalConvertedInput.val !== undefined,
  );
  return {
    view: div(
      {
        class: () =>
          `field border left-round max ${valid.val ? '' : 'invalid'}`,
      },
      input({
        type: 'number',
        value: userInput,
        oninput: (e) => {
          userInput.val = e.target?.value;
          once.val = true;
        },
      }),
      span(
        {
          class: () => (valid.val ? 'helper' : 'error'),
        },
        () => (valid.val ? 'Which n-th fibonacci?' : 'Not a natural number!'),
      ),
    ),
    state: { input: naturalConvertedInput },
  };
};

export const NaturalInputWithSelectorAndGoButton = () => {
  const {
    view: naturalDom,
    state: { input },
  } = NaturalInputLeftRounded();
  return div(naturalDom);
};
