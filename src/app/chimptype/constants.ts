export const defaultLayout = {
  default: [
    "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
    "{tab} q w e r t y u i o p [ ] \\",
    "{lock} a s d f g h j k l ; ' {enter}",
    "{shift} z x c v b n m , . / {shift}",
    ".com @ {space}",
  ],
  shift: [
    "~ ! @ # $ % ^ &amp; * ( ) _ + {bksp}",
    "{tab} Q W E R T Y U I O P { } |",
    '{lock} A S D F G H J K L : " {enter}',
    "{shift} Z X C V B N M &lt; &gt; ? {shift}",
    ".com @ {space}",
  ],
};

export const colemakLayout = {
  default: [
    "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
    "{tab} q w f p g j l u y ; [ ] \\",
    "{lock} a r s t d h n e i o ' {enter}",
    "{shift} z x c v b k m , . / {shift}",
    "{space}",
  ],
  shift: [
    "~ ! @ # $ % ^ &amp; * ( ) _ + {bksp}",
    "{tab} Q W F P G J L U Y : { } |",
    '{lock} A R S T D H N E I O " {enter}',
    "{shift} Z X C V B K M &lt; &gt; ? {shift}",
    "{space}",
  ],
};

export const MATCH = "match" as const;
export const MISTAKE = "mistake" as const;
export const NO_INPUT = "no_input" as const;
