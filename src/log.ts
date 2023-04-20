import chalk from "chalk";

const logLevel = {
  verbo: 100,
  debug: 200,
  info: 300,
  warn: 400,
  error: 500,
  close: 1000,
};

type tag = "verbo" | "debug" | "info" | "warn" | "error" | "close";

interface Sym {
  verbo: string;
  debug: string;
  info: string;
  warn: string;
  error: string;
  close: string;
}

const sym: Sym = {
  verbo: "✔",
  debug: " ",
  info: "ℹ", //✨
  warn: "⚠",
  error: "✖",
  close: "",
};

export type LogLevel = keyof typeof logLevel;

export interface Config {
  logLevel: LogLevel;
}

const levelDefault: tag = "verbo";

/**
 * 日志记录器
 */
export class Logger {
  constructor(context: string, level?: LogLevel) {
    this.context = context;
    this.level = level || levelDefault;
  }

  private context: string;
  private level: LogLevel;
  private tag = {
    verbo: "verbo",
    debug: "debug",
    info: "info",
    warn: "warn",
    error: "error",
  };

  // 日志前缀
  private prefix(type: tag, message?: any) {
    let fnName: string | undefined = "";
    if (message instanceof Function) fnName = message.name;
    else fnName = message.toLocaleString();
    let print = `${sym[type]}  [${new Date().toLocaleString()}] [${type.toUpperCase()}] [${this.context}] [${fnName}] `;
    if (type === "error") print = chalk.red(print);
    if (type === "warn") print = chalk.yellow(print);
    if (type === "info") print = chalk.blue(print);
    if (type === "verbo") print = chalk.green(print);
    return print;
  }

  private __log(tag: tag, message?: any, ...optionalParams: any[]) {
    // 判断日志级别是否应该输出
    if (logLevel[tag] < logLevel[this.level]) return;
    //
    message = `${this.prefix(tag, message)}`;
    if (tag === "error") console.error(message, ...optionalParams);
    else if (tag === "warn") console.warn(message, ...optionalParams);
    // eslint-disable-next-line no-console
    else console.log(message, ...optionalParams);
  }

  verbose(message?: any, ...optionalParams: any[]) {
    this.__log("verbo", message, ...optionalParams);
  }

  debug(message?: any, ...optionalParams: any[]) {
    this.__log("debug", message, ...optionalParams);
  }

  info(message?: any, ...optionalParams: any[]) {
    this.__log("info", message, ...optionalParams);
  }

  log(message?: any, ...optionalParams: any[]) {
    this.__log("info", message, ...optionalParams);
  }

  warn(message?: any, ...optionalParams: any[]) {
    this.__log("warn", message, ...optionalParams);
  }

  error(message?: any, ...optionalParams: any[]) {
    this.__log("error", message, ...optionalParams);
  }
}

