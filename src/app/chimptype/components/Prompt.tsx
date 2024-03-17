import { MATCH, MISTAKE, NO_INPUT } from "../constants";

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
