document.addEventListener("DOMContentLoaded", () => {

    const rows = document.querySelectorAll(".candidate.selectable");
    const cards = document.querySelectorAll(".evm");
    const container = document.querySelector(".container");
    const summary = document.getElementById("final-summary");
    const sound = document.getElementById("voteSound");

    let votedCards = new Set();
    let completionBeepPlayed = false;

    rows.forEach(row => {
        row.addEventListener("click", () => {

            const card = row.closest(".evm");

            // ❌ Prevent re-click on same card
            if (votedCards.has(card)) return;

            // 🔊 Play vote beep
            sound.currentTime = 0;
            sound.play();

            // Mark card as voted
            votedCards.add(card);
            card.classList.add("voted"); // disables & fades card

            // Remove existing message from THIS card (if any)
            const existingMsg = card.querySelector(".status-message");
            if (existingMsg) existingMsg.remove();

            // 🟦 If not all cards voted yet → show message ONLY on selected card
            if (votedCards.size < cards.length) {
                const msg = document.createElement("div");
                msg.className = "status-message status-next";
                msg.innerText = "पुढील उमेदवारास मतदान करा";
                card.appendChild(msg);
            }

            // 🟩 ALL CARDS VOTED
            if (votedCards.size === cards.length) {

                // Remove all "next candidate" messages
                cards.forEach(c => {
                    const m = c.querySelector(".status-message");
                    if (m) m.remove();
                });

                // Show "मतदान पूर्ण ✓" on all cards
                cards.forEach(c => {
                    const msg = document.createElement("div");
                    msg.className = "status-message status-done";
                    msg.innerText = "मतदान पूर्ण ✓";
                    c.appendChild(msg);
                });

                // 🔊 Play completion beep ONCE
                if (!completionBeepPlayed) {
                    completionBeepPlayed = true;
                    setTimeout(() => {
                        sound.currentTime = 0;
                        sound.play();
                    }, 200);
                }

                // ⏳ Hold this state for 3 seconds
                setTimeout(() => {
                    container.style.display = "none";
                    summary.style.display = "flex";
                }, 3000);
            }
        });
    });

    // RESET
    document.getElementById("resetBtn").addEventListener("click", () => {
        location.reload();
    });
});

