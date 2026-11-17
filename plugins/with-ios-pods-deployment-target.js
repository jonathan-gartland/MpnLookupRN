/* eslint-env node */
const fs = require('fs');
const path = require('path');
const { withDangerousMod } = require('expo/config-plugins');
const {
  mergeContents,
} = require('@expo/config-plugins/build/utils/generateCode');

// Xcode 27 rejects pod targets (e.g. Sentry and SDWebImage resource bundles)
// whose iOS deployment target is below 15. Raise them to Expo SDK 52's minimum.
const MIN_IOS = '15.1';

const snippet = `    installer.pods_project.targets.each do |target|
      target.build_configurations.each do |build_config|
        if build_config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'].to_f < ${MIN_IOS}
          build_config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '${MIN_IOS}'
        end
      end
    end`;

module.exports = function withIosPodsDeploymentTarget(config) {
  return withDangerousMod(config, [
    'ios',
    (cfg) => {
      const podfile = path.join(cfg.modRequest.platformProjectRoot, 'Podfile');
      const contents = fs.readFileSync(podfile, 'utf8');
      const result = mergeContents({
        tag: 'ios-pods-deployment-target',
        src: contents,
        newSrc: snippet,
        anchor: /post_install do \|installer\|/,
        offset: 1,
        comment: '#',
      });
      fs.writeFileSync(podfile, result.contents);
      return cfg;
    },
  ]);
};
