document.addEventListener("DOMContentLoaded", () => {

    const rows = document.querySelectorAll(".candidate.selectable");
    const cards = document.querySelectorAll(".evm");
    const container = document.querySelector(".container");
    const summary = document.getElementById("final-summary");
    const sound = document.getElementById("voteSound");

    let voted = new Set();

    rows.forEach(row => {
        row.addEventListener("click", () => {

            const card = row.closest(".evm");
            if (voted.has(card)) return;

            sound.currentTime = 0;
            sound.play();

            voted.add(card);
            card.classList.add("voted");

            cards.forEach(c => {
                const msg = c.querySelector(".status-message");
                if (msg) msg.remove();
            });

            if (voted.size < cards.length) {
                cards.forEach(c => {
                    if (!voted.has(c)) {
                        const msg = document.createElement("div");
                        msg.className = "status-message status-next";
                        msg.innerText = "पुढील उमेदवारास मतदान करा";
                        c.appendChild(msg);
                    }
                });
            } else {
                cards.forEach(c => {
                    const msg = document.createElement("div");
                    msg.className = "status-message status-done";
                    msg.innerText = "मतदान पूर्ण ✓";
                    c.appendChild(msg);
                });

                setTimeout(() => {
                    container.style.display = "none";
                    summary.style.display = "flex";
                }, 800);
            }
        });
    });

    document.getElementById("resetBtn").addEventListener("click", () => {
        location.reload();
    });
});
