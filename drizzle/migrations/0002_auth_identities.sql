CREATE TABLE IF NOT EXISTS auth_identities (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  provider VARCHAR(32) NOT NULL,
  subject VARCHAR(128) NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY auth_identities_provider_subject_unique (provider, subject),
  UNIQUE KEY auth_identities_user_provider_unique (userId, provider),
  KEY auth_identities_userId_idx (userId),
  CONSTRAINT auth_identities_userId_users_id_fk
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);
