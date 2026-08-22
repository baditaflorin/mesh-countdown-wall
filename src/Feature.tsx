import { useState } from "react";
import { useSharedCountdowns, type MeshConfig, type YRoom } from "@baditaflorin/mesh-common";

type Props = { room: YRoom | null; config: MeshConfig };

function clock(milliseconds: number) {
  const seconds = Math.ceil(milliseconds / 1000);
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

export function Feature({ room, config }: Props) {
  const shared = useSharedCountdowns(room);
  const [label, setLabel] = useState("Focus round");
  const [seconds, setSeconds] = useState(90);
  const add = () => {
    if (shared.add(label, seconds * 1000)) setLabel("");
  };

  return (
    <main className="feature">
      <header>
        <p className="eyebrow">Shared room timer</p>
        <h1>{config.appName}</h1>
        <p>Everyone sees the same remaining time, with no host to keep it ticking.</p>
      </header>
      <section className="composer" aria-label="Create countdown">
        <label>
          Timer label
          <input
            value={label}
            onChange={(event) => setLabel(event.target.value)}
            placeholder="What are we timing?"
          />
        </label>
        <label>
          Seconds
          <input
            type="number"
            min="1"
            max="86400"
            value={seconds}
            onChange={(event) => setSeconds(Number(event.target.value))}
          />
        </label>
        <button type="button" onClick={add}>
          Add timer
        </button>
      </section>
      <p className="feature-status" role="status">
        {room ? `Connected · ${room.peerCount} peer(s)` : "Connecting…"}
      </p>
      <section className="timers" aria-live="polite">
        {shared.countdowns.length === 0 ? (
          <p className="empty">Add a timer to begin.</p>
        ) : (
          shared.countdowns.map((timer) => (
            <article className="timer" key={timer.id}>
              <div>
                <strong>{timer.label}</strong>
                <span>{timer.state}</span>
              </div>
              <output aria-label={`${timer.label} remaining`}>{clock(timer.remainingMs)}</output>
              <div className="actions">
                <button type="button" onClick={() => shared.start(timer.id)}>
                  {timer.state === "paused" ? "Resume" : "Start"}
                </button>
                <button
                  type="button"
                  onClick={() => shared.pause(timer.id)}
                  disabled={timer.state !== "running"}
                >
                  Pause
                </button>
                <button type="button" onClick={() => shared.reset(timer.id)}>
                  Reset
                </button>
                <button type="button" onClick={() => shared.remove(timer.id)}>
                  Remove
                </button>
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  );
}
