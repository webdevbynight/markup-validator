import packageManifest from "../../package.json" with { type: "json" };

/**
 * Shows the version of the package.
 */
export const showVersion = (): void => {
  console.log(packageManifest.version);
};
