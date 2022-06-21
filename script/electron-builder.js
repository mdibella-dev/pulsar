const path = require('path')
let transformer = require('app-builder-lib/out/fileTransformer')

// Monkey-patch to not remove things I explicitly didn't say so
// See: https://github.com/electron-userland/electron-builder/issues/6957
const promises_1 = require("fs/promises");
const builder_util_1 = require("builder-util");

transformer.createTransformer = function(srcDir, configuration, extraMetadata, extraTransformer) {
    const mainPackageJson = path.join(srcDir, "package.json");
    const isRemovePackageScripts = configuration.removePackageScripts !== false;
    const isRemovePackageKeywords = configuration.removePackageKeywords !== false;
    const packageJson = path.sep + "package.json";
    return file => {
        if (file === mainPackageJson) {
            return modifyMainPackageJson(file, extraMetadata, isRemovePackageScripts, isRemovePackageKeywords);
        }
        if (extraTransformer != null) {
            return extraTransformer(file);
        }
        else {
            return null;
        }
    };
}
async function modifyMainPackageJson(file, extraMetadata, isRemovePackageScripts, isRemovePackageKeywords) {
    const mainPackageData = JSON.parse(await promises_1.readFile(file, "utf-8"));
    if (extraMetadata != null) {
        builder_util_1.deepAssign(mainPackageData, extraMetadata);
        return JSON.stringify(mainPackageData, null, 2);
    }
    return null;
}
/// END Monkey-Patch

const builder = require("electron-builder")
const Platform = builder.Platform
const fs = require('fs')

const generate = require('./lib/generate-metadata.js')

let options = {
  "appId": "link.mauricioszabo.pulsar",
  "npmRebuild": false,
  "extraResources": [
    {
      "from": "apm",
      "to": "app/apm"
    }
  ],
  compression: "normal",
  "linux": {
    "icon": "resources/app-icons/atom-community.png",
    "category": "Development",
    "synopsis": "A hackable text editor for the 22nd century",
    "target": [
      {
        "target": "appimage",
        "arch": "x64"
      },
      {
        "target": "deb",
        "arch": "x64"
      }
    ]
  },
  "extraMetadata": {
  }
}

generate()
generatedPackage = JSON.parse(fs.readFileSync('out/app/package.json'))
for(let k in generatedPackage) {
  if(k.startsWith('_')) {
    options.extraMetadata[k] = generatedPackage[k]
  }
}
builder.build({
  // targets: Platform.LINUX.createTarget(),
  config: options
}).then((result) => {
  console.log(JSON.stringify(result))
}).catch((error) => {
  console.error(error)
})
