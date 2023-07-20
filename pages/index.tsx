import { configureAbly, useChannel } from "@ably-labs/react-hooks";
import { useEffect, useState } from "react";
import axios from "axios";
import { log } from "console";

configureAbly({
  key: "bkfaTw.m4eClg:QbKhJEPJ4rz4yv4vVMLjDgwzh0RFAqdnHXP2yYoaRHQ",
  clientId: Date.now() + "",
});

const baseUrl = "http://localhost:3000/messages/"

export default function Home() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  

  // const [channel] = useChannel("public-chat", (message) => {
  //   setMessages((prev) => [...prev, message]);
  // });

  useEffect(() => {
    axios.get(baseUrl)
    .then((res) => {
      console.log(res);
      
      // setMessages(res)
      // console.log(messages);
          }) .catch((err) => {
                console.log(err);
               
  })})

  // async function sendMessage() {
  //   channel.publish("message", { text, date: Date.now() });
  //   setText("");
  // }
  return (
    <main>
      {messages.map((message) => (
        <div >
          <div >{message.data.text}</div>
        </div>
      ))}
      <textarea
        className="textarea textarea-primary"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      {/* <button type="button" className="btn" onClick={sendMessage}>
        Send
      </button> */}
    </main>
  );
}
