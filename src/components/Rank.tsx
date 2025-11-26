import DisplayRanking from "./DisplayRanking";

export default function Rank() {

    const getStoredScores = () => {
        const raw = localStorage.getItem("scores");
        return raw ? JSON.parse(raw) : {};
    };

    const stored = getStoredScores();

    const scores = Object.keys(stored).map(name => ({
        name,
        score: stored[name],
    }));

    return (
        <div className="ranking-page">
            <h1>Player Rankings</h1>
            <DisplayRanking scores={scores} />
        </div>
    );
}
