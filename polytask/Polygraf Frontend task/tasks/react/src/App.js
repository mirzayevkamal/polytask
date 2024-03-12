import "./App.css";
const text = "According to all known laws of aviation, there's no way a bee should be able to fly. The bee, however, flies anyway, because bees don't care whot humans think is posible";
function Embolden({ ranges, children }) {
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
    return (<>
      <p>{text}</p>
      <Embolden ranges={[
            [3, 6],
            [8, 12],
        ]}>
        {text}
      </Embolden>
    </>);
}
export default App;
