/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { State } from 'vanjs-core/debug';
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
  label?: string;
  focusOnLoad?: boolean;
  eventListener?: (event: KeyboardEvent) => void;
}) => {
  const once = van.state(false);
  const valid = van.derive(() => !once.val || props.input.val !== undefined);
  const inputAsString = van.derive(() =>
    props.input.val ? props.input.val.toString() : '',
  );

  const inputField = input({
    type: 'number',
    value: inputAsString.val,
    oninput: (e) => {
      props.input.val = naturalFromString(e.target?.value);
      once.val = true;
    },
  });
  if (props.focusOnLoad) {
    requestAnimationFrame(() => inputField.focus());
  }
  if (props.eventListener) {
    inputField.addEventListener('keydown', props.eventListener);
  }

  return div(
    {
      class: () => `field border left-round max ${valid.val ? '' : 'invalid'}`,
    },
    inputField,
    () =>
      valid.val
        ? props.label && span({ class: 'helper' }, props.label)
        : span({ class: 'error' }, 'Not a natural number!'),
  );
};

const SelectorSquare = (props: {
  selection: string[];
  selected: State<string>;
  label?: string;
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
    props.label && label(props.label),
  );
};

const GoButtonRight = (props: {
  clicked: State<boolean>;
  disabled: State<boolean>;
}) => {
  const buttonModeStyle = van.derive(() =>
    props.clicked.val ? 'error-text' : 'fill',
  );
  return button(
    {
      class: () => `border right-round large ${buttonModeStyle.val}`,
      disabled: () => props.disabled.val,
      onclick: () => {
        props.clicked.val = !props.clicked.val;
      },
    },
    () => (props.clicked.val ? 'Cancel' : 'Go'),
  );
};

export const NaturalInputWithSelectorAndGoButton = (props: {
  selection: string[];
  labelSelection?: string;
  selected: State<string>;
  input: State<number | undefined>;
  labelInput?: string;
  buttonClicked: State<boolean>;
  focusOnLoad?: boolean;
}) => {
  const buttonDisabled = van.derive(
    () => props.input.val === undefined && !props.buttonClicked.val,
  );
  const enterKeyPressedEvent = (event: KeyboardEvent) => {
    if (
      event.code === 'Enter' &&
      props.input.val !== undefined &&
      !props.buttonClicked.val
    ) {
      props.buttonClicked.val = true;
    }
    if (event.code === 'Escape' && props.buttonClicked.val) {
      props.buttonClicked.val = false;
    }
  };
  return nav(
    { class: 'no-space' },
    NaturalInputLeftRounded({
      input: props.input,
      label: props.labelInput,
      focusOnLoad: props.focusOnLoad,
      eventListener: enterKeyPressedEvent,
    }),
    SelectorSquare({
      selection: props.selection,
      selected: props.selected,
      label: props.labelSelection,
    }),
    GoButtonRight({
      clicked: props.buttonClicked,
      disabled: buttonDisabled,
    }),
  );
};
