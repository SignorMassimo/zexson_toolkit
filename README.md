
---

<p align="center">
  <a align="center" href="https://zexson.vercel.app/" target="_blank">
    <img  align="center" src="https://cdn.discordapp.com/icons/1268182421732327445/8ac3744f5a6d308691ec51f54bcd9fb4.webp?size=4096" alt="Zexson Team Logo" width="120"/>
  </a>
</p>

<h1 align="center">zexson_toolkit by Zexson Team</h1>

<p align="center">
  <a align="center" href="https://zexson.vercel.app/" target="_blank"><strong>Zexson Team Website</strong></a>
</p>

<p align="center">
  <img src="https://img.shields.io/npm/l/zexson_toolkit" alt="License"/>
  <img src="https://img.shields.io/npm/v/zexson_toolkit" alt="Version"/>
  <img src="https://img.shields.io/npm/dt/zexson_toolkit" alt="Downloads"/>
  <a href="https://discord.gg/VFYRarPZDT" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://zexson.vercel.app/donate" target="_blank">
  <img src="https://img.shields.io/badge/Donate-Kapital Bank-ff3f59.svg" alt="Donate via">
</a>
</p>
<p align="center">
 A powerful encryption and token generation library developed by the <a align="center" href="https://zexson.vercel.app/" target="_blank"><strong>Zexson Team</strong></a>.
</p>

---

## 🚀 Features

- **Advanced Encryption/Decryption**

  - Custom encryption algorithm with random padding
  - Base64 encoding with character shifting
  - Key-based encryption support

- **Token Generation**

  - Customizable length and character sets
  - Multiple predefined character set options
  - High entropy random generation

- **String Comparison**

  - Case-sensitive and case-insensitive comparison
  - Encrypted string comparison
  - Detailed comparison results

---

## 📦 Installation

Install the package via npm:

```bash
npm install zexson_toolkit
```

---

## 🔧 Usage

### Crypt Example Function

```typescript
import { cryptExample } from 'zexson_toolkit'
cryptExample('zexson_toolkit','zexson_team')
```

### Basic Encryption/Decryption

```typescript
import { encrypt, decrypt } from 'zexson_toolkit'

// Basic encryption
const encrypted = encrypt("sensitive data")
const decrypted = decrypt(encrypted)
```

### Advanced Encryption with Options

```typescript
import { encrypt } from 'zexson_toolkit'

// Custom encryption with options
const encrypted = encrypt("sensitive data", {
  firstRandomCharSet: 'set1',
  secondRandomCharSet: 'set2',
  key: 'customKey'
})
```

### Token Generation

```typescript
import { tokenGenerator } from 'zexson_toolkit'

// Generate a token with specified length and character set
const token = tokenGenerator(16, 'defaultSet')
```

### String Comparison

```typescript
import { isEqual } from 'zexson_toolkit'

// Compare strings with options
const result = isEqual("text1", "text2", {
  caseSensitive: false,
  key: "customKey",
  log: true
})
```

### Base64 Encoding/Decoding

```typescript
import { base64Encode, base64Decode } from 'zexson_toolkit'

// Encode a string
const encoded = base64Encode("example string", "customKey")

// Decode a string
const decoded = base64Decode(encoded, "customKey")
```

### Object Encryption/Decryption

```typescript
import { encryptObject, decryptObject } from 'zexson_toolkit'

// Encrypt an object
const data = { username: "JohnDoe", password: "12345" }
const encryptedData = encryptObject(data, "my-secret-key")

// Decrypt an object
const decryptedData = decryptObject(encryptedData, "my-secret-key")
```

```typescript
import { encryptObject, decryptObject } from 'zexson_toolkit'

// Basic encryption
const data = { username: "JohnDoe", password: "12345" }
const encryptedData = encryptObject(data, "my-secret-key")
const decryptedData = decryptObject(encryptedData, "my-secret-key")

// Advanced encryption with complex data
const data = { username: "JohnDoe", password: "12345", about: { gender: 'male', age: 12 }, hobbies: ['football', 'basketball', { football: true, basketball: false }] }
const encryptedData = encryptObject(data, "my-secret-key")
const decryptedData = decryptObject(encryptedData, "my-secret-key")
```

---
### Secure Key Management Recommendations

For optimal security, it’s crucial to manage and store cryptographic keys carefully. Here’s a simple guide to help you maintain the integrity and security of your keys:

1. **Store keys in environment variables**:
   - Place your cryptographic keys in a `.env` file. This file should not be included in your version control system (e.g., Git).
   - Example:
     ```plaintext
     ENCRYPTION_KEY=my-secret-key
     ```

2. **Use dotenv for secure key management**:
   - Install `dotenv` if you haven't already:
     ```bash
     npm install dotenv
     ```
   - Load your environment variables in your application using `dotenv`:
     ```typescript
     require('dotenv').config() || import * as dotenv from 'dotenv'; dotenv.config()
     const encryptionKey = process.env.ENCRYPTION_KEY
     ```
   - This ensures that the key is only accessible within your application's runtime, not hard-coded directly in the codebase.

3. **Rotate keys regularly**:
   - Regularly update your encryption keys to prevent potential unauthorized access. Document key rotations in your system for audit purposes.

4. **Limit key permissions**:
   - Restrict access to keys by limiting the permissions of the `.env` file and ensuring only authorized personnel can modify it.
   - Avoid placing keys directly in source code, as this can expose them in version history and logs.

5. **Encrypt sensitive data**:
   - Whenever storing sensitive data, encrypt it with the appropriate keys to prevent unauthorized access if it’s compromised.
---

## 📚 Available Functions

### Encryption Functions
- `encrypt(data: string, options?: EncryptOptions): Promise<string>`
- `decrypt(data: string, options?: DecryptOptions): Promise<string>`
- `base64Encode(data: string, key?: string): string`
- `base64Decode(data: string, key?: string): string`

### Token Generation
- `tokenGenerator(length: number, type: CharacterSetType): string`

### String Comparison
- `isEqual(text1: string, text2: string, options?: IsEqualOptions): Promise<{ isEqual: boolean, method?: string }>`

---

## 🤝 Contributing

Contributions are welcome! Here’s how you can contribute:

1. Submit issues to report bugs or suggest features.
2. Create pull requests to improve the toolkit.
3. Share ideas to enhance functionality.

---

## 📫 Connect with Us

- [Our Website](https://zexson.vercel.app)
- [Our YouTube Channel](https://www.youtube.com/@ZexsonStudio)
- [My GitHub](https://github.com/SignorMassimo)
- [Zexson Team Instagram](https://www.instagram.com/zexsonteam)
- [Contact us for support](https://www.instagram.com/_signor_p_)

---

# 📄 License Information

This project is licensed under the MIT License. The MIT License is a permissive open-source license that allows users to freely use, modify, distribute, and sublicense the software, subject to certain conditions. For a full description of the terms and conditions under which this project can be used, modified, and distributed, please refer to the LICENSE file included in the project. By using, modifying, or distributing this project, you agree to abide by the terms outlined in the MIT License.
---

### Why Choose zexson\_toolkit?

- Clean and well-documented codebase.
- Regular updates and active maintenance.
- Tailored for developers needing advanced cryptographic utilities.

---
### Made with ❤️ for you by Zexson Team.
---