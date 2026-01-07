const sendBtn = document.getElementById("send-btn");
const input = document.getElementById("user-input");
const messages = document.getElementById("messages");

/*sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});*/

function addMessage(text, className) {
  const div = document.createElement("div");
  div.className = `message ${className}`;
  div.innerText = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}
function extractVideoId(url) {
  const match = url.match(/[?&]v=([^&]+)/);
  return match ? match[1] : null;
}
//document.getElementById("send-btn")
sendBtn.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    const url = tabs[0].url;
    //alert(url);

    if (!url.includes("youtube.com/watch")) {
      alert("Please open a YouTube video");
      return;
    }

    const videoId = extractVideoId(url);
    //alert(videoId);

    if (!videoId) {
      alert("Could not extract video ID");
      return;
    }
    userText = "Empty";
    //await sendToBackend(videoId, userText);
    await sendMessage(videoId, userText);
  });
});

async function sendMessage(videoId, userText) {
  //alert(videoId, userText);
  userText = input.value.trim();
  if (!userText) return;

  addMessage(userText, "user");
  input.value = "";
  alert(userText);

  try {
    const res = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        video_id: videoId,
        message: userText,
      }),
    });

    const data = await res.json();
    alert("Backend response: " + JSON.stringify(data));
  } catch (err) {
    alert("Backend connection failed");
  }
}
/* try {
    const response = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userText }),
    });

    const data = await response.json();
    addMessage(data.reply, "bot");
  } catch (err) {
    addMessage("Error connecting to server", "bot");
  }





async function sendToBackend(videoId) {
  try {
    const res = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        video_id: videoId,
        message: userText,
      }),
    });

    const data = await res.json();
    alert("Backend response: " + JSON.stringify(data));
  } catch (err) {
    alert("Backend connection failed");
  }
}*/
