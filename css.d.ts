// Allows side-effect imports of stylesheets such as `import '../global.css'`,
// which TypeScript 6 type-checks by default (noUncheckedSideEffectImports).
// Expo's generated expo-env.d.ts also declares this, but it is gitignored, so CI lacks it.
declare module '*.css';
