/* biome-ignore-all lint/suspicious/noConsole: Output */

import type React from 'react';
import { useState } from 'react';
import ReactDOMServer from 'react-dom/server';

// Defining types for props (optional, if you want to pass data down)
interface HeaderProps {
  title: string;
}

// A simple child component using the props interface
const Header: React.FC<HeaderProps> = ({ title }) => {
  return <h1>{title}</h1>;
};

function App() {
  const [count, setCount] = useState<number>(0);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <Header title="Welcome to My TypeScript React Page" />
      <p>This is a minimal React setup using TypeScript.</p>

      <button type="button" onClick={() => setCount(count + 1)}>
        Clicks: {count}
      </button>
    </div>
  );
}

const htmlString = ReactDOMServer.renderToString(<App />);

console.log('Content-Type: text/html');
console.log('');
console.log(htmlString);
