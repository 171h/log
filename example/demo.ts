import { Logger } from "../index";

const logger = new Logger("demo.ts", "verbo", { verbo: "✨", debug: "🐛", info: "ℹ", warn: "⚠", error: "✖" });

const fn = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const obj = { a: 1, b: 2, c: 3, d: 4, e: 5 };
  logger.verbose("function name", "start...");
  logger.verbose(fn, "start...");
  logger.verbose(fn, arr);
  logger.verbose(fn, obj);
  logger.verbose(fn, ...arr);
  logger.debug(fn, "start...");
  logger.log(fn, "start...");
  logger.info(fn, "start...");
  logger.warn(fn, "start...");
  logger.error(fn, "start...");
};

fn();
