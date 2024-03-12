"use client";

import { unstable_noStore as noStore } from "next/cache";
import SimpleKeyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import {
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./styles.css";

const defaultLayout = {
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

const colemakLayout = {
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

// export function Keyboard({
//   baseClass,
//   layoutName,
//   onChange,
//   physicalKeyboardHighlight,
//   physicalKeyboardHighlightPress,
//   layout,
// }: {
//   baseClass: string;
//   layoutName: string;
//   onChange?: (input: string) => void;
//   physicalKeyboardHighlight?: boolean;
//   physicalKeyboardHighlightPress?: boolean;
//   layout?: Record<string, string[]>;
// }) {
//   const keyboardRef = useRef<HTMLDivElement | null>(null);
//   return (
//     <SimpleKeyboard
//       keyboardRef={(r: HTMLDivElement) => {
//         keyboardRef.current = r;
//       }}
//       baseClass={baseClass}
//       layoutName={layoutName}
//       onChange={onChange}
//       physicalKeyboardHighlight={physicalKeyboardHighlight}
//       physicalKeyboardHighlightPress={physicalKeyboardHighlightPress}
//       layout={layout}
//       physicalKeyboardHighlightPreventDefault={true}
//     />
//   );
// }

const MATCH = "match" as const;
const MISTAKE = "mistake" as const;
const NO_INPUT = "no_input" as const;

export function Prompt({
  children: text,
  userInput,
}: {
  children: string;
  userInput: string;
}) {
  console.log({ userInput });
  // const [matchedText, setMatchedText] = useState<
  //   {
  //     type: typeof MATCH | typeof MISTAKE | typeof NO_INPUT;
  //     substring: string;
  //   }[]
  // >([]);

  // useEffect(() => {
  //   const newMatchedText: typeof matchedText = [];
  //   [...userInput].forEach((char, i) => {
  //     const lastMatch = newMatchedText[newMatchedText.length - 1];
  //     if (char === text[i]) {
  //       lastMatch?.type === MATCH
  //         ? (lastMatch.substring += char)
  //         : newMatchedText.push({ type: MATCH, substring: char });
  //     } else {
  //       lastMatch?.type === MISTAKE
  //         ? (lastMatch.substring += char)
  //         : newMatchedText.push({ type: MISTAKE, substring: char });
  //     }
  //   });
  //   newMatchedText.push({
  //     type: NO_INPUT,
  //     substring: text.slice(newMatchedText.length),
  //   });
  //   setMatchedText(newMatchedText);
  // }, [text, userInput.current?.value, userInput]);

  const matchedText: {
    type: typeof MATCH | typeof MISTAKE | typeof NO_INPUT;
    substring: string;
  }[] = [];
  [...userInput].forEach((char, i) => {
    const lastMatch = matchedText[matchedText.length - 1];
    if (char === text[i]) {
      lastMatch?.type === MATCH
        ? (lastMatch.substring += char)
        : matchedText.push({ type: MATCH, substring: char });
    } else {
      lastMatch?.type === MISTAKE
        ? (lastMatch.substring += char)
        : matchedText.push({ type: MISTAKE, substring: char });
    }
  });
  matchedText.push({
    type: NO_INPUT,
    substring: text.slice(
      matchedText.reduce((acc, curr) => acc + curr.substring, "").length,
    ),
  });

  const textParts = matchedText.map((part, i) => (
    <span
      key={i}
      className={
        part.type === MATCH
          ? "text-green-400"
          : part.type === MISTAKE
            ? "text-red-400"
            : "text-gray-400"
      }
    >
      {part.substring}
    </span>
  ));

  return (
    <div className="flex items-center justify-center">
      <div className="rounded-lg bg-white p-4">
        <p className="text-black">{textParts}</p>
      </div>
    </div>
  );
}

export function ErrorCount({ count }: { count: number }) {
  return (
    <div
      key={count}
      className="absolute right-8 top-8"
      style={{
        animation: "shake 0.5s ease-in-out 0s 1 normal none running",
      }}
    >
      <div className="flex items-center justify-center">
        <div className="rounded-lg bg-white p-4">
          <p className="text-black">Errors: {count}</p>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  noStore();
  const [layoutName, setLayoutName] = useState("default");
  const inputRef = useRef<HTMLInputElement>(null);
  const [userInput, setUserInput] = useState("");
  const [errorCount, setErrorCount] = useState(0);

  const onChange = (input: string) => {
    console.log("Input changed", input);
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // e.preventDefault();
      console.log(e.key === "Shift", "keydown", e);
      e.key === "Shift" && setLayoutName(() => "shift");
      if (inputRef.current && inputRef.current !== document.activeElement) {
        inputRef.current.focus();
      }
    },
    [setLayoutName],
  );

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      // e.preventDefault();
      console.log(e.key === "Shift", "keyup", e);
      e.key === "Shift" && setLayoutName(() => "default");
    },
    [setLayoutName],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const promptText =
    "Type something and see the keyboard layout change when you press shift";
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <Prompt userInput={userInput}>{promptText}</Prompt>
        <ErrorCount count={errorCount} />
        <input
          value={userInput}
          ref={inputRef}
          onChange={(e) => {
            promptText[e.target.value.length - 1] !==
              e.target.value[e.target.value.length - 1] &&
              setErrorCount((prev) => prev + 1);

            promptText[e.target.value.length - 2] ===
              e.target.value[e.target.value.length - 2] &&
              setUserInput(e.target.value);
          }}
          style={{
            width: "100%",
            height: "100px",
            padding: "20px",
            fontSize: "20px",
            border: "none",
            boxSizing: "border-box",
          }}
        ></input>
        <SimpleKeyboard
          baseClass="keyboard1"
          layoutName={layoutName}
          onChange={onChange}
          physicalKeyboardHighlight={true}
          physicalKeyboardHighlightPress={true}
          layout={defaultLayout}
          buttonTheme={[
            {
              class: "vowels",
              buttons: "a e i o u y A E I O U Y",
            },
            {
              class: "qwerty-home",
              buttons: "f j F J",
            },
          ]}
        />
        <SimpleKeyboard
          baseClass="keyboard2"
          layoutName={layoutName}
          onChange={onChange}
          physicalKeyboardHighlight={true}
          physicalKeyboardHighlightPress={true}
          layout={colemakLayout}
          buttonTheme={[
            {
              class: "vowels",
              buttons: "a e i o u y A E I O U Y",
            },
            {
              class: "colemak-home",
              buttons: "t n T N",
            },
          ]}
        />
      </div>
    </main>
  );
}
