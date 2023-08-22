// import Head from "next/head";
// import { useState } from "react";
// import styles from "./index.module.css";

// export default function Home() {
//   const [textInput, setTextInput] = useState("");
//   const [finalResponse, setFinalResponse] = useState("");

//   async function onSubmit(event) {
//     event.preventDefault();
//     try {
//       const response = await fetch("/api/generate", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ text: textInput }),
//       });

//       const data = await response.json();
//       if (response.status !== 200) {
//         throw data.error || new Error(`Request failed with status ${response.status}`);
//       }

//       setFinalResponse(data.results[2]);
//       setTextInput("");
//     } catch(error) {
//       console.error(error);
//       alert(error.message);
//     }
//   }

//   return (
//     <div>
//       <Head>
//         <title>OpenAI Testing</title>
//         <link rel="icon" href="/icon.png" />
//       </Head>

//       <main className={styles.main}>
//         <img src="/icon.png" className={styles.icon} />
//         <h3>Text Variations Testing</h3>
//         <form onSubmit={onSubmit}>
//           <textarea
//             name="text"
//             placeholder="Enter a text for testing variations"
//             value={textInput}
//             onChange={(e) => setTextInput(e.target.value)}
//           />
//           <input type="submit" value="Generate variations" />
//         </form>
//         <div className={styles.result}>
//           {finalResponse && (
//             <div>
//               <p>Final API Response:</p>
//               <p>{finalResponse}</p>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }


import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [inputA, setInputA] = useState("");
  const [inputB, setInputB] = useState("");
  const [finalOutput, setFinalOutput] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputA, inputB }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setFinalOutput(data.finalOutput);
      setInputA("");
      setInputB("");
    } catch(error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Experiment</title>
        <link rel="icon" href="/icon.png" />
      </Head>

      <main className={styles.main}>
        <img src="/icon.png" className={styles.icon} />
        <h3>Text Experiment</h3>
        <form onSubmit={onSubmit}>
          <div>
            <label>Input A:</label>
            <textarea
              name="inputA"
              placeholder="Enter input A"
              value={inputA}
              onChange={(e) => setInputA(e.target.value)}
            />
          </div>
          <div>
            <label>Input B:</label>
            <textarea
              name="inputB"
              placeholder="Enter input B"
              value={inputB}
              onChange={(e) => setInputB(e.target.value)}
            />
          </div>
          <input type="submit" value="Run Experiment" />
        </form>
        <div className={styles.result}>
          {finalOutput && (
            <div>
              <p>Final API Output:</p>
              <p>{finalOutput}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
