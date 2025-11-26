export default function DisplayRanking({ scores }: {
    scores: { name: string; score: number }[];
}) {

    if (scores.length === 0) {
        return <p>No scores yet!</p>;
    }

    const sorted = [...scores].sort((a, b) => b.score - a.score);

    let lastScore = 0;
    let lastRank = 0;
    let displayRank = 0;

    const ranked = sorted.map((player, index) => {
        displayRank++;

        if (player.score !== lastScore) {
            lastRank = displayRank;
            lastScore = player.score;
        }

        return {
            ...player,
            rank: lastRank
        };
    });

    return (
        <div className="ranking-container">
            <h2>Ranking</h2>

            <ul>
                {ranked.map((p) => (
                    <li key={p.name}>
                        <strong>{p.rank}.</strong> {p.name} — {p.score}
                    </li>
                ))}
            </ul>
        </div>
    );
}
