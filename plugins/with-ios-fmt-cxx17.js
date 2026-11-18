/* eslint-env node */
const fs = require('fs');
const path = require('path');
const { withDangerousMod } = require('expo/config-plugins');
const {
  mergeContents,
} = require('@expo/config-plugins/build/utils/generateCode');

// React Native 0.76.9+ ships fmt 11.0.2, whose consteval format strings don't compile
// with Xcode 27's clang in C++20 mode. Build only the fmt pod as C++17.
// react_native_post_install sets every pod to C++20, so this has to run after it.
const snippet = `    installer.pods_project.targets.each do |target|
      next unless target.name == 'fmt'
      target.build_configurations.each do |build_config|
        build_config.build_settings['CLANG_CXX_LANGUAGE_STANDARD'] = 'c++17'
      end
    end`;

// Offset from the `react_native_post_install(` line to just past its closing `)`.
// Throws if the call isn't found, so a Podfile template change fails prebuild loudly.
function linesUntilCallEnds(podfile) {
  const lines = podfile.split('\n');
  const start = lines.findIndex((line) =>
    /react_native_post_install\(/.test(line)
  );
  const end = lines.findIndex(
    (line, i) => i > start && /^\s*\)\s*$/.test(line)
  );
  if (start === -1 || end === -1) {
    throw new Error(
      'with-ios-fmt-cxx17: react_native_post_install(...) not found in Podfile'
    );
  }
  return end - start + 1;
}

module.exports = function withIosFmtCxx17(config) {
  return withDangerousMod(config, [
    'ios',
    (cfg) => {
      const podfile = path.join(cfg.modRequest.platformProjectRoot, 'Podfile');
      const contents = fs.readFileSync(podfile, 'utf8');
      const result = mergeContents({
        tag: 'ios-fmt-cxx17',
        src: contents,
        newSrc: snippet,
        anchor: /react_native_post_install\(/,
        offset: linesUntilCallEnds(contents),
        comment: '#',
      });
      fs.writeFileSync(podfile, result.contents);
      return cfg;
    },
  ]);
};
