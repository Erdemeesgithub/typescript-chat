import { configureAbly, useChannel } from "@ably-labs/react-hooks";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

configureAbly({
  key: "bkfaTw.m4eClg:QbKhJEPJ4rz4yv4vVMLjDgwzh0RFAqdnHXP2yYoaRHQ",
  clientId: Date.now() + "",
});

const baseUrl = "http://localhost:3000/api/messages/";

export default function Home() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  console.log(messages);

  const router = useRouter();

  const [channel] = useChannel("public-chat", (message) => {
    setMessages((prev) => [...prev, message]);
  });

  useEffect(() => {
    getMessages();
  }, []);

  function getMessages() {
    axios
      .get(baseUrl)
      .then((res) => {
        setMessages(res.data.documents);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function deleteMessage(id) {
    axios
      .delete(baseUrl + id)
      .then((res) => {
        getMessages();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function sendMessage() {
    channel.publish("message", { text, date: Date.now() });
    setText("");

    if (text) {
      axios
        .post(baseUrl, {
          text: text,
        })
        .then((res) => {
          getMessages();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <main>
      <>
        <SignedIn>
          {messages.map((message, i) => (
            <div key={i}>
              <div className="chat chat-end">
                <div className="chat-bubble chat-bubble-info">
                  {message.text}
                </div>
              </div>
              <button
                type="button"
                className="btn"
                onClick={() => deleteMessage(message._id)}
              >
                delete
              </button>
            </div>
          ))}
          <textarea
            className="textarea textarea-primary"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <button type="button" className="btn" onClick={sendMessage}>
            Send
          </button>
        </SignedIn>
        <SignedOut>
          <Link href="/sign-in">
            <button>sign in</button>
          </Link>
          <Link href="/sign-up">
            <button>sign up</button>
          </Link>
        </SignedOut>
      </>
    </main>
  );
}
