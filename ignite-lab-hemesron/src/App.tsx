import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { client } from "./lib/apollo";

// Components
import { Event } from "./pages/Event";

function App() {
  return (
    <div className="App">
      <Event />
    </div>
  );
}

export default App;
