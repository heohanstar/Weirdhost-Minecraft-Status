import { AnimatePresence, motion } from "framer-motion";

export default function PlayerList({ players = [] }) {
  return (
    <div
      className="player-grid"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
        width: "100%",
      }}
    >
      <AnimatePresence initial={false}>
        {players.map(({ name, uuid }) => {
          const avatar = uuid
            ? `https://crafatar.com/avatars/${uuid}?size=40&overlay`
            : `https://mc-heads.net/avatar/${name}/40`;

          return (
            <motion.div
              key={name}
              layout
              className="player-card"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.15 }}
              style={{
                width: "calc(100% - 20px)",
                margin: "0 10px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 0",
                background: "#f3f4f6",
                borderRadius: "8px",
                justifyContent: "center",
              }}
            >
              <img src={avatar} alt={name} />
              <span>{name}</span>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
