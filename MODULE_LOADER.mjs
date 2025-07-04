import path from 'path';
import url from "url"
import NPMPackage from './package.json' with { type: "json" };

const aliases = getAliases();

function getAliases() {
	const base = process.cwd();
	const aliases = NPMPackage.aliases || {};

	return Object.keys(aliases).reduce((acc, key) => aliases[key][0] === "/" ? acc : {...acc, [key]: path.join(base, aliases[key]) }, aliases);
}

function isAliasInSpecifier(path, alias) {
  return path.indexOf(alias) === 0 && (path.length === alias.length || path[alias.length] === '/');
}

export function resolve(specifier, parentModuleURL, defaultResolve) {
	const alias = Object.keys(aliases).find((key) => isAliasInSpecifier(specifier, key));

	if (!alias) {
		return defaultResolve(specifier, parentModuleURL);
	}

	const rawPath = path.join(aliases[alias], specifier.slice(alias.length));
	const fileUrl = url.pathToFileURL(rawPath).href;

	return defaultResolve(fileUrl, parentModuleURL);
}