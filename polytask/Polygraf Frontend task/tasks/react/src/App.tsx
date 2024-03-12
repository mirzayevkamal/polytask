import "./App.css";

const text =
  "According to all known laws of aviation, there's no way a bee should be able to fly. The bee, however, flies anyway, because bees don't care whot humans think is posible";

/**
 * The following function takes an array of [start, end] tuples
 * and should return the text with the characters within the ranges in bold
 *
 * How the text should be bolded does not matter, it could be <b>, or a <span> with styles, etc
 *
 *
 * For example with ranges = [[3, 5]] and text being "Lorem Ipsum"
 * it should return "Lor<b>em</b> Ipsum"
 */
type EmboldenProps = { ranges: Array<[number, number]>; children: string };
function Embolden({ ranges, children }: EmboldenProps) {
  console.log(ranges, children);

  const boldenString = () => {
    let initial = children;
    let result = "";

    for (const [start, end] of ranges) {
      result += initial.slice(0, start);
      result += `<b>${initial.slice(start, end)}</b>`;
      initial = initial.slice(end);
    }

    return result + initial;
  };

  return <p>{boldenString()}</p>;
}

function App() {
  return (
    <>
      <p>{text}</p>
      <Embolden
        ranges={[
          [3, 6],
          [8, 12],
        ]}
      >
        {text}
      </Embolden>
    </>
  );
}

export default App;
