const helpers = require('./helpers')
const fonts = {
  mdi: {
    package: {
      '@mdi/font': 'latest',
    },
    import: '@mdi/font/css/materialdesignicons.css',
    link: '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css">',
  },
  md: {
    package: {
      'material-design-icons-iconfont': 'latest',
    },
    import: 'material-design-icons-iconfont/dist/material-design-icons.css',
    link: '<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Material+Icons">',
  },
  fa: {
    package: {
      '@fortawesome/fontawesome-free': 'latest',
    },
    import: '@fortawesome/fontawesome-free/css/all.css',
    link: '<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous">',
  },
  fa4: {
    package: {
      'font-awesome': 'latest',
    },
    import: 'font-awesome/css/font-awesome.css',
    link: '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css">',
  },
  roboto: {
    package: {
      'roboto-fontface': '*',
    },
    import: 'roboto-fontface/css/roboto/roboto-fontface.css',
    link: '<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900">',
  },
}

function addDependencies (api, iconFont, useV3) {
  let pkgOpts = {
    dependencies: {
      ...fonts.roboto.package,
      ...fonts[iconFont].package,
    }
  }

  if (useV3) pkgOpts = {
    ...pkgOpts,
    // Use specified version or latest?
    "@fortawesome/fontawesome-svg-core": "latest",
    "@fortawesome/free-solid-svg-icons": "latest",
    "@fortawesome/vue-fontawesome": "latest",
  }

  api.extendPackage(pkgOpts)
}

function addImports (api, iconFont) {
  api.injectImports(api.entryFile, `import '${fonts.roboto.import}'`)
  api.injectImports(api.entryFile, `import '${fonts[iconFont].import}'`)
}

function addLinks (api, iconFont) {
  helpers.updateFile(api, './public/index.html', lines => {
    const lastLink = lines.reverse().findIndex(line => line.match(/^\s*<\/head>/))

    lines.splice(lastLink + 1, 0, `    ${fonts.roboto.link}`)
    lines.splice(lastLink + 1, 0, `    ${fonts[iconFont].link}`)

    return lines.reverse()
  })
}

module.exports = {
  addDependencies,
  addImports,
  addLinks,
}
