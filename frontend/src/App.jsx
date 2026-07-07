import { useState } from "react";
import UploadSection from "./components/UploadSection";
import ChatSection from "./components/ChatSection";
import AnswerSection from "./components/AnswerSection";
import SourcesSection from "./components/SourcesSection";
import RetrievedChunksSection from "./components/RetrievedChunksSection";

function App() {
  const [result, setResult] = useState(null);

  return (
    <div>
      <h1>Enterprise Knowledge Assistant</h1>

      <UploadSection onUploadSuccess={() => console.log("Uploaded")} />

      <ChatSection onAnswer={setResult} />

      <AnswerSection answer={result?.answer} />
      <SourcesSection sources={result?.sources} />
      <RetrievedChunksSection chunks={result?.retrievedChunks} />
    </div>
  );
}

export default App;
