CREATE TABLE IF NOT EXISTS goal_status_history (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  goalId BIGINT NOT NULL,
  userId BIGINT NOT NULL,
  status ENUM('active', 'completed', 'abandoned') NOT NULL,
  changedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX goal_status_history_goalId_idx (goalId),
  INDEX goal_status_history_userId_idx (userId)
);

