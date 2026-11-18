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
        // First line after the react_native_post_install(...) call in Expo's Podfile
        anchor: /# This is necessary for Xcode 14, because it signs resource bundles/,
        offset: 0,
        comment: '#',
      });
      fs.writeFileSync(podfile, result.contents);
      return cfg;
    },
  ]);
};
