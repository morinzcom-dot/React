function EmptyState({ icon = "📭", title = "Nothing here yet", subtitle }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">{icon}</div>
      <p style={{ fontWeight: 700, color: "var(--color-text)" }}>{title}</p>
      {subtitle && <p style={{ marginTop: 4 }}>{subtitle}</p>}
    </div>
  );
}

export default EmptyState;
