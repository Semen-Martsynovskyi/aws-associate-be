import type { Config } from "@jest/types";
import { pathsToModuleNameMapper } from "ts-jest";
import { compilerOptions } from "./tsconfig.paths.json";
// Sync object
const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "./tsconfig.spec.json",
      },
    ],
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  modulePaths: [compilerOptions.baseUrl],
  // setupFiles: ["./jest.setup.js"],
};
export default config;
