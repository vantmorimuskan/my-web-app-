document.addEventListener("DOMContentLoaded", () => {

    const candidates = document.querySelectorAll(".candidate.selectable");
    const cards = document.querySelectorAll(".evm");
    const container = document.querySelector(".container");
    const summary = document.getElementById("final-summary");
    const sound = document.getElementById("voteSound");

    let votedCards = new Set();
    let completionBeepPlayed = false;

    candidates.forEach(candidate => {
        candidate.addEventListener("click", () => {

            const card = candidate.closest(".evm");

            // ❌ Do nothing if already voted
            if (votedCards.has(card)) return;

            // 🔊 Play vote sound
            sound.currentTime = 0;
            sound.play();

            // ✅ Mark this card as voted
            votedCards.add(card);
            card.classList.add("voted");

            // 🔥 VERY IMPORTANT:
            // Remove message from ALL cards first
            cards.forEach(c => {
                const oldMsg = c.querySelector(".status-message");
                if (oldMsg) oldMsg.remove();
            });

            // 🟦 Show text ONLY on the SELECTED card
            if (votedCards.size < cards.length) {
                const msg = document.createElement("div");
                msg.className = "status-message status-next";
                msg.textContent = "पुढील उमेदवारास मतदान करा";
                card.appendChild(msg);
            }

            // 🟩 When ALL cards are voted
            if (votedCards.size === cards.length) {

                // Remove all previous messages
                cards.forEach(c => {
                    const m = c.querySelector(".status-message");
                    if (m) m.remove();
                });

                // Show "मतदान पूर्ण ✓" on all cards
                cards.forEach(c => {
                    const msg = document.createElement("div");
                    msg.className = "status-message status-done";
                    msg.textContent = "मतदान पूर्ण ✓";
                    c.appendChild(msg);
                });

                // 🔊 Completion beep (once)
                if (!completionBeepPlayed) {
                    completionBeepPlayed = true;
                    setTimeout(() => {
                        sound.currentTime = 0;
                        sound.play();
                    }, 200);
                }

                // ⏳ Hold for 3 seconds then summary
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
