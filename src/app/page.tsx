'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

    fetch(`${API_URL}/hello`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP Error: ${res.status}`);
        }

        return res.json();
      })
      .then((data) => {
        setMessages(data.messages);
      })
      .catch((e) => {
        console.error(e);
        setError(`Failed to load message: ${e}`);
      });
  }, []);

  const messages_list = messages?.map((msg, i) => (
    <li key={i}>
      {i + 1}. {msg}
    </li>
  ));

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '2rem' }}>
      <b>Avento Origin</b>
      <p>
        Calling <code>/hello</code>...
      </p>
      <br />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {messages ? (
        <div>
          <b>Call to backend successful, loading messages from database ...</b>
          <ul>{messages_list}</ul>{' '}
        </div>
      ) : (
        !error && <p>Loading...</p>
      )}{' '}
    </div>
  );
}
