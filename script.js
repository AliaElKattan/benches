// Print a message in the dev panel's console panel
console.log("playhtml starter loaded");

/* 
Make the "Click me!" button move when the visitor clicks it:
- First add the button to the page by following the steps in the TODO 🚧
*/
const btn = document.querySelector("button"); // Get the button from the page
if (btn) {
  // Detect clicks on the button
  btn.onclick = function () {
    // The 'dipped' class in style.css changes the appearance on click
    btn.classList.toggle("dipped");
  };
}

/*
 * PLAYHTML SETUP
 */


playhtml.define("can-audio", {
    defaultData: {
        playing: false,
        position: 0
    },

    view({ element, data, setData }) {
        const audio = element.querySelector("#audio");
        const button = element.querySelector("#playBtn");
        const status = element.querySelector("#status");

        // Render state
        if (data.playing) {
            audio.play();
            button.textContent = "❚❚";
            status.textContent = "Playing";
        } else {
            audio.pause();
            button.textContent = "▶";
            status.textContent = "Paused";
        }

        if (Math.abs(audio.currentTime - data.position) > 0.25) {
            audio.currentTime = data.position;
        }

        // User interaction
        button.onclick = () => {
            setData({
                playing: audio.paused,
                position: audio.currentTime
            });
        };

        // Keep position synced
        audio.ontimeupdate = () => {
            if (!audio.paused) {
                setData({
                    playing: true,
                    position: audio.currentTime
                });
            }
        };
    }
});


  const zone = document.getElementById('hover-zone');

  // each visitor only tracks their own hover state (presence, not saved)
  zone.defaultData = {};
  zone.myDefaultAwareness = { hovering: false };

  // no saved data to render, but can-play still needs an updateElement
  zone.updateElement = () => {};

  zone.onMount = ({ getElement, setMyAwareness }) => {
    const el = getElement();
    el.addEventListener('mouseenter', () => setMyAwareness({ hovering: true }));
    el.addEventListener('mouseleave', () =>
      setMyAwareness({ hovering: false }),
    );
  };

  let wasBelow = true; // only fire as we *cross* the threshold, not every tick
  zone.updateElementAwareness = ({ element, awareness }) => {
    const hovering = awareness.filter((a) => a?.hovering).length;
    element.querySelector('.count').textContent = hovering;
    if (hovering >= 3 && wasBelow) {
      playhtml.dispatchPlayEvent({ type: 'zone-celebrate' });
    }
    wasBelow = hovering < 3;
  };

  // an event is a one-off broadcast: everyone present runs this once
  playhtml.registerPlayEventListener('zone-celebrate', {
    onEvent: () => {
      zone.classList.add('celebrate');
      zone.addEventListener(
        'animationend',
        () => zone.classList.remove('celebrate'),
        { once: true },
      );
    },
  });




// button.addEventListener("click", async () => {
//     if (audio.paused) {
//         try {
//             await audio.play();
//             button.textContent = "❚❚";
//             status.textContent = "Playing";
//         } catch (err) {
//             console.error(err);
//         }
//     } else {
//         audio.pause();
//         button.textContent = "▶";
//         status.textContent = "Paused";
//     }
// });

// audio.addEventListener("ended", () => {
//     button.textContent = "▶";
//     status.textContent = "Finished";
// });




// Reaction button setup
// window.playhtml.setupCustomElement({
//   selector: "#reactionBtn",
//   defaultData: { count: 0 },
//   onClick: (element, data, setData) => {
//     const hasReacted = Boolean(localStorage.getItem("reacted-reaction"));

//     if (hasReacted) {
//       setData({ count: data.count - 1 });
//       localStorage.removeItem("reacted-reaction");
//       element.classList.remove("reacted");
//     } else {
//       setData({ count: data.count + 1 });
//       localStorage.setItem("reacted-reaction", "true");
//       element.classList.add("reacted");
//     }
//   },
//   onUpdate: (element, data) => {
//     document.getElementById("reactionCount").textContent = data.count;
//   },
//   onMount: (element, data) => {
//     // Set initial state based on localStorage
//     const hasReacted = Boolean(localStorage.getItem("reacted-reaction"));
//     if (hasReacted) {
//       element.classList.add("reacted");
//     }
//     document.getElementById("reactionCount").textContent = data.count;
//   }
// });
