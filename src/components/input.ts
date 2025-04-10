/*
 * Copyright 2025 Adam McKellar <dev@mckellar.eu>
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { State } from 'vanjs-core';
import van from 'vanjs-core';
const { button, input, select, label, option, nav, fieldset } = van.tags;

function naturalFromString(value: unknown): number | undefined {
  if (typeof value !== 'string') {
    return undefined;
  }

  const isMinusReg = /^\-\d*/g;
  if (value.match(isMinusReg)) {
    return undefined;
  }

  const parsedNumber = Number.parseInt(value, 10);
  if (
    parsedNumber < 0 ||
    Number.isNaN(parsedNumber) ||
    parsedNumber.toString() !== value
  ) {
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

  const inputField = input({
    type: 'number',
    class: () => `left-rounded ${valid.val ? '' : 'invalid'}`,
    oninput: (e) => {
      props.input.val = naturalFromString(e.target?.value);
      once.val = true;
    },
    name: 'fib-input',
  });
  if (props.focusOnLoad) {
    requestAnimationFrame(() => inputField.focus());
  }
  if (props.eventListener) {
    inputField.addEventListener('keydown', props.eventListener);
  }

  return fieldset(
    {
      class: 'max',
    },
    inputField,
    () =>
      valid.val
        ? props.label && label({ for: 'fib-input' }, props.label)
        : label({ for: 'fib-input' }, 'Not a natural number!'),
  );
};

function SelectorSquare<Member extends string>(props: {
  selection: Member[];
  selected: State<Member>;
  label?: string;
}): HTMLElement {
  return fieldset(
    {},
    select(
      {
        oninput: (e) => {
          props.selected.val = e.target.value;
        },
        name: 'algorithm-selector',
      },
      props.selection.map((member) =>
        option({ selected: () => props.selected.val === member }, member),
      ),
    ),
    props.label && label({ for: 'algorithm-selector' }, props.label),
  );
}

const GoButtonRight = (props: {
  clicked: State<boolean>;
  disabled: State<boolean>;
  onGo: () => void;
  onCancel: () => void;
}) => {
  const buttonModeStyle = van.derive(() => (props.clicked.val ? 'cancel' : ''));
  return button(
    {
      class: () => `right-rounded width-6em ${buttonModeStyle.val}`,
      disabled: () => props.disabled.val,
      onclick: () => {
        props.clicked.val = !props.clicked.val;
        if (props.clicked.val) {
          props.onGo();
        } else {
          props.onCancel();
        }
      },
    },
    () => (props.clicked.val ? 'Cancel' : 'Go'),
  );
};

export function NaturalInputWithSelectorAndGoButton<
  Member extends string,
>(props: {
  selection: Member[];
  labelSelection?: string;
  selected: State<Member>;
  input: State<number | undefined>;
  labelInput?: string;
  buttonClicked: State<boolean>;
  focusOnLoad?: boolean;
  onGo: () => void;
  onCancel: () => void;
}): HTMLElement {
  const buttonDisabled = van.derive(
    () => props.input.val === undefined && !props.buttonClicked.val,
  );
  const onEnterKeyPressed = (event: KeyboardEvent) => {
    if (
      event.code === 'Enter' &&
      props.input.val !== undefined &&
      !props.buttonClicked.val
    ) {
      props.buttonClicked.val = true;
      props.onGo();
    }
    if (event.code === 'Escape' && props.buttonClicked.val) {
      props.buttonClicked.val = false;
      props.onCancel();
    }
  };
  return nav(
    { class: 'no-space' },
    NaturalInputLeftRounded({
      input: props.input,
      label: props.labelInput,
      focusOnLoad: props.focusOnLoad,
      eventListener: onEnterKeyPressed,
    }),
    SelectorSquare({
      selection: props.selection,
      selected: props.selected,
      label: props.labelSelection,
    }),
    GoButtonRight({
      clicked: props.buttonClicked,
      disabled: buttonDisabled,
      onGo: props.onGo,
      onCancel: props.onCancel,
    }),
  );
}
