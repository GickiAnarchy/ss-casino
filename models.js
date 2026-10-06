/**
 * In-memory player/game-state model for future use; the live games do not use
 * this class and remain account-free.
 *
 * `password` is only a future-facing, transient placeholder. Never persist or
 * log a real password in plaintext (including localStorage or Firestore).
 * Future account support must use a trusted backend with secure password
 * hashing or a managed authentication provider.
 */
class Player {
  constructor(name = 'Guest', password = '', balance = 1000) {
    this.name = name;
    this.password = password;
    this.balance = balance;
  }
}
