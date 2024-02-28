import { InvalidArgumentError } from "commander";

/**
 * Parse float argument from CLI
 * @param arg the string to parse
 */
function parseFloatCommand(arg: string) {
  const parsedArg = parseFloat(arg);
  if (isNaN(parsedArg)) {
    throw new InvalidArgumentError("Not a number.");
  }
  return parsedArg;
}

/**
 * Parse integer from CLI
 * @param arg the string to parse
 */
function parseOptionalIntCommand(arg: string) {
  if (arg) {
    const parsedArg = parseInt(arg);
    if (isNaN(parsedArg)) {
      throw new InvalidArgumentError("Not a number.");
    }
    return parsedArg;
  }
}

export { parseFloatCommand, parseOptionalIntCommand };
