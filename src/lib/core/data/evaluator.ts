
type Token =
  | { type: "number"; value: number }
  | { type: "op"; value: string }
  | { type: "paren"; value: "(" | ")" };

export class ExpressionEvaluator {
  constructor(private getData: (path: string)=>string) {}

  evaluate(expr: string): string {
    const replaced = this.replaceVariables(expr);
    const tokens = this.tokenize(replaced);
    const rpn = this.toRPN(tokens);
    return String(this.calcRPN(rpn));
  }

  private replaceVariables(expr: string): string {
    // data.state, a.b.c и т.п.
    return expr.replace(/[a-zA-Z_][a-zA-Z0-9_.]*/g, (key) => {
      const value = this.getData(key);
      if (value === undefined || value === null) return "0";
      return String(value);
    });
  }

  private tokenize(expr: string): Token[] {
    const tokens: Token[] = [];
    let num = "";

    const pushNum = () => {
      if (num !== "") {
        tokens.push({ type: "number", value: Number(num) });
        num = "";
      }
    };

    for (const ch of expr.replace(/\s+/g, "")) {
      if ("0123456789.".includes(ch)) {
        num += ch;
      } else {
        pushNum();

        if ("+-*/".includes(ch)) {
          tokens.push({ type: "op", value: ch });
        } else if (ch === "(" || ch === ")") {
          tokens.push({ type: "paren", value: ch });
        }
      }
    }

    pushNum();
    return tokens;
  }

  private precedence(op: string): number {
    if (op === "+" || op === "-") return 1;
    if (op === "*" || op === "/") return 2;
    return 0;
  }

  private toRPN(tokens: Token[]): Token[] {
    const output: Token[] = [];
    const ops: Token[] = [];

    for (const t of tokens) {
      if (t.type === "number") {
        output.push(t);
      }

      if (t.type === "op") {
        while (
          ops.length &&
          ops[ops.length - 1].type === "op" &&
          this.precedence(String(ops[ops.length - 1].value)) >= this.precedence(t.value)
        ) {
          output.push(ops.pop()!);
        }
        ops.push(t);
      }

      if (t.type === "paren") {
        if (t.value === "(") {
          ops.push(t);
        } else {
          while (ops.length && ops[ops.length - 1].value !== "(") {
            output.push(ops.pop()!);
          }
          ops.pop(); // remove "("
        }
      }
    }

    while (ops.length) output.push(ops.pop()!);

    return output;
  }

  private calcRPN(tokens: Token[]): number {
    const stack: number[] = [];

    for (const t of tokens) {
      if (t.type === "number") {
        stack.push(t.value);
      } else if (t.type === "op") {
        const b = stack.pop()!;
        const a = stack.pop()!;

        switch (t.value) {
          case "+":
            stack.push(a + b);
            break;
          case "-":
            stack.push(a - b);
            break;
          case "*":
            stack.push(a * b);
            break;
          case "/":
            stack.push(a / b);
            break;
        }
      }
    }

    return stack[0] ?? 0;
  }
}