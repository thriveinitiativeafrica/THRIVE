import crypto from "crypto";

function getSecret() {
  return process.env.SESSION_SECRET || "thrive_secure_session_secret_2026";
}

export function generateCaptcha() {
  const operations = [
    {
      op: "+",
      fn: (a: number, b: number) => a + b,
      gen: () => {
        const a = Math.floor(Math.random() * 9) + 1; // 1-9
        const b = Math.floor(Math.random() * 9) + 1; // 1-9
        return { a, b, symbol: "+" };
      },
    },
    {
      op: "-",
      fn: (a: number, b: number) => a - b,
      gen: () => {
        const a = Math.floor(Math.random() * 8) + 4; // 4-11
        const b = Math.floor(Math.random() * (a - 1)) + 1; // ensure positive result
        return { a, b, symbol: "-" };
      },
    },
    {
      op: "×",
      fn: (a: number, b: number) => a * b,
      gen: () => {
        const a = Math.floor(Math.random() * 6) + 2; // 2-7
        const b = Math.floor(Math.random() * 5) + 2; // 2-6
        return { a, b, symbol: "×" };
      },
    },
  ];

  const chosen = operations[Math.floor(Math.random() * operations.length)];
  const { a, b, symbol } = chosen.gen();
  const answer = chosen.fn(a, b);
  const expiresAt = Date.now() + 15 * 60 * 1000; // 15 mins

  const raw = `${answer}:${expiresAt}`;
  const sig = crypto.createHmac("sha256", getSecret()).update(raw).digest("hex").slice(0, 16);
  const token = `${raw}:${sig}`;

  return {
    question: `What is ${a} ${symbol} ${b} ?`,
    token,
  };
}

export function verifyCaptcha(userAnswer: string | number, token: string): boolean {
  if (!token || userAnswer === undefined || userAnswer === null || String(userAnswer).trim() === "") {
    return false;
  }
  const parts = String(token).split(":");
  if (parts.length !== 3) return false;

  const [ansStr, expiresStr, expectedSig] = parts;
  const expiresAt = parseInt(expiresStr, 10);
  if (Date.now() > expiresAt) return false; // expired

  const raw = `${ansStr}:${expiresStr}`;
  const actualSig = crypto.createHmac("sha256", getSecret()).update(raw).digest("hex").slice(0, 16);
  if (actualSig !== expectedSig) return false; // forged

  const correctAns = parseInt(ansStr, 10);
  const givenAns = parseInt(String(userAnswer).trim(), 10);
  return correctAns === givenAns;
}
