/**
 * Recursively extracts plain text from a Lexical rich text JSON node.
 */
export function lexicalToPlainText(node: any): string {
  if (!node) {return "";}
  let text = "";

  if (Array.isArray(node.children)) {
    for (const child of node.children) {
      text += lexicalToPlainText(child);
    }
  }

  if (typeof node.text === "string") {
    text += node.text + " ";
  }

  return text;
}