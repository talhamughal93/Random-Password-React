import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(6);
  const [charAllowed, setcharAllowed] = useState(false);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = () => {
    let pass = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) string += "0123456789";

    if (charAllowed) string += '`~!@#$%^&*()_+=-{][|<>/"';
    for (let index = 0; index <= length; index++) {
      let randomVal = Math.floor(Math.random() * string.length + 1);
      pass += string.charAt(randomVal);
    }
    setPassword(pass);
  };

  const copytoClipboard = useCallback(() => {
    passwordRef.current.select();
    passwordRef.current.setSelectionRange(0,999)
    window.navigator.clipboard.writeText(password);
  });

  useEffect(() => {
    passwordGenerator();
  }, [charAllowed, numberAllowed, length]);
  return (
    <div className="bg-orange-700 w-96 p-4 mt-6 rounded-xl mx-auto">
      <h1 className="text-white text-center">Password Generator</h1>
      <div className="flex justify-center items-center mt-2">
        <input
          className="border-none outline-none w-full py-2 px-4 text-black"
          type="text"
          placeholder="Password"
          readOnly
          value={password}
          ref={passwordRef}
        />
        <button onClick={copytoClipboard}
         className="border-none outline-none bg-black text-white py-2 px-4 ">
          Copy
        </button>
      </div>
      <div className="flex flex-col mt-4">
        <div className="flex justify-center items-center">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            name="range"
            onChange={(e) => setLength(e.target.value)}
          />
          <label className="ml-4" htmlFor="range">
            Length: {length}
          </label>
        </div>
        <div className="flex flex-row justify-center items-center gap-4">
          <div className="flex justify-center flex-row items-center">
            <input
              type="checkbox"
              name="charac"
              onChange={() => {
                setcharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="charac">Characters</label>
          </div>
          <div className="flex justify-center flex-row items-center">
            <input
              type="checkbox"
              name="number"
              onChange={() => {
                setnumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="number">Numbers</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
